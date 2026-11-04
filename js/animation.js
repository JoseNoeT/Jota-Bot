export class JotaAnimation {
  constructor(robot, locomotion) {
    this.locomotion = locomotion;
    this.robot = robot;
    this.avatar = robot.querySelector(".jota-avatar");

    this.frames = [
      "assets/animations/walk/jota_01.png",
      "assets/animations/walk/jota_02.png",
      "assets/animations/walk/jota_03.png",
      "assets/animations/walk/jota_02.png"
    ];

    this.idle = "assets/animations/walk/jota_00.png";
    this.frame = 0;
    this.lastChange = 0;

    this.frames.concat(this.idle).forEach(src => {
      const img = new Image();
      img.src = src;
    });

    this.tick = this.tick.bind(this);
    requestAnimationFrame(this.tick);
  }

  tick(time) {
    if (this.robot.classList.contains("sit-active")) {
      requestAnimationFrame(this.tick);
      return;
    }

    if (this.avatar) {
      if (this.robot.classList.contains("walking")) {
        const speed = this.locomotion.speed;
        const interval = Math.max(75, Math.min(240, 190 / speed));
        if (time - this.lastChange >= interval) {
          this.avatar.src = this.frames[this.frame];
          this.frame = (this.frame + 1) % this.frames.length;
          this.lastChange = time;
        }
      } else {
        if (!this.robot.classList.contains("dragging")) {
          this.avatar.src = this.idle;
        }
        this.frame = 0;
        this.lastChange = time;
      }
    }

    requestAnimationFrame(this.tick);
  }
}
