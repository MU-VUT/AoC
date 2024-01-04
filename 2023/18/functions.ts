import fs from "fs";
import { plan } from "./types";

export function getData(url: string): plan[] {
  var returnData: string[][] = [];
  var returnObjects: plan[] = [];
  const data = fs.readFileSync(url, "utf8");
  var dataArr = data.split("\n").filter((e) => e.trim().length > 0);
  returnData = dataArr.map((e) => {
    return e.split(" ");
  });

  returnData.forEach((e) => {
    var returnObject: plan = {
      dir: e[0],
      num: Number(e[1]),
      color: e[2].replace("(#", "").replace(")", ""),
    };
    returnObjects.push(returnObject);
  });

  return returnObjects;
}
