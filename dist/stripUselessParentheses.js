import { λ } from "./constants.js";
export function stripUselessParentheses(exp) {
    // strip away unnecessary parentheses
    while (true) {
        exp = exp.trim();
        const i = [...exp].findIndex((v, j) => v === "(" && exp[j + 2] === ")");
        if (i >= 0) {
            exp = (exp.slice(0, i) +
                " " +
                exp[i + 1] +
                " " +
                exp.slice(i + 3)).trim();
            continue;
        }
        if (exp[0] === "(") {
            for (let i = 1, x = 1; exp[i]; i++) {
                x += exp[i] === "(" ? 1 : exp[i] === ")" ? -1 : 0;
                if (!x && exp[i + 1]) {
                    // return t;
                    if (exp.slice(1, i).includes(λ))
                        return exp;
                    return exp.slice(1, i) + " " + exp.slice(i + 1);
                }
            }
            exp = exp.slice(1, -1).trim();
            continue;
        }
        return exp;
    }
}
//# sourceMappingURL=stripUselessParentheses.js.map