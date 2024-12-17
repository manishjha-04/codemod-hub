import type { Api } from "@codemod.com/workflow";

export async function workflow({ files, astGrep }: Api) {
  await files()
    .jsFam()
    .astGrep({
      rule: {
        pattern: 'import { $$$IMPORTS } from "react-router-dom"',
      },
    })
    .filter(({ getMultipleMatches }) => {
      return getMultipleMatches("IMPORTS").some(
        (node) => node.text() === "StaticRouter"
      );
    })
    .replace(({ getMultipleMatches }) => {
      const remainingImports = [
        ...new Set(
          getMultipleMatches("IMPORTS")
            .map((node) => node.text().trim())
            .filter(
              (text) => text !== "StaticRouter" && text !== "" && text !== ","
            )
        ),
      ];

      const newReactRouterImport =
        remainingImports.length > 0
          ? `import { ${remainingImports.join(
              ", "
            )} } from "react-router-dom";\n`
          : "";

      const staticRouterImport =
        'import { StaticRouter } from "react-router-dom/server";';

      return `${newReactRouterImport}${staticRouterImport}`;
    });
}
