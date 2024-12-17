export default function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirtyFlag = false;

  // Transform <BrowserRouter> JSX elements
  root.find(j.JSXElement, {
    openingElement: { name: { name: "BrowserRouter" } }
  }).forEach(path => {
    const openingElement = path.node.openingElement;
    const hasFutureProp = openingElement.attributes.some(attr =>
      j.JSXAttribute.check(attr) &&
      j.Identifier.check(attr.name) &&
      attr.name.name === "future"
    );

    if (!hasFutureProp) {
      const futureProp = j.jsxAttribute(
        j.jsxIdentifier("future"),
        j.jsxExpressionContainer(
          j.objectExpression([
            j.property.from({
              kind: "init",
              key: j.identifier("v7_relativeSplatPath"),
              value: j.literal(true)
            })
          ])
        )
      );
      openingElement.attributes.push(futureProp);
      dirtyFlag = true;
    }
  });

  // Transform createBrowserRouter function calls
  root.find(j.CallExpression, {
    callee: { name: "createBrowserRouter" }
  }).forEach(path => {
    const args = path.node.arguments;
    if (args.length === 1) {
      const futureArg = j.objectExpression([
        j.property.from({
          kind: "init",
          key: j.identifier("future"),
          value: j.objectExpression([
            j.property.from({
              kind: "init",
              key: j.identifier("v7_relativeSplatPath"),
              value: j.literal(true)
            })
          ])
        })
      ]);
      args.push(futureArg);
      dirtyFlag = true;
    }
  });

  return dirtyFlag ? root.toSource() : undefined;
}


export const parser = "tsx";