import React from "react";
import styles from "./queue-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./queue";
import { TCircle } from "../../types/circle";
import { delay } from "../../utils/time-delay";
import { HEAD, TAIL } from "../../constants/element-captions";

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const size: number = 7;
  const queueArr: TCircle[] = [...Array(size)].map(() => ({
    value: "",
    state: ElementStates.Default,
  }));
  const [circleArr, setCircleArr] = React.useState<TCircle[]>(queueArr);
  const [isLoadingEnqueue, setIsLoadingEnqueue] =
    React.useState<boolean>(false);
  const [isLoadingDenqueue, setIsLoadingDenqueue] =
    React.useState<boolean>(false);
  const [headIndex, setHeadIndex] = React.useState<number | null>(null);
  const queue = React.useMemo(() => new Queue<string>(size), []);

  const onChange = (evt: React.SyntheticEvent<HTMLInputElement, Event>) => {
    const element = evt.currentTarget.value;
    setInputValue(element);
  };

  const clear = () => {
    queue.clear();
    setCircleArr([...queueArr]);
    setHeadIndex(null);
  };

  const enqueue = async () => {
    const extraArr = [...circleArr];
    setIsLoadingEnqueue(true);
    setInputValue("");

    queue.enqueue(inputValue);
    const head = queue.getHead();
    const tail = queue.getTail();
    extraArr[head.index] = { value: head.value, head: HEAD };
    setHeadIndex(head.index);
    if (tail.index > 0) extraArr[tail.index - 1].tail = "";
    extraArr[tail.index].tail = TAIL;
    extraArr[tail.index].value = tail.value;
    extraArr[tail.index].state = ElementStates.Changing;

    setCircleArr([...extraArr]);
    await delay(SHORT_DELAY_IN_MS);
    extraArr[tail.index].state = ElementStates.Default;
    setCircleArr([...extraArr]);
    setIsLoadingEnqueue(false);
  };

  const dequeue = async () => {
    const extraArr = [...circleArr];
    setIsLoadingDenqueue(true);
    const head = queue.getHead();
    const tail = queue.getTail();

    if (head.index === tail.index) {
      clear();
    } else {
      queue.dequeue();
      const head = queue.getHead();
      if (head.index > 0) {
        extraArr[head.index - 1] = { value: "", head: "" };
      }
      extraArr[head.index].head = HEAD;
      extraArr[head.index].value = head.value;
      extraArr[head.index].state = ElementStates.Changing;

      setCircleArr([...extraArr]);
      await delay(SHORT_DELAY_IN_MS);
      extraArr[head.index].state = ElementStates.Default;
      setCircleArr([...extraArr]);
    }

    setIsLoadingDenqueue(false);
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.form_input}>
        <Input
          type="text"
          maxLength={4}
          value={inputValue}
          isLimitText={true}
          onChange={onChange}
          extraClass="mr-6"
        />
        <Button
          text="Добавить"
          onClick={enqueue}
          isLoader={isLoadingEnqueue}
          disabled={
            isLoadingDenqueue ||
            !inputValue ||
            circleArr[circleArr.length - 1].value !== ""
          }
          extraClass="mr-6"
        />
        <Button
          text="Удалить"
          onClick={dequeue}
          isLoader={isLoadingDenqueue}
          disabled={isLoadingEnqueue || headIndex === null}
          extraClass="mr-40"
        />
        <Button
          text="Очистить"
          onClick={clear}
          disabled={isLoadingEnqueue || isLoadingDenqueue || headIndex === null}
        />
      </div>
      <div className={styles.circles_container}>
        {circleArr.map((item, index) => {
          return (
            <Circle
              key={index}
              index={index}
              state={item.state}
              letter={typeof item.value === "string" ? item.value : ""}
              head={item.head}
              tail={item.tail}
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
