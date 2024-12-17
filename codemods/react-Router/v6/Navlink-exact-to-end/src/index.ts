import type { Api } from "@codemod.com/workflow";

const pattern = {
  rule: {
    pattern: {
      context: "<NavLink exact  $$$A>",
      strictness: "relaxed",
    },
  },
};

export async function workflow({ files }: Api) {
  await files().jsFam().astGrep(pattern).replace("<NavLink end  $$$A>");
}
