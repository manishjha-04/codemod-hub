export default function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirtyFlag = false;

  // Find the variable declaration for `logger`
  root.find(j.VariableDeclarator, { id: { name: 'logger' } }).forEach(path => {
    // Rename the variable to `loggerInstance`
    path.node.id.name = 'loggerInstance';
    dirtyFlag = true;
  });

  // Find all references to `logger` and rename them to `loggerInstance`
  root.find(j.Identifier, { name: 'logger' }).forEach(path => {
    path.node.name = 'loggerInstance';
    dirtyFlag = true;
  });

  return dirtyFlag ? root.toSource() : undefined;
}