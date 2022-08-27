export default class Soon {
  handle?: number;

  constructor(public name: string, public fn: () => void) {}

  soon() {
    if (!this.handle)
      this.handle = requestAnimationFrame(() => {
        this.handle = undefined;
        this.fn();
      });
  }

  cancel() {
    if (this.handle) {
      cancelAnimationFrame(this.handle);
      this.handle = undefined;
    }
  }
}
