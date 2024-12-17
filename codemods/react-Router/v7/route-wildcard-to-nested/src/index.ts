export default function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirtyFlag = false;

  // Find all JSXElements with name 'Route'
  root.find(j.JSXElement, {
    openingElement: { name: { name: 'Route' } },
  }).forEach((path) => {
    const openingElement = path.node.openingElement;
    const attributes = openingElement.attributes;

    // Find the 'path' attribute
    const pathAttr = attributes.find(
      (attr) =>
      j.JSXAttribute.check(attr) &&
      j.Literal.check(attr.value) &&
      attr.name.name === 'path' &&
      typeof attr.value.value === 'string' &&
      attr.value.value.endsWith('/*'),
    );

    if (pathAttr) {
      // Remove the wildcard from the path
      const newPathValue = pathAttr.value.value.slice(0, -2);

      // Create a new parent Route element
      const parentRoute = j.jsxElement(
        j.jsxOpeningElement(j.jsxIdentifier('Route'), [
          j.jsxAttribute(
            j.jsxIdentifier('path'),
            j.literal(newPathValue),
          ),
        ]),
        j.jsxClosingElement(j.jsxIdentifier('Route')),
        [
          j.jsxElement(
            j.jsxOpeningElement(j.jsxIdentifier('Route'), [
              j.jsxAttribute(
                j.jsxIdentifier('path'),
                j.literal('*'),
              ),
              ...attributes.filter((attr) => attr !== pathAttr),
            ]),
            j.jsxClosingElement(j.jsxIdentifier('Route')),
            path.node.children,
          ),
        ],
      );

      // Replace the original Route with the new parent Route
      j(path).replaceWith(parentRoute);
      dirtyFlag = true;
    }
  });

  // Remove unnecessary JSXText nodes containing only whitespace
  root.find(j.JSXText).forEach((path) => {
    if (path.node.value.match(/^\s*$/)) {
      j(path).remove();
      dirtyFlag = true;
    }
  });

  // Ensure that the closing tags are self-closing if they have no children
  root.find(j.JSXElement).forEach((path) => {
    if (path.node.children.length === 0) {
      path.node.openingElement.selfClosing = true;
      path.node.closingElement = null;
      dirtyFlag = true;
    }
  });

  root.find(j.CallExpression, {
    callee: { name: 'createBrowserRouter' },
  }).forEach((path) => {
    const routesArray = path.node.arguments[0];
    if (j.ArrayExpression.check(routesArray)) {
      routesArray.elements.forEach((element, index) => {
        if (j.ObjectExpression.check(element)) {
          const pathProperty = element.properties.find(
            (prop) =>
            j.ObjectProperty.check(prop) &&
            j.Identifier.check(prop.key) &&
            prop.key.name === 'path' &&
            j.StringLiteral.check(prop.value) &&
            prop.value.value.endsWith('/*'),
          );

          if (pathProperty) {
            const originalPath = pathProperty.value.value;
            const parentPath = originalPath.slice(0, -2); // Remove '/*'
            const childPath = '*';

            // Create new child route
            const childRoute = j.objectExpression([
              j.objectProperty(
                j.identifier('path'),
                j.stringLiteral(childPath),
              ),
              ...element.properties.filter(
                (prop) =>
                j.ObjectProperty.check(prop) &&
                j.Identifier.check(prop.key) &&
                prop.key.name === 'element',
              ),
            ]);

            // Update the current route to be the parent route
            pathProperty.value = j.stringLiteral(parentPath);
            element.properties = element.properties.filter(
              (prop) =>
              !(
                j.ObjectProperty.check(prop) &&
                j.Identifier.check(prop.key) &&
                prop.key.name === 'element'
              ),
            );

            // Add children property with the new child route
            element.properties.push(
              j.objectProperty(
                j.identifier('children'),
                j.arrayExpression([childRoute]),
              ),
            );

            dirtyFlag = true;
          }
        }
      });
    }
  });

  return dirtyFlag ? root.toSource() : undefined;
}

export const parser = 'tsx';