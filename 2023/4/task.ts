//// TODO: task 4
// ts-node ./2023/4/task.ts

import fs from "fs";
import { getGames, getPartOne } from "./functions";
import { gameType } from "./types";

const data = fs.readFileSync("2023/4/input.txt", "utf8");
var dataArr = data.split(/([^\r\n]+)/).filter((e) => e.trim().length > 0);

var Games: gameType[] = [];

Games = getGames(dataArr);

// Part one
var sumPartOne = getPartOne(Games);
console.log("Part one sum: ", sumPartOne);

// Part Two

var sum = 0;

for (let i = 0; i < Games.length; i++) {
  var cardTrue = 0;

  for (let x = 0; x < Games[i].winningNumbers.length; x++) {
    for (let y = 0; y < Games[i].scratchNumbers.length; y++) {
      if (Games[i].winningNumbers[x] === Games[i].scratchNumbers[y]) {
        cardTrue += 1;
      }
    }
  }
  Games[i].cardMatches = cardTrue;

  for (let j = 0; j < Games[i].cardMatches; j++) {
    Games.push(Games[j + Games[i].id]);
  }
}

sum = Games.length;
console.log("Part two sum: ", sum);
