export default function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirtyFlag = false;

  // Find all MemberExpressions
  root.find(j.MemberExpression).forEach((path) => {
      const { property } = path.node;

      // Check if the property is an identifier named 'connection'
      if (j.Identifier.check(property) && property.name === 'connection') {
          // Replace 'connection' with 'socket'
          path.node.property = j.identifier('socket');
          dirtyFlag = true;
      }
  });

  return dirtyFlag ? root.toSource() : undefined;
}
