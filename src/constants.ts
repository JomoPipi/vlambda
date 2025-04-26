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
  const animationSpeed = getComputedStyle(document.documentElement)
    .getPropertyValue("--animation-speed")
    .trim();
  // Convert to milliseconds (remove 's' and multiply by 1000)
  return parseFloat(animationSpeed);
})();

export async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms * ANIMATION_SPEED));
}
