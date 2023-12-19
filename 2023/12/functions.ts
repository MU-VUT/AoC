import fs from "fs";
import { spring } from "./types";

export function getData(url: string): spring[] {
  var springs: spring[] = [];
  const data = fs.readFileSync(url, "utf8");
  var dataArr = data.split(/([^\r\n]+)/).filter((e) => e.trim().length > 0);
  var springsMap = dataArr.map((e) => {
    return e.split(/\ /);
  });
  springsMap.forEach((e, i) => {
    var spring: spring = {
      id: 0,
      field: [],
      numbers: [],
    };
    spring.id = i;
    spring.field = e[0].split("");
    var nums = e[1].split(",");
    spring.numbers = nums.map(Number);
    springs.push(spring);
  });

  return springs;
}
