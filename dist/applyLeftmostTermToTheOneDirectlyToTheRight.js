"use strict";
async function applyLeftmostTermToTheOneDirectlyToTheRight(exp) {
    const terms = exp.children;
    const [firstTerm, secondTerm] = terms;
    //   // Flash the first two terms to show the application `A B`
    //   firstTerm.classList.add("term-pulse");
    //   secondTerm.classList.add("term-pulse");
    //   await wait(1800); // 3 times the pulse duration
    //   firstTerm.classList.remove("term-pulse");
    //   secondTerm.classList.remove("term-pulse");
    // Wiggle the bound variable of function `A`
    const a = firstTerm.children[2];
    a.classList.add("bound-var-wiggle");
    // await wait(2000);
    //   a.classList.remove("bound-var-wiggle");
    // Pulse the second term
    secondTerm.classList.add("term-pulse-2");
    //   await wait(2000);
    //   secondTerm.classList.remove("term-pulse-2");
    // Next: duplicate the second term, make the original term disappear (with transparency), and make the duplicate term "float" into the bound variable of the first term
    const secondTermClone = secondTerm.cloneNode(true);
    const box = document.createElement("div");
    const secondTermRect = secondTerm.getBoundingClientRect();
    box.style.width = box.style.maxWidth = `${secondTermRect.width}px`;
    box.style.height = "1px";
    box.style.display = "inline-block";
    //   box.style.border = "1px solid green";
    box.classList.add("term-box");
    secondTerm.replaceWith(box);
    exp.appendChild(secondTermClone);
    secondTermClone.style.position = "absolute";
    // Instead of compensating for the double margin, we can remove the margin
    // from the clone directly
    secondTermClone.style.top = `${secondTermRect.top}px`;
    secondTermClone.style.left = `${secondTermRect.left}px`;
    secondTermClone.style.margin = "0"; // Remove margins from clone to prevent
    // Smoothy lift the second term clone while shrinking the hidden second term
    await wait(500);
    // shrink the box later (after the replacement)
    //   box.style.maxWidth = "0px";
    secondTermClone.classList.add("term-lift");
}
//# sourceMappingURL=applyLeftmostTermToTheOneDirectlyToTheRight.js.map