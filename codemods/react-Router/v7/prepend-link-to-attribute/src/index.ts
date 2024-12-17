export default function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirtyFlag = false;

  // Find all JSXElements with the name 'Link'
  root.find(j.JSXElement, {
      openingElement: { name: { name: 'Link' } },
  }).forEach((path) => {
      const openingElement = path.node.openingElement;

      // Find the 'to' attribute
      const toAttribute = openingElement.attributes.find(
          (attr) => j.JSXAttribute.check(attr) && attr.name.name === 'to',
      );

      if (
          toAttribute &&
          j.Literal.check(toAttribute.value) &&
          typeof toAttribute.value.value === 'string'
      ) {
          const toValue = toAttribute.value.value;

          // Specifically change the root path '/' to '../'
          if (toValue === '/') {
              toAttribute.value.value = '../';
              dirtyFlag = true;
          }
          // Check if the path is relative and not absolute
          else if (!toValue.startsWith('/') && !toValue.startsWith('../')) {
              // Prepend '../' to the relative path
              toAttribute.value.value = `../${toValue}`;
              dirtyFlag = true;
          }
      }
  });

  return dirtyFlag ? root.toSource({ quote: 'single' }) : undefined;
}

export const parser = 'tsx';
