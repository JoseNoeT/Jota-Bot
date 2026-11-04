export class JotaSitAnimation {
  constructor(avatar) {
    this.avatar = avatar;
    this.frames = Array.from(
      { length: 6 },
      (_, i) =>
        `assets/animations/sit/jota_0${i}.png`
    );
  }

  async play() {
    for (const [index, src] of this.frames.entries()) {
      this.avatar.src = src;

      const delay = index === 3 ? 1500 : 250;

      await new Promise(resolve => {
        setTimeout(resolve, delay);
      });
    }
  }
}
