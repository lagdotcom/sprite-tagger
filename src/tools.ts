export function clamp(n: number, min: number, max: number) {
  return Math.max(Math.min(n, max), min);
}

export function isInteger(n: number) {
  return Math.floor(n) === n;
}
