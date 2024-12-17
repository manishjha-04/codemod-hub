export default function transform(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Find instances of req.params.hasOwnProperty and replace with Object.hasOwn(req.params, ...)
  root.find(j.CallExpression, {
      callee: {
          type: 'MemberExpression',
          object: {
              type: 'MemberExpression',
              object: {
                  type: 'Identifier', // This will match "req"
              },
              property: {
                  name: 'params', // This will match "params"
              },
          },
          property: {
              name: 'hasOwnProperty', // This will match "hasOwnProperty"
          },
      },
  }).replaceWith((path) => {
      const reqIdentifier = path.node.callee.object.object; // 'req'
      const paramArgument = path.node.arguments[0]; // argument passed to hasOwnProperty

      return j.callExpression(
          j.memberExpression(j.identifier('Object'), j.identifier('hasOwn')),
          [
              j.memberExpression(reqIdentifier, j.identifier('params')),
              paramArgument,
          ],
      );
  });

  return root.toSource();
}
