import type { Api } from "@codemod.com/workflow";

const pattern = {
  rule: {
    pattern: {
      context: "<Switch>$$$A</Switch>",
      strictness: "relaxed",
    },
  },
};

export async function workflow({ files }: Api) {
  await files()
    .jsFam()
    .astGrep({
      rule: {
        pattern: 'import { $$$IMPORTS } from "react-router-dom"',
      },
    })
    .filter(({ getMultipleMatches }) => {
      return getMultipleMatches("IMPORTS").some(
        (node) => node.text() === "Switch"
      );
    })
    .replace(({ getMultipleMatches }) => {
      const imports = [
        ...new Set(
          getMultipleMatches("IMPORTS")
            .map((node) => node.text().trim())
            .filter((text) => text !== "Switch" && text !== "" && text !== ",")
            .concat(["Routes"])
        ),
      ];

      return `import { ${imports.join(", ")} } from "react-router-dom";`;
    });

  await files().jsFam().astGrep(pattern).replace("<Routes>$$$A</Routes>");
}
