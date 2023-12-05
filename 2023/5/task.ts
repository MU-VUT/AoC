//// TODO: task 5
// ts-node ./2023/5/task.ts

import fs from "fs";
import { getTrData, getTransformed } from "./functions";

var ObjInput = {
  url: "example",
  firstSplit: /\r\n\r\n/,
  secondSplit: /\r\n/,
};

const Input = {
  url: "input",
  firstSplit: /\n\n/,
  secondSplit: /\n/,
};

// SWITCH INPUT
//------------
const switchInput = "input";
//------------

if (switchInput.includes("example")) {
  ObjInput;
} else if (switchInput.includes("input")) {
  ObjInput = Input;
}

const data = fs.readFileSync("2023/5/" + ObjInput.url + ".txt", "utf8");
var dataArr = data
  .split(ObjInput.firstSplit)
  .filter((e) => e.trim().length > 0);

var seedsString = dataArr[0].split(/\ /);
seedsString.shift();
var seedsInputArr = seedsString.map((e) => Number(e));

var seedsStart: number[] = [];
var seedsLen: number[] = [];

var seeds: number[] = [];

for (let x = 0; x < seedsInputArr.length; x++) {
  if (x % 2 == 0) {
    seedsStart.push(seedsInputArr[x]);
  } else {
    seedsLen.push(seedsInputArr[x]);
  }
}
console.log("seedsStart", seedsStart);
console.log("seedsLen", seedsLen);

for (let z = 0; z < seedsLen[0]; z++) {
  seeds.push(seedsStart[0] + z);
}

console.log("seeds", seeds);

var seedToSoil = getTrData(dataArr, 1, ObjInput.secondSplit);
var soilToFertilizer = getTrData(dataArr, 2, ObjInput.secondSplit);
var fertilizerToWater = getTrData(dataArr, 3, ObjInput.secondSplit);
var waterToLight = getTrData(dataArr, 4, ObjInput.secondSplit);
var lightToTemp = getTrData(dataArr, 5, ObjInput.secondSplit);
var tempToHumidity = getTrData(dataArr, 6, ObjInput.secondSplit);
var humidityToLocation = getTrData(dataArr, 7, ObjInput.secondSplit);
var soils = seeds.map((e) => {
  return getTransformed(e, seedToSoil);
});
console.log("soils: ", soils);
var fertilizers = soils.map((e) => {
  return getTransformed(e, soilToFertilizer);
});
console.log("fertilizers", fertilizers);
var waters = fertilizers.map((e) => {
  return getTransformed(e, fertilizerToWater);
});
console.log("waters", waters);
var lights = waters.map((e) => {
  return getTransformed(e, waterToLight);
});
console.log("lights", lights);
var temps = lights.map((e) => {
  return getTransformed(e, lightToTemp);
});
console.log("temps", temps);
var humids = temps.map((e) => {
  return getTransformed(e, tempToHumidity);
});
console.log("humids", humids);
var locations = humids.map((e) => {
  return getTransformed(e, humidityToLocation);
});
console.log("locations", locations);
console.log("min from locations:", Math.min(...locations));
