import { FileSchema } from "../db";
import FileType from "../FileType";
import MainUI from "../MainUI";

function getFileType(name: string, type: string): FileType | undefined {
  switch (type) {
    case "image/png":
      return "sprite";
  }
}

export default class Uploader {
  container: HTMLDivElement;
  input: HTMLInputElement;

  constructor(public ui: MainUI) {
    this.container = document.createElement("div");
    ui.nav.append(this.container);

    this.input = document.createElement("input");
    this.input.type = "file";
    this.container.append(this.input);

    this.input.addEventListener("change", this.addFiles.bind(this));
  }

  addFiles() {
    const files: FileSchema[] = [];

    for (const f of this.input.files || []) {
      const { name, type: mime } = f;

      const type = getFileType(name, mime);
      if (!type) {
        console.error(`Unknown file type:`, f);
        continue;
      }

      files.push({ name, type, data: f });
    }

    void Promise.all(files.map((f) => this.ui.db.add("files", f))).then(
      (names) => {
        for (const name of names) this.ui.emit("fileAdded", name);

        this.input.value = "";
      }
    );
  }
}
