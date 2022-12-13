import {readFileSync} from "fs";

const getTreeHeight = (map: number[][], rowIndex: number, columnIndex: number) => {
  return map[rowIndex][columnIndex];
}

const visibleDistanceLeft = (map: number[][], rowIndex: number, columnIndex: number)=> {
  const currentTree = getTreeHeight(map, rowIndex, columnIndex);
  let visbleDistance = 0;
  for (let i = columnIndex - 1; i >= 0; i--) {
    const adjacentTree = getTreeHeight(map, rowIndex, i);
    if (adjacentTree < currentTree) {
        visbleDistance ++;
    } else {
      visbleDistance++;
      break;
  }
  }

  return visbleDistance;
}

const visibleDistanceRight = (map: number[][], rowIndex: number, columnIndex: number)=> {
  const currentTree = getTreeHeight(map, rowIndex, columnIndex);
  let visbleDistance = 0;
  for (let i = columnIndex + 1; i < map[rowIndex].length; i++) {
    const adjacentTree = getTreeHeight(map, rowIndex, i);
    if (adjacentTree < currentTree) {
        visbleDistance ++;
    } else {
      visbleDistance++;
      break;
  }
  }
  return visbleDistance;
}

const visibleDistanceBelow = (map: number[][], rowIndex: number, columnIndex: number)=> {
  const currentTree = getTreeHeight(map, rowIndex, columnIndex);
  let visbleDistance = 0;
  for (let i = rowIndex + 1; i < map.length; i++) {
    const adjacentTree = getTreeHeight(map, i, columnIndex);
    if (adjacentTree < currentTree) {
        visbleDistance ++;
    } else {
      visbleDistance++;
      break;
  }
  }
  return visbleDistance;
}

const visibleDistanceAbove = (map: number[][], rowIndex: number, columnIndex: number)=> {
  const currentTree = getTreeHeight(map, rowIndex, columnIndex);
  let visbleDistance = 0;
  for (let i = rowIndex - 1; i >= 0; i--) {
    const adjacentTree = getTreeHeight(map, i, columnIndex);
    if (adjacentTree < currentTree) {
        visbleDistance ++;
    } else {
        visbleDistance++;
        break;
    }
  }
  return visbleDistance;
}

const getVisibleScore = (map: number[][], rowIndex: number, columnIndex: number)=>{
  return visibleDistanceAbove(map, rowIndex, columnIndex) * visibleDistanceBelow(map, rowIndex, columnIndex) * visibleDistanceLeft(map, rowIndex, columnIndex) * visibleDistanceRight(map, rowIndex, columnIndex);
}

const exec = (fileName: string) => {
  const lines = readFileSync(fileName).toString().split("\n");
  const map: Array<number[]> = [];
  lines.forEach((line , i) => {
    const rowArray = line.split('').map(c => +c);
    map.push(rowArray);
  });
  let topScore = 0;
  for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
    const row = map[rowIndex];
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      // trees on edge have a score of 0
      if (rowIndex === 0 || rowIndex - 1 === map.length || colIndex === 0 || colIndex - 1 === map[rowIndex].length){
        continue;
      }
      let treeScore = getVisibleScore(map, rowIndex, colIndex)
      if (treeScore > topScore) {
        topScore = treeScore;
      }
    }
  }
  console.log(topScore);
};

exec("dist/day8/input.txt");