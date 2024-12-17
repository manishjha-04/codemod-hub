export default function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirtyFlag = false;

  // Function to add or merge the future prop
  function addOrMergeFutureProp(path) {
    const openingElement = path.node.openingElement;
    const futureProp = openingElement.attributes.find(attr =>
      j.JSXAttribute.check(attr) && attr.name.name === 'future'
    );

    if (futureProp && j.JSXExpressionContainer.check(futureProp.value) && j.ObjectExpression.check(futureProp.value.expression)) {
      // Merge into existing future prop
      const properties = futureProp.value.expression.properties;
      const hasV7StartTransition = properties.some(prop =>
        j.Property.check(prop) && prop.key.name === 'v7_startTransition'
      );

      if (!hasV7StartTransition) {
        properties.push(j.property.from({
          kind: 'init',
          key: j.identifier('v7_startTransition'),
          value: j.literal(true),
          shorthand: false
        }));
        dirtyFlag = true;
      }
    } else {
      // Add new future prop
      openingElement.attributes.push(j.jsxAttribute(
        j.jsxIdentifier('future'),
        j.jsxExpressionContainer(
          j.objectExpression([
            j.property.from({
              kind: 'init',
              key: j.identifier('v7_startTransition'),
              value: j.literal(true),
              shorthand: false
            })
          ])
        )
      ));
      dirtyFlag = true;
    }
  }

  // Find and transform <BrowserRouter> and <RouterProvider> elements
  root.find(j.JSXElement).forEach(path => {
    const openingElement = path.node.openingElement;
    if (j.JSXIdentifier.check(openingElement.name) &&
      (openingElement.name.name === 'BrowserRouter' || openingElement.name.name === 'RouterProvider')) {
      addOrMergeFutureProp(path);
    }
  });

  return dirtyFlag ? root.toSource() : undefined;
}


export const parser = "tsx";