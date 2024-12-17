export default function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirtyFlag = false;

  // Find all occurrences of reply.getResponseTime() and replace with reply.elapsedTime
  root.find(j.CallExpression, {
    callee: {
      object: { name: 'reply' },
      property: { name: 'getResponseTime' }
    }
  }).forEach(path => {
    path.replace(j.memberExpression(j.identifier('reply'), j.identifier('elapsedTime')));
    dirtyFlag = true;
  });

  return dirtyFlag ? root.toSource() : undefined;
}