export class JotaSleepAction {
  constructor(robot, behavior, sleepAnimation, wakeAnimation) {
    this.robot = robot;
    this.behavior = behavior;
    this.sleepAnimation = sleepAnimation;
    this.wakeAnimation = wakeAnimation;
    this.sleeping = false;
    this.waking = false;
  }

  sleep() {
    if (this.behavior.actionLocked || this.sleeping) return false;
    this.behavior.actionLocked = true;
    this.behavior.apply("IDLE");
    this.robot.classList.add("sleep-active");
    this.sleeping = true;
    this.sleepAnimation.start();
    return true;
  }

  async wake() {
    if (!this.sleeping || this.waking) return false;
    this.waking = true;
    this.sleepAnimation.stop();
    try {
      await this.wakeAnimation.play();
      return true;
    } finally {
      this.robot.classList.remove("sleep-active");
      this.sleeping = false;
      this.waking = false;
      this.behavior.apply("IDLE");
      this.behavior.manualUntil = Date.now() + 1500;
      this.behavior.nextDecision = 0;
      this.behavior.actionLocked = false;
    }
  }
}
