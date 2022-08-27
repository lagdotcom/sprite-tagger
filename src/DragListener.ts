type DragCallback = (x: number, y: number) => void;

export default class DragListener {
  active: boolean;
  x: number;
  y: number;

  constructor(public element: HTMLElement, public callback: DragCallback) {
    this.active = false;
    this.x = NaN;
    this.y = NaN;

    element.addEventListener("mousedown", this.down.bind(this));
    element.addEventListener("mouseup", this.up.bind(this));
    element.addEventListener("mousemove", this.move.bind(this));
  }

  down(e: MouseEvent) {
    this.active = true;
    this.x = e.x;
    this.y = e.y;
  }

  up() {
    this.active = false;
  }

  move(e: MouseEvent) {
    if (this.active) {
      const dx = e.x - this.x;
      const dy = e.y - this.y;
      this.callback(dx, dy);

      this.x = e.x;
      this.y = e.y;
    }
  }
}
