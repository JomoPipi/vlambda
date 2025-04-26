import { applyLeftmostTermDirectlyToTheRight } from "./applyLeftmostTermDirectlyToTheRight.js";
import { createExpressionElement } from "./createExpressionElement.js";
const initialExp = "(λ a b . a b a) (λ a b . a) (λ a b . b)";
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
        applyLeftmostTermDirectlyToTheRight(exp);
    }
    else {
        // TODO: Reduce the inner expression
    }
}
//# sourceMappingURL=main.js.map