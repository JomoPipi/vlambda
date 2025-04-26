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
export function createNewExpression(exp) {
    const expressionElement = document.createElement("div");
    const termElements = getTerms(exp).map((term) => {
        const termElement = document.createElement("span");
        for (const token of tokenize(`(${term})`)) {
            const tokenElement = document.createElement("span");
            tokenElement.innerText = token;
            tokenElement.classList.add("token");
            tokenElement.classList.add(tokenTypeClass(token));
            termElement.appendChild(tokenElement);
        }
        termElement.classList.add("term");
        return termElement;
    });
    expressionElement.append(...termElements);
    expList.appendChild(expressionElement);
}
//# sourceMappingURL=addNewExpression.js.map