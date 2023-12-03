// TODO: task 1
// node ./2023/1/task.js

var fs = require("fs");

const data = fs.readFileSync("2023/1/input.txt", "utf8");

const dataArr = data.split(/(\s+)/).filter((e) => e.trim().length > 0);

var count = 0;
var sum = 0;
dataArr.forEach((e) => {
  var elementLeft = loopStringLeft(e);
  var elementRight = loopStringRight(e);
  console.log("elementLeft", elementLeft);
  console.log("elementRight", elementRight);
  var numberStr = "";
  var number = 0;

  numbersLeft = getNumbers(elementLeft);
  numbersRight = getNumbers(elementRight);

  console.log("numbersLeft", numbersLeft);
  console.log("numbersRight", numbersRight);

  firstNumber = numbersLeft[0];
  console.log(firstNumber[0], "firstnumber");
  if (numbersRight) {
    lastNumber = numbersRight[numbersRight.length - 1];
    console.log(lastNumber[lastNumber.length - 1], "lastnumber");
  } else {
    lastNumber = numbersLeft[numbersLeft.length - 1];
    console.log(lastNumber[lastNumber.length - 1], "lastnumber");
  }

  numberStr = firstNumber[0] + lastNumber[lastNumber.length - 1];

  var number = Number(numberStr);

  sum += number;
  count += 1;
  console.log(count);
  console.log(number, "number");
});
console.log("Celková suma", sum);

function getNumbers(text) {
  var numbers = text.match(/(\d+)/g);
  return numbers;
}

function loopStringLeft(text) {
  var el = "";
  for (let i = 0; i < text.length; i++) {
    el += text[i];
    el = replaceString(el);
  }
  return el;
}

function loopStringRight(text) {
  var el = "";
  for (let i = text.length - 1; i > 0; i--) {
    el = text[i] + el;
    el = replaceString(el);
  }
  return el;
}

function replaceString(text) {
  if (text.includes("one")) {
    text = text.replace("one", "1");
  }
  if (text.includes("two")) {
    text = text.replace("two", "2");
  }
  if (text.includes("three")) {
    text = text.replace("three", "3");
  }
  if (text.includes("four")) {
    text = text.replace("four", "4");
  }
  if (text.includes("five")) {
    text = text.replace("five", "5");
  }
  if (text.includes("six")) {
    text = text.replace("six", "6");
  }
  if (text.includes("seven")) {
    text = text.replace("seven", "7");
  }
  if (text.includes("eight")) {
    text = text.replace("eight", "8");
  }
  if (text.includes("nine")) {
    text = text.replace("nine", "9");
  }
  return text;
}
