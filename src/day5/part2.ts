import { readFileSync } from "fs";

const exec = (fileName: string) => {
  const lines = readFileSync(fileName).toString().split("\n");
  const columns: string[][] = [];

  // populate initial ordering
  for (let index = 0; index < 8; index++) {
    const line = lines[index];
    for (let charIndex = 1; charIndex < line.length; charIndex += 4) {
      const char = line[charIndex];
      const colNumber = (charIndex + 3) / 4;
      if (char === " ") {
        continue;
      }
      if (Array.isArray(columns[colNumber]) === false) {
        columns[colNumber] = [];
      }
      columns[colNumber].push(char);
    }
  }

  // reverse columns as order is initially flipped
  for (let index = 1; index < columns.length; index++) {
    columns[index] = columns[index].reverse();
  }

  const regex = new RegExp(/move (\d+) from (\d+) to (\d+)/);
  lines.slice(10).forEach((line, i) => {
    const [, one, two, three] = regex.exec(line);
    const move = +one;
    const from = +two;
    const to = +three;
    const fromColumn = columns[from];
    const toColumn = columns[to];
    const popped = [];
    for (let index = 0; index < move && fromColumn.length > 0; index++) {
      popped.push(fromColumn.pop());
    }
    toColumn.push(...popped.reverse());
    columns[from] = fromColumn;
    columns[to] = toColumn;
  });
  const answer = columns
    .map((col) => {
      const lastValue = col.pop();
      return lastValue;
    })
    .join("");
  console.log(answer);
};

exec("dist/day5/input.txt");
