//// TODO: task 10
// ts-node ./2023/10/task.ts

import {
  getData,
  getEndPos,
  getFirstCon,
  getPipe,
  getStart,
} from "./functions";
import { statusType } from "./types";

var inputMap = getData("2023/10/input.txt");
var inputMap1 = getData("2023/10/input.txt");
var inputMap2 = getData("2023/10/input.txt");

// console.log(inputMap);

// Problém najít start
var startPos = getStart(inputMap);
// console.log("StartPos: ", startPos);

// Problém najít konektor ze startu
var firstCon = getFirstCon(inputMap, startPos);
// console.log("First Connector: ", firstCon);

// Problém pohybu (zobecnit)

var pos: statusType = {
  startPos: startPos,
  pipePos: firstCon,
  pipe: "",
  endPos: [0, 0],
  steps: 1,
};

var path = inputMap;

while (pos.pipe !== "S") {
  // zjistit pipe na pipePos
  // Podle startPos a pipe urči endPos
  // posuň se( pipePos = starPost; pipePos = endPos; steps++)
  pos.pipe = getPipe(pos.pipePos, inputMap);
  pos.endPos = getEndPos(pos.startPos, pos.pipePos, pos.pipe, inputMap);
  pos.startPos = pos.pipePos;
  pos.pipePos = pos.endPos;
  pos.steps++;

  // vyznač cestu
  path[pos.startPos[0]][pos.startPos[1]] = "x";
  //   console.log("Actual position: ", pos);
}
// console.log("End pos: ", pos);
// var num = (pos.steps - 1) / 2;
// console.log("Num: ", num);

for (let i = 0; i < path.length; i++) {
  for (let j = 0; j < path[i].length; j++) {
    if (path[i][j] !== "x") {
      path[i][j] = ".";
    }
  }
}

for (let i = 0; i < path.length; i++) {
  for (let j = 0; j < path[i].length; j++) {
    if (path[i][j] === "x") {
      inputMap[i][j] = inputMap2[i][j];
    }
  }
}

console.log("i2: ", inputMap);

var sum2 = 0;
for (let i = 0; i < path.length; i++) {
  for (let j = 0; j < path[i].length; j++) {
    var numLeft = 0;
    var numRight = 0;
    if (path[i][j] === ".") {
      for (let k = 0; k < j + 1; k++) {
        if (
          inputMap[i][k] === "|" ||
          inputMap[i][k] === "J" ||
          inputMap[i][k] === "L" ||
          inputMap[i][k] === "S"
        ) {
          numLeft++;
        }
      }

      for (let l = j + 1; l < path[i].length + 1; l++) {
        if (
          inputMap[i][l] === "|" ||
          inputMap[i][l] === "J" ||
          inputMap[i][l] === "L" ||
          inputMap[i][l] === "S"
        ) {
          numRight++;
        }
      }

      if (numLeft % 2 && numRight % 2) {
        path[i][j] = "I";
      } else {
        path[i][j] = "O";
      }
    }
    if (path[i][j] === "I") {
      sum2++;
    }
  }
}
console.log(path);

console.log("sum2: ", sum2);

// podivat se na tecky
// podivat se od tecky doleva kolik jsme překročili |, J, L , S
// pokud sudé -> vyplň O
// pokud liché -> vyplň I
// spočítej celkový počet I
