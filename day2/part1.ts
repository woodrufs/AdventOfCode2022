import {readFileSync} from "fs";

type OpponentHand = 'A' | 'B' | 'C';
type MyHand = 'X' | 'Y'|'Z';
type Result = 'W' | 'L' | 'T';

const getResult = (p1: OpponentHand, p2: MyHand): Result => {
    if (p1 === 'A' && p2 === 'X' || p1 === 'B' && p2 ==='Y' || p1 === 'C' && p2 === 'Z') {
        return 'T';
    }
    else if (p1 === 'A' && p2 === 'Y' || p1 === 'B' && p2 === 'Z' || p1 === 'C' && p2 === 'X') {
        return 'W'
    }
     return 'L';
}
const getGameScore = (result: Result) => {
    if (result === 'W'){
        return 6;
    }
    if (result === 'T') {
        return 3;
    }

    return 0;
}

const getPlayScore = (play: MyHand) => {
    if (play === 'X'){
        return 1;
    }
    if (play === 'Y') {
        return 2;
    }
    if (play === 'Z') {
        return 3;
    }
    return 0;
}

const exec = (fileName: string) => {
  var score = 0;
  const games = readFileSync(fileName).toString().split("\n");
  games.forEach(game => {
    const [p1, p2] = game.split(' ') as [OpponentHand, MyHand];
    console.log(p1);
    console.log(p2);
    const gameResult = getResult(p1, p2);
    const handScore = getPlayScore(p2);
    const gameScore = getGameScore(gameResult);

    score += handScore + gameScore;
  });
  console.log(score)
};

exec("day2/input.txt");