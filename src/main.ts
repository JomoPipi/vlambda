import { applyLeftmostTermDirectlyToTheRight } from "./applyLeftmostTermDirectlyToTheRight.js";
import { wait } from "./constants.js";
import { createExpressionElement } from "./createExpressionElement.js";
import { stripOuterParens } from "./stripOuterParens.js";

const initialExp = "(λ a b . a b a) (λ a b . a) (λ a b . b)";

const expList = document.getElementById("expression-list") as HTMLDivElement;

expList.appendChild(createExpressionElement(initialExp));

run();

async function run() {
  const exp = expList.lastElementChild as HTMLElement;
  if (!exp) throw new Error("No expression found");

  const terms = exp.children;
  const nTerms = terms.length;
  const firstTermIsAFunction =
    terms[0].children[1].classList.contains("lambda");
  console.log({ nTerms });
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
  } else {
    //
    if (nTerms !== 1) {
      throw "Unexpected stuff";
    }

    const newExp = await stripOuterParens(exp);
    if (newExp) {
      expList.replaceChildren(createExpressionElement(newExp));
      await run();
    }

    // TODO: Reduce the inner expression
  }
}
