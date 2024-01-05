//// TODO: task 19
// ts-node ./2023/19/task.ts

import { getData } from "./functions";
import { part } from "./types";

var { workflows } = getData("2023/19/example.txt");

//Task 1

// parts.forEach((e) => {
//   while (!e.accepted || !e.rejected) {
//     var workflow = workflows.find((obj) => {
//       return obj.name === e.pos;
//     });

//     // mam spravny workflow
//     // podivat se na prvni pravidlo a vykonat to pokud je true
//     // je tam : ->
//     // - zjistit jaký part
//     // - zjistit operátor
//     // - zjistiti hodnotu
//     // - vykonat (posunout nebo R/A)
//     // je tam "A" -> accepted = true
//     // je tam "R" -> rejected = true
//     // pokud false, tak se podunout na další pravidlo

//     if (workflow) {
//       for (let i = 0; i < workflow.rules.length; i++) {
//         if (workflow.rules[i].includes(":")) {
//           var sign = workflow.rules[i][1];
//           var str = workflow.rules[i].split(/\W/);
//           var category = str[0];
//           var num = Number(str[1]);
//           var sendTo = str[2];

//           const categoryTyped = category as keyof typeof e;
//           var partNum = Number(e[categoryTyped]);

//           if (sign === "<" && partNum < num) {
//             e.pos = sendTo;
//             break;
//           } else if (sign === ">" && partNum > num) {
//             e.pos = sendTo;
//             break;
//           }

//           if (e.pos === "A") {
//             e.accepted = true;
//             e.pos = "A";
//             break;
//           } else if (e.pos === "R") {
//             e.rejected = true;
//             e.pos = "R";

//             break;
//           }
//         } else if (workflow.rules[i] === "A") {
//           e.accepted = true;
//           break;
//         } else if (workflow.rules[i] === "R") {
//           e.rejected = true;
//           break;
//         } else {
//           e.pos = workflow.rules[i];
//           break;
//         }
//       }
//     }

//     if (e.pos === "A") {
//       e.accepted = true;
//       break;
//     } else if (e.pos === "R") {
//       e.rejected = true;
//       break;
//     } else if (e.rejected) {
//       break;
//     } else if (e.accepted) {
//       break;
//     }
//   }
// });

// console.log(parts);

// var sum = 0;
// parts.forEach((e) => {
//   var count = 0;
//   if (e.accepted) {
//     count = e.x + e.m + e.a + e.s;
//   }
//   sum += count;
// });

// console.log(sum);

//Task 2

//  pro každy workflow zjistit počet možných kombinací a sečíst
//  intiger od 1 do 4000
//  když "<" musí ležet vlevo v intervalu
//  když ">" musí ležet vpravo v intervalu
//  když kdekoliv A -> +1

// vytvořit dostatečný počet partů dle range
var minRange = 1;
var maxRange = 4000;
var parts: part[] = [];

for (let x = minRange; x <= maxRange; x++) {
  for (let m = minRange; m <= maxRange; m++) {
    for (let a = minRange; a <= maxRange; a++) {
      for (let s = minRange; s <= maxRange; s++) {
        var part: part = {
          x: x,
          m: m,
          a: a,
          s: s,
          pos: "in",
          accepted: false,
          rejected: false,
        };
        parts.push(part);
      }
    }
  }
}

parts.forEach((e) => {
  while (!e.accepted || !e.rejected) {
    var workflow = workflows.find((obj) => {
      return obj.name === e.pos;
    });
    // mam spravny workflow
    // podivat se na prvni pravidlo a vykonat to pokud je true
    // je tam : ->
    // - zjistit jaký part
    // - zjistit operátor
    // - zjistiti hodnotu
    // - vykonat (posunout nebo R/A)
    // je tam "A" -> accepted = true
    // je tam "R" -> rejected = true
    // pokud false, tak se podunout na další pravidlo
    if (workflow) {
      for (let i = 0; i < workflow.rules.length; i++) {
        if (workflow.rules[i].includes(":")) {
          var sign = workflow.rules[i][1];
          var str = workflow.rules[i].split(/\W/);
          var category = str[0];
          var num = Number(str[1]);
          var sendTo = str[2];
          const categoryTyped = category as keyof typeof e;
          var partNum = Number(e[categoryTyped]);
          if (sign === "<" && partNum < num) {
            e.pos = sendTo;
            break;
          } else if (sign === ">" && partNum > num) {
            e.pos = sendTo;
            break;
          }
          if (e.pos === "A") {
            e.accepted = true;
            e.pos = "A";
            break;
          } else if (e.pos === "R") {
            e.rejected = true;
            e.pos = "R";
            break;
          }
        } else if (workflow.rules[i] === "A") {
          e.accepted = true;
          break;
        } else if (workflow.rules[i] === "R") {
          e.rejected = true;
          break;
        } else {
          e.pos = workflow.rules[i];
          break;
        }
      }
    }

    if (e.pos === "A") {
      e.accepted = true;
      break;
    } else if (e.pos === "R") {
      e.rejected = true;
      break;
    } else if (e.rejected) {
      break;
    } else if (e.accepted) {
      break;
    }
  }
});
var sum = 0;
parts.forEach((e) => {
  var count = 0;
  if (e.accepted) {
    count = e.x + e.m + e.a + e.s;
  }
  sum += count;
});

console.log(sum);

// var sum = 0;
// workflows.forEach((e) => {
//   var count = 0;
//   if (e) {
//     for (let i = 0; i < e.rules.length; i++) {
//       if (e.rules[i].includes(":")) {
//         var sign = e.rules[i][1];
//         var str = e.rules[i].split(/\W/);
//         var category = str[0];
//         var num = Number(str[1]);
//         // var sendTo = str[2];

//         if (sign === "<") {
//           count += num - 1;
//           break;
//         } else if (sign === ">") {
//           count += 4000 - num - 1;
//           break;
//         }
//       } else if (e.rules[i] === "A") {
//         count++;
//         break;
//       }
//     }
//   }
//   sum += count;
// });

// console.log(sum);
