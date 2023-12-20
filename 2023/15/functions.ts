import fs from "fs";
import { lense } from "./types";

export function getData(url: string): string[] {
  var returnData: string[] = [];

  const data = fs.readFileSync(url, "utf8");
  var dataArr = data.split(",").filter((e) => e.trim().length > 0);
  returnData = dataArr.map((e) => {
    return e.replace("\n", "");
  });

  return returnData;
}

export function solveHash(hash: string): number {
  var value = 0;

  for (let i = 0; i < hash.length; i++) {
    value += hash.charCodeAt(i);
    value *= 17;
    value = value % 256;
  }

  return value;
}

export function getLenses(hashes: string[]): lense[] {
  var lenses: lense[] = [];
  hashes.forEach((e) => {
    var x: string[];
    var lense: lense = {
      label: "",
      box: 0,
    };

    if (e.includes("-")) {
      lense.dash = true;
    }
    x = e.split(/\W/);
    lense.label = x[0];

    lense.box = solveHash(lense.label);

    if (x[1] !== "") {
      lense.focalLen = Number(x[1]);
    }
    lenses.push(lense);
  });
  return lenses;
}
