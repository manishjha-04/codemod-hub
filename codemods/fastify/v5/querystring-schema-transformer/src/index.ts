export default function transformer(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Traverse the AST to find fastify.get() calls
  root.find(j.CallExpression, {
    callee: {
      object: { name: 'fastify' },
      property: { name: 'get' },
    },
  }).forEach((path) => {
    const args = path.node.arguments;

    // Check if the second argument has a schema with a querystring property
    if (
      args[1] &&
      args[1].properties &&
      args[1].properties.some(
        (prop) =>
        prop.key.name === 'schema' &&
        prop.value.properties.some(
          (schemaProp) =>
          schemaProp.key.name === 'querystring' &&
          schemaProp.value.type === 'ObjectExpression',
        ),
      )
    ) {
      // Modify the querystring schema
      args[1].properties.forEach((prop) => {
        if (prop.key.name === 'schema') {
          prop.value.properties.forEach((schemaProp) => {
            if (schemaProp.key.name === 'querystring') {
              // Convert the schema to the new format
              const queryStringProps =
                schemaProp.value.properties;
              const nameProp = queryStringProps.find(
                (p) => p.key.name === 'name',
              );

              // Update the querystring object
              schemaProp.value = j.objectExpression([
                j.property(
                  'init',
                  j.identifier('type'),
                  j.literal('object'),
                ),
                j.property(
                  'init',
                  j.identifier('properties'),
                  j.objectExpression([nameProp]),
                ),
                j.property(
                  'init',
                  j.identifier('required'),
                  j.arrayExpression([j.literal('name')]),
                ),
              ]);
            }
          });
        }
      });
    }
  });

  return root.toSource();
}