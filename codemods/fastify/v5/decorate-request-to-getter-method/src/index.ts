export default function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirtyFlag = false;

  // Find all fastify.decorateRequest calls
  root.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: { name: 'fastify' },
      property: { name: 'decorateRequest' }
    }
  }).forEach(path => {
    const args = path.node.arguments;
    if (args.length === 2 && j.ObjectExpression.check(args[1])) {
      const originalObject = args[1];
      const getterMethod = j.property.from({
        kind: 'init',
        key: j.identifier('getter'),
        value: j.functionExpression(
          null,
          [],
          j.blockStatement([
            j.returnStatement(originalObject)
          ])
        ),
        shorthand: false
      });
      const newObject = j.objectExpression([getterMethod]);
      path.node.arguments[1] = newObject;
      dirtyFlag = true;
    }
  });

  // Replace function expressions with method definitions
  root.find(j.FunctionExpression).forEach(path => {
    const parent = path.parent.node;
    if (j.Property.check(parent) && parent.key.name === 'getter') {
      const methodDefinition = j.methodDefinition(
        'method',
        j.identifier('getter'),
        path.node
      );
      j(path.parent).replaceWith(methodDefinition);
      dirtyFlag = true;
    }
  });

  return dirtyFlag ? root.toSource() : undefined;
}