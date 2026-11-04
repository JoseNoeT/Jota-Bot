export class JotaLocomotion {
  constructor(robot, drag) {
    this.robot = robot;
    this.drag = drag;
    this.direction = 1;
    this.speed = 0.45;
    this.targetSpeed = 0.45;
    this.nextSpeedChange = Date.now() + 2000;
    this.pausedUntil = Date.now() + 1500;
    this.lastTime = 0;

    this.anchorX = robot.getBoundingClientRect().left - drag.x;

    this.tick = this.tick.bind(this);
    requestAnimationFrame(this.tick);
  }

  setMovement(speed) {
    if (!Number.isFinite(speed) || speed < 0) {
      throw new RangeError("Velocidad inválida");
    }

    this.targetSpeed = speed;

    if (speed === 0) {
      this.speed = 0;
      this.pausedUntil = Infinity;
      this.robot.classList.remove("walking");
    } else {
      this.pausedUntil = 0;
    }
  }

  pause(ms = 2500) {
    this.pausedUntil = Date.now() + ms;
    this.robot.classList.remove("walking");
  }

  tick(time) {
    if (this.robot.classList.contains("sit-active") ||
        this.robot.classList.contains("sleep-active")) {
      this.lastTime = time;
      this.robot.classList.remove("walking");
      requestAnimationFrame(this.tick);
      return;
    }

    const dt = this.lastTime
      ? Math.min(time - this.lastTime, 40)
      : 16;

    this.lastTime = time;

    this.speed += (this.targetSpeed - this.speed) * 0.035;

    if (this.drag.dragging) {
      this.robot.classList.remove("walking");
      this.pausedUntil = Date.now() + 1200;
    } else if (Date.now() >= this.pausedUntil) {
      const width = this.robot.offsetWidth;
      const minX = -this.anchorX;
      const maxX = innerWidth - this.anchorX - width;

      let nextX = this.drag.x + this.direction * this.speed * dt / 16;

      if (nextX >= maxX || nextX <= minX) {
        this.direction *= -1;
        nextX = Math.max(minX, Math.min(maxX, nextX));
        this.pause(1000);
      }

      this.drag.x = nextX;
      this.robot.style.translate = `${this.drag.x}px ${this.drag.y}px`;
      this.robot.style.scale = this.direction < 0 ? "-1 1" : "1 1";
      this.robot.classList.add("walking");
    } else {
      this.robot.classList.remove("walking");
    }

    requestAnimationFrame(this.tick);
  }
}
