export type SpriteGridLayout = { type: "grid"; width: number; height: number };

export type BoxType = "hit" | "hurt";

export type BBox = {
  x: number;
  y: number;
  width: number;
  height: number;
  type: BoxType;
};

export type Tag = {
  boxes: BBox[];
};

export type Frame = {
  image: string;
  time: number;
};

export type Animation = {
  frames: Frame[];
  loop?: number;
};

type SpriteTag = {
  file: string;
  layout: SpriteGridLayout;
  tags: Record<string, Tag>;
  animations: Record<string, Animation>;
};
export default SpriteTag;
