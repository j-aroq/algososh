import React from "react";
import styles from "./fibonacci-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/time-delay";
import { getFibonacciNumbers } from "../../utils/fibonacci";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [numbersArr, setNumbersArr] = React.useState<number[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onChange = (evt: React.SyntheticEvent<HTMLInputElement, Event>) => {
    const element = evt.currentTarget.value;
    setInputValue(element);
  };

  const getFibonacci = async (inputValue: string) => {
    const value = Number(inputValue);
    if (value > 19) {
      setInputValue("");
      return 0;
    }
    const fibonacciArr: number[] = getFibonacciNumbers(value);
    const extraFibonacciArr: number[] = [];
    setIsLoading(true);
    for (let num of fibonacciArr) {
      extraFibonacciArr.push(num);
      setNumbersArr([...extraFibonacciArr]);
      await delay(DELAY_IN_MS);
    }
    setIsLoading(false);
  };
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.form_container}>
        <div className={styles.form_input}>
          <Input
            type="number"
            max={19}
            isLimitText={true}
            onChange={onChange}
            value={inputValue}
          />
          <Button
            text="Развернуть"
            onClick={() => getFibonacci(inputValue)}
            isLoader={isLoading}
          />
        </div>
        <ul className={styles.circles_container}>
          {numbersArr.map((item, index) => {
            return (
              <Circle
                key={index}
                letter={item.toString()}
                index={index}
                extraClass={styles.circle}
              />
            );
          })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
