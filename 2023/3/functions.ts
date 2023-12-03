//// TODO: task 3
// Helper functions

export function addDotsColumns(array: string[][]): string[][] {
  for (let i = 0; i < array.length; i++) {
    array[i].unshift(".");
    array[i].push(".");
  }
  return array;
}

export function addDotsRows(array: string[][]): string[][] {
  var dotsArr: string[] = [];
  var dotsWidth = array[0].length;
  for (let i = 0; i < dotsWidth; i++) {
    dotsArr.push(".");
  }
  array.unshift(dotsArr);
  array.push(dotsArr);

  return array;
}

export function getNumber(
  element: string,
  nextElement: string,
  number: number,
  i: number,
  j: number,
  dataMatrix: string[][]
): {
  number: number;
  ObjNeighbor: {
    neighbor: boolean;
    realNumber: number;
    isStar: boolean;
    starX: number;
    starY: number;
  };
} {
  var firstNumberArr = element.match(/\d/);
  var firstNumber = firstNumberArr ? firstNumberArr[0] : "";

  var secondNumberArr = nextElement ? nextElement.match(/\d/) : "";
  var secondNumber = secondNumberArr ? secondNumberArr[0] : "";

  var ObjNeighbor = {
    neighbor: false,
    realNumber: 0,
    isStar: false,
    starX: 0,
    starY: 0,
  };

  if (firstNumber && secondNumber === "") {
    // console.log("Number: ", number);
    ObjNeighbor = getSurNumber(dataMatrix, i, j, number);
    number = 0;
  } else if (secondNumber === "" && number) {
    number = Number(firstNumber + secondNumber);
  } else {
    var numberStr = number.toString();
    number = Number(numberStr + secondNumber);
  }
  //   console.log("First number", firstNumber);
  //   console.log("Next number", secondNumber);
  return { number, ObjNeighbor };
}

function getSurNumber(
  dataMatrix: string[][],
  i: number,
  j: number,
  number: number
): {
  neighbor: boolean;
  realNumber: number;
  isStar: boolean;
  starX: number;
  starY: number;
} {
  var jStart = j - number.toString().length;
  var neighbor = false;
  for (let x = i - 1; x < i + 2; x++) {
    for (let y = jStart; y < j + 2; y++) {
      if (dataMatrix[x][y].match(/[^\.\w\d]/) ? true : false) {
        neighbor = true;
      }
    }
  }
  var realNumber = number;

  var isStar = false;
  var starX = 0;
  var starY = 0;
  for (let x = i - 1; x < i + 2; x++) {
    for (let y = jStart; y < j + 2; y++) {
      if (dataMatrix[x][y].match(/\*/) ? true : false) {
        isStar = true;
        if (isStar) {
          starX = x;
          starY = y;
        }
      }
    }
  }

  //   console.log("Neighbor: ", neighbor);
  return { neighbor, realNumber, isStar, starX, starY };
}
