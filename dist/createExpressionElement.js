import { getTerms } from "./getTerms.js";
import { tokenize } from "./tokenize.js";
const cssClassTokenMap = {
    λ: "lambda",
    ".": "dot",
    "(": "l-paren",
    ")": "r-paren",
};
function tokenTypeClass(token) {
    return cssClassTokenMap[token] ?? "var";
}
export function createExpressionElement(exp) {
    const expressionElement = document.createElement("div");
    expressionElement.classList.add("expression");
    const terms = getTerms(exp);
    const nTerms = terms.length;
    const termElements = terms.map((term) => {
        const termElement = document.createElement("span");
        const tokens = tokenize(nTerms === 1 ? term : `(${term})`);
        for (const token of tokens) {
            const tokenElement = document.createElement("span");
            const tokenType = tokenTypeClass(token);
            tokenElement.innerText = token;
            tokenElement.classList.add("token");
            tokenElement.classList.add(tokenType);
            tokenElement.setAttribute("data-token-type", tokenType);
            termElement.appendChild(tokenElement);
        }
        termElement.classList.add("term-box");
        return termElement;
    });
    expressionElement.append(...termElements);
    return expressionElement;
}
//# sourceMappingURL=createExpressionElement.js.map