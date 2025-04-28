import { applyLeftmostTermDirectlyToTheRight } from "./applyLeftmostTermDirectlyToTheRight.js";
import { wait } from "./constants.js";
import { createExpressionElement } from "./createExpressionElement.js";
import { getTerms } from "./getTerms.js";
import { stripOuterParens as animateStripOuterParens } from "./stripOuterParens.js";
// TODO: fix the jumpiness
// TODO: simplify inner expressions
// TODO: allow for toggles to show more details
const initialExp = "(λ a b . a b a) (λ a b . a) (λ a b . b)";
// const initialExp = " (λ b . (λ a b . b))  (λ a b . a)";
// const initialExp = "(λ x . x x)      (λ x . x x)";
// const initialExp = "(λ n f x . f (n f x)) (λ f x . f (f x))";
const expList = document.getElementById("expression-list");
expList.appendChild(createExpressionElement(initialExp));
run();
async function run() {
    const exp = expList.lastElementChild;
    if (!exp)
        throw new Error("No expression found");
    const terms = exp.children;
    const nTerms = terms.length;
    const firstTermIsAFunction = terms[0].children[1].classList.contains("lambda");
    if (nTerms >= 2 && firstTermIsAFunction) {
        await applyLeftmostTermDirectlyToTheRight(exp);
        await wait(500);
        // No need to parse the expression again, it's been rebuilt in HTML.
        // const nextExp = [...exp.children]
        //   .map((termElements) =>
        //     [...termElements.children]
        //       .map((tokenElements) => tokenElements.textContent)
        //       .join(" ")
        //   )
        //   .join(" ");
        //   expList.appendChild(createExpressionElement(initialExp));
        await run();
    }
    else {
        //
        if (nTerms !== 1) {
            throw "Unexpected stuff";
        }
        let newExp;
        while (true) {
            const nextNewExp = await animateStripOuterParens(exp);
            await wait(1000);
            if (nextNewExp === false) {
                break;
            }
            newExp = nextNewExp;
            const terms = getTerms(nextNewExp);
            if (terms.length !== 1) {
                // It doesn't make sense to keep removing parentheses when there's more than one term.
                break;
            }
        }
        if (newExp) {
            expList.replaceChildren(createExpressionElement(newExp));
            await run();
            return;
        }
        // TODO: Reduce inner expressions
    }
}
//# sourceMappingURL=main.js.map