import MainUI from "./MainUI";
import getDB from "./db";

function main() {
  getDB()
    .then((db) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      (window as any).ui = new MainUI(db);
    })
    .catch((err) => {
      console.error("Could not open database:", err);
    });
}

window.addEventListener("load", main);
