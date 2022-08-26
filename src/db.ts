import { DBSchema, IDBPDatabase, openDB } from "idb";

import FileType from "./FileType";

export type FileSchema = {
  name: string;
  type: FileType;
  data: File;
};

interface Schema extends DBSchema {
  files: {
    key: string;
    value: FileSchema;
  };
}

export type AppDB = IDBPDatabase<Schema>;

export default async function getDB() {
  return openDB<Schema>("sprite-tagger", 1, {
    upgrade(db, oldVersion) {
      if (oldVersion < 1) {
        db.createObjectStore("files", { keyPath: "name" });
      }
    },
  });
}
