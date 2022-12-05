import {readFileSync} from "fs";

const exec = (fileName: string) => {
  var mostCals = 0;
  var currentCalCount = 0;
  const line = readFileSync(fileName).toString().split("\n");
  line.forEach(l => {
    if (l.length){
      currentCalCount += Number(l);
    } else if (currentCalCount > mostCals) {
      mostCals = currentCalCount;
      currentCalCount = 0;
    }
    else {
      currentCalCount = 0
    }
  });
  console.log(mostCals)
};

exec("day1/input.txt");
