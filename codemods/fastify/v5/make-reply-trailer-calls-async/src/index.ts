export default function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirtyFlag = false;

  // Find all CallExpressions with callee object named 'reply' and property named 'trailer'
  root.find(j.CallExpression, {
    callee: {
      object: { name: 'reply' },
      property: { name: 'trailer' }
    }
  }).forEach(path => {
    const args = path.node.arguments;
    if (args.length > 1 && j.FunctionExpression.check(args[1])) {
      const funcExpr = args[1];
      if (!funcExpr.async) {
        funcExpr.async = true;
        dirtyFlag = true;
      }
    }
  });

  return dirtyFlag ? root.toSource() : undefined;
}