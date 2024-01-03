import fs from "fs";
import { beam } from "./types";

export function getData(url: string): string[][] {
  var inputMap: string[][] = [];
  const data = fs.readFileSync(url, "utf8");
  var dataArr = data.split(/([^\r\n]+)/).filter((e) => e.trim().length > 0);
  var inputMap = dataArr.map((e) => e.split(""));
  return inputMap;
}

export function blankFloor(floor: string[][]): string[][] {
  var blankFloor = JSON.parse(JSON.stringify(floor));
  for (let i = 0; i < floor.length; i++) {
    for (let j = 0; j < floor[i].length; j++) {
      blankFloor[i][j] = ".";
    }
  }
  return blankFloor;
}

export function getNewLoc(beam: beam): beam {
  switch (beam.dir) {
    case "E":
      beam.posY++;
      break;
    case "W":
      beam.posY--;
      break;
    case "N":
      beam.posX--;
      break;
    case "S":
      beam.posX++;
    default:
      break;
  }
  return beam;
}

export function checkMirror(beam: beam, floor: string[][]): beam {
  if (floor[beam.posX][beam.posY] === "\\") {
    switch (beam.dir) {
      case "E":
        beam.dir = "S";
        break;
      case "W":
        beam.dir = "N";
        break;
      case "N":
        beam.dir = "W";
        break;
      case "S":
        beam.dir = "E";
      default:
        break;
    }
  }
  if (floor[beam.posX][beam.posY] === "/") {
    switch (beam.dir) {
      case "E":
        beam.dir = "N";
        break;
      case "W":
        beam.dir = "S";
        break;
      case "N":
        beam.dir = "E";
        break;
      case "S":
        beam.dir = "W";
      default:
        break;
    }
  }

  return beam;
}
