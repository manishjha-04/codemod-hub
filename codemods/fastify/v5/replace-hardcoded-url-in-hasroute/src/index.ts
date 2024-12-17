export default function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirtyFlag = false;

  // Find the route definition in fastify.get
  const routePath = root.find(j.CallExpression, {
    callee: {
      object: { name: 'fastify' },
      property: { name: 'get' }
    }
  }).nodes().map(node => {
    if (j.Literal.check(node.arguments[0]) && typeof node.arguments[0].value === 'string') {
      return node.arguments[0].value;
    }
    return null;
  }).filter(Boolean)[0];

  if (routePath) {
    // Replace the hardcoded URL in fastify.hasRoute with the parameterized path
    root.find(j.CallExpression, {
      callee: {
        object: { name: 'fastify' },
        property: { name: 'hasRoute' }
      }
    }).forEach(path => {
      const urlProperty = path.node.arguments[0].properties.find(prop =>
        j.ObjectProperty.check(prop) &&
        j.Identifier.check(prop.key) &&
        prop.key.name === 'url'
      );

      if (urlProperty && j.Literal.check(urlProperty.value) && typeof urlProperty.value.value === 'string') {
        if (urlProperty.value.value === '/example/12345.png') {
          urlProperty.value = j.literal(routePath);
          dirtyFlag = true;
        }
      }
    });
  }

  return dirtyFlag ? root.toSource() : undefined;
}