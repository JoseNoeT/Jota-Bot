export class JotaExpressions {
  constructor(robot, message) {
    this.robot = robot;
    this.message = message;
    this.timer = null;
  }

  set(state, text) {
    clearTimeout(this.timer);

    this.robot.classList.remove(
      "happy",
      "thinking"
    );

    if (state !== "normal") {
      this.robot.classList.add(state);
    }

    this.message.textContent = text;
  }

  happy() {
    this.set("happy", "¡Me alegra verte!");

    this.timer = setTimeout(() => {
      this.normal();
    }, 2000);
  }

  thinking() {
    this.set("thinking", "Estoy pensando...");
  }

  normal() {
    this.set(
      "normal",
      "Tócame para interactuar"
    );
  }
}
