export default function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirtyFlag = false;

  // Find all call expressions with callee `createBrowserRouter`
  root.find(j.CallExpression, { callee: { name: 'createBrowserRouter' } })
    .forEach(path => {
      const args = path.node.arguments;

      // Check if the second argument exists and is an object
      if (args.length > 1 && j.ObjectExpression.check(args[1])) {
        const futureProp = args[1].properties.find(prop =>
          j.ObjectProperty.check(prop) &&
          j.Identifier.check(prop.key) &&
          prop.key.name === 'future'
        );

        // If `future` property exists, add `v7_normalizeFormMethod: true` to it
        if (futureProp && j.ObjectExpression.check(futureProp.value)) {
          const existingProp = futureProp.value.properties.find(prop =>
            j.ObjectProperty.check(prop) &&
            j.Identifier.check(prop.key) &&
            prop.key.name === 'v7_normalizeFormMethod'
          );

          if (!existingProp) {
            futureProp.value.properties.push(
              j.objectProperty(
                j.identifier('v7_normalizeFormMethod'),
                j.booleanLiteral(true)
              )
            );
            dirtyFlag = true;
          }
        }
      } else {
        // If no second argument or no `future` property, create it
        const futureObject = j.objectExpression([
          j.objectProperty(
            j.identifier('v7_normalizeFormMethod'),
            j.booleanLiteral(true)
          )
        ]);

        const newArg = j.objectExpression([
          j.objectProperty(
            j.identifier('future'),
            futureObject
          )
        ]);

        if (args.length > 1) {
          args[1] = newArg;
        } else {
          args.push(newArg);
        }
        dirtyFlag = true;
      }
    });

  return dirtyFlag ? root.toSource() : undefined;
}


export const parser = "tsx";