import {readFileSync} from "fs";
import { intersection } from "lodash"

const exec = (fileName: string) => {
  var totalPriority = 0;
  const lines = readFileSync(fileName).toString().split("\n");
  for (let index = 0; index < lines.length; index +=3) {
    const rucksack1 = lines[index].split('');
    const rucksack2 = lines[index + 1].split('');
    const rucksack3 = lines[index + 2].split('');
    const badgeCode = intersection(rucksack1, rucksack2, rucksack3)[0];
    const charCode = badgeCode.charCodeAt();
    totalPriority += badgeCode.toUpperCase() === badgeCode ? charCode - 38 : charCode - 96;
  }
  console.log(totalPriority)
};

exec("dist/day3/input.txt");