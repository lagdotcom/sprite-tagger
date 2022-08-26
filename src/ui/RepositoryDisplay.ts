import { FileSchema } from "../db";
import MainUI from "../MainUI";
import { removeAllChildren } from "./tools";

export default class RepositoryDisplay {
  container: HTMLDivElement;

  constructor(public ui: MainUI) {
    this.container = document.createElement("div");
    this.container.className = "files";
    ui.nav.append(this.container);

    ui.on("fileAdded", this.refresh.bind(this));
    this.refresh();
  }

  refresh() {
    void this.ui.db.getAll("files").then((files) => {
      removeAllChildren(this.container);
      for (const f of files) this.container.append(this.getFile(f));
    });
  }

  getFile(f: FileSchema) {
    const button = document.createElement("button");
    button.innerText = f.name;
    button.addEventListener("click", () => this.ui.emit("open", f.name));

    if (f.type !== "sprite") button.disabled = true;

    return button;
  }
}
