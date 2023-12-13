import fs from "fs";

export function getData(url: string): string[][] {
  var inputMap: string[][] = [];
  const data = fs.readFileSync(url, "utf8");
  var dataArr = data.split(/([^\r\n]+)/).filter((e) => e.trim().length > 0);
  var inputMap = dataArr.map((e) => e.split(""));
  return inputMap;
}

export function doubleMap(map: string[][]): number[] {
  var indexesOfRows: number[] = [];
  var indexOfRow = 0;
  for (let i = 0; i < map.length; i++) {
    var rowIsDots = map[i].every((item) => {
      return item === ".";
    });
    if (rowIsDots) {
      indexOfRow = i;
      indexesOfRows.push(indexOfRow);
    }
  }
  return indexesOfRows;
}

export function getLoc(map: string[][], galaxy: string): number[] {
  var loc: number[] = [];
  const x = map.findIndex((row) => row.includes(galaxy));
  loc.push(x);
  const y = map[x].indexOf(galaxy);
  loc.push(y);
  return loc;
}
