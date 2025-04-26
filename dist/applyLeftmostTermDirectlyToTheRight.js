import { wait } from "./constants.js";
import { getAllBoundVariableInstances } from "./getAllBoundVariableInstances.js";
export async function applyLeftmostTermDirectlyToTheRight(exp) {
    const termElements = exp.children;
    const [firstTerm, secondTerm] = termElements;
    const fnBoundVar = firstTerm.children[2];
    const secondTermRect = secondTerm.getBoundingClientRect();
    const boundvarsOfFirstTerm = getAllBoundVariableInstances(firstTerm);
    const argWidth = secondTermRect.width;
    // await flashFirstTwoTerms();
    enableApplicationMarkers();
    const animatedSecondTermClone = duplicateSecondTerm();
    // Smoothy lift the second term clone while shrinking the hidden second term
    const fnBoundVarRect = fnBoundVar.getBoundingClientRect();
    await animateArgumentIntoBoundVariable();
    disableApplicationMarkers();
    colorSwirlBoundVars();
    await animateBoundVariableReplacement();
    await removeTheHead();
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
                    `${argWidth}px`;
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
    async function animateArgumentIntoBoundVariable() {
        // shrink the box later (after the replacement)
        // box.style.maxWidth = "0px";
        // secondTermClone.classList.add("term-lift");
        animatedSecondTermClone.style.top = `${fnBoundVarRect.top - 30}px`;
        // Move the argument into the bound variable
        // Get the location of the bound variable
        await wait(700);
        animatedSecondTermClone.style.left = `${fnBoundVarRect.left - argWidth / 2}px`;
        await wait(900);
        animatedSecondTermClone.style.top = `${fnBoundVarRect.top}px`;
        animatedSecondTermClone.style.left = `${fnBoundVarRect.left}px`;
        animatedSecondTermClone.style.transform = "scale(0.1)";
        animatedSecondTermClone.style.maxWidth = `${fnBoundVarRect.width}px`;
        await wait(1000);
        animatedSecondTermClone.style.opacity = "0";
        // fnBoundVar.appendChild(secondTermClone);
        fnBoundVar.classList.add("bound-var-shake");
        await wait(1000);
    }
    function colorSwirlBoundVars() {
        boundvarsOfFirstTerm.forEach((el) => {
            el.classList.add("color-swirl");
        });
    }
    async function animateBoundVariableReplacement() {
        for (const boundvar of boundvarsOfFirstTerm) {
            console.log("yo");
            const secondTermClone = animatedSecondTermClone.cloneNode(true);
            const boundvarRect = boundvar.getBoundingClientRect();
            // Boundvar needs to make room (or shrink, possibly) for the argument.
            const box = document.createElement("span");
            box.classList.add("term-box");
            box.style.width = box.style.maxWidth = `${boundvarRect.width}px`;
            boundvar.replaceWith(box);
            box.appendChild(boundvar);
            await wait(500); // Allow some time for animation stuff
            // Grow the box to the size of the argument
            box.style.width = box.style.maxWidth = `${argWidth}px`;
            await wait(1000);
            // Initialize the argument clone
            exp.appendChild(secondTermClone);
            secondTermClone.style.transform = "scale(0.1)";
            secondTermClone.classList.remove("term-pulse-2");
            secondTermClone.style.transformOrigin = "top left";
            secondTermClone.style.left = `${fnBoundVar.getBoundingClientRect().left}px`;
            await wait(900);
            secondTermClone.style.opacity = "1";
            await wait(100);
            // Move the argument clone out of the bound variable in the head
            secondTermClone.style.transform = "scale(1)";
            secondTermClone.style.maxWidth = `${argWidth}px`;
            secondTermClone.style.top = `${boundvarRect.top + 30}px`;
            secondTermClone.style.opacity = "1";
            box.style.opacity = "0"; // Start making the bound variable fade out
            await wait(1000);
            // Move the argument clone into the target bound variable
            secondTermClone.style.left = `${boundvarRect.left - argWidth / 2 + boundvarRect.width / 2}px`;
            secondTermClone.style.top = `${boundvarRect.top}px`;
            await wait(1500);
            secondTermClone.style.position = "static";
            const termElement = document.createElement("span");
            termElement.classList.add("term");
            termElement.append(...Array.from(secondTermClone.children));
            box.replaceWith(termElement);
        }
    }
    async function removeTheHead() {
        const indexOfDot = Array.from(firstTerm.children).findIndex((el) => el.classList.contains("dot"));
        console.log({ indexOfDot });
        const tokensElementsToRemove = [...firstTerm.children].slice(1, indexOfDot + 1);
        tokensElementsToRemove.forEach((el) => {
            el.classList.add("head-token-fade-out");
        });
    }
}
//# sourceMappingURL=applyLeftmostTermDirectlyToTheRight.js.map