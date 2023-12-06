import fs from "fs";
import { raceInput } from "./types";

export function getData(url: string): raceInput[] {
  const data = fs.readFileSync(url, "utf8");
  var dataArr = data
    .split(/([^\r\n]+)/)
    .filter((e) => e.trim().length > 0)
    .map((e) => e.split(/\D+/).slice(1).map(Number));
  var input: raceInput[] = [];
  for (let i = 0; i < dataArr[0].length; i++) {
    input.push({ time: dataArr[0][i], distance: dataArr[1][i] });
  }

  return input;
}
