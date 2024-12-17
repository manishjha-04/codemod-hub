export default function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirtyFlag = false;

  // Find all call expressions with callee `createBrowserRouter`
  root.find(j.CallExpression, {
    callee: { name: 'createBrowserRouter' }
  }).forEach(path => {
    const args = path.node.arguments;

    // Check if the second argument exists and is an object expression
    if (args.length > 1 && j.ObjectExpression.check(args[1])) {
      const futureProperty = args[1].properties.find(prop =>
        j.ObjectProperty.check(prop) &&
        j.Identifier.check(prop.key) &&
        prop.key.name === 'future'
      );

      if (futureProperty && j.ObjectExpression.check(futureProperty.value)) {
        // Check if `v7_fetcherPersist` already exists
        const fetcherPersistProperty = futureProperty.value.properties.find(prop =>
          j.ObjectProperty.check(prop) &&
          j.Identifier.check(prop.key) &&
          prop.key.name === 'v7_fetcherPersist'
        );

        if (!fetcherPersistProperty) {
          // Add the new property to the existing `future` object
          futureProperty.value.properties.push(
            j.objectProperty(
              j.identifier('v7_fetcherPersist'),
              j.booleanLiteral(true)
            )
          );
          dirtyFlag = true;
        }
      } else {
        // Create a new `future` object with the new property
        args[1].properties.push(
          j.objectProperty(
            j.identifier('future'),
            j.objectExpression([
              j.objectProperty(
                j.identifier('v7_fetcherPersist'),
                j.booleanLiteral(true)
              )
            ])
          )
        );
        dirtyFlag = true;
      }
    } else {
      // Create a new object with `future` property if no second argument
      args.push(
        j.objectExpression([
          j.objectProperty(
            j.identifier('future'),
            j.objectExpression([
              j.objectProperty(
                j.identifier('v7_fetcherPersist'),
                j.booleanLiteral(true)
              )
            ])
          )
        ])
      );
      dirtyFlag = true;
    }
  });

  return dirtyFlag ? root.toSource() : undefined;
}


export const parser = "tsx";