import fs from "fs";

export function getData(url: string): string[][] {
  var patterns: string[][] = [];

  const data = fs.readFileSync(url, "utf8");
  var dataArr = data.split("\n\n").filter((e) => e.trim().length > 0);

  dataArr.forEach((e) => {
    var dataMat: string[] = [];
    dataMat = e.split("\n");
    patterns.push(dataMat);
  });

  return patterns;
}
