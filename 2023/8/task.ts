//// TODO: task 8
// ts-node ./2023/8/task.ts

import math from "mathjs";

import { getData, getStartFin, getSteps, lcm } from "./functions";

var { nav, elements } = getData("2023/8/input.txt");
// console.log("instructions: ", nav);
// console.log(elements);

var { startId, finId } = getStartFin(elements);
console.log("startId", startId);
console.log("finId", finId);

var steps = getSteps(nav, elements, startId, finId);
console.log("Number of steps: ", steps);

var lcmOfSteps = steps.reduce((n, x) => lcm(x, n), 1);

console.log(lcmOfSteps);
