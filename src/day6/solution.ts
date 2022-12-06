import {readFileSync} from "fs";

export const getSolution = (fileName: string, messageLength: number) => {
    const signal = readFileSync(fileName).toString().split("");

    for (let leadingIndex = 0; leadingIndex + (messageLength - 1) < signal.length; leadingIndex++) {
      const leadingChar = signal[leadingIndex];
      const set = new Set(leadingChar)
      for (let trailingIndex = leadingIndex + 1; trailingIndex < leadingIndex + messageLength; trailingIndex++) {
          const trailingChar = signal[trailingIndex];
          set.add(trailingChar);
      }
      const uniqueArray = [...set];
      if (uniqueArray.length === messageLength){
          console.log(leadingIndex + messageLength);
          return;
      }
    }
    throw Error('Reached end of message without finding a solution.')
  };