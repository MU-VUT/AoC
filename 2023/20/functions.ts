import fs from "fs";
import { Broadcaster, FF, Con, Pulse } from "./types";

export function getData(url: string): {
  broadcaster: Broadcaster;
  ffModules: FF[];
  conModules: Con[];
} {
  const data = fs.readFileSync(url, "utf8");
  var dataArr = data.split("\n").filter((e) => e.trim().length > 0);

  var broadcaster: Broadcaster = {
    moduleType: "bc",
    destModules: dataArr
      .filter((el) => {
        return el.includes("broadcaster");
      })[0]
      .split(">")[1]
      .split(",")
      .map((e) => {
        return e.replace(" ", "");
      }),
    sendPulse: sendPulse,
  };

  var str = dataArr
    .filter((e) => {
      return e.includes("%");
    })
    .map((el) => {
      return el.replace("%", "").split(" -> ");
    });

  var ffModules: FF[] = [];

  str.forEach((e) => {
    var ffModule: FF = {
      moduleType: "ff",
      name: e[0],
      destModules: e[1].split(",").map((e) => {
        return e.replace(" ", "");
      }),
      state: false,
      FFMethod: FFMethod,
    };
    ffModules.push(ffModule);
  });

  var stri = dataArr
    .filter((e) => {
      return e.includes("&");
    })
    .map((el) => {
      return el.replace("&", "").split(" -> ");
    });

  var conModules: Con[] = [];

  stri.forEach((e) => {
    var conModule: Con = {
      moduleType: "con",
      name: e[0],
      destModules: e[1].split(",").map((e) => {
        return e.replace(" ", "");
      }),
      stateLowPulse: true,
    };
    conModules.push(conModule);
  });

  return { broadcaster, ffModules, conModules };
}

function sendPulse(lowPulse: boolean, destModules: string[]): Pulse[] {
  var pulses: Pulse[] = [];
  destModules.forEach((e) => {
    pulses.push({ lowPulse: true, sendTo: e });
  });
  console.log(
    `Sending ${lowPulse ? "low" : "high"} pulse to modules: ${destModules}`
  );

  return pulses;
}

function FFMethod(
  lowPulse: boolean,
  destModules: string[],
  state: boolean
): Pulse[] {
  var pulses: Pulse[] = [];

  destModules.forEach((e) => {
    if (lowPulse) {
      var pulse: Pulse = {
        lowPulse: state ? true : false,
        sendTo: e,
      };
      pulses.push(pulse);
    }
  });

  return pulses;
}

// function conMethod(lowPulses: boolean[]): any {

// }
