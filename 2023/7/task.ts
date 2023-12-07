//// TODO: task 7
// ts-node ./2023/7/task.ts

import {
  getData,
  getType,
  getValueCard,
  orderHands,
  sortCards,
} from "./functions";

var hands = getData("2023/7/input.txt");

for (let i = 0; i < hands.length; i++) {
  hands[i].sortedCards = sortCards(hands[i].cards);
  hands[i].valueCards = getValueCard(hands[i].cards);
  hands[i].type = getType(hands[i]);
}

hands = orderHands(hands);

hands.forEach((e, i) => {
  e.points = i + 1;
});

var win = 0;

hands.forEach((e) => {
  win += e.bid * e.points!;
});

hands.forEach((e) => {
  console.log("Cards: ", e.cards);
  console.log("Type: ", e.type);
});
console.log(win);
