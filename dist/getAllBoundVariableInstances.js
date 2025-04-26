import { λ } from "./constants.js";
export function getAllBoundVariableInstances(term) {
    const tokensElements = term.children;
    const tokens = Array.from(tokensElements).map((el) => el.textContent);
    if (tokens.slice(0, 2).join("") !== "(λ") {
        throw "Unexpected expression in this part of the code";
    }
    if (!tokensElements[2].classList.contains("var")) {
        throw "Unexpected non-var";
    }
    const boundvar = tokensElements[2].textContent;
    const startIndex = tokens.indexOf(".") + 1;
    const bodyTokens = tokens.slice(startIndex, -1); // Drop the last token (the closing parenthesis)
    const boundvarIndices = bodyTokens.reduce(([indices, shadowDepth, inAFunctionHead], token, index) => {
        if (token === λ) {
            return [indices, shadowDepth, true];
        }
        if (token === ".") {
            return [indices, shadowDepth, false];
        }
        if (token === boundvar) {
            if (inAFunctionHead) {
                return [
                    indices,
                    Math.max(shadowDepth, 1),
                    inAFunctionHead,
                ];
            }
            // Found a (non-shadowed) bound variable in the body of the function
            if (shadowDepth === 0) {
                return [
                    [...indices, index + startIndex],
                    shadowDepth,
                    inAFunctionHead,
                ];
            }
            return [indices, shadowDepth, inAFunctionHead];
        }
        if (token === "(") {
            return [
                indices,
                Math.sign(shadowDepth) * (Math.abs(shadowDepth) + 1),
                inAFunctionHead,
            ];
        }
        if (token === ")") {
            return [
                indices,
                Math.sign(shadowDepth) * (Math.abs(shadowDepth) - 1),
                inAFunctionHead,
            ];
        }
        return [indices, shadowDepth, inAFunctionHead];
    }, [[], 0, false])[0];
    const boundvarElements = boundvarIndices.map((index) => tokensElements[index]);
    return boundvarElements;
}
//# sourceMappingURL=getAllBoundVariableInstances.js.map