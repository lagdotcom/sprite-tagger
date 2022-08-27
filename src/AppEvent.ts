import SpriteTag from "./SpriteTag";

type AppEventTypes = {
  fileAdded: (name: string) => void;
  imageLoaded: (image: ImageBitmap) => void;
  tagLoaded: (tag: SpriteTag) => void;
  open: (name: string) => void;
};
export default AppEventTypes;
