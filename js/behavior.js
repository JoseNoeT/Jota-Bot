export class JotaBehavior {
  constructor(locomotion) {
    this.locomotion = locomotion;
    this.state = "IDLE";
    this.nextDecision = 0;
    this.manualUntil = 0;
    this.actionLocked = false;
  }

  decide() {
    const random = Math.random();

    if (random < 0.25) {
      return "IDLE";
    }

    if (random < 0.75) {
      return "WALK";
    }

    return "RUN";
  }

  apply(state) {
    const speeds = {
      IDLE: 0,
      WALK: 0.5,
      RUN: 3.5
    };

    if (!Object.hasOwn(speeds, state)) {
      throw new Error(`Estado desconocido: ${state}`);
    }

    this.state = state;
    this.locomotion.setMovement(speeds[state]);
  }

  command(state, durationMs = 3000) {
    if (!["IDLE", "WALK", "RUN"].includes(state)) {
      throw new Error(`Acción desconocida: ${state}`);
    }

    if (!Number.isFinite(durationMs) || durationMs < 0) {
      throw new RangeError("Duración inválida");
    }

    this.apply(state);
    this.manualUntil = Date.now() + durationMs;
  }

  update() {
    if (this.actionLocked) {
      return;
    }

    const now = Date.now();
    if (now < this.manualUntil) return;

    if (this.manualUntil !== 0) {
      this.manualUntil = 0;
      this.nextDecision = 0;
    }

    if (now >= this.nextDecision) {
      this.apply(this.decide());
      this.nextDecision = now + 3000 +
        Math.random() * 3000;
    }
  }
}
