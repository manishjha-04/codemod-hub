export default function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirtyFlag = false;

  // Find all async functions
  root.find(j.FunctionDeclaration, { async: true }).forEach(path => {
    const body = path.node.body.body;

    // Find the first error detection statement
    const errorDetectionIndex = body.findIndex(statement =>
      j.IfStatement.check(statement) &&
      j.CallExpression.check(statement.test) &&
      j.Identifier.check(statement.test.callee) &&
      statement.test.callee.name === 'detectError'
    );

    // Find the first data mutation statement
    const dataMutationIndex = body.findIndex(statement =>
      j.ExpressionStatement.check(statement) &&
      j.AwaitExpression.check(statement.expression)
    );

    // If error detection is after data mutation, reorder them
    if (errorDetectionIndex > -1 && dataMutationIndex > -1 && errorDetectionIndex > dataMutationIndex) {
      const [errorDetection] = body.splice(errorDetectionIndex, 1);
      body.splice(dataMutationIndex, 0, errorDetection);
      dirtyFlag = true;
    }
  });

  return dirtyFlag ? root.toSource() : undefined;
}


export const parser = "tsx";