//// TODO: task 16
// ts-node ./2023/16/task.ts

import { blankFloor, checkMirror, getData, getNewLoc } from "./fucntions";
import { beam } from "./types";

const floor = getData("2023/16/input.txt");

const floorHeight = floor.length;
const floorWidth = floor[0].length;

var counts: number[] = [];

for (let i = 0; i < 4; i++) {
  var startDir = "E";

  switch (i) {
    case 0:
      startDir = "E";
      var startPosY = 0;
      var count = 0;
      for (let j = 0; j < floorHeight; j++) {
        var startPosX = j;
        count = main();
        console.log("Count:", count);
        counts.push(count);
      }
      break;
    case 1:
      startDir = "S";
      var startPosX = 0;
      var count = 0;
      for (let j = 0; j < floorWidth; j++) {
        var startPosY = j;
        count = main();
        console.log("Count:", count);
        counts.push(count);
      }
      break;
    case 2:
      startDir = "W";
      var startPosY = 0;
      var count = 0;
      for (let j = 0; j < floorHeight; j++) {
        var startPosX = j;
        count = main();
        console.log("Count:", count);
        counts.push(count);
      }
      break;
    case 3:
      startDir = "N";
      var startPosX = 0;
      var count = 0;
      for (let j = 0; j < floorWidth; j++) {
        var startPosY = j;
        count = main();
        console.log("Count:", count);
        counts.push(count);
      }
      break;

    default:
      break;
  }
}

console.log("Counts:", counts);
console.log("Max: ", Math.max(...counts));

function main(): number {
  var energizedFloor = blankFloor(floor);
  var dirFloor = blankFloor(floor);

  var beam: beam = {
    posX: startPosX,
    posY: startPosY,
    dir: startDir,
    oob: false,
  };

  var beams: beam[] = [beam];

  while (beams.length > 0) {
    var curBeam = beams[0];
    while (!curBeam.oob) {
      // energize floor
      energizedFloor[curBeam.posX][curBeam.posY] = "#";
      // save direction
      dirFloor[curBeam.posX][curBeam.posY] = curBeam.dir;

      // mirrors
      curBeam = checkMirror(curBeam, floor);

      // splitters
      if (
        floor[curBeam.posX][curBeam.posY] === "|" &&
        (curBeam.dir === "E" || curBeam.dir === "W")
      ) {
        curBeam.dir = "S";
        var newBeam: beam = {
          posX: curBeam.posX,
          posY: curBeam.posY,
          dir: "N",
          oob: false,
        };
        beams.push(newBeam);
      }

      if (
        floor[curBeam.posX][curBeam.posY] === "-" &&
        (curBeam.dir === "S" || curBeam.dir === "N")
      ) {
        curBeam.dir = "E";
        var newBeam: beam = {
          posX: curBeam.posX,
          posY: curBeam.posY,
          dir: "W",
          oob: false,
        };
        beams.push(newBeam);
      }

      // move
      curBeam = getNewLoc(curBeam);
      //oob
      if (
        curBeam.posX < 0 ||
        curBeam.posY < 0 ||
        curBeam.posX >= floorHeight ||
        curBeam.posY >= floorWidth
      ) {
        curBeam.oob = true;
        beams.shift();
        break;
      }
      // console.log(curBeam);

      //beam už tam byl a šel stejným směrem, tak ho smaž
      if (
        energizedFloor[curBeam.posX][curBeam.posY] === "#" &&
        dirFloor[curBeam.posX][curBeam.posY] === curBeam.dir
      ) {
        curBeam.oob = true;
        beams.shift();
        break;
      }
    }
  }
  // console.log(energizedFloor);

  // count energized floor
  var count = 0;
  energizedFloor.forEach((e) => {
    e.forEach((el) => {
      if (el === "#") {
        count++;
      }
    });
  });
  return count;
}
