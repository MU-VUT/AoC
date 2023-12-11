import fs from "fs";

export function getData(url: string): string[][] {
  var inputMap: string[][] = [];
  const data = fs.readFileSync(url, "utf8");
  var dataArr = data.split(/([^\r\n]+)/).filter((e) => e.trim().length > 0);
  var inputMap = dataArr.map((e) => e.split(""));
  return inputMap;
}

export function getStart(inputMap: string[][]): number[] {
  var startPos = [0, 0];
  for (let x = 0; x < inputMap.length; x++) {
    for (let y = 0; y < inputMap[x].length; y++) {
      if (inputMap[x][y] === "S") {
        startPos = [x, y];
        return startPos;
      }
    }
  }
  return startPos;
}

export function getFirstCon(
  inputMap: string[][],
  startPos: number[]
): number[] {
  var firstCon = [0, 0];
  var x = startPos[0];
  var y = startPos[1];
  var N = inputMap[x - 1][y];
  var E = inputMap[x][y + 1];
  var S = inputMap[x + 1][y];
  var W = inputMap[x][y - 1];
  for (let i = 0; i < 5; i++) {
    if (N === "|" || N === "7" || N === "F") {
      return [x - 1, y];
    } else if (E === "-" || E === "J" || E === "7") {
      return [x, y + 1];
    } else if (S === "|" || S === "L" || S === "J") {
      return [x + 1, y];
    } else if (W === "-" || W === "L" || W === "F") {
      return [x, y - 1];
    }
  }

  return firstCon;
}

export function getPipe(pipePos: number[], inputMap: string[][]): string {
  return inputMap[pipePos[0]][pipePos[1]];
}

export function getEndPos(
  startPos: number[],
  pipePos: number[],
  pipe: string,
  inputMap: string[][]
): number[] {
  var endPos: number[] = [];
  // Podle startPos a pipe urči endPos
  var x = pipePos[0];
  var y = pipePos[1];
  var inputSide = "";
  if (JSON.stringify(startPos) === JSON.stringify([x, y - 1])) {
    inputSide = "W";
  } else if (JSON.stringify(startPos) === JSON.stringify([x - 1, y])) {
    inputSide = "N";
  } else if (JSON.stringify(startPos) === JSON.stringify([x, y + 1])) {
    inputSide = "E";
  } else if (JSON.stringify(startPos) === JSON.stringify([x + 1, y])) {
    inputSide = "S";
  }

  if (inputSide === "W") {
    if (pipe === "-") {
      return [x, y + 1];
    } else if (pipe === "J") {
      return [x - 1, y];
    } else if (pipe === "7") {
      return [x + 1, y];
    }
  } else if (inputSide === "N") {
    if (pipe === "|") {
      return [x + 1, y];
    } else if (pipe === "L") {
      return [x, y + 1];
    } else if (pipe === "J") {
      return [x, y - 1];
    }
  } else if (inputSide === "E") {
    if (pipe === "-") {
      return [x, y - 1];
    } else if (pipe === "L") {
      return [x - 1, y];
    } else if (pipe === "F") {
      return [x + 1, y];
    }
  } else if (inputSide === "S") {
    if (pipe === "|") {
      return [x - 1, y];
    } else if (pipe === "7") {
      return [x, y - 1];
    } else if (pipe === "F") {
      return [x, y + 1];
    }
  }

  return endPos;
}
