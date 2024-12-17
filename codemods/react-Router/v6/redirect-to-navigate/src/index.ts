import type { Api } from "@codemod.com/workflow";

export async function workflow({ files }: Api) {
    // Update Redirect components to Navigate
    await files()
    .jsFam()
    .astGrep({
      rule: {
        pattern: 'import { $$$IMPORTS } from "react-router-dom"',
      },
    })
    .filter(({ getMultipleMatches }) => {
      return getMultipleMatches("IMPORTS").some(
        (node) => node.text() === "Redirect"
      );
    })
    .replace(({ getMultipleMatches }) => {
      const imports = [
        ...new Set(
          getMultipleMatches("IMPORTS")
            .map((node) => node.text().trim())
            .filter((text) => text !== "Redirect" && text !== "" && text !== ",")
            .concat(["Navigate"])
        ),
      ];

      return `import { ${imports.join(", ")} } from "react-router-dom";`;
    });



    await files()
    .jsFam()
    .astGrep({
      rule: {
        pattern: '<Redirect to={$$$TO} />',
      },
    })
    .replace(({ getMultipleMatches }) => {
      const toArg = getMultipleMatches('TO')[0].text();
      return `<Navigate to={${toArg}} />`;
    });
  
  await files()
    .jsFam()
    .astGrep({
      rule: {
        pattern: '<Redirect to={$$$TO} push={true} />',
      },
    })
    .replace(({ getMultipleMatches }) => {
      const toArg = getMultipleMatches('TO')[0].text();
      return `<Navigate to={${toArg}} replace />`;
    });
}