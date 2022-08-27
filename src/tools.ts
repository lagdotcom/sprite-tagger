export function clamp(n: number, min: number, max: number) {
  return Math.max(Math.min(n, max), min);
}
