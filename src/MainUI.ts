import "./style.css";

import { AppDB } from "./db";
import AppEvent from "./AppEvent";
import EventEmitter from "eventemitter3";
import ImageViewer from "./ui/ImageViewer";
import RepositoryDisplay from "./ui/RepositoryDisplay";
import Toolbar from "./ui/Toolbar";
import Uploader from "./ui/Uploader";

export default class MainUI extends EventEmitter<AppEvent> {
  body: HTMLElement;
  main: HTMLElement;
  nav: HTMLElement;

  uploader: Uploader;
  repository: RepositoryDisplay;
  toolbar: Toolbar;
  image: ImageViewer;

  constructor(public db: AppDB) {
    super();

    this.body = document.body;

    this.nav = document.createElement("nav");
    this.body.append(this.nav);

    this.main = document.createElement("main");
    this.body.append(this.main);

    this.uploader = new Uploader(this);
    this.repository = new RepositoryDisplay(this);
    this.toolbar = new Toolbar(this);
    this.image = new ImageViewer(this);
  }
}
