import { wait } from "./constants.js";
export async function stripOuterParens(exp) {
    const term = exp.children[0];
    const lParen = term.children[0];
    const rParen = term.lastElementChild;
    console.log(term.children[0].textContent);
    if (lParen.classList.contains("l-paren") &&
        rParen.classList.contains("r-paren")) {
        console.log("yoyoyo");
        lParen.classList.add("head-token-fade-out");
        rParen.classList.add("head-token-fade-out");
        await wait(1000);
        lParen.remove();
        rParen.remove();
        const newExp = [...term.children]
            .map((child) => child.textContent)
            .join(" ");
        return newExp;
    }
    else {
        return false;
    }
}
//# sourceMappingURL=stripOuterParens.js.map