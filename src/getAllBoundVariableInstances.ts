import { λ } from "./constants.js";

export function getAllBoundVariableInstances(term: HTMLElement) {
  const tokensElements = term.children as HTMLCollectionOf<HTMLElement>;
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
  type SearchTuple = [number[], shadowDepth: number, inAFunctionHead: boolean];
  const boundvarIndices = bodyTokens.reduce(
    ([indices, shadowDepth, inAFunctionHead], token, index) => {
      if (token === λ) {
        return [indices, shadowDepth, true] as SearchTuple;
      }
      if (token === ".") {
        return [indices, shadowDepth, false] as SearchTuple;
      }

      if (token === boundvar) {
        if (inAFunctionHead) {
          return [
            indices,
            Math.max(shadowDepth, 1),
            inAFunctionHead,
          ] as SearchTuple;
        }
        // Found a (non-shadowed) bound variable in the body of the function
        if (shadowDepth === 0) {
          return [
            [...indices, index + startIndex],
            shadowDepth,
            inAFunctionHead,
          ] as SearchTuple;
        }
        return [indices, shadowDepth, inAFunctionHead] as SearchTuple;
      }

      if (token === "(") {
        return [
          indices,
          Math.sign(shadowDepth) * (Math.abs(shadowDepth) + 1),
          inAFunctionHead,
        ] as SearchTuple;
      }

      if (token === ")") {
        return [
          indices,
          Math.sign(shadowDepth) * (Math.abs(shadowDepth) - 1),
          inAFunctionHead,
        ] as SearchTuple;
      }

      return [indices, shadowDepth, inAFunctionHead] as SearchTuple;
    },
    [[], 0, false] as SearchTuple
  )[0];

  const boundvarElements = boundvarIndices.map(
    (index) => tokensElements[index]
  );
  return boundvarElements;
}
