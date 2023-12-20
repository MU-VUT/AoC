//// TODO: task 15
// ts-node ./2023/15/task.ts

import { getData, getLenses, solveHash } from "./functions";
import { box, lense } from "./types";

var hashes = getData("2023/15/input.txt");
console.log(hashes);

var boxes: box[] = [];
for (let i = 0; i < 256; i++) {
  var box: box = { id: i, lenses: [] };
  boxes.push(box);
}

var lenses = getLenses(hashes);
console.log(lenses);

lenses.forEach((e, i) => {
  var boxNo = e.box;
  var lensesInBox: lense[] = boxes[boxNo].lenses;
  var con1: boolean[] = lensesInBox.map(({ label }) => label.includes(e.label));
  var con = con1.includes(true);

  if (e.dash && con) {
    var filtered = lensesInBox.filter((el) => {
      return el.label !== e.label;
    });
    boxes[e.box].lenses = filtered;
  }
  if (!e.dash) {
    if (con) {
      var index: number = lensesInBox.findIndex((i) => i.label === e.label);
      lensesInBox[index] = e;
    } else {
      lensesInBox.push(e);
    }
  }
});

console.log(boxes[0]);
console.log(boxes[1]);
console.log(boxes[2]);
console.log(boxes[3]);

var focusingPower = 0;

boxes.forEach((e) => {
  var boxId = e.id;
  var lenses = e.lenses;
  lenses.forEach((el, i) => {
    var power = (boxId + 1) * (i + 1) * el.focalLen!;
    focusingPower += power;
  });
});

console.log("Focusing power:", focusingPower);

// var values: number[] = [];

// hashes.forEach((e) => {
//   var value = 0;
//   value = solveHash(e);
//   values.push(value);
// });

// console.log(values);

// var sum = values.reduce((a, b) => a + b, 0);
// console.log("Sum: ", sum);
