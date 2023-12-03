//// TODO: task 3
// ts-node ./2023/3/task.ts

import fs from "fs";
import { addDotsColumns, addDotsRows, getNumber } from "./functions";

const data = fs.readFileSync("2023/3/input.txt", "utf8");
var dataArr = data.split(/([^\r\n]+)/).filter((e) => e.trim().length > 0);
var dataMatrix: string[][] = dataArr.map((e) => {
  var elementArr: string[] = [];
  for (let i = 0; i < e.length; i++) {
    const element = e[i];
    elementArr.push(element);
  }
  return elementArr;
});

addDotsColumns(dataMatrix);
addDotsRows(dataMatrix);

type objType = {
  number: number;
  ObjNeighbor: {
    neighbor: boolean;
    realNumber: number;
    isStar: boolean;
    starX: number;
    starY: number;
  };
};

var Obj: objType = {
  number: 0,
  ObjNeighbor: {
    neighbor: false,
    realNumber: 0,
    isStar: false,
    starX: 0,
    starY: 0,
  },
};

var ObjArr: objType[] = [];
var sum = 0;

for (let i = 0; i < dataMatrix.length; i++) {
  for (let j = 0; j < dataMatrix[i].length; j++) {
    const element = dataMatrix[i][j];
    const nextElement = dataMatrix[i][j + 1];
    // console.log("element: ", element);
    // console.log("next element: ", nextElement);
    Obj = getNumber(element, nextElement, Obj.number, i, j, dataMatrix);
    // console.log(Obj);
    // if (Obj.ObjNeighbor.neighbor && Obj.ObjNeighbor.realNumber > 0) {
    //   sum += Obj.ObjNeighbor.realNumber;
    //   console.log("Sum: ", sum);
    // }

    ObjArr.push(Obj);
  }
}

// dva sousedi s hvězdou se stejnými souřadnicemi?

var filteredObjArr = ObjArr.filter((k) => k.ObjNeighbor.isStar);
// console.log(filteredObjArr);

var result = 0;

for (let k = 0; k < filteredObjArr.length; k++) {
  for (let l = 0; l < filteredObjArr.length; l++) {
    if (
      filteredObjArr[k].ObjNeighbor.starX ===
        filteredObjArr[l].ObjNeighbor.starX &&
      filteredObjArr[k].ObjNeighbor.starY ===
        filteredObjArr[l].ObjNeighbor.starY &&
      filteredObjArr[k].ObjNeighbor.realNumber !==
        filteredObjArr[l].ObjNeighbor.realNumber
    ) {
      var res =
        (filteredObjArr[k].ObjNeighbor.realNumber *
          filteredObjArr[l].ObjNeighbor.realNumber) /
        2;
      result += res;
    }
  }
}
console.log(result);

// for (let l = 0; l < filteredObjArr.length; l++) {
//   var fisrtStarX = filteredObjArr[l].ObjNeighbor.starX;
//   var fisrtStarY = filteredObjArr[l].ObjNeighbor.starY;

// var nextStarX = filteredObjArr[l + 1].ObjNeighbor.starX;
// var nextStarY = filteredObjArr[l + 1].ObjNeighbor.starY;

// if (fisrtStarX === nextStarX && fisrtStarY === nextStarY) {
//   sum +=
//     filteredObjArr[l].ObjNeighbor.realNumber *
//     filteredObjArr[l + 1].ObjNeighbor.realNumber;
//   console.log("Sum:", sum);
// }
// }

// console.log(dataMatrix);
