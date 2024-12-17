export default function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirtyFlag = false;

  // Find all CallExpressions with callee `fastify.listen` and a single numeric argument
  root.find(j.CallExpression, {
    callee: {
      object: { name: 'fastify' },
      property: { name: 'listen' },
    },
    arguments: (args) =>
      args.length === 1 &&
      j.Literal.check(args[0]) &&
      typeof args[0].value === 'number',
  }).forEach((path) => {
    const arg = path.node.arguments[0];
    path.node.arguments = [
      j.objectExpression([
        j.property.from({
          kind: 'init',
          key: j.identifier('port'),
          value: arg,
          shorthand: false,
        }),
      ]),
    ];
    dirtyFlag = true;
  });

  return dirtyFlag ?
    root.toSource({ quote: 'single', trailingComma: false }) :
    undefined;
}