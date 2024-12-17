export default function transform(fileInfo, api) {
  const j = api.jscodeshift;

  return j(fileInfo.source)
    .find(j.ExpressionStatement)
    .forEach((path) => {
      const expr = path.node.expression;

      // Check if the expression is "reply.sent = true;"
      if (
        j.AssignmentExpression.check(expr) &&
        j.MemberExpression.check(expr.left) &&
        expr.left.object.name === 'reply' &&
        expr.left.property.name === 'sent' &&
        expr.right.value === true
      ) {
        // Replace it with "reply.hijack();"
        j(path).replaceWith(
          j.expressionStatement(
            j.callExpression(
              j.memberExpression(
                j.identifier('reply'),
                j.identifier('hijack'),
              ),
              [],
            ),
          ),
        );
      }
    })
    .toSource();
}