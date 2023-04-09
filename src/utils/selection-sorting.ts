import React from "react";
import { TColumn } from "../types/column";
import { SHORT_DELAY_IN_MS } from "../constants/delays";
import { ElementStates } from "../types/element-states";
import { delay } from "../utils/time-delay";
import { swap } from "../utils/swap";

export const selectionSorting = async (
  arr: TColumn[],
  setNumbersArr: React.Dispatch<React.SetStateAction<TColumn[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  mode: "ascending" | "descending"
) => {
  const { length } = arr;
  const extraArr: TColumn[] = arr;
  setIsLoading(true);
  for (let i = 0; i < length - 1; i++) {
    let maxIndex = i;

    for (let j = i + 1; j < length; j++) {
      extraArr[maxIndex].state = ElementStates.Changing;
      extraArr[j].state = ElementStates.Changing;
      setNumbersArr([...extraArr]);
      await delay(SHORT_DELAY_IN_MS);

      let toBeSorted;
      if (mode === "descending")
        toBeSorted = extraArr[maxIndex].number < extraArr[j].number;
      if (mode === "ascending")
        toBeSorted = extraArr[maxIndex].number > extraArr[j].number;
      if (toBeSorted) {
        extraArr[maxIndex].state =
          i === maxIndex ? ElementStates.Changing : ElementStates.Default;
        maxIndex = j;
        setNumbersArr([...extraArr]);
        await delay(SHORT_DELAY_IN_MS);
      }

      if (j !== maxIndex) {
        extraArr[j].state = ElementStates.Default;
        setNumbersArr([...extraArr]);
        await delay(SHORT_DELAY_IN_MS);
      }
    }

    if (i === maxIndex) {
      extraArr[i].state = ElementStates.Modified;
      setNumbersArr([...extraArr]);
      await delay(SHORT_DELAY_IN_MS);
    } else {
      swap(extraArr, maxIndex, i);
      extraArr[i].state = ElementStates.Modified;
      setNumbersArr([...extraArr]);
      await delay(SHORT_DELAY_IN_MS);
      extraArr[maxIndex].state = ElementStates.Default;
      setNumbersArr([...extraArr]);
      await delay(SHORT_DELAY_IN_MS);
    }
  }
  extraArr[length - 1].state = ElementStates.Modified;
  setNumbersArr([...extraArr]);
  setIsLoading(false);
};
