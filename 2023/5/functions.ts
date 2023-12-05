import { transformationType } from "./types";

export function getTrData(
  dataArr: string[],
  trNumber: number,
  input: RegExp
): transformationType {
  var dataTr = dataArr[trNumber].split(input);
  var name = dataTr[0].replace(" map:", "");
  var trData: transformationType = {
    name: name,
    tr: [
      {
        destS: 0,
        sourceS: 0,
        len: 0,
      },
    ],
  };

  for (let i = 1; i < dataTr.length; i++) {
    var dataString = dataTr[i].split(/\ /);

    var destS = Number(dataString[0]);
    var sourceS = Number(dataString[1]);
    var len = Number(dataString[2]);

    var obj = { destS, sourceS, len };

    trData.tr.push(obj);
  }
  trData.tr.shift();

  return trData;
}

export function getTransformed(seed: number, Tr: transformationType): any {
  var soil = 0;

  for (let i = 0; i < Tr.tr.length; i++) {
    if (
      seed >= Tr.tr[i].sourceS &&
      seed <= Tr.tr[i].sourceS + Tr.tr[i].len - 1
    ) {
      soil = Tr.tr[i].destS + seed - Tr.tr[i].sourceS;

      return soil;
    } else {
      soil = seed;
    }
  }
  return soil;
}
