export class JotaDebugPanel {
  constructor(behavior, actions = {}) {
    this.behavior = behavior;
    this.actions = actions;
    this.element = document.createElement("section");

    this.element.setAttribute(
      "aria-label",
      "Controles de prueba de Jota"
    );

    this.element.style.cssText = `
      position: fixed;
      bottom: 12px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 8px;
      padding: 10px;
      background: #172334;
      border: 1px solid #39d5e5;
      border-radius: 12px;
      z-index: 1000;
    `;

    for (const state of ["IDLE", "WALK", "RUN", "SIT", "SLEEP", "WAKE"]) {
      const button = document.createElement("button");
      button.textContent = state;
      button.type = "button";

      button.addEventListener("click", () => {
        if (state === "WAKE") {
          this.actions.WAKE?.();
        } else if (state === "SLEEP") {
          this.actions.SLEEP?.();
        } else if (state === "SIT") {
          this.actions.SIT?.();
        } else if (!this.behavior.actionLocked) {
          this.behavior.command(state, 5000);
        }
      });

      this.element.appendChild(button);
    }
  }

  mount() {
    document.body.appendChild(this.element);
  }
}
