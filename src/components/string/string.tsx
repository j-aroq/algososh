import React from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { TCircle } from "../../types/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { swap } from "../../utils/swap";
import { delay } from "../../utils/time-delay";

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [circleArr, setCircleArr] = React.useState<TCircle[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onChange = (evt: React.SyntheticEvent<HTMLInputElement, Event>) => {
    const element = evt.currentTarget.value;
    setInputValue(element);
  };

  const reverseString = async () => {
    const extraCircleArr: TCircle[] = inputValue.split("").map((item) => {
      return { value: item, state: ElementStates.Default };
    });
    setIsLoading(true);

    let start: number = 0;
    let end: number = extraCircleArr.length - 1;

    while (end >= start) {
      if (end === start) {
        await delay(DELAY_IN_MS);
        extraCircleArr[start].state = ElementStates.Modified;
        extraCircleArr[end].state = ElementStates.Modified;
        setCircleArr([...extraCircleArr]);
        await delay(DELAY_IN_MS);
      } else {
        extraCircleArr[start].state = ElementStates.Changing;
        extraCircleArr[end].state = ElementStates.Changing;
        setCircleArr([...extraCircleArr]);
        await delay(DELAY_IN_MS);
        swap(extraCircleArr, start, end);
        extraCircleArr[start].state = ElementStates.Modified;
        extraCircleArr[end].state = ElementStates.Modified;
        setCircleArr([...extraCircleArr]);
        await delay(DELAY_IN_MS);
      }

      start++;
      end--;
    }
    setInputValue("");
    setIsLoading(false);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.form_container}>
        <Input
          maxLength={11}
          isLimitText={true}
          value={inputValue}
          extraClass={styles.form_input}
          onChange={onChange}
        />
        <Button
          text="Развернуть"
          isLoader={isLoading}
          onClick={reverseString}
          disabled={!inputValue}
        />
      </div>
      <ul className={styles.circles_container}>
        {circleArr &&
          circleArr.map((item, index) => {
            return (
              <Circle
                key={index}
                state={item.state}
                letter={typeof item.value === "string" ? item.value : ""}
              />
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
