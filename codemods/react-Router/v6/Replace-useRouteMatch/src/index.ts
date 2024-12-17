import type { Api } from "@codemod.com/workflow";

export async function workflow({ files, astGrep }: Api) {
  await files()
    .jsFam()
    .astGrep({
      rule: {
        pattern: "useRouteMatch({$$$ARGS})",
      },
    })
    .replace(({ getMultipleMatches }) => {
      const args = getMultipleMatches("ARGS").map((node) => node.text());

      const transformedArgs = args.map((arg) => {
        if (arg.includes("strict")) {
          return arg.replace("strict", "end");
        }
        if (arg.includes("sensitive")) {
          return arg.replace("sensitive", "caseSensitive");
        }
        return arg;
      });

      const newArgs = transformedArgs.join("");

      // Return the transformed `useMatch` call
      return `useMatch({ ${newArgs} })`;
    });


    // this case if any variable declarator kind of routematch is left to be replaced

    await files().jsFam().astGrep('useRouteMatch').replace('useMatch');


  // await files()
  //   .jsFam()
  //   .astGrep({
  //     rule: {
  //       pattern: 'import { $$$IMPORTS } from "react-router-dom"',
  //     },
  //   })
  //   .filter(({ getMultipleMatches }) => {
  //     return getMultipleMatches("IMPORTS").some(
  //       (node) => node.text() === "useRouteMatch"
  //     );
  //   })
  //   .replace(({ getMultipleMatches }) => {
  //     const imports = getMultipleMatches("IMPORTS")
  //       .map((node) => node.text())
  //       .filter((imp) => imp !== "useRouteMatch")
  //       .concat(["useMatch"])
  //       .join("");

  //     return `import { ${imports} } from "react-router-dom";`;
  //   });

  //Below code covering edge cases will have to cross check one more time 

    await files()
    .jsFam()
    .astGrep({
      rule: {
        pattern: 'import { $$$IMPORTS } from "react-router-dom"',
      },
    })
    .filter(({ getMultipleMatches }) => {
      return getMultipleMatches("IMPORTS").some(
        (node) => node.text() === "useRouteMatch"
      );
    })
    .replace(({ getMultipleMatches }) => {
      const imports = [
        ...new Set(
          getMultipleMatches("IMPORTS")
            .map((node) => node.text().trim())
            .filter((text) => text !== "useRouteMatch" && text !== "" && text !== ",")
            .concat(["useMatch"])
        ),
      ];

      return `import { ${imports.join(", ")} } from "react-router-dom";`;
    });
}
