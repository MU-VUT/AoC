//// TODO: task 9
// ts-node ./2023/9/task.ts

import { getData, getNextValues } from "./functions";

var histories = getData("2023/9/input.txt");

console.log(histories);

var nextValues: number[] = getNextValues(histories);
console.log("next values: ", nextValues);

var sum = nextValues.reduce((a, b) => a + b, 0);
console.log("sum: ", sum);
