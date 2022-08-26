import MainUI from "../MainUI";
import { removeAllChildren } from "./tools";

export default class ImageViewer {
  container: HTMLDivElement;

  constructor(public ui: MainUI) {
    this.container = document.createElement("div");
    this.container.className = "image";
    ui.main.append(this.container);

    ui.on("open", (name) => this.show(name));
  }

  show(name: string) {
    void this.ui.db.get("files", name).then((f) => {
      if (f?.type === "sprite") {
        removeAllChildren(this.container);

        const img = document.createElement("img");
        this.container.append(img);

        img.addEventListener("load", () => this.ui.emit("imageLoaded", img));

        const reader = new FileReader();
        reader.addEventListener("load", () => {
          img.src = reader.result as string;
        });
        reader.readAsDataURL(f.data);
      }
    });
  }
}
