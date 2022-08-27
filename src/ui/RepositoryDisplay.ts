import { make, removeAllChildren } from "./tools";

import { FileSchema } from "../db";
import MainUI from "../MainUI";

export default class RepositoryDisplay {
  container: HTMLDivElement;

  constructor(public ui: MainUI) {
    this.container = make("div", { className: "files" });
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
    const button = make("button", { innerText: f.name });
    button.addEventListener("click", () => this.ui.emit("open", f.name));

    if (f.type !== "sprite") button.disabled = true;

    return button;
  }
}
