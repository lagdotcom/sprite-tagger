import Rect from "./Rect";
import SpriteTag from "./SpriteTag";

export type Sprite = Rect & { id: string };

export function getSprites(tag: SpriteTag) {
  const { width, height } = tag.layout;

  // don't try...
  if (width < 8 || height < 8) return [];

  const sprites: Sprite[] = [];
  for (let r = 0, y = 0; y < tag.size.height; r++, y += height) {
    for (let c = 0, x = 0; x < tag.size.width; c++, x += width) {
      sprites.push({ id: `${c},${r}`, x, y, width, height });
    }
  }

  return sprites;
}
