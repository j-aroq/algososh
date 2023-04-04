import React from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const StringComponent: React.FC = () => {
  return (
    <SolutionLayout title="Строка">
      <div className={styles.form_input}>
        <Input isLimitText={true} maxLength={11}></Input>
        <Button text="Развернуть"></Button>
      </div>
      <div className={styles.circles_container}>
        <Circle letter="H"></Circle>
        <Circle letter="E"></Circle>
        <Circle letter="L"></Circle>
      </div>
    </SolutionLayout>
  );
};
