import { element } from "./types";
import fs from "fs";
export function getData(url: string): {
  nav: string;
  elements: element[];
} {
  const data = fs.readFileSync(url, "utf8");
  var dataArr = data.split(/([^\r\n]+)/).filter((e) => e.trim().length > 0);
  var nav = dataArr[0];
  var elements: element[] = new Array();

  for (let i = 1; i < dataArr.length; i++) {
    var arr = dataArr[i].split(/\W+/).filter((e) => e.trim().length > 0);
    elements.push({ id: i - 1, name: arr[0], left: arr[1], right: arr[2] });
  }

  return { nav, elements };
}

export function getStartFin(elements: element[]): {
  startId: number[];
  finId: number[];
} {
  var startId: number[] = [];
  var finId: number[] = [];
  elements.forEach((e) => {
    if (e.name[2] === "A") {
      startId.push(e.id);
    }
    if (e.name[2] === "Z") {
      finId.push(e.id);
    }
  });
  return { startId, finId };
}

export function getSteps(
  nav: string,
  elements: element[],
  startId: number[],
  finId: number[]
): number[] {
  var steps: number[] = [];
  var id = startId;

  id.forEach((element, index) => {
    var step = 0;

    while (elements[id[index]].name[2] !== "Z") {
      var inst = "";
      for (let i = 0; i < nav.length; i++) {
        inst = nav[i];
        if (inst === "L") {
          var leftElement = elements[id[index]].left;
          elements.forEach((e) => {
            if (e.name === leftElement) {
              id[index] = e.id;
            }
          });
        } else if (inst === "R") {
          var rightElement = elements[id[index]].right;
          elements.forEach((e) => {
            if (e.name === rightElement) {
              id[index] = e.id;
            }
          });
        }
        // console.log("id: ", id);
        step += 1;
      }
    }
    steps.push(step);
  });

  return steps;
}

export const gcd = (a: number, b: number) => {
  while (b > 0) [a, b] = [b, a % b];
  return a;
};

export const lcm = (a: number, b: number) => (a * b) / gcd(a, b);
