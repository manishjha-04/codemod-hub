import type { Api } from "@codemod.com/workflow";

//manual tweaks might be needed..need to check on this

export async function workflow({ files, astGrep }: Api) {
  await files("**/*.{js,jsx,ts,tsx}")
    .jsFam()
    .astGrep({
      rule: {
        pattern: 'import { $$$IMPORTS } from "react-router-config"',
      },
    })
    .replace(({ getMultipleMatches }) => {
      const imports = getMultipleMatches("IMPORTS")
        .map((node) => node.text())
        .filter((imp) => imp !== "renderRoutes");

      const newImports =
        imports.length > 0
          ? `import { ${imports.join("")} } from "react-router-config";`
          : "";

      return `${newImports}\nimport { useRoutes } from "react-router-dom";`;
    });

  await files("**/*.{js,jsx,ts,tsx}")
    .astGrep("renderRoutes($A)")
    .replace("useRoutes($A)");
}
