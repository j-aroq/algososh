import React from "react";
import styles from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const StackPage: React.FC = () => {
  return (
    <SolutionLayout title="Стек">
      <div className={styles.form_input}>
        <Input isLimitText={true} maxLength={4} extraClass="mr-6"></Input>
        <Button text="Добавить" extraClass="mr-6"></Button>
        <Button text="Удалить" extraClass="mr-40"></Button>
        <Button text="Очистить"></Button>
      </div>
      <div className={styles.circles_container}>
        <Circle letter="1" index={0}></Circle>
        <Circle letter="2" index={1}></Circle>
        <Circle letter="3" index={2} head="top"></Circle>
      </div>
    </SolutionLayout>
  );
};
