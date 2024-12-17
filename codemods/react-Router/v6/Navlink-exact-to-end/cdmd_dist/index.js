const pattern = {
    rule: {
        pattern: {
            context: "<NavLink exact  $$$A>",
            strictness: "relaxed",
        },
    },
};
export async function workflow({ files }) {
    await files().jsFam().astGrep(pattern).replace("<NavLink end  $$$A>");
}
