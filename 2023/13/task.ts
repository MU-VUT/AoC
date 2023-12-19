//// TODO: task 13
// ts-node ./2023/13/task.ts

import _ from "lodash";
import { getData } from "./functions";

var patterns = getData("2023/13/input.txt");

var sumTop: number[] = [];
var sumLeft: number[] = [];
var p: boolean[] = [];

patterns.forEach((pattern) => {
  var pravejedna = false;
  var topLen = 0;
  for (let i = 1; i < pattern.length; i++) {
    var smudge = 0;
    if (pravejedna === false) {
      for (let k = 0; k < pattern[i - 1].length; k++) {
        if (pattern[i - 1][k] !== pattern[i][k]) {
          smudge++;
        }
      }
    }
    if (smudge === 1) {
      pattern[i - 1] = pattern[i];
      pravejedna = true;
    }
    smudge = 0;

    if (pattern[i - 1] === pattern[i]) {
      var edge = Math.min(i, pattern.length - i);
      if (i === 1 && pravejedna === true) {
        topLen = 1;
        break;
      }
      if (i === pattern.length - 1 && pravejedna === true) {
        topLen = i;
        break;
      }
      console.log("top: ", i);
      console.log("bottom: ", pattern.length - i);
      console.log("edge: ", edge);
      var count = 0;
      for (let j = 1; j < edge; j++) {
        // ------------------
        if (pravejedna === false) {
          for (let l = 0; l < pattern[i - 1].length; l++) {
            if (pattern[i - j - 1][l] !== pattern[i + j][l]) {
              smudge++;
            }
          }
        }
        if (smudge === 1) {
          pattern[i - j - 1] = pattern[i + j];
          pravejedna = true;
        }
        smudge = 0;
        // -------------------
        if (pattern[i - j - 1] === pattern[i + j]) {
          count++;
          (count === edge - 1 && pravejedna === true) ||
          (count === edge && pravejedna === true)
            ? (topLen = i)
            : (topLen = topLen);
        }
      }
      console.log("topLen: ", topLen);
      break;
    }
  }
  sumTop.push(topLen * 100);

  // ----------
  // Transpose
  var splitPattern: string[][] = [];
  pattern.forEach((item) => {
    var sign = item.split("");
    splitPattern.push(sign);
  });

  var transposedPattern: string[][] = [];
  transposedPattern = _.unzip(splitPattern);

  var map: string[] = [];
  transposedPattern.forEach((e) => {
    var arr = e.join("");
    map.push(arr);
  });

  //---------------

  var leftLen = 0;
  for (let i = 1; i < map.length; i++) {
    var smudge = 0;
    if (pravejedna === false) {
      for (let k = 0; k < map[i - 1].length; k++) {
        if (map[i - 1][k] !== map[i][k]) {
          smudge++;
        }
      }
    }
    if (smudge === 1) {
      map[i - 1] = map[i];
      pravejedna = true;
    }
    smudge = 0;
    if (map[i - 1] === map[i]) {
      var edge = Math.min(i, map.length - i);
      if (i === 1 && pravejedna === true) {
        leftLen = 1;
        break;
      }
      if (i === map.length - 1 && pravejedna === true) {
        leftLen = i;
        break;
      }
      console.log("top: ", i);
      console.log("bottom: ", map.length - i);
      console.log("edge: ", edge);
      var count = 0;
      for (let j = 1; j < edge; j++) {
        // -------------------

        if (pravejedna === false) {
          for (let l = 0; l < map[i - 1].length; l++) {
            console.log(i - j - 1, l, map[i - j - 1][l]);
            console.log(i + j, l, map[i + j][l]);

            if (map[i - j - 1][l] !== map[i + j][l]) {
              console.log("got here");

              smudge++;
            }
          }
        }
        console.log("smudge", smudge);

        if (smudge === 1) {
          map[i - j - 1] = map[i + j];
          pravejedna = true;
        }
        smudge = 0;
        // -------------------
        if (map[i - j - 1] === map[i + j]) {
          count++;
          (count === edge - 1 && pravejedna === true) ||
          (count === edge && pravejedna === true)
            ? (leftLen = i)
            : (leftLen = leftLen);
        }
      }
      console.log("leftLen: ", leftLen);
      break;
    }
  }
  sumLeft.push(leftLen);
  p.push(pravejedna);
});

console.log(p);

console.log("sumTop", sumTop);
console.log("sumLeft", sumLeft);

var sum = 0;

sumTop.forEach((e, index) => {
  e !== 0 ? (sum += e) : (sum += sumLeft[index]);
});

console.log("Sum: ", sum);
