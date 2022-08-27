import { drawTextWithBG, make } from "./tools";

import DragListener from "../DragListener";
import MainUI from "../MainUI";
import Soon from "../Soon";
import SpriteTag from "../SpriteTag";
import { clamp } from "../tools";
import { getSprites } from "../logic";

export default class ImageViewer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  img?: ImageBitmap;
  tag?: SpriteTag;
  redraw: Soon;
  dragListener: DragListener;
  ox: number;
  oy: number;
  z: number;

  constructor(public ui: MainUI) {
    this.ox = 0;
    this.oy = 0;
    this.z = 1;
    this.redraw = new Soon("ImageViewer", () => this.draw());

    this.canvas = make("canvas", { className: "image" });
    this.dragListener = new DragListener(this.canvas, (dx, dy) =>
      this.onDrag(dx, dy)
    );
    this.canvas.addEventListener("wheel", (e) =>
      this.onZoom(e.deltaMode, e.deltaY)
    );
    ui.main.append(this.canvas);

    const ctx = this.canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get 2D context");
    this.ctx = ctx;

    ui.on("open", (name) => this.show(name));
    ui.on("tagLoaded", (tag) => this.useTag(tag));

    window.addEventListener("resize", () => this.onResize());
    this.onResize();
  }

  onDrag(dx: number, dy: number) {
    this.ox += dx;
    this.oy += dy;
    this.redraw.soon();
  }

  onResize() {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
    this.redraw.soon();
  }

  onZoom(mode: number, dy: number) {
    if (mode === WheelEvent.DOM_DELTA_PIXEL) {
      const dz = dy / -500;
      this.z = clamp(this.z + dz, 0.2, 3);
      this.redraw.soon();
    }
  }

  show(name: string) {
    void this.ui.db.get("files", name).then((f) => {
      if (f?.type === "sprite") void this.load(f.data);
    });
  }

  useTag(tag: SpriteTag) {
    this.tag = tag;
    this.redraw.soon();
  }

  async load(blob: Blob) {
    this.img = await createImageBitmap(blob);
    this.ui.emit("imageLoaded", this.img);

    this.ox = 0;
    this.oy = 0;
    this.z = 1;
    this.redraw.soon();
  }

  transform(x: number, y: number) {
    return [x * this.z + this.ox, y * this.z + this.oy];
  }

  transformSize(w: number, h: number) {
    return [w * this.z, h * this.z];
  }

  draw() {
    const { ctx, img, tag } = this;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.imageSmoothingEnabled = false;

    if (!img) return;
    const [tlx, tly] = this.transform(0, 0);
    const [iw, ih] = this.transformSize(img.width, img.height);
    ctx.drawImage(img, tlx, tly, iw, ih);

    if (tag) {
      for (const spr of getSprites(tag)) {
        const [x, y] = this.transform(spr.x, spr.y);
        const [w, h] = this.transformSize(spr.width, spr.height);

        ctx.strokeStyle = "red";
        ctx.strokeRect(x, y, w, h);

        drawTextWithBG(ctx, spr.id, x, y, "white", "red", 4);
      }
    }
  }
}
