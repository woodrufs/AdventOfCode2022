import {readFileSync} from "fs";

const exec = (fileName: string) => {
  var elvesOverlapping = 0;
  const lines = readFileSync(fileName).toString().split("\n");
  const regEx = new RegExp(/(\d*)-(\d*),(\d*)-(\d*)/);
  lines.forEach(line => {
    const result = regEx.exec(line);
    const elf1Start = Number(result[1]);
    const elf1End = Number(result[2]);
    const elf2Start = Number(result[3]);
    const elf2End = Number(result[4]);
    if (elf1Start<= elf2Start && elf1End >= elf2Start
        ||  elf2Start <= elf1Start && elf2End >= elf1Start) {
        elvesOverlapping++;
    }
  });
  console.log(elvesOverlapping)
};

exec("dist/day4/input.txt");