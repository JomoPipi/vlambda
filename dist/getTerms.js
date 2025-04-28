import { λ } from "./constants.js";
import { stripUselessParentheses } from "./stripUselessParentheses.js";
export function getTerms(s) {
    if (!s) {
        throw "why is s falsy";
    }
    return [...s]
        .reduce(([r, x, y, z], v) => {
        const a = v === "(", b = v === ")", c = x === 1, d = v === λ;
        if (d && x === 0 && !y) {
            r.push("");
            y = 1;
        }
        if (y) {
            r[r.length - 1] += v;
            return [r, x, y, z];
        }
        if (x > 0) {
            if (!(b && c))
                r[r.length - 1] += v;
            return [r, x + ({ ")": -1, "(": 1 }[v] || 0)];
        }
        if (!/([(). λ]|\s)/.test(v)) {
            if (!z)
                r.push("");
            z = 1;
        }
        else
            z = 0;
        if (z) {
            r[r.length - 1] += v;
            return [r, x, y, z];
        }
        if (a)
            return [[...r, ""], x + 1];
        return [/\s/.test(v) ? r : [...r, v], x, y, z];
    }, [[], 0, 0, 0])[0]
        .map(stripUselessParentheses);
}
//# sourceMappingURL=getTerms.js.map