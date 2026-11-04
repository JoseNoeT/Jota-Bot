export class JotaSleepAnimation {
  constructor(avatar) {
    this.avatar = avatar;
    this.frames = Array.from({ length: 4 }, (_, i) =>
      `assets/animations/sleep/sleep_0${i + 1}.png`
    );
    this.timer = null;
    this.index = 0;
  }

  start() {
    this.stop();
    this.index = 0;
    this.avatar.src = this.frames[0];
    this.timer = setInterval(() => {
      this.index = (this.index + 1) % this.frames.length;
      this.avatar.src = this.frames[this.index];
    }, 650);
  }

  stop() {
    if (this.timer !== null) clearInterval(this.timer);
    this.timer = null;
  }
}
