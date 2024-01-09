//// TODO: task 20
// ts-node ./2023/20/task.ts

import { getData } from "./functions";
import { Button, Pulse } from "./types";

var { broadcaster, ffModules, conModules } = getData("2023/20/example.txt");

var button: Button = {
  moduleType: "btn",
  numOfPress: 0,
  maxNumOfPress: 1,
};

// console.log(button, broadcaster, ffModules, conModules);

var system = false;

while (button.numOfPress !== button.maxNumOfPress) {
  button.numOfPress++;
  system = true;
  console.log("Button pressed", button.numOfPress, "times");
  var pulses: Pulse[] = [];
  pulses = broadcaster.sendPulse(true, broadcaster.destModules);

  while (system) {
    console.log("System is on");

    pulses.forEach((e) => {
      // vytáhnout správný modul ze správné kategorie
      // zpracovat na modulu signál
      // zapsat do pulses
      var ffModule = ffModules.filter((el) => {
        return el.name === e.sendTo;
      })[0];
      var conModule = conModules.filter((el) => {
        return el.name === e.sendTo;
      })[0];

      console.log(conModule);

      if (ffModule) {
        // zpracovat signál na modulu
        // přidat záznam na konec pulses
        pulses.concat(
          ffModule.FFMethod(e.lowPulse, ffModule.destModules, ffModule.state)
        );
        if (e.lowPulse) {
          ffModule.state = !ffModule.state;
        }
        // smazat záznam tohoto pulsu
        pulses.shift();
      }
    });
    console.log("Pulses active:", pulses);

    if (pulses.length === 0) {
      //  Pokud už nejsou žádné pulsy, zastav systém
      system = false;
    }

    console.log(ffModules);
  }
}
