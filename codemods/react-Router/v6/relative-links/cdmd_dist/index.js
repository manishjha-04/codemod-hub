const RouteExact = {
    rule: {
        pattern: {
            context: "<Route exact $$$A>",
            strictness: "relaxed"
        }
    }
};
const RouteElement = {
    rule: {
        pattern: {
            context: " <Route $$$A>$$$B</Route>",
            strictness: "relaxed"
        }
    }
};
export async function workflow({ files, astGrep }) {
    await files()
        .jsFam()
        .astGrep(RouteExact)
        .replace("<Route $$$A>");
    await files()
        .jsFam()
        .astGrep(RouteElement)
        .replace("<Route $$$A element={$$$B} />");
    await files()
        .jsFam()
        .astGrep({
        rule: {
            pattern: {
                context: "<Link to={$A} $$$B>",
                strictness: "relaxed"
            },
        }
    })
        .replace(({ getMatch }) => {
        const toValue = getMatch('A').text();
        if (toValue.startsWith('`${match.url}/') && toValue.endsWith('`')) {
            const path = toValue.slice('`${match.url}/'.length, -1);
            return `<Link to="${path}" $$$B>`;
        }
        return;
    });
    await files()
        .jsFam()
        .astGrep({
        rule: {
            pattern: {
                context: "<Route  path={$A} $$$B>",
                strictness: "relaxed"
            },
        }
    })
        .replace(({ getMatch }) => {
        const toValue = getMatch('A').text();
        if (toValue.startsWith('`${match.path}/') && toValue.endsWith('`')) {
            const path = toValue.slice('`${match.path}/'.length, -1);
            return `<Route path="${path}" $$$B>`;
        }
        return;
    });
}
