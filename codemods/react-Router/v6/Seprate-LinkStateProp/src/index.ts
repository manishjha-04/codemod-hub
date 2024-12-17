import type { Api } from "@codemod.com/workflow";

const pattern = {
  rule:{
    pattern:{
      context: '<Link to={{ pathname: "$B", state: $A }} />',
      strictness: "relaxed"
    }
  }
}

export async function workflow({ files }: Api) {
  await files()
    .jsFam()
    .astGrep(pattern)
    .replace('<Link to="$B" state={$A} />');
}