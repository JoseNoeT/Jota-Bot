import { JotaDebugPanel } from "./debug-panel.js";
import { JotaSitAnimation } from "./animations/sit.js";
import { JotaSitAction } from "./animations/sit-action.js";
import { JotaBehavior } from "./behavior.js";
import { JotaAnimation } from "./animation.js";
import { JotaLocomotion } from "./locomotion.js";
import { JotaExpressions } from "./expressions.js";
import { JotaDrag } from "./drag.js";

const robot = document.getElementById("jota");
const message = document.getElementById("message");

const expressions = new JotaExpressions(
  robot,
  message
);

let thinkingTimer = null;

function interactuar() {
  clearTimeout(thinkingTimer);

  expressions.thinking();

  thinkingTimer = setTimeout(() => {
    expressions.happy();
  }, 1200);
}

const drag = new JotaDrag(robot, interactuar);
const locomotion = new JotaLocomotion(robot, drag);
const animation = new JotaAnimation(robot, locomotion);
const behavior = new JotaBehavior(locomotion);
const sitAnimation = new JotaSitAnimation(robot.querySelector(".jota-avatar"));
const sitAction = new JotaSitAction(robot, behavior, sitAnimation);
setInterval(() => behavior.update(), 200);
new JotaDebugPanel(behavior, { SIT: () => sitAction.run() }).mount();

robot.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    interactuar();
  }
});
