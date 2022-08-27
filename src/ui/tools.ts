export function removeAllChildren(container: HTMLElement) {
  while (container.childElementCount > 0)
    container.removeChild(container.children[0]);
}

export function drawTextWithBG(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  stroke: string,
  fill: string,
  padding = 0
) {
  const m = ctx.measureText(text);
  const mh =
    m.actualBoundingBoxAscent + m.actualBoundingBoxDescent + padding * 2;
  const mw = m.actualBoundingBoxLeft + m.actualBoundingBoxRight + padding * 2;

  ctx.fillStyle = fill;
  ctx.fillRect(x, y, mw, mh);

  ctx.strokeStyle = stroke;
  ctx.strokeText(text, x + padding, y + m.actualBoundingBoxAscent + padding);
}
