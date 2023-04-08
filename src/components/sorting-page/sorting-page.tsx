import React from "react";
import styles from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { TColumn } from "../../types/column";
import { Direction } from "../../types/direction";
import { randomArr } from "../../utils/random-array";
import { bubbleSorting } from "../../utils/bubble-sorting";
import { selectionSorting } from "../../utils/selection-sorting";

export const SortingPage: React.FC = () => {
  const [numbersArr, setNumbersArr] = React.useState<TColumn[]>([]);
  const [isLoadingAscending, setIsLoadingAscending] =
    React.useState<boolean>(false);
  const [isLoadingDescending, setIsLoadingDescending] =
    React.useState<boolean>(false);
  const [sortingMode, setSortingMode] = React.useState<string>("selection");
  const disabled = isLoadingAscending || isLoadingDescending;

  const onClickNewArr = () => {
    setNumbersArr(randomArr());
  };

  const onClickSortAscending = () => {
    if (sortingMode === "selection") {
      selectionSorting(
        numbersArr,
        setNumbersArr,
        setIsLoadingAscending,
        "ascending"
      );
    }
    if (sortingMode === "bubble") {
      bubbleSorting(
        numbersArr,
        setNumbersArr,
        setIsLoadingAscending,
        "ascending"
      );
    }
  };

  const onClickSortDescending = () => {
    if (sortingMode === "selection") {
      selectionSorting(
        numbersArr,
        setNumbersArr,
        setIsLoadingDescending,
        "descending"
      );
    }
    if (sortingMode === "bubble") {
      bubbleSorting(
        numbersArr,
        setNumbersArr,
        setIsLoadingDescending,
        "descending"
      );
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.sorting_container}>
        <RadioInput
          label="Выбор"
          extraClass="mr-20"
          value="selection"
          checked={sortingMode === "selection"}
          onChange={() => setSortingMode("selection")}
          disabled={disabled}
        ></RadioInput>
        <RadioInput
          label="Пузырёк"
          extraClass="mr-25"
          value="bubble"
          checked={sortingMode === "bubble"}
          onChange={() => setSortingMode("bubble")}
          disabled={disabled}
        />
        <Button
          text="По возрастанию"
          sorting={Direction.Ascending}
          extraClass="mr-6"
          onClick={onClickSortAscending}
          isLoader={isLoadingAscending}
          disabled={isLoadingDescending || numbersArr.length === 0}
        />
        <Button
          text="По убыванию"
          sorting={Direction.Descending}
          extraClass="mr-40"
          onClick={onClickSortDescending}
          isLoader={isLoadingDescending}
          disabled={isLoadingAscending || numbersArr.length === 0}
        />
        <Button
          text="Новый массив"
          onClick={onClickNewArr}
          disabled={isLoadingAscending || isLoadingDescending}
        />
      </div>
      <div className={styles.columns_container}>
        {!!numbersArr &&
          numbersArr.map((item, index) => {
            return (
              <Column key={index} index={item.number} state={item.state} />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
