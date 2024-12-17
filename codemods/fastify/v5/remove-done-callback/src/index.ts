export default function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirtyFlag = false;

  // Find fastify.register calls
  root.find(j.CallExpression, {
    callee: {
      object: {
        name: 'fastify',
      },
      property: {
        name: 'register',
      },
    },
  }).forEach((path) => {
    // Find the function expression passed as the argument
    const arg = path.value.arguments[0];
    if (
      j.FunctionExpression.check(arg) ||
      j.ArrowFunctionExpression.check(arg)
    ) {
      const params = arg.params;

      // Check if the function has three parameters
      if (params.length === 3) {
        const [instance, opts, done] = params;

        // Remove the third parameter
        arg.params = [instance, opts];

        // Replace done() calls with return statements
        j(arg)
          .find(j.CallExpression, {
            callee: {
              type: 'Identifier',
              name: 'done',
            },
          })
          .replaceWith(() => {
            dirtyFlag = true;
            return j.returnStatement(null);
          });

        dirtyFlag = true;
      }
    }
  });

  return dirtyFlag ? root.toSource() : undefined;
}