export async function workflow({ files, astGrep }) {
    // Replace useHistory with useNavigate
    await files()
        .jsFam()
        .astGrep({
        rule: {
            pattern: 'import { $$$IMPORTS } from "react-router-dom"',
        },
    })
        .filter(({ getMultipleMatches }) => {
        return getMultipleMatches("IMPORTS").some((node) => node.text() === "useHistory");
    })
        .replace(({ getMultipleMatches }) => {
        const imports = [
            ...new Set(getMultipleMatches("IMPORTS")
                .map((node) => node.text().trim())
                .filter((text) => text !== "useHistory" && text !== "" && text !== ",")
                .concat(["useNavigate"])),
        ];
        return `import { ${imports.join(", ")} } from "react-router-dom";`;
    });
    // Replace history.push and history.replace calls
    await files()
        .jsFam()
        .astGrep({
        rule: {
            pattern: "history.push($$$ARGS)",
        },
    })
        .replace(({ getMultipleMatches }) => {
        const args = getMultipleMatches("ARGS").map((node) => node.text());
        return `navigate(${args[0]})`;
    });
    await files()
        .jsFam()
        .astGrep({
        rule: {
            pattern: "history.replace($$$ARGS)",
        },
    })
        .replace(({ getMultipleMatches }) => {
        const args = getMultipleMatches("ARGS").map((node) => node.text());
        return `navigate(${args[0]}, { replace: true })`;
    });
    // Replace go, goBack, goForward usage
    await files()
        .jsFam()
        .astGrep({
        rule: {
            pattern: "const { $$$METHODS } = useHistory();",
        },
    })
        .replace(({ getMultipleMatches }) => {
        const methods = getMultipleMatches("METHODS").map((node) => node.text());
        // Build the new destructured assignment for navigate
        const navigateAssignment = methods
            .map((method) => {
            if (method === "go") {
                return "navigate";
            }
            if (method === "goBack") {
                return "navigate(-1)";
            }
            if (method === "goForward") {
                return "navigate(1)";
            }
            return method;
        })
            .join(", ");
        return `const navigate = useNavigate();`;
    });
    // Handle any instances of go, goBack, goForward in the code
    await files()
        .jsFam()
        .astGrep({
        rule: {
            pattern: "go($$$ARGS)",
        },
    })
        .replace(({ getMultipleMatches }) => {
        const args = getMultipleMatches("ARGS").map((node) => node.text());
        return `navigate(${args[0]})`;
    });
}
