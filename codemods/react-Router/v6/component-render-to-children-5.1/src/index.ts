import type { Api } from "@codemod.com/workflow";

const render = {
  rule: {
    pattern: {
      context: "<Route $$$A render={$$$B} $$$C/>",
      strictness: "relaxed",
    },
  },
};

const component = {
  rule: {
    pattern: {
      context: "<Route $$$A component={$$$B} $$$C/>",
      strictness: "relaxed",
    },
  },
};

export async function workflow({ files }: Api) {
  await files()
    .jsFam()
    .astGrep(render)
    .replace("<Route $$$A  $$$C>$$$B</Route>");

  await files()
    .jsFam()
    .astGrep(component)
    .replace("<Route $$$A  $$$C> <$$$B/> </Route>");
}
