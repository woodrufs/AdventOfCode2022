import {readFileSync} from "fs";

const getTreeHeight = (map: number[][], rowIndex: number, columnIndex: number) => {
  return map[rowIndex][columnIndex];
}

const isVisibleLeft = (map: number[][], rowIndex: number, columnIndex: number)=> {
  const currentTree = getTreeHeight(map, rowIndex, columnIndex);
  let isVisible = true;
  for (let i = columnIndex - 1; i >= 0; i--) {
    const adjacentTree = getTreeHeight(map, rowIndex, i);
    if (adjacentTree >= currentTree) {
      isVisible =  false;
      break;
    }
  }

  return isVisible;
}

const isVisibleRight = (map: number[][], rowIndex: number, columnIndex: number)=> {
  const currentTree = getTreeHeight(map, rowIndex, columnIndex);
  let isVisible = true;
  for (let i = columnIndex + 1; i < map[rowIndex].length; i++) {
    const adjacentTree = getTreeHeight(map, rowIndex, i);
    if (adjacentTree >= currentTree) {
      isVisible = false;
      break;
    }
  }
  return isVisible;
}

const isVisibleBelow = (map: number[][], rowIndex: number, columnIndex: number)=> {
  const currentTree = getTreeHeight(map, rowIndex, columnIndex);
  let isVisible = true;
  for (let i = rowIndex + 1; i < map.length; i++) {
    const adjacentTree = getTreeHeight(map, i, columnIndex);
    if (adjacentTree >= currentTree) {
      isVisible =  false;
      break;
    }
  }
  return isVisible;
}

const isVisibleAbove = (map: number[][], rowIndex: number, columnIndex: number)=> {
  const currentTree = getTreeHeight(map, rowIndex, columnIndex);
  let isVisible = true;
  for (let i = rowIndex - 1; i >= 0; i--) {
    const adjacentTree = getTreeHeight(map, i, columnIndex);
    if (adjacentTree >= currentTree) {
      isVisible = false;
      break;
    }
  }
  return isVisible;
}

const isVisible = (rowIndex: number, columnIndex: number, map: number[][])=>{
  // check edges to prevent heavy work on esge cases
  if (rowIndex === 0 || rowIndex - 1 === map.length || columnIndex === 0 || columnIndex - 1 === map[rowIndex].length){
    return true;
  }

  if (isVisibleAbove(map, rowIndex, columnIndex)) {
    return true;
  } else if (isVisibleBelow(map, rowIndex, columnIndex)) {
    return true;
  } else if (isVisibleRight(map, rowIndex, columnIndex)) {
    return true;
  } else if (isVisibleLeft(map, rowIndex, columnIndex)) {
    return true;
  }
   return false;
}

const exec = (fileName: string) => {
  let visibleTrees = 0;
  const lines = readFileSync(fileName).toString().split("\n");
  const map: Array<number[]> = [];
  lines.forEach((line , i) => {
    const rowArray = line.split('').map(c => +c);
    map.push(rowArray);
  });

  for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
    const row = map[rowIndex];
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      if (isVisible(rowIndex, colIndex, map)) {
        visibleTrees++;
      }
    }
  }
  console.log(visibleTrees);
};

exec("dist/day8/input.txt");