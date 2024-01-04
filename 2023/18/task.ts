//// TODO: task 18
// ts-node ./2023/18/task.ts

import { getData } from "./functions";
import { plan } from "./types";

var digPlan = getData("2023/18/input.txt");
console.log(digPlan);

// Picks theorem & Shoelace theory
// výpočet plochy uzavřené křivky

const startPosX = 0;
const startPosY = 0;
var posX = startPosX;
var posY = startPosY;

var area = 0;
var perimeter = 0;

var secondDigPlan: plan[] = [];

digPlan.forEach((e) => {
  var dir: string = "";
  switch (Number(e.color[e.color.length - 1])) {
    case 0:
      dir = "R";
      break;
    case 1:
      dir = "D";
      break;
    case 2:
      dir = "L";
      break;
    case 3:
      dir = "U";
      break;
    default:
      break;
  }
  var str: string = e.color.substring(0, e.color.length - 1);
  var num: number = parseInt(str, 16);

  var secondDigObject: plan = {
    dir: dir,
    num: num,
    color: e.color,
  };
  secondDigPlan.push(secondDigObject);
});
console.log(secondDigPlan);

secondDigPlan.forEach((e) => {
  const x1 = posX;
  const y1 = posY;
  switch (e.dir) {
    case "R":
      posY += e.num;
      break;
    case "L":
      posY -= e.num;
      break;
    case "D":
      posX += e.num;
      break;
    case "U":
      posX -= e.num;
      break;
    default:
      break;
  }

  area += x1 * posY - posX * y1;
  perimeter += e.num;
});

console.log("Perimeter:", perimeter);
console.log("Area with perimeter:", Math.abs(area / 2) + perimeter / 2 + 1);

// Algoritmus smysl života
console.log("Otázka života, smrti a vůbec je 42");
