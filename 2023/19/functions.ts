import fs from "fs";
import { part, workflow } from "./types";

export function getData(url: string): { parts: part[]; workflows: workflow[] } {
  var parts: part[] = [];
  var workflows: workflow[] = [];

  const data = fs.readFileSync(url, "utf8");
  var dataArr = data.split("\n\n").filter((e) => e.trim().length > 0);

  var dataWorkflows = dataArr[0].split("\n");
  var dataParts = dataArr[1].split("\n");

  dataParts.forEach((e) => {
    var str = e.replace("{", "").replace("}", "").split(",");

    var part: part = {
      x: Number(str[0].match(/(\d+)/g)),
      m: Number(str[1].match(/(\d+)/g)),
      a: Number(str[2].match(/(\d+)/g)),
      s: Number(str[3].match(/(\d+)/g)),
      pos: "in",
      accepted: false,
      rejected: false,
    };
    parts.push(part);
  });

  dataWorkflows.forEach((e) => {
    var str = e.split("{");
    var workflow: workflow = {
      name: str[0],
      rules: str[1].replace("}", "").split(","),
    };
    workflows.push(workflow);
  });

  return { parts, workflows };
}
