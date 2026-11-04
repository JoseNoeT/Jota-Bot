export class JotaWakeAnimation {
  constructor(avatar) {
    this.avatar = avatar;
    this.frames = Array.from({ length: 6 }, (_, i) =>
      `assets/animations/wake/wake_0${i + 1}.png`
    );
  }

  async play() {
    for (const src of this.frames) {
      this.avatar.src = src;
      await new Promise(resolve => setTimeout(resolve, 250));
    }
  }
}
