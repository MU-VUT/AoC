//// TODO: task 2
// ts-node ./2023/2/task.ts

import fs from "fs";

const elfRed = 12;
const elfGreen = 13;
const elfBlue = 14;

type SetType = {
  // red?: boolean;
  // green?: boolean;
  // blue?: boolean;
  redNumber: number;
  greenNumber: number;
  blueNumber: number;
};

var Games: { id: number; sets: SetType[]; possible?: boolean }[];

const data = fs.readFileSync("2023/2/input.txt", "utf8");
var dataArr = data.split(/([^\r\n]+)/).filter((e) => e.trim().length > 0);

var numberGamePossible = 0;
var sumGames = 0;

var nasobek = 0;
var sumNasobek = 0;

for (let i = 0; i < dataArr.length; i++) {
  dataArr[i] = dataArr[i].replace(`Game ${i + 1}: `, "");
  dataArr[i] += ";";
  var setsArr = dataArr[i]
    .split(/([;])/)
    .filter((e) => (e = e.replace(";", "")));
  var Sets: SetType[] = [];
  var setPossible: boolean[] = [];
  var maxRedValue = 0;
  var maxGreenValue = 0;
  var maxBlueValue = 0;

  for (let j = 0; j < setsArr.length; j++) {
    var Set: SetType = {
      // red: getNumber(setsArr[j], "r", elfRed),
      // green: getNumber(setsArr[j], "g", elfGreen),
      // blue: getNumber(setsArr[j], "b", elfBlue),
      redNumber: getRealNumber(setsArr[j], "r"),
      greenNumber: getRealNumber(setsArr[j], "g"),
      blueNumber: getRealNumber(setsArr[j], "b"),
    };
    // var possible = Object.values(Set).includes(false);
    // setPossible.push(!possible);
    Sets.push(Set);
  }

  Sets.map((el) => {
    const redValueFromObject = el.redNumber;
    const greenValueFromObject = el.greenNumber;
    const blueValueFromObject = el.blueNumber;
    maxRedValue = Math.max(maxRedValue, redValueFromObject);
    maxGreenValue = Math.max(maxGreenValue, greenValueFromObject);
    maxBlueValue = Math.max(maxBlueValue, blueValueFromObject);
  });
  var maxRed = maxRedValue;
  console.log("maxRed: ", maxRed);
  var maxGreen = maxGreenValue;
  console.log("maxGreen: ", maxGreen);
  var maxBlue = maxBlueValue;
  console.log("maxBlue: ", maxBlue);

  nasobek = maxRed * maxGreen * maxBlue;
  console.log("Nasobek: ", nasobek);
  sumNasobek += nasobek;
  console.log("Suma nasobku: ", sumNasobek);

  //pro kazdy set určit true/false
  console.log(Sets);

  var gamePossible = setPossible.includes(false);

  if (!gamePossible) {
    numberGamePossible += 1;
    sumGames += i + 1;
  }
}

function getNumber(string: string, color: string, elfCubes: number): boolean {
  var regex = new RegExp("(\\d*(?= " + color + "))");
  var numberArr = string.match(regex);
  var number = numberArr ? numberArr[0] : 0;
  var possible = Number(number) > elfCubes ? false : true;
  return possible;
}

function getRealNumber(string: string, color: string): number {
  var regex = new RegExp("(\\d*(?= " + color + "))");
  var numberArr = string.match(regex);
  var number = numberArr ? numberArr[0] : 0;
  return Number(number);
}
