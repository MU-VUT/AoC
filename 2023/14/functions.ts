import fs from "fs";

export function getData(url: string): string[][] {
  var returnData: string[][] = [];

  const data = fs.readFileSync(url, "utf8");
  var dataArr = data.split(/([^\r\n]+)/).filter((e) => e.trim().length > 0);
  dataArr.forEach((e) => {
    var dataMat: string[] = [];
    dataMat = e.split("");
    returnData.push(dataMat);
  });
  return returnData;
}

export function tilt(floor: string[][]): string[][] {
  var tiltedFloor: string[][] = [];

  for (let i = 1; i < floor.length; i++) {
    for (let j = 0; j < floor[i].length; j++) {
      if (floor[i][j] === "O") {
        var movePossible = true;
        var row = i;
        while (movePossible) {
          if (
            row === 0 ||
            floor[row - 1][j] === "O" ||
            floor[row - 1][j] === "#"
          ) {
            movePossible = false;
          } else {
            floor[row - 1][j] = "O";
            floor[row][j] = ".";
            row--;
          }
        }
      }
    }
  }

  tiltedFloor = floor;

  return tiltedFloor;
}

export function getLoad(floor: string[][]): number {
  var sum = 0;

  for (let i = 0; i < floor.length; i++) {
    for (let j = 0; j < floor[i].length; j++) {
      if (floor[i][j] === "O") {
        sum += floor.length - i;
      }
    }
  }

  return sum;
}

export function rotate(matrix: string[][]): string[][] {
  return matrix[0].map((val, index) =>
    matrix.map((row) => row[index]).reverse()
  );
}

export function compareArrays(a: string[][], b: string[][]): boolean {
  if (a.length !== b.length) return false;
  else {
    for (var i = 0; i < a.length; i++) {
      for (let j = 0; j < a[i].length; j++) {
        if (a[i][j] !== b[i][j]) {
          return false;
        }
      }
    }
    return true;
  }
}
