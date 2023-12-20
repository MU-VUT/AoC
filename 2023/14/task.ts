//// TODO: task 14
// ts-node ./2023/14/task.ts

import _ from "lodash";
import { compareArrays, getData, getLoad, rotate, tilt } from "./functions";

var floor = getData("2023/14/input.txt");
// console.log(floor);

// console.log("--------");

// tilt floor
var startFloor = tilt(floor);
const dumpHistory: string[] = [];
var cycles = 0;
function doCycle() {
  var tiltedFloorNorth = tilt(floor);

  var floorWest = rotate(tiltedFloorNorth);
  var tiltedFloorWest = tilt(floorWest);

  var floorSouth = rotate(tiltedFloorWest);
  var tiltedFloorSouth = tilt(floorSouth);

  var floorEast = rotate(tiltedFloorSouth);
  var tiltedFloorEast = tilt(floorEast);

  var floorNorth = rotate(tiltedFloorEast);
  floor = floorNorth;
  cycles++;
  console.log(cycles);
}

const targetCycles = 1_000_000_000;
let loopFirst = -1,
  loopNext = -1;
while (loopFirst < 0) {
  doCycle();
  const dump = floor.join("\n");
  const oldCycle = dumpHistory.indexOf(dump);
  dumpHistory[cycles] = dump;

  if (oldCycle >= 0) {
    loopFirst = oldCycle;
    loopNext = cycles;
  }
}
const loopLength = loopNext - loopFirst;

while (targetCycles % loopLength !== cycles % loopLength) doCycle();

// get load
var load = getLoad(floor);
console.log("Load:", load);
