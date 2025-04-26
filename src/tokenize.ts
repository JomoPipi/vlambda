export function tokenize(s: string) {
  let variableBuffer = false;
  return [...s].reduce((a, v) => {
    if (!"λ. ()".includes(v)) {
      if (!variableBuffer) a.push("");
      variableBuffer = true;
    } else {
      variableBuffer = false;
    }
    return v === " "
      ? a
      : variableBuffer
      ? ((a[a.length - 1]! += v), a)
      : [...a, v];
  }, <string[]>[]);
}
