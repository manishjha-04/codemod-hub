import type { Api } from "@codemod.com/workflow";

const pattern = {
  rule: {
    pattern: {
      context:
        "<NavLink $$$X style = {{color:'$A'}} activeStyle={{color:'$B'}} $$$Y>",
      strictness: "relaxed",
    },
  },
};

export async function workflow({ files }: Api) {
  await files()
    .jsFam()
    .astGrep(pattern)
    .replace(
      "<NavLink $$$X  style={({ isActive }) => ({ color: isActive ? '$B' : '$A' })} $$$Y>"
    );
}
