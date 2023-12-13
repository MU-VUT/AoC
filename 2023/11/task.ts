//// TODO: task 10
// ts-node ./2023/11/task.ts

import { doubleMap, getData, getLoc } from "./functions";
import _ from "lodash";
import { combinations, abs } from "mathjs";

// sum all of shortest distances

var inputMap = getData("2023/11/input.txt");

// expand universe
var doubledMapRows = doubleMap(inputMap);
var transposedMap = _.unzip(inputMap);
var doubledMapCols = doubleMap(transposedMap);

console.log("doubledMapRows", doubledMapRows);
console.log("doubledMapCols", doubledMapCols);

// number galaxies
var number = 0;
const numberedMap = inputMap.map((e) =>
  e.map((el) => {
    if (el === "#") {
      number++;
      return (el = number.toString());
    } else {
      return el;
    }
  })
);

// number of pairs
var numOfPairs = combinations(number, 2);
console.log("Number of last galaxy:", number);
console.log("Number fo Pairs:", numOfPairs);

const between = (a: number, b: number) => (n: number) =>
  (a < n && n < b) || (a > n && n > b);

// find shortest distance between pairs
const mult = 1000000;
var sum = 0;
var count = number - 1;
for (let i = 0; i < number - 1; i++) {
  //find loc of first
  var firstLoc = getLoc(numberedMap, (i + 1).toString());
  //   console.log("firstLoc", firstLoc);
  for (let j = 0; j < count; j++) {
    //find loc of others
    var secondLoc = getLoc(numberedMap, (i + j + 2).toString());
    // console.log("secondLoc", secondLoc);
    var x = between(firstLoc[0], secondLoc[0]);
    var numCrossX = 0;
    for (let k = 0; k < doubledMapRows.length; k++) {
      if (x(doubledMapRows[k])) {
        numCrossX++;
      }
    }
    // console.log("numCrossX", numCrossX);

    var y = between(firstLoc[1], secondLoc[1]);
    var numCrossY = 0;
    for (let l = 0; l < doubledMapCols.length; l++) {
      if (y(doubledMapCols[l])) {
        numCrossY++;
      }
    }
    // console.log("numCrossY", numCrossY);

    var distX = abs(firstLoc[0] - secondLoc[0]) - numCrossX + numCrossX * mult;
    var distY = abs(firstLoc[1] - secondLoc[1]) - numCrossY + numCrossY * mult;
    var dist = distX + distY;

    // console.log("Distance: ", dist);
    sum += dist;
  }
  //   console.log("--------");
  count--;
}

console.log("Sum: ", sum);
