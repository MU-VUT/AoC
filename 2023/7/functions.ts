import fs from "fs";

import { hand } from "./types";

export function getData(url: string): hand[] {
  const data = fs.readFileSync(url, "utf8");
  var dataArr = data
    .split(/([^\r\n]+)/)
    .filter((e) => e.trim().length > 0)
    .map((e) => e.split(/\W+/));
  var input: hand[] = [];
  dataArr.forEach((e, i) => {
    input.push({ id: i, cards: e[0], bid: Number(e[1]) });
  });
  return input;
}

export function getType(hand: hand): number {
  var faces = hand.sortedCards;
  const uniqueElements = [...new Set(faces)];
  var count = uniqueElements.map((element) => ({
    card: element,
    no: faces?.filter((el) => el === element).length,
  }));

  // přidat jokera dle nejlepšího typu
  // vrátit count jen toho nejlepšího
  //pokud je tam žolík
  // zjistit nejlepší kombinaci
  // nahradit ho tou kartou s nejlepší kombinací

  count.sort((a, b) => a.no! - b.no!);
  console.log("without joker: ", count);

  var comb = count.length - 1;

  count.forEach((cards) => {
    if (cards.card === 1 && count[comb].card! === 1 && count[comb].no != 5) {
      count[comb - 1].no! += cards.no!;
      count.pop();
      comb = count.length - 1;
      console.log("remove jokers: ", count);
    } else if (cards.card === 1 && count[comb].card! != 1) {
      count[comb].no! += cards.no!;
    }
  });

  console.log("with joker: ", count);
  console.log("-------------------");

  //   count[1] = count[1].filter((e) => {
  //     return e !== 1;
  //   });
  var type = 0;
  if (count[comb].no! > 4) {
    //  Five of a kind: type = 6
    type = 6;
  } else if (count[comb].no === 4) {
    //  Four of a kind: type = 5
    type = 5;
  } else if (
    count[comb - 1] &&
    ((count[comb - 1].no === 2 && count[comb].no === 3) ||
      (count[comb - 1].no === 3 && count[comb].no === 2))
  ) {
    //  Full house: type = 4
    type = 4;
  } else if (count[comb].no === 3) {
    //  Three of a kind: type = 3
    type = 3;
  } else if (
    count[comb - 1] &&
    ((count[comb - 1].no === 2 && count[comb].no === 2) ||
      (count[comb - 1].no === 2 && count[comb].no === 2))
  ) {
    //  Two pair: type = 2
    type = 2;
  } else if (count[comb].no === 2) {
    //  One pair: type = 1
    type = 1;
  } else {
    //  High card: type = 0
    type = 0;
  }

  return type;
}

export function sortCards(cardsStr: string): number[] {
  var cards = cardsStr.split("");

  var faces = cards
    .map((e) => {
      switch (e) {
        case "T":
          return (e = "10");
        case "J":
          return (e = "1");
        case "Q":
          return (e = "12");
        case "K":
          return (e = "13");
        case "A":
          return (e = "14");
        default:
          return e;
      }
    })
    .map(Number)
    .sort((a, b) => {
      return a - b;
    });

  return faces;
}

export function getValueCard(cardsStr: string): number[] {
  var cards = cardsStr.split("");

  var faces = cards
    .map((e) => {
      switch (e) {
        case "T":
          return (e = "10");
        case "J":
          return (e = "1");
        case "Q":
          return (e = "12");
        case "K":
          return (e = "13");
        case "A":
          return (e = "14");
        default:
          return e;
      }
    })
    .map(Number);

  return faces;
}

export function orderHands(hands: hand[]): hand[] {
  var order = 1;

  //bubble sort
  for (var i = 0; i < hands.length; i++) {
    for (var j = 0; j < hands.length - i - 1; j++) {
      if (hands[j].type === hands?.[j + 1].type) {
        for (let k = 0; k < hands[j].valueCards!.length; k++) {
          if (hands[j].valueCards![k] > hands[j + 1].valueCards![k]) {
            var temp = hands[j];
            hands[j] = hands[j + 1];
            hands[j + 1] = temp;

            break;
          } else if (hands[j].valueCards![k] < hands[j + 1].valueCards![k]) {
            break;
          }
        }
      }
      if (hands[j].type! > hands?.[j + 1].type!) {
        var temp = hands[j];
        hands[j] = hands[j + 1];
        hands[j + 1] = temp;
      }
    }
  }
  return hands;
}
