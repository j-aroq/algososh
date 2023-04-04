import React from "react";
import styles from "./fibonacci-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.form_container}>
        <div className={styles.form_input}>
          <Input type="number" isLimitText={true} max={19}></Input>
          <Button text="Рассчитать"></Button>
        </div>
        <div className={styles.circles_container}>
          <Circle letter="H" index={1}></Circle>
        </div>
        <div className={styles.circles_container}>
          <Circle letter="I" index={2}></Circle>
        </div>
      </div>
    </SolutionLayout>
  );
};
