import { FileSchema } from "../db";
import MainUI from "../MainUI";
import SpriteTag from "../SpriteTag";

function getTagFromImage(name: string) {
  return name + ".tag.json";
}

export default class Toolbar {
  container: HTMLDivElement;
  size: HTMLDivElement;
  tiles: HTMLDivElement;
  width: HTMLInputElement;
  height: HTMLInputElement;
  save: HTMLButtonElement;

  tag?: SpriteTag;
  tagName?: string;
  imageWidth: number;
  imageHeight: number;

  constructor(public ui: MainUI) {
    this.container = document.createElement("div");
    this.container.className = "toolbar";
    ui.main.append(this.container);

    this.save = document.createElement("button");
    this.save.innerText = "Save";
    this.save.addEventListener("click", () => this.saveTag());
    this.container.append(this.save);

    this.size = document.createElement("div");
    this.size.innerText = "Size: -";
    this.container.append(this.size);

    this.tiles = document.createElement("div");
    this.tiles.innerText = "Tiles: -";
    this.container.append(this.tiles);

    this.width = document.createElement("input");
    this.width.type = "number";
    this.width.min = "1";
    this.width.addEventListener("change", () => this.redoSize());
    this.container.append(this.width);

    this.height = document.createElement("input");
    this.height.type = "number";
    this.height.min = "1";
    this.height.addEventListener("change", () => this.redoSize());
    this.container.append(this.height);

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
            layout: { type: "grid", width: 1, height: 1 },
            tags: {},
            animations: {},
          };
      })
      .then((tag) => this.useTag(tag));
  }

  useImage(img: HTMLImageElement) {
    this.imageWidth = img.naturalWidth;
    this.imageHeight = img.naturalHeight;
    this.redoSize();
  }

  useTag(tag: SpriteTag) {
    this.tag = tag;
    this.width.valueAsNumber = tag.layout.width;
    this.height.valueAsNumber = tag.layout.height;

    this.redoSize();
  }

  redoSize() {
    this.size.innerText = `Size: ${this.imageWidth}x${this.imageHeight}`;

    const cols = this.imageWidth / this.width.valueAsNumber;
    const rows = this.imageHeight / this.height.valueAsNumber;
    this.tiles.innerText = `Tiles: ${cols}x${rows}`;
  }

  saveTag() {
    if (!this.tagName || !this.tag) return;

    const tag = this.tag;
    tag.layout.width = this.width.valueAsNumber;
    tag.layout.height = this.height.valueAsNumber;

    const f: FileSchema = {
      name: this.tagName,
      type: "sprite-tag",
      data: new File([JSON.stringify(tag)], this.tagName, {
        type: "application/json",
      }),
    };

    void this.ui.db
      .put("files", f)
      .then((name) => this.ui.emit("fileAdded", name));
  }
}
