export class JotaDrag {
  constructor(element, onTap) {
    this.element = element;
    this.onTap = onTap;
    this.dragging = false;
    this.moved = false;
    this.startX = 0;
    this.startY = 0;
    this.x = 0;
    this.y = 0;

    element.style.touchAction = "none";

    element.addEventListener(
      "pointerdown",
      (event) => this.start(event)
    );

    element.addEventListener(
      "pointermove",
      (event) => this.move(event)
    );

    element.addEventListener(
      "pointerup",
      (event) => this.end(event)
    );

    element.addEventListener(
      "pointercancel",
      () => this.cancel()
    );
  }

  start(event) {
    this.dragging = true;
    this.moved = false;
    this.startX = event.clientX - this.x;
    this.startY = event.clientY - this.y;
    this.element.setPointerCapture(event.pointerId);
  }

  move(event) {
    if (!this.dragging) return;

    const nextX = event.clientX - this.startX;
    const nextY = event.clientY - this.startY;

    if (
      Math.abs(nextX - this.x) > 5 ||
      Math.abs(nextY - this.y) > 5
    ) {
      this.moved = true;
    }

    if (this.moved) {
      this.x = nextX;
      this.y = nextY;
      this.element.style.translate =
        `${this.x}px ${this.y}px`;
    }
  }

  end() {
    if (!this.dragging) return;

    this.dragging = false;

    if (!this.moved) {
      this.onTap();
    }
  }

  cancel() {
    this.dragging = false;
  }
}
