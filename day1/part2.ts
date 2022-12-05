import {readFileSync} from "fs";

const exec = (fileName: string) => {
  var elfCals: Array<number> = [];
  var currentCalCount = 0;
  const line = readFileSync(fileName).toString().split("\n");
  line.forEach(l => {
    if (l.length){
      currentCalCount += Number(l);
    } else {
      elfCals.push(currentCalCount);
      currentCalCount = 0
    }
  });
  elfCals.sort((first, second) => {
    if (first > second) {
      return -1;
    } else if(second> first){
      return 1;
    }
    else {
      return 0;
    }
  });
  return elfCals[0] + elfCals[1] + elfCals[2]
};

console.log(exec("day1/input.txt"));
