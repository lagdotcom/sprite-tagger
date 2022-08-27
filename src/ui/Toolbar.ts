import { FileSchema } from "../db";
import MainUI from "../MainUI";
import Soon from "../Soon";
import SpriteTag from "../SpriteTag";
import { isInteger } from "../tools";
import { make } from "./tools";

function getTagFromImage(name: string) {
  return name + ".tag.json";
}

export default class Toolbar {
  container: HTMLDivElement;
  save: HTMLButtonElement;
  meta: HTMLDivElement;
  size: HTMLSpanElement;
  tiles: HTMLSpanElement;
  width: HTMLInputElement;
  height: HTMLInputElement;

  refresh: Soon;
  img?: ImageBitmap;
  tag?: SpriteTag;
  tagName?: string;
  imageWidth: number;
  imageHeight: number;

  constructor(public ui: MainUI) {
    this.refresh = new Soon("Toolbar", () => this.draw());

    this.container = make("div", { className: "toolbar" });
    ui.main.append(this.container);

    this.save = make("button", { innerText: "Save" });
    this.save.addEventListener("click", () => this.saveTag());
    this.container.append(this.save);

    this.meta = make("div", { className: "toolbar-meta" });
    this.container.append(this.meta);

    this.meta.append(make("span", { innerText: "Size:" }));
    this.size = make("span", { innerText: "-" });
    this.meta.append(this.size);

    this.meta.append(make("span", { innerText: "Tiles:" }));
    this.tiles = make("span", { innerText: "-" });
    this.meta.append(this.tiles);

    this.meta.append(
      make("label", { innerText: "Tile Width", htmlFor: "tile-width" })
    );
    this.width = make("input", { id: "tile-width", type: "number", min: "1" });
    this.width.addEventListener("change", () => this.onChangeSize());
    this.meta.append(this.width);

    this.meta.append(
      make("label", { innerText: "Tile Height", htmlFor: "tile-height" })
    );
    this.height = make("input", {
      id: "tile-height",
      type: "number",
      min: "1",
    });
    this.height.addEventListener("change", () => this.onChangeSize());
    this.meta.append(this.height);

    this.imageWidth = NaN;
    this.imageHeight = NaN;

    ui.on("imageLoaded", (img) => this.useImage(img));
    ui.on("open", (name) => this.loadTag(name));
  }

  loadTag(name: string) {
    const tagName = getTagFromImage(name);

    void this.ui.db
      .get("files", tagName)
      .then<SpriteTag>((f) => {
        this.tagName = tagName;

        if (f) return f.data.text().then((raw) => JSON.parse(raw) as SpriteTag);
        else
          return {
            file: name,
            size: { width: 0, height: 0 },
            layout: { type: "grid", width: 1, height: 1 },
            tags: {},
            animations: {},
          };
      })
      .then((tag) => this.useTag(tag));
  }

  useImage(img: ImageBitmap) {
    const { width, height } = img;
    this.img = img;

    this.imageWidth = width;
    this.imageHeight = height;

    if (this.tag) this.tag.size = { width, height };

    this.refresh.soon();
  }

  useTag(tag: SpriteTag) {
    this.tag = tag;
    this.width.valueAsNumber = tag.layout.width;
    this.height.valueAsNumber = tag.layout.height;

    if (this.img) {
      const { width, height } = this.img;
      this.tag.size = { width, height };
    }

    this.refresh.soon();
    this.ui.emit("tagLoaded", tag);
  }

  onChangeSize() {
    if (!this.tag) return;

    this.tag.layout.width = this.width.valueAsNumber;
    this.tag.layout.height = this.height.valueAsNumber;
    this.ui.emit("tagLoaded", this.tag);
    this.refresh.soon();
  }

  draw() {
    this.size.innerText = `${this.imageWidth}x${this.imageHeight}`;

    const cols = this.imageWidth / this.width.valueAsNumber;
    const rows = this.imageHeight / this.height.valueAsNumber;
    this.tiles.innerText = `${cols}x${rows}`;

    this.tiles.style.color = isInteger(cols) && isInteger(rows) ? "" : "red";
  }

  saveTag() {
    if (!this.tagName || !this.tag) return;

    const f: FileSchema = {
      name: this.tagName,
      type: "sprite-tag",
      data: new File([JSON.stringify(this.tag)], this.tagName, {
        type: "application/json",
      }),
    };

    void this.ui.db
      .put("files", f)
      .then((name) => this.ui.emit("fileAdded", name));
  }
}
