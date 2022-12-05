import {readFileSync} from "fs";
import { intersection } from "lodash"

const exec = (fileName: string) => {
  var score = 0;
  const lines = readFileSync(fileName).toString().split("\n");
  lines.forEach(line => {
    const midway = line.length / 2;
    const first = line.split('').slice(0, midway);
    const second = line.split('').slice(midway);
    const t = intersection(first, second)[0];
    const charCode = t.charCodeAt();
    score += t.toUpperCase() === t ? charCode - 38 : charCode - 96;

  });
  console.log(score)
};

exec("dist/day3/input.txt");