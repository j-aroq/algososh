import React from "react";
import styles from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";

export const SortingPage: React.FC = () => {
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.sorting_container}>
        <RadioInput
          label="Выбор"
          defaultChecked
          extraClass="mr-20"
        ></RadioInput>
        <RadioInput label="Пузырек" extraClass="mr-25"></RadioInput>
        <Button
          text="По возрастанию"
          sorting={Direction.Ascending}
          extraClass="mr-6"
        ></Button>
        <Button
          text="По убыванию"
          sorting={Direction.Descending}
          extraClass="mr-40"
        ></Button>
        <Button text="Новый массив"></Button>
      </div>
      <div className={styles.columns_container}>
        <Column index={10} state={ElementStates.Default}></Column>
        <Column index={2} state={ElementStates.Changing}></Column>
        <Column index={31} state={ElementStates.Default}></Column>
      </div>
    </SolutionLayout>
  );
};
