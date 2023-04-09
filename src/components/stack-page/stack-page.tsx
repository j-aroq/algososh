import React from "react";
import styles from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/time-delay";
import { TCircle } from "../../types/circle";
import { ElementStates } from "../../types/element-states";
import { Stack } from "./stack";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [circleArr, setCircleArr] = React.useState<TCircle[]>([]);
  const [isLoadingAdd, setIsLoadingAdd] = React.useState<boolean>(false);
  const [isLoadingDelete, setIsLoadingDelete] = React.useState<boolean>(false);
  const stack = React.useMemo(() => new Stack<TCircle>(), []);
  const disabled = circleArr.length === 0;

  const onChange = (evt: React.SyntheticEvent<HTMLInputElement, Event>) => {
    const element = evt.currentTarget.value;
    setInputValue(element);
  };

  const push = async () => {
    setIsLoadingAdd(true);
    setInputValue("");

    if (inputValue === "") return 0;
    stack.push({
      value: inputValue,
      head: "top",
    });
    const extraArr = stack.getElemets();
    const position = extraArr.length - 1;

    extraArr.map((item) => (item.head = ""));

    setCircleArr(extraArr);
    extraArr[position].head = "top";
    extraArr[position].state = ElementStates.Changing;

    setCircleArr(extraArr);
    await delay(SHORT_DELAY_IN_MS);
    extraArr[position].state = ElementStates.Default;
    setCircleArr(extraArr);
    setIsLoadingAdd(false);
  };

  const pop = async () => {
    setIsLoadingDelete(true);
    circleArr[circleArr.length - 1].state = ElementStates.Changing;
    setCircleArr(circleArr);
    await delay(SHORT_DELAY_IN_MS);

    stack.pop();
    const extraArr = stack.getElemets();

    if (extraArr.length > 0) {
      extraArr[extraArr.length - 1].head = "top";
      extraArr[extraArr.length - 1].state = ElementStates.Default;
      setCircleArr(extraArr);
      await delay(SHORT_DELAY_IN_MS);
      extraArr[extraArr.length - 1].state = ElementStates.Default;
      setCircleArr(extraArr);
    } else {
      clear();
      setIsLoadingDelete(false);
    }
    setIsLoadingDelete(false);
  };

  const clear = () => {
    stack.clear();
    setCircleArr([]);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.form_input}>
        <Input
          type="text"
          maxLength={4}
          isLimitText={true}
          value={inputValue}
          onChange={onChange}
          extraClass="mr-6"
        />
        <Button
          text="Добавить"
          onClick={push}
          isLoader={isLoadingAdd}
          disabled={isLoadingAdd || !inputValue}
          extraClass="mr-6"
        />
        <Button
          text="Удалить"
          onClick={pop}
          isLoader={isLoadingDelete}
          disabled={disabled || isLoadingAdd}
          extraClass="mr-40"
        />
        <Button
          text="Очистить"
          disabled={disabled || isLoadingAdd || isLoadingDelete}
          onClick={clear}
        />
      </div>
      <div className={styles.circles_container}>
        {circleArr &&
          circleArr.map((item, index) => {
            return (
              <Circle
                key={index}
                index={index}
                state={item.state}
                letter={typeof item.value === "string" ? item.value : ""}
                head={item.head}
              />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
