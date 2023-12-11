import fs from "fs";
import { history } from "./types";

export function getData(url: string): history[] {
  var histories: history[] = [];
  const data = fs.readFileSync(url, "utf8");
  var dataArr = data
    .split(/([^\r\n]+)/)
    .filter((e) => e.trim().length > 0)
    .map((e) => e.split(/\ /));

  var numbers = dataArr.map((e) => e.map((el) => Number(el)));

  numbers.forEach((e, i) => {
    histories.push({ id: i, arr: e, nextValue: 0 });
  });

  return histories;
}

export function getNextValues(histories: history[]): number[] {
  var nextValues: number[] = [];
  histories.forEach((e) => {
    var arr = e.arr;
    var arrOfArr: number[][] = [];
    arrOfArr.push(arr);

    while (arr.reduce((a, b) => a + b, 0) != 0) {
      var newArr: number[] = [];
      for (let i = 0; i < arr.length - 1; i++) {
        newArr.push(arr[i + 1] - arr[i]);
      }
      arrOfArr.push(newArr);
      arr = newArr;
    }
    // console.log(arrOfArr);
    var x = 0;

    for (let i = arrOfArr.length - 2; i >= 0; i--) {
      var x = arrOfArr[i][0] - x;

      console.log("x", x);
      arrOfArr[i].unshift(x);
    }
    // console.log(arrOfArr);
    nextValues.push(arrOfArr[0][0]);
  });
  //hleadní zero diferences

  return nextValues;
}
