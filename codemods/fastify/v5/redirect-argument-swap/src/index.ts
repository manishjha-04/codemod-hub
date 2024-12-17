export default function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirtyFlag = false;

  // Find all call expressions
  root.find(j.CallExpression).forEach(path => {
    const { callee, arguments: args } = path.node;

    // Check if the call expression is `reply.redirect`
    if (j.MemberExpression.check(callee) && callee.object.name === 'reply' && callee.property.name === 'redirect') {
      // Ensure there are exactly two arguments
      if (args.length === 2) {
        const [firstArg, secondArg] = args;

        // Check if the first argument is a numeric literal and the second is a string literal
        if (j.Literal.check(firstArg) && typeof firstArg.value === 'number' &&
          j.Literal.check(secondArg) && typeof secondArg.value === 'string') {

          // Swap the arguments
          path.node.arguments = [secondArg, firstArg];
          dirtyFlag = true;
        }
      }
    }
  });

  return dirtyFlag ? root.toSource() : undefined;
}