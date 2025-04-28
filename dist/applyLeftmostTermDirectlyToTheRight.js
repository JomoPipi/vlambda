import { wait } from "./constants.js";
import { getAllBoundVariableInstances } from "./getAllBoundVariableInstances.js";
export async function applyLeftmostTermDirectlyToTheRight(exp) {
    const termElements = exp.children;
    const [firstTerm, secondTerm] = termElements;
    const fnBoundVar = firstTerm.children[2];
    const secondTermRect = secondTerm.getBoundingClientRect();
    const boundvarsOfFirstTerm = getAllBoundVariableInstances(firstTerm);
    const argWidth = secondTermRect.width;
    const secondTermScaffold = document.createElement("span");
    // await flashFirstTwoTerms();
    enableApplicationMarkers();
    const animatedSecondTermClone = duplicateSecondTerm();
    // Smoothy lift the second term clone while shrinking the hidden second term
    const fnBoundVarRect = fnBoundVar.getBoundingClientRect();
    await wait(3000);
    await animateArgumentIntoBoundVariable();
    await wait(3000);
    disableApplicationMarkers();
    colorSwirlBoundVars();
    await animateBoundVariableReplacements();
    console.log("after animateBoundVariableReplacements");
    await wait(3000);
    await reduceTheHead();
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
        secondTermScaffold.style.width =
            secondTermScaffold.style.maxWidth =
                secondTermClone.style.maxWidth =
                    `${argWidth}px`;
        // box.style.border = "1px solid green";
        secondTermScaffold.classList.add("term-box");
        secondTerm.replaceWith(secondTermScaffold);
        exp.appendChild(secondTermClone);
        secondTermClone.classList.add("term-clone");
        // Instead of compensating for the double margin, we can remove the margin
        // from the clone directly
        secondTermClone.style.top = `${secondTermRect.top}px`;
        secondTermClone.style.left = `${secondTermRect.left}px`;
        // Remove margins from clone to prevent double margin
        secondTermClone.style.margin = "0em 0em 0em 0em";
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
        collapseSpaceFromSecondTerm();
        animatedSecondTermClone.style.opacity = "0";
        // fnBoundVar.appendChild(secondTermClone);
        fnBoundVar.classList.add("bound-var-shake");
        await wait(1000);
        secondTermScaffold.remove();
    }
    function collapseSpaceFromSecondTerm() {
        secondTermScaffold.style.width = secondTermScaffold.style.maxWidth = "0px";
        secondTermScaffold.style.margin = "0em 0em 0em 0em";
    }
    function colorSwirlBoundVars() {
        boundvarsOfFirstTerm.forEach((el) => {
            el.classList.add("color-swirl");
        });
    }
    async function animateBoundVariableReplacements() {
        for (const boundvar of boundvarsOfFirstTerm) {
            const secondTermClone = animatedSecondTermClone.cloneNode(true);
            const boundvarRect = boundvar.getBoundingClientRect();
            // Boundvar needs to make room (or shrink, possibly) for the argument.
            const box = document.createElement("span");
            box.classList.add("term-box");
            box.style.width = box.style.maxWidth = `${boundvarRect.width}px`;
            console.log("before replaceWith");
            boundvar.replaceWith(box);
            box.appendChild(boundvar);
            console.log("before 3000 wait");
            await wait(300000); // Allow some time for animation stuff
            // Grow the box to the size of the argument
            console.log("after 3000 wait");
            box.style.width = box.style.maxWidth = `${argWidth}px`;
            await wait(500);
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
            await wait(500);
            // Move the argument clone into the target bound variable
            secondTermClone.style.left = `${boundvarRect.left - argWidth / 2 + boundvarRect.width / 2}px`;
            secondTermClone.style.top = `${boundvarRect.top}px`;
            await wait(500);
            // secondTermClone.style.position = "static";
            // const termElement = document.createElement("span");
            // termElement.classList.add("term");
            // termElement.append(...Array.from(secondTermClone.children));
            secondTermClone.remove();
            // box.replaceWith(...Array.from(secondTermClone.children));
            // firstTerm.replaceChildren(box, ...Array.from(secondTermClone.children));
            const tkns = Array.from(firstTerm.children);
            const indexOfBox = tkns.findIndex((el) => el === box);
            // firstTerm.children[indexOfBox].replaceWith(box);
            firstTerm.replaceChildren(...[
                ...tkns.slice(0, indexOfBox),
                ...secondTermClone.children,
                ...tkns.slice(indexOfBox + 1),
            ].map((el) => {
                el.style.margin = "";
                return el;
            }));
        }
    }
    async function reduceTheHead() {
        console.log("inside reduce the head");
        const indexOfDot = Array.from(firstTerm.children).findIndex((el) => el.classList.contains("dot"));
        const headTokenElements = [...firstTerm.children].slice(1, indexOfDot + 1);
        const nVars = headTokenElements.filter((el) => el.classList.contains("var")).length;
        const tokenElementsToRemove = (nVars === 1
            ? headTokenElements.slice(0, indexOfDot + 1)
            : [headTokenElements[1]]);
        tokenElementsToRemove.forEach((el) => {
            el.classList.add("head-token-fade-out");
        });
        // Just enough time for the brower to catch up
        await wait(100);
        tokenElementsToRemove.forEach((el) => {
            el.classList.add("faded-out");
        });
        await wait(2000);
        console.log("after 2000 wait");
        const boxes = tokenElementsToRemove.map((tokenElement) => {
            const box = document.createElement("span");
            box.classList.add("term-box");
            box.classList.add("green");
            box.style.width = box.style.maxWidth = `${tokenElement.getBoundingClientRect().width}px`;
            box.style.margin = "0em 0em 0em 0.25em";
            tokenElement.replaceWith(box);
            return box;
        });
        await wait(1000);
        console.log("after 1000 wait");
        // Shrink the boxes
        boxes.forEach((box) => {
            box.style.width = box.style.maxWidth = "0px";
            box.style.margin = "0em 0em 0em 0em";
        });
        await wait(2000);
        console.log("after 2000 wait");
        boxes.forEach((box) => {
            box.remove();
        });
        animatedSecondTermClone.remove();
    }
}
//# sourceMappingURL=applyLeftmostTermDirectlyToTheRight.js.map