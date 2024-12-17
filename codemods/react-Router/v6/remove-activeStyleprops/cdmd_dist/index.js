const pattern = {
    rule: {
        pattern: {
            context: "<NavLink $$$X style = {{color:'$A'}} activeStyle={{color:'$B'}} $$$Y>",
            strictness: "relaxed",
        },
    },
};
export async function workflow({ files }) {
    await files()
        .jsFam()
        .astGrep(pattern)
        .replace("<NavLink $$$X  style={({ isActive }) => ({ color: isActive ? '$B' : '$A' })} $$$Y>");
}
