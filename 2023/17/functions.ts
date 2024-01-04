import fs from "fs";

export function getData(url: string): string[][] {
  var inputMap: string[][] = [];
  const data = fs.readFileSync(url, "utf8");
  var dataArr = data.split(/([^\r\n]+)/).filter((e) => e.trim().length > 0);
  var inputMap = dataArr.map((e) => e.split(""));
  return inputMap;
}

export function blankFloor(floor: string[][]): string[][] {
  var blankFloor = JSON.parse(JSON.stringify(floor));
  for (let i = 0; i < floor.length; i++) {
    for (let j = 0; j < floor[i].length; j++) {
      blankFloor[i][j] = ".";
    }
  }
  return blankFloor;
}
