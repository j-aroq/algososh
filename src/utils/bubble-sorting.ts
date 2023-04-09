import React from "react";
import { TColumn } from "../types/column";
import { SHORT_DELAY_IN_MS } from "../constants/delays";
import { ElementStates } from "../types/element-states";
import { delay } from "../utils/time-delay";
import { swap } from "../utils/swap";

export const bubbleSorting = async (
  arr: TColumn[],
  setNumbersArr: React.Dispatch<React.SetStateAction<TColumn[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  mode: "ascending" | "descending"
) => {
  const { length } = arr;
  const extraArr: TColumn[] = arr;
  setIsLoading(true);
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      extraArr[j].state = ElementStates.Changing;
      extraArr[j + 1].state = ElementStates.Changing;
      setNumbersArr([...extraArr]);
      await delay(SHORT_DELAY_IN_MS);

      let toBeSorted;
      if (mode === "descending") {
        toBeSorted = extraArr[j].number < extraArr[j + 1].number;
      }
      if (mode === "ascending") {
        toBeSorted = extraArr[j].number > extraArr[j + 1].number;
      }
      if (toBeSorted) {
        extraArr[j].state = ElementStates.Changing;
        extraArr[j + 1].state = ElementStates.Changing;
        swap(extraArr, j, j + 1);
        setNumbersArr([...extraArr]);
        await delay(SHORT_DELAY_IN_MS);
      }

      extraArr[j].state = ElementStates.Default;
      extraArr[j + 1].state = ElementStates.Default;

      if (j === length - i - 2) {
        extraArr[j + 1].state = ElementStates.Modified;
      }

      setNumbersArr([...extraArr]);
      await delay(SHORT_DELAY_IN_MS);
    }
  }
  extraArr[0].state = ElementStates.Modified;
  setNumbersArr([...extraArr]);
  setIsLoading(false);
};
