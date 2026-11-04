import assert from "node:assert/strict";
import { JotaBehavior } from "../js/behavior.js";

const movements = [];

const locomotion = {
  setMovement(speed) {
    movements.push(speed);
  }
};

const behavior = new JotaBehavior(locomotion);

behavior.command("RUN", 5000);

assert.equal(behavior.state, "RUN");
assert.equal(movements.at(-1), 3.5);

behavior.update();
assert.equal(movements.length, 1);

behavior.manualUntil = Date.now() - 1;
behavior.decide = () => "WALK";
behavior.update();

assert.equal(behavior.state, "WALK");
assert.equal(movements.at(-1), 0.5);

console.log("PASS: 5 comprobaciones de comportamiento");

const previousState = behavior.state;

assert.throws(
  () => behavior.command("FLY", 3000),
  /Acción desconocida/
);

assert.equal(behavior.state, previousState);

console.log("PASS: acción inválida rechazada sin alterar estado");
