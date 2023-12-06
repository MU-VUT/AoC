//// TODO: task 6
// ts-node ./2023/6/task.ts

import { getData } from "./functions";

const input = getData("2023/6/input.txt");

console.log(input);

var res = 1;

input.forEach((e) => {
  var noDist = 0;
  for (let i = 1; i < e.time - 1; i++) {
    if (i * (e.time - i) > e.distance) {
      noDist += 1;
    }
  }
  res *= noDist;
});

console.log(res);
