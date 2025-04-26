import { nonVariableTokens } from "./constants.js";
import { getTerms } from "./getTerms.js";
import { tokenize } from "./tokenize.js";

type ElementType<S> = S extends Set<infer T> ? T : never;

const cssClassTokenMap: Record<
  ElementType<typeof nonVariableTokens>,
  string
> = {
  λ: "lambda",
  ".": "dot",
  "(": "l-paren",
  ")": "r-paren",
};

function tokenTypeClass(token: string) {
  return cssClassTokenMap[token] ?? "var";
}

export function createExpressionElement(exp: string) {
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
  return expressionElement;
}
