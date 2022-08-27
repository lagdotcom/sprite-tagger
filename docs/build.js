"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/eventemitter3/index.js
  var require_eventemitter3 = __commonJS({
    "node_modules/eventemitter3/index.js"(exports, module) {
      "use strict";
      var has = Object.prototype.hasOwnProperty;
      var prefix = "~";
      function Events() {
      }
      if (Object.create) {
        Events.prototype = /* @__PURE__ */ Object.create(null);
        if (!new Events().__proto__)
          prefix = false;
      }
      function EE(fn, context, once) {
        this.fn = fn;
        this.context = context;
        this.once = once || false;
      }
      function addListener(emitter, event, fn, context, once) {
        if (typeof fn !== "function") {
          throw new TypeError("The listener must be a function");
        }
        var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
        if (!emitter._events[evt])
          emitter._events[evt] = listener, emitter._eventsCount++;
        else if (!emitter._events[evt].fn)
          emitter._events[evt].push(listener);
        else
          emitter._events[evt] = [emitter._events[evt], listener];
        return emitter;
      }
      function clearEvent(emitter, evt) {
        if (--emitter._eventsCount === 0)
          emitter._events = new Events();
        else
          delete emitter._events[evt];
      }
      function EventEmitter2() {
        this._events = new Events();
        this._eventsCount = 0;
      }
      EventEmitter2.prototype.eventNames = function eventNames() {
        var names = [], events, name;
        if (this._eventsCount === 0)
          return names;
        for (name in events = this._events) {
          if (has.call(events, name))
            names.push(prefix ? name.slice(1) : name);
        }
        if (Object.getOwnPropertySymbols) {
          return names.concat(Object.getOwnPropertySymbols(events));
        }
        return names;
      };
      EventEmitter2.prototype.listeners = function listeners(event) {
        var evt = prefix ? prefix + event : event, handlers = this._events[evt];
        if (!handlers)
          return [];
        if (handlers.fn)
          return [handlers.fn];
        for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
          ee[i] = handlers[i].fn;
        }
        return ee;
      };
      EventEmitter2.prototype.listenerCount = function listenerCount(event) {
        var evt = prefix ? prefix + event : event, listeners = this._events[evt];
        if (!listeners)
          return 0;
        if (listeners.fn)
          return 1;
        return listeners.length;
      };
      EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt])
          return false;
        var listeners = this._events[evt], len = arguments.length, args, i;
        if (listeners.fn) {
          if (listeners.once)
            this.removeListener(event, listeners.fn, void 0, true);
          switch (len) {
            case 1:
              return listeners.fn.call(listeners.context), true;
            case 2:
              return listeners.fn.call(listeners.context, a1), true;
            case 3:
              return listeners.fn.call(listeners.context, a1, a2), true;
            case 4:
              return listeners.fn.call(listeners.context, a1, a2, a3), true;
            case 5:
              return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
            case 6:
              return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
          }
          for (i = 1, args = new Array(len - 1); i < len; i++) {
            args[i - 1] = arguments[i];
          }
          listeners.fn.apply(listeners.context, args);
        } else {
          var length = listeners.length, j;
          for (i = 0; i < length; i++) {
            if (listeners[i].once)
              this.removeListener(event, listeners[i].fn, void 0, true);
            switch (len) {
              case 1:
                listeners[i].fn.call(listeners[i].context);
                break;
              case 2:
                listeners[i].fn.call(listeners[i].context, a1);
                break;
              case 3:
                listeners[i].fn.call(listeners[i].context, a1, a2);
                break;
              case 4:
                listeners[i].fn.call(listeners[i].context, a1, a2, a3);
                break;
              default:
                if (!args)
                  for (j = 1, args = new Array(len - 1); j < len; j++) {
                    args[j - 1] = arguments[j];
                  }
                listeners[i].fn.apply(listeners[i].context, args);
            }
          }
        }
        return true;
      };
      EventEmitter2.prototype.on = function on(event, fn, context) {
        return addListener(this, event, fn, context, false);
      };
      EventEmitter2.prototype.once = function once(event, fn, context) {
        return addListener(this, event, fn, context, true);
      };
      EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt])
          return this;
        if (!fn) {
          clearEvent(this, evt);
          return this;
        }
        var listeners = this._events[evt];
        if (listeners.fn) {
          if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
            clearEvent(this, evt);
          }
        } else {
          for (var i = 0, events = [], length = listeners.length; i < length; i++) {
            if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
              events.push(listeners[i]);
            }
          }
          if (events.length)
            this._events[evt] = events.length === 1 ? events[0] : events;
          else
            clearEvent(this, evt);
        }
        return this;
      };
      EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
        var evt;
        if (event) {
          evt = prefix ? prefix + event : event;
          if (this._events[evt])
            clearEvent(this, evt);
        } else {
          this._events = new Events();
          this._eventsCount = 0;
        }
        return this;
      };
      EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
      EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
      EventEmitter2.prefixed = prefix;
      EventEmitter2.EventEmitter = EventEmitter2;
      if ("undefined" !== typeof module) {
        module.exports = EventEmitter2;
      }
    }
  });

  // src/MainUI.ts
  var import_eventemitter3 = __toESM(require_eventemitter3());

  // src/DragListener.ts
  var DragListener = class {
    constructor(element, callback) {
      this.element = element;
      this.callback = callback;
      this.active = false;
      this.x = NaN;
      this.y = NaN;
      element.addEventListener("mousedown", this.down.bind(this));
      element.addEventListener("mouseup", this.up.bind(this));
      element.addEventListener("mousemove", this.move.bind(this));
    }
    down(e) {
      this.active = true;
      this.x = e.x;
      this.y = e.y;
    }
    up() {
      this.active = false;
    }
    move(e) {
      if (this.active) {
        const dx = e.x - this.x;
        const dy = e.y - this.y;
        this.callback(dx, dy);
        this.x = e.x;
        this.y = e.y;
      }
    }
  };

  // src/Soon.ts
  var Soon = class {
    constructor(name, fn) {
      this.name = name;
      this.fn = fn;
    }
    soon() {
      if (!this.handle)
        this.handle = requestAnimationFrame(() => {
          this.handle = void 0;
          this.fn();
        });
    }
    cancel() {
      if (this.handle) {
        cancelAnimationFrame(this.handle);
        this.handle = void 0;
      }
    }
  };

  // src/tools.ts
  function clamp(n, min, max) {
    return Math.max(Math.min(n, max), min);
  }

  // src/ui/tools.ts
  function removeAllChildren(container) {
    while (container.childElementCount > 0)
      container.removeChild(container.children[0]);
  }
  function drawTextWithBG(ctx, text, x, y, stroke, fill, padding = 0) {
    const m = ctx.measureText(text);
    const mh = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent + padding * 2;
    const mw = m.actualBoundingBoxLeft + m.actualBoundingBoxRight + padding * 2;
    ctx.fillStyle = fill;
    ctx.fillRect(x, y, mw, mh);
    ctx.strokeStyle = stroke;
    ctx.strokeText(text, x + padding, y + m.actualBoundingBoxAscent + padding);
  }

  // src/logic.ts
  function getSprites(tag) {
    const { width, height } = tag.layout;
    if (width < 8 || height < 8)
      return [];
    const sprites = [];
    for (let r = 0, y = 0; y < tag.size.height; r++, y += height) {
      for (let c = 0, x = 0; x < tag.size.width; c++, x += width) {
        sprites.push({ id: `${c},${r}`, x, y, width, height });
      }
    }
    return sprites;
  }

  // src/ui/ImageViewer.ts
  var ImageViewer = class {
    constructor(ui) {
      this.ui = ui;
      this.ox = 0;
      this.oy = 0;
      this.z = 1;
      this.redraw = new Soon("ImageViewer", () => this.draw());
      this.canvas = document.createElement("canvas");
      this.canvas.className = "image";
      this.canvas.style.imageRendering = "pixelated";
      this.dragListener = new DragListener(
        this.canvas,
        (dx, dy) => this.onDrag(dx, dy)
      );
      this.canvas.addEventListener(
        "wheel",
        (e) => this.onZoom(e.deltaMode, e.deltaY)
      );
      ui.main.append(this.canvas);
      const ctx = this.canvas.getContext("2d");
      if (!ctx)
        throw new Error("Could not get 2D context");
      this.ctx = ctx;
      ui.on("open", (name) => this.show(name));
      ui.on("tagLoaded", (tag) => this.useTag(tag));
      window.addEventListener("resize", () => this.onResize());
      this.onResize();
    }
    onDrag(dx, dy) {
      this.ox += dx;
      this.oy += dy;
      this.redraw.soon();
    }
    onResize() {
      this.canvas.width = this.canvas.clientWidth;
      this.canvas.height = this.canvas.clientHeight;
      this.redraw.soon();
    }
    onZoom(mode, dy) {
      if (mode === WheelEvent.DOM_DELTA_PIXEL) {
        const dz = dy / -500;
        this.z = clamp(this.z + dz, 0.2, 3);
        this.redraw.soon();
      }
    }
    show(name) {
      void this.ui.db.get("files", name).then((f) => {
        if (f?.type === "sprite")
          void this.load(f.data);
      });
    }
    useTag(tag) {
      this.tag = tag;
      this.redraw.soon();
    }
    async load(blob) {
      this.img = await createImageBitmap(blob);
      this.ui.emit("imageLoaded", this.img);
      this.ox = 0;
      this.oy = 0;
      this.z = 1;
      this.redraw.soon();
    }
    transform(x, y) {
      return [x * this.z + this.ox, y * this.z + this.oy];
    }
    transformSize(w, h) {
      return [w * this.z, h * this.z];
    }
    draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      if (!this.img)
        return;
      const [tlx, tly] = this.transform(0, 0);
      const [iw, ih] = this.transformSize(this.img.width, this.img.height);
      this.ctx.drawImage(this.img, tlx, tly, iw, ih);
      if (this.tag) {
        for (const spr of getSprites(this.tag)) {
          const [x, y] = this.transform(spr.x, spr.y);
          const [w, h] = this.transformSize(spr.width, spr.height);
          this.ctx.strokeStyle = "red";
          this.ctx.strokeRect(x, y, w, h);
          drawTextWithBG(this.ctx, spr.id, x, y, "white", "red", 4);
        }
      }
    }
  };

  // src/ui/RepositoryDisplay.ts
  var RepositoryDisplay = class {
    constructor(ui) {
      this.ui = ui;
      this.container = document.createElement("div");
      this.container.className = "files";
      ui.nav.append(this.container);
      ui.on("fileAdded", this.refresh.bind(this));
      this.refresh();
    }
    refresh() {
      void this.ui.db.getAll("files").then((files) => {
        removeAllChildren(this.container);
        for (const f of files)
          this.container.append(this.getFile(f));
      });
    }
    getFile(f) {
      const button = document.createElement("button");
      button.innerText = f.name;
      button.addEventListener("click", () => this.ui.emit("open", f.name));
      if (f.type !== "sprite")
        button.disabled = true;
      return button;
    }
  };

  // src/ui/Toolbar.ts
  function getTagFromImage(name) {
    return name + ".tag.json";
  }
  var Toolbar = class {
    constructor(ui) {
      this.ui = ui;
      this.refresh = new Soon("Toolbar", () => this.draw());
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
      this.width.addEventListener("change", () => this.onChangeSize());
      this.container.append(this.width);
      this.height = document.createElement("input");
      this.height.type = "number";
      this.height.min = "1";
      this.height.addEventListener("change", () => this.onChangeSize());
      this.container.append(this.height);
      this.imageWidth = NaN;
      this.imageHeight = NaN;
      ui.on("imageLoaded", (img) => this.useImage(img));
      ui.on("open", (name) => this.loadTag(name));
    }
    loadTag(name) {
      const tagName = getTagFromImage(name);
      void this.ui.db.get("files", tagName).then((f) => {
        this.tagName = tagName;
        if (f)
          return f.data.text().then((raw) => JSON.parse(raw));
        else
          return {
            file: name,
            size: { width: 0, height: 0 },
            layout: { type: "grid", width: 1, height: 1 },
            tags: {},
            animations: {}
          };
      }).then((tag) => this.useTag(tag));
    }
    useImage(img) {
      const { width, height } = img;
      this.img = img;
      this.imageWidth = width;
      this.imageHeight = height;
      if (this.tag)
        this.tag.size = { width, height };
      this.refresh.soon();
    }
    useTag(tag) {
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
      if (!this.tag)
        return;
      this.tag.layout.width = this.width.valueAsNumber;
      this.tag.layout.height = this.height.valueAsNumber;
      this.ui.emit("tagLoaded", this.tag);
      this.refresh.soon();
    }
    draw() {
      this.size.innerText = `Size: ${this.imageWidth}x${this.imageHeight}`;
      const cols = this.imageWidth / this.width.valueAsNumber;
      const rows = this.imageHeight / this.height.valueAsNumber;
      this.tiles.innerText = `Tiles: ${cols}x${rows}`;
    }
    saveTag() {
      if (!this.tagName || !this.tag)
        return;
      const f = {
        name: this.tagName,
        type: "sprite-tag",
        data: new File([JSON.stringify(this.tag)], this.tagName, {
          type: "application/json"
        })
      };
      void this.ui.db.put("files", f).then((name) => this.ui.emit("fileAdded", name));
    }
  };

  // src/ui/Uploader.ts
  function getFileType(name, type) {
    switch (type) {
      case "image/png":
        return "sprite";
    }
  }
  var Uploader = class {
    constructor(ui) {
      this.ui = ui;
      this.container = document.createElement("div");
      ui.nav.append(this.container);
      this.input = document.createElement("input");
      this.input.type = "file";
      this.container.append(this.input);
      this.input.addEventListener("change", this.addFiles.bind(this));
    }
    addFiles() {
      const files = [];
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
          for (const name of names)
            this.ui.emit("fileAdded", name);
          this.input.value = "";
        }
      );
    }
  };

  // src/MainUI.ts
  var MainUI = class extends import_eventemitter3.default {
    constructor(db) {
      super();
      this.db = db;
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
  };

  // node_modules/idb/build/wrap-idb-value.js
  var instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);
  var idbProxyableTypes;
  var cursorAdvanceMethods;
  function getIdbProxyableTypes() {
    return idbProxyableTypes || (idbProxyableTypes = [
      IDBDatabase,
      IDBObjectStore,
      IDBIndex,
      IDBCursor,
      IDBTransaction
    ]);
  }
  function getCursorAdvanceMethods() {
    return cursorAdvanceMethods || (cursorAdvanceMethods = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey
    ]);
  }
  var cursorRequestMap = /* @__PURE__ */ new WeakMap();
  var transactionDoneMap = /* @__PURE__ */ new WeakMap();
  var transactionStoreNamesMap = /* @__PURE__ */ new WeakMap();
  var transformCache = /* @__PURE__ */ new WeakMap();
  var reverseTransformCache = /* @__PURE__ */ new WeakMap();
  function promisifyRequest(request) {
    const promise = new Promise((resolve, reject) => {
      const unlisten = () => {
        request.removeEventListener("success", success);
        request.removeEventListener("error", error);
      };
      const success = () => {
        resolve(wrap(request.result));
        unlisten();
      };
      const error = () => {
        reject(request.error);
        unlisten();
      };
      request.addEventListener("success", success);
      request.addEventListener("error", error);
    });
    promise.then((value) => {
      if (value instanceof IDBCursor) {
        cursorRequestMap.set(value, request);
      }
    }).catch(() => {
    });
    reverseTransformCache.set(promise, request);
    return promise;
  }
  function cacheDonePromiseForTransaction(tx) {
    if (transactionDoneMap.has(tx))
      return;
    const done = new Promise((resolve, reject) => {
      const unlisten = () => {
        tx.removeEventListener("complete", complete);
        tx.removeEventListener("error", error);
        tx.removeEventListener("abort", error);
      };
      const complete = () => {
        resolve();
        unlisten();
      };
      const error = () => {
        reject(tx.error || new DOMException("AbortError", "AbortError"));
        unlisten();
      };
      tx.addEventListener("complete", complete);
      tx.addEventListener("error", error);
      tx.addEventListener("abort", error);
    });
    transactionDoneMap.set(tx, done);
  }
  var idbProxyTraps = {
    get(target, prop, receiver) {
      if (target instanceof IDBTransaction) {
        if (prop === "done")
          return transactionDoneMap.get(target);
        if (prop === "objectStoreNames") {
          return target.objectStoreNames || transactionStoreNamesMap.get(target);
        }
        if (prop === "store") {
          return receiver.objectStoreNames[1] ? void 0 : receiver.objectStore(receiver.objectStoreNames[0]);
        }
      }
      return wrap(target[prop]);
    },
    set(target, prop, value) {
      target[prop] = value;
      return true;
    },
    has(target, prop) {
      if (target instanceof IDBTransaction && (prop === "done" || prop === "store")) {
        return true;
      }
      return prop in target;
    }
  };
  function replaceTraps(callback) {
    idbProxyTraps = callback(idbProxyTraps);
  }
  function wrapFunction(func) {
    if (func === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype)) {
      return function(storeNames, ...args) {
        const tx = func.call(unwrap(this), storeNames, ...args);
        transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
        return wrap(tx);
      };
    }
    if (getCursorAdvanceMethods().includes(func)) {
      return function(...args) {
        func.apply(unwrap(this), args);
        return wrap(cursorRequestMap.get(this));
      };
    }
    return function(...args) {
      return wrap(func.apply(unwrap(this), args));
    };
  }
  function transformCachableValue(value) {
    if (typeof value === "function")
      return wrapFunction(value);
    if (value instanceof IDBTransaction)
      cacheDonePromiseForTransaction(value);
    if (instanceOfAny(value, getIdbProxyableTypes()))
      return new Proxy(value, idbProxyTraps);
    return value;
  }
  function wrap(value) {
    if (value instanceof IDBRequest)
      return promisifyRequest(value);
    if (transformCache.has(value))
      return transformCache.get(value);
    const newValue = transformCachableValue(value);
    if (newValue !== value) {
      transformCache.set(value, newValue);
      reverseTransformCache.set(newValue, value);
    }
    return newValue;
  }
  var unwrap = (value) => reverseTransformCache.get(value);

  // node_modules/idb/build/index.js
  function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
    const request = indexedDB.open(name, version);
    const openPromise = wrap(request);
    if (upgrade) {
      request.addEventListener("upgradeneeded", (event) => {
        upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction));
      });
    }
    if (blocked)
      request.addEventListener("blocked", () => blocked());
    openPromise.then((db) => {
      if (terminated)
        db.addEventListener("close", () => terminated());
      if (blocking)
        db.addEventListener("versionchange", () => blocking());
    }).catch(() => {
    });
    return openPromise;
  }
  var readMethods = ["get", "getKey", "getAll", "getAllKeys", "count"];
  var writeMethods = ["put", "add", "delete", "clear"];
  var cachedMethods = /* @__PURE__ */ new Map();
  function getMethod(target, prop) {
    if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === "string")) {
      return;
    }
    if (cachedMethods.get(prop))
      return cachedMethods.get(prop);
    const targetFuncName = prop.replace(/FromIndex$/, "");
    const useIndex = prop !== targetFuncName;
    const isWrite = writeMethods.includes(targetFuncName);
    if (!(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))) {
      return;
    }
    const method = async function(storeName, ...args) {
      const tx = this.transaction(storeName, isWrite ? "readwrite" : "readonly");
      let target2 = tx.store;
      if (useIndex)
        target2 = target2.index(args.shift());
      return (await Promise.all([
        target2[targetFuncName](...args),
        isWrite && tx.done
      ]))[0];
    };
    cachedMethods.set(prop, method);
    return method;
  }
  replaceTraps((oldTraps) => ({
    ...oldTraps,
    get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
    has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
  }));

  // src/db.ts
  async function getDB() {
    return openDB("sprite-tagger", 1, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          db.createObjectStore("files", { keyPath: "name" });
        }
      }
    });
  }

  // src/index.ts
  function main() {
    getDB().then((db) => {
      window.ui = new MainUI(db);
    }).catch((err) => {
      console.error("Could not open database:", err);
    });
  }
  window.addEventListener("load", main);
})();
//# sourceMappingURL=build.js.map
