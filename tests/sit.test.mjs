import assert from "node:assert/strict";
import { JotaBehavior } from "../js/behavior.js";
import { JotaSitAction } from "../js/animations/sit-action.js";

const classes = new Set();
const robot = {
  classList: {
    add(name) { classes.add(name); },
    remove(name) { classes.delete(name); },
    contains(name) { return classes.has(name); }
  }
};
const speeds = [];
const behavior = new JotaBehavior({
  setMovement(speed) { speeds.push(speed); }
});
let finish;
const animation = {
  play() {
    return new Promise(resolve => { finish = resolve; });
  }
};
const sit = new JotaSitAction(robot, behavior, animation);
const first = sit.run();

assert.equal(behavior.actionLocked, true);
assert.equal(robot.classList.contains("sit-active"), true);
assert.equal(speeds.at(-1), 0);
assert.equal(await sit.run(), false);

const count = speeds.length;
behavior.update();
assert.equal(speeds.length, count);

finish();
assert.equal(await first, true);
assert.equal(robot.classList.contains("sit-active"), false);
assert.equal(behavior.actionLocked, false);
assert.equal(behavior.state, "IDLE");
assert.ok(behavior.manualUntil > Date.now());

console.log("PASS: SIT bloquea movimiento, evita duplicados y recupera IDLE");
