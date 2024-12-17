const pattern = {
    rule: {
        pattern: {
            context: 'matchPath("$$$A",$$$B)',
            strictness: "relaxed"
        }
    }
};
export async function workflow({ files }) {
    await files()
        .jsFam()
        .astGrep(pattern)
        .replace('matchPath($$$B,"$$$A")'); //here the first path is string which is getting reordered with the second callbacks
}
