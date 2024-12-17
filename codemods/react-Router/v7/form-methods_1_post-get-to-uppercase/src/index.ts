export default function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirtyFlag = false;

  // Find all BinaryExpressions
  root.find(j.BinaryExpression, { operator: '===' }).forEach(path => {
    const { left, right } = path.node;

    // Check if the left side is a MemberExpression with property 'formMethod'
    if (j.MemberExpression.check(left) && j.Identifier.check(left.property) && left.property.name === 'formMethod') {
      // Check if the right side is a Literal with value 'post' or 'get'
      if (j.Literal.check(right) && typeof right.value === 'string') {
        if (right.value === 'post') {
          path.get('right').replace(j.literal('POST'));
          dirtyFlag = true;
        } else if (right.value === 'get') {
          path.get('right').replace(j.literal('GET'));
          dirtyFlag = true;
        }
      }
    }
  });

  return dirtyFlag ? root.toSource() : undefined;
}


export const parser = "tsx";