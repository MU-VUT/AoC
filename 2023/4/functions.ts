import { gameType } from "./types";

export function getGames(dataArr: string[]): gameType[] {
  var Games: gameType[] = [];

  for (let i = 0; i < dataArr.length; i++) {
    var Game: gameType = {
      id: 0,
      winningNumbers: [],
      scratchNumbers: [],
      cardValue: 0,
      cardMatches: 0,
      copy: false,
      numOfCards: 1,
    };

    var gameId = dataArr[i].match(/[\d]+(?=:)/);
    Game.id = gameId ? Number(gameId[0]) : 0;

    var el = dataArr[i].split(/\:/);
    dataArr[i] = el[1];

    var cardArr = dataArr[i].split(/([|])/);
    Game.winningNumbers = cardArr[0].trim().split(/\D+/);
    Game.scratchNumbers = cardArr[2].trim().split(/\D+/);

    Games.push(Game);
  }
  return Games;
}

export function getPartOne(Games: gameType[]): number {
  var sum = 0;

  Games.forEach((e) => {
    var cardTrue = 0;

    for (let x = 0; x < e.winningNumbers.length; x++) {
      for (let y = 0; y < e.scratchNumbers.length; y++) {
        if (e.winningNumbers[x] === e.scratchNumbers[y]) {
          cardTrue += 1;
        }
      }
    }

    if (cardTrue > 0) {
      e.cardValue = Math.pow(2, cardTrue - 1); //2 ^ (cardTrue - 1);
    }
    sum += e.cardValue;
  });

  return sum;
}
