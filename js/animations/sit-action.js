export class JotaSitAction {
  constructor(robot, behavior, animation) {
    this.robot = robot;
    this.behavior = behavior;
    this.animation = animation;
  }

  async run() {
    if (this.behavior.actionLocked) return false;

    this.behavior.actionLocked = true;
    this.behavior.apply("IDLE");
    this.robot.classList.add("sit-active");

    try {
      await this.animation.play();
      return true;
    } finally {
      this.robot.classList.remove("sit-active");
      this.behavior.apply("IDLE");
      this.behavior.manualUntil = Date.now() + 1500;
      this.behavior.nextDecision = 0;
      this.behavior.actionLocked = false;
    }
  }
}
