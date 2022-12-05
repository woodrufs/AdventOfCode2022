import {readFileSync} from "fs";

type EncryptedOpponentHand = 'A' | 'B' | 'C';
type EncryptedDesiredOutcome = 'X' | 'Y'|'Z';
type DesiredOutcome = 'W' | 'L' | 'T';
type Play = 'rock' | 'paper' | 'scissors';

/** Takes the encrypted input for the outcome and converts it to either W, L, or T. */
const getDesiredOutcome = (encryptedOutcome: EncryptedDesiredOutcome): DesiredOutcome => {
    switch (encryptedOutcome) {
        case 'X':
            return 'L';
        case 'Y':
            return 'T';
        case 'Z':
            return 'W';
        default:
            throw Error('Got to end of getDesiredOutcome without an outcome.')
    }
}

/** Takes the encrypted input the opponent's play to either rock, paper, or scissors. */
const getOpponentPlay = (opponentHand: EncryptedOpponentHand): Play => {
    switch (opponentHand) {
        case 'A':
            return 'rock';
        case 'B':
            return 'paper';
        case 'C':
            return 'scissors';
        default:
            throw Error('Got to end of getOpponentPlay without figuring opponents play.');
    }
}

/** Given the opponent's play and the desired outcome, determines what I should play. */
const getMyPlay = (opponent: Play, result: DesiredOutcome): Play => {
    if (result === 'T'){
        return opponent;
    }
    if (opponent === "paper") {
        switch (result) {
            case 'L':
                return 'rock'
            case 'W':
                return 'scissors';
            default:
                throw Error('Invalid option found for result');
        }
    }
    if (opponent === "scissors") {
        switch (result) {
            case 'L':
                return 'paper'
            case 'W':
                return 'rock';
            default:
                throw Error('Invalid option found for result');
        }
    }
    if (opponent === "rock") {
        switch (result) {
            case 'L':
                return 'scissors'
            case 'W':
                return 'paper';
            default:
                throw Error('Invalid option found for result');
        }
    }
    throw Error('Got to end of endMyPlay without a result.')
}

/** Gets the score for the outcome. */
const getGameScore = (result: DesiredOutcome) => {
    if (result === 'W'){
        return 6;
    }
    if (result === 'T') {
        return 3;
    }

    return 0;
}

/** Gets the score for my play. */
const getMyPlayScore = (play: Play) => {
    if (play === 'rock'){
        return 1;
    }
    if (play === 'paper') {
        return 2;
    }
    if (play === 'scissors') {
        return 3;
    }
    return 0;
}

const exec = (fileName: string) => {
  var score = 0;
  const games = readFileSync(fileName).toString().split("\n");
  games.forEach(game => {
    const [p1, p2] = game.split(' ') as [EncryptedOpponentHand, EncryptedDesiredOutcome];
    const opponentPlay = getOpponentPlay(p1);
    const desiredOutcome = getDesiredOutcome(p2);
    const myPlay = getMyPlay(opponentPlay, desiredOutcome);
    const myPlayScore = getMyPlayScore(myPlay);
    const getOutcomeScore = getGameScore(desiredOutcome);

    score += myPlayScore + getOutcomeScore;
  });
  console.log(score)
};

exec("dist/day2/input.txt");