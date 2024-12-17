export default function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirtyFlag = false;

  // Find all `createBrowserRouter` function calls
  root.find(j.CallExpression, {
    callee: { name: 'createBrowserRouter' }
  }).forEach(path => {
    const args = path.node.arguments;

    // Check if the second argument exists
    if (args.length < 2) {
      // Add the second argument if it doesn't exist
      args.push(j.objectExpression([
        j.objectProperty(
          j.identifier('future'),
          j.objectExpression([
            j.objectProperty(
              j.identifier('v7_partialHydration'),
              j.booleanLiteral(true)
            )
          ])
        )
      ]));
      dirtyFlag = true;
    } else if (j.ObjectExpression.check(args[1])) {
      // If the second argument is an object, find or create the `future` property
      const futureProp = args[1].properties.find(prop =>
        j.ObjectProperty.check(prop) && j.Identifier.check(prop.key) && prop.key.name === 'future'
      );

      if (futureProp && j.ObjectExpression.check(futureProp.value)) {
        // Add `v7_partialHydration: true` to the `future` object if it doesn't exist
        const existingProp = futureProp.value.properties.find(prop =>
          j.ObjectProperty.check(prop) && j.Identifier.check(prop.key) && prop.key.name === 'v7_partialHydration'
        );

        if (!existingProp) {
          futureProp.value.properties.push(
            j.objectProperty(
              j.identifier('v7_partialHydration'),
              j.booleanLiteral(true)
            )
          );
          dirtyFlag = true;
        }
      } else {
        // Create the `future` property if it doesn't exist
        args[1].properties.push(
          j.objectProperty(
            j.identifier('future'),
            j.objectExpression([
              j.objectProperty(
                j.identifier('v7_partialHydration'),
                j.booleanLiteral(true)
              )
            ])
          )
        );
        dirtyFlag = true;
      }
    }
  });

  return dirtyFlag ? root.toSource() : undefined;
}


export const parser = "tsx";