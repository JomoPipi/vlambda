export const λ = "λ";
// Don't consider space as a token
export const nonVariableTokens = new Set([
    "λ",
    ".",
    //  " ",
    "(",
    ")",
]);
// Get the animation speed from CSS variable
export const ANIMATION_SPEED = (() => {
    return parseFloat(getComputedStyle(document.documentElement)
        .getPropertyValue("--animation-speed")
        .trim());
})();
// Set animation speed programmatically (can be called to update the speed)
export function setAnimationSpeed(speed) {
    document.documentElement.style.setProperty("--animation-speed", speed.toString());
}
export async function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms * ANIMATION_SPEED));
}
//# sourceMappingURL=constants.js.map