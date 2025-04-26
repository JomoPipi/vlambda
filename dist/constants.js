export const λ = "λ";
// Don't consider space as a token
export const nonVariableTokens = new Set([
    "λ",
    ".",
    //  " ",
    "(",
    ")",
]);
export async function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
//# sourceMappingURL=constants.js.map