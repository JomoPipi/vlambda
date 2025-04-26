import { wait } from "./constants.js";
export async function applyLeftmostTermDirectlyToTheRight(exp) {
    const terms = exp.children;
    const [firstTerm, secondTerm] = terms;
    const fnBoundVar = firstTerm.children[2];
    const secondTermRect = secondTerm.getBoundingClientRect();
    await flashFirstTwoTerms();
    enableApplicationMarkers();
    const secondTermClone = duplicateSecondTerm();
    // Smoothy lift the second term clone while shrinking the hidden second term
    const fnBoundVarRect = fnBoundVar.getBoundingClientRect();
    moveArgumentIntoBoundVariable();
    disableApplicationMarkers();
    async function flashFirstTwoTerms() {
        // Flash the first two terms to show the application `A B`
        firstTerm.classList.add("term-pulse");
        secondTerm.classList.add("term-pulse");
        await wait(1600); // 2 times the pulse duration
        firstTerm.classList.remove("term-pulse");
        secondTerm.classList.remove("term-pulse");
        await wait(400);
    }
    function enableApplicationMarkers() {
        // Wiggle the bound variable of function `A`
        fnBoundVar.classList.add("bound-var-wiggle");
        // Pulse the second term
        secondTerm.classList.add("term-pulse-2");
    }
    function disableApplicationMarkers() {
        fnBoundVar.classList.remove("bound-var-wiggle");
        secondTerm.classList.remove("term-pulse-2");
    }
    function duplicateSecondTerm() {
        // Next: duplicate the second term, make the original term disappear (with transparency), and make the duplicate term "float" into the bound variable of the first term
        const secondTermClone = secondTerm.cloneNode(true);
        const box = document.createElement("span");
        box.style.width =
            box.style.maxWidth =
                secondTermClone.style.maxWidth =
                    `${secondTermRect.width}px`;
        secondTermClone.style.maxHeight = `${secondTermRect.height}px`;
        // box.style.border = "1px solid green";
        box.classList.add("term-box");
        secondTerm.replaceWith(box);
        exp.appendChild(secondTermClone);
        secondTermClone.classList.add("term-clone");
        // Instead of compensating for the double margin, we can remove the margin
        // from the clone directly
        secondTermClone.style.top = `${secondTermRect.top}px`;
        secondTermClone.style.left = `${secondTermRect.left}px`;
        secondTermClone.style.margin = "0"; // Remove margins from clone to prevent
        return secondTermClone;
    }
    async function moveArgumentIntoBoundVariable() {
        // shrink the box later (after the replacement)
        // box.style.maxWidth = "0px";
        // secondTermClone.classList.add("term-lift");
        secondTermClone.style.top = `${fnBoundVarRect.top - 30}px`;
        // Move the argument into the bound variable
        // Get the location of the bound variable
        await wait(700);
        secondTermClone.style.left = `${fnBoundVarRect.left - secondTermRect.width / 2}px`;
        await wait(900);
        secondTermClone.style.top = `${fnBoundVarRect.top}px`;
        secondTermClone.style.left = `${fnBoundVarRect.left}px`;
        secondTermClone.style.transform = "scale(0.1)";
        secondTermClone.style.maxWidth = `${fnBoundVarRect.width}px`;
        await wait(1000);
        secondTermClone.style.opacity = "0";
        // fnBoundVar.appendChild(secondTermClone);
        fnBoundVar.classList.add("bound-var-shake");
    }
}
//# sourceMappingURL=applyLeftmostTermDirectlyToTheRight.js.map