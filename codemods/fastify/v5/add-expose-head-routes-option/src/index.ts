export default function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirtyFlag = false;

  // Find all fastify.get calls
  root.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: { name: 'fastify' },
      property: { name: 'get' }
    }
  }).forEach(path => {
    const args = path.node.arguments;

    // Check if the second argument is an empty object expression
    if (args.length >= 2 && j.ObjectExpression.check(args[1]) && args[1].properties.length === 0) {
      // Replace the empty object with the options object containing exposeHeadRoutes: false
      const optionsObject = j.objectExpression([
        j.property.from({
          kind: 'init',
          key: j.identifier('exposeHeadRoutes'),
          value: j.booleanLiteral(false),
          shorthand: false
        })
      ]);
      args[1] = optionsObject;
      dirtyFlag = true;
    }
  });

  return dirtyFlag ? root.toSource() : undefined;
}