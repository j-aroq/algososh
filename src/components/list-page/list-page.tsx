import React from "react";
import styles from "./list-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { TCircle } from "../../types/circle";
import { delay } from "../../utils/time-delay";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { LinkedList } from "./linked-list";
import {
  TIsLoadingInsertion,
  TIsLoadingRemoval,
} from "../../types/is-loading-actions";
import { HEAD, TAIL } from "../../constants/element-captions";

export const ListPage: React.FC = () => {
  const size: number = 4;
  const randomArr: TCircle[] = [...Array(size)].map(() => ({
    value: String(Math.floor(Math.random() * 100)),
    state: ElementStates.Default,
  }));

  const [circleArr, setCircleArr] = React.useState<TCircle[]>([]);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [inputIndex, setInputIndex] = React.useState<number>();
  const [isLoadingInsertion, setIsLoadingInsertion] =
    React.useState<TIsLoadingInsertion>({
      isLoadingInsertHead: false,
      isLoadingInsertTail: false,
      isLoadingInsertByIndex: false,
    });
  const [isLoadingRemoval, setIsLoadingRemoval] =
    React.useState<TIsLoadingRemoval>({
      isLoadingRemoveHead: false,
      isLoadingRemoveTail: false,
      isLoadingRemoveFromIndex: false,
    });
  const linkedList = React.useMemo(
    () => new LinkedList<TCircle>(randomArr),
    []
  );
  const disabled = isLoadingInsertion.isLoading || isLoadingRemoval.isLoading;

  React.useEffect(() => {
    setCircleArr(linkedList.toArray());
  }, []);

  const onChangeValue = (
    evt: React.SyntheticEvent<HTMLInputElement, Event>
  ) => {
    const element = evt.currentTarget.value;
    setInputValue(element);
  };

  const onChangeIndex = (
    evt: React.SyntheticEvent<HTMLInputElement, Event>
  ) => {
    const index = Number(evt.currentTarget.value.replace(/[^0-9]/g, ""));
    setInputIndex(index);
  };

  const setup = async (arr: TCircle[]) => {
    setCircleArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);
  };

  const addInHead = async () => {
    setIsLoadingInsertion({ isLoadingInsertHead: true, isLoading: true });
    const element = {
      value: inputValue,
      state: ElementStates.Default,
    };

    const extraArr = linkedList.toArray();
    const position = 0;
    extraArr[position] = {
      ...extraArr[position],
      extra_circle: {
        insertion: true,
        value: inputValue,
        state: ElementStates.Changing,
      },
    };
    await setup(extraArr);
    extraArr[position] = {
      ...extraArr[position],
      extra_circle: undefined,
    };

    extraArr.unshift({
      value: inputValue,
      state: ElementStates.Modified,
    });

    if (linkedList.getSize() === 0) {
      extraArr.pop();
    }

    linkedList.insertAt(element, position);
    await setup(extraArr);
    extraArr[position].state = ElementStates.Default;
    setInputValue("");
    setIsLoadingInsertion({ isLoadingInsertHead: false, isLoading: false });
  };

  const addInTail = async () => {
    setIsLoadingInsertion({ isLoadingInsertTail: true, isLoading: true });

    const extraArr = linkedList.toArray();
    const element = {
      value: inputValue,
      state: ElementStates.Default,
    };

    linkedList?.append(element);

    const position = extraArr.length - 1;
    extraArr[position] = {
      ...extraArr[position],
      extra_circle: {
        insertion: true,
        value: inputValue,
        state: ElementStates.Changing,
      },
    };
    await setup(extraArr);
    extraArr[position] = {
      ...extraArr[position],
      extra_circle: undefined,
    };
    extraArr.push({
      value: inputValue,
      state: ElementStates.Modified,
    });
    await setup(extraArr);
    extraArr[position + 1].state = ElementStates.Default;
    setInputValue("");
    setIsLoadingInsertion({ isLoadingInsertTail: false, isLoading: false });
  };

  const removeHead = async () => {
    setIsLoadingRemoval({ isLoadingRemoveHead: true, isLoading: true });
    const extraArr = linkedList.toArray();

    const position = 0;
    const element = linkedList.deleteByIndex(position);

    extraArr[position] = {
      ...extraArr[position],
      value: "",
      extra_circle: {
        removal: true,
        value: element !== null ? element.value : "",
        state: ElementStates.Changing,
      },
    };
    await setup(extraArr);
    extraArr.shift();
    setCircleArr(extraArr);

    setIsLoadingRemoval({ isLoadingRemoveHead: false, isLoading: false });
  };

  const removeTail = async () => {
    setIsLoadingRemoval({ isLoadingRemoveTail: true, isLoading: true });
    const extraArr = linkedList.toArray();
    const position = linkedList.getSize() - 1;
    const element = linkedList.deleteByIndex(position);
    extraArr[position] = {
      ...extraArr[position],
      value: "",
      extra_circle: {
        removal: true,
        value: element !== null ? element.value : "",
        state: ElementStates.Changing,
      },
    };
    await setup(extraArr);
    extraArr.pop();
    setCircleArr(extraArr);
    setIsLoadingRemoval({ isLoadingRemoveTail: false, isLoading: false });
  };

  const addByIndex = async () => {
    setIsLoadingInsertion({ isLoadingInsertByIndex: true, isLoading: true });
    setInputIndex(undefined);
    const extraArr = linkedList.toArray();

    const element = {
      value: inputValue,
      state: ElementStates.Default,
    };

    if (inputIndex! > extraArr.length - 1) {
      setIsLoadingInsertion({
        isLoadingInsertByIndex: false,
        isLoading: false,
      });
      return 0;
    }

    const position = inputIndex!;
    linkedList?.insertAt(element, position);
    const newElement = linkedList.addByIndex(position);

    for (let i = 0; i <= position; i++) {
      extraArr[i] = {
        ...extraArr[i],
        state: ElementStates.Changing,
        extra_circle: {
          insertion: true,
          value: newElement!.value,
          state: ElementStates.Changing,
        },
      };
      await delay(SHORT_DELAY_IN_MS);
      if (i >= 0) {
        extraArr[i - 1] = {
          ...extraArr[i - 1],
          extra_circle: {
            insertion: false,
            value: undefined,
            state: ElementStates.Changing,
          },
        };
        await setup(extraArr);
      }
    }

    extraArr[position] = {
      ...extraArr[position],
      extra_circle: {
        insertion: false,
        value: undefined,
      },
    };

    extraArr.map((item) => (item.state = ElementStates.Default));
    extraArr.splice(position, 0, {
      value: newElement!.value,
      state: ElementStates.Modified,
    });
    await setup(extraArr);
    await delay(SHORT_DELAY_IN_MS);
    extraArr.map((item) => (item.state = ElementStates.Default));
    setInputValue("");
    setIsLoadingInsertion({ isLoadingInsertByIndex: false, isLoading: false });
  };

  const removeFromIndex = async () => {
    setIsLoadingRemoval({ isLoadingRemoveFromIndex: true, isLoading: true });
    setInputIndex(undefined);
    const extraArr = linkedList.toArray();
    if (inputIndex! > extraArr.length - 1) {
      setIsLoadingRemoval({
        isLoadingRemoveFromIndex: false,
        isLoading: false,
      });
      return 0;
    }
    const position = inputIndex!;
    const element = linkedList.deleteByIndex(position);

    for (let i = 0; i <= position; i++) {
      extraArr[i] = {
        ...extraArr[i],
        state: ElementStates.Changing,
      };
      await setup(extraArr);
      if (i === position) {
        extraArr[i] = {
          ...extraArr[i],
          value: "",
          extra_circle: {
            removal: true,
            value: element !== null ? element.value : "",
            state: ElementStates.Changing,
          },
        };
        await setup(extraArr);
      }
    }

    extraArr.splice(position, 1);
    await setup(extraArr);
    extraArr.map((item) => (item.state = ElementStates.Default));
    setIsLoadingRemoval({
      isLoadingRemoveFromIndex: false,
      isLoading: false,
    });
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={`${styles.form_input} mb-6`}>
        <Input
          type="text"
          maxLength={4}
          isLimitText={true}
          value={inputValue}
          onChange={onChangeValue}
          disabled={disabled}
          extraClass="mr-6"
        />
        <Button
          text="Добавить в head"
          onClick={addInHead}
          disabled={!inputValue || disabled || linkedList.getSize() === 6}
          isLoader={isLoadingInsertion?.isLoadingInsertHead}
        />
        <Button
          text="Добавить в tail"
          onClick={addInTail}
          disabled={!inputValue || disabled || linkedList.getSize() === 6}
          isLoader={isLoadingInsertion?.isLoadingInsertTail}
        />
        <Button
          text="Удалить из head"
          onClick={removeHead}
          disabled={disabled || linkedList.getSize() === 0}
          isLoader={isLoadingRemoval.isLoadingRemoveHead}
        />
        <Button
          text="Удалить из tail"
          onClick={removeTail}
          disabled={disabled || linkedList.getSize() === 0}
          isLoader={isLoadingRemoval.isLoadingRemoveTail}
        />
      </div>
      <div className={styles.form_input_index}>
        <Input
          placeholder="Введите индекс"
          maxLength={1}
          value={inputIndex || ""}
          onChange={onChangeIndex}
          disabled={disabled}
          extraClass="mr-6"
        />
        <Button
          text="Добавить по индексу"
          onClick={addByIndex}
          disabled={
            !inputValue ||
            !inputIndex ||
            disabled ||
            linkedList.getSize() === 6 ||
            inputIndex >= linkedList.getSize()
          }
          isLoader={isLoadingInsertion?.isLoadingInsertByIndex}
        />
        <Button
          text="Удалить по индексу"
          onClick={removeFromIndex}
          disabled={
            !inputIndex || disabled || inputIndex >= linkedList.getSize()
          }
          isLoader={isLoadingRemoval.isLoadingRemoveFromIndex}
        />
      </div>
      <ul className={styles.circles_container}>
        {circleArr.map((item, index) => {
          return (
            <li key={index} className={styles.circles_column}>
              <Circle
                state={item.state}
                letter={typeof item.value === "string" ? item.value : ""}
                index={index}
                head={index === 0 ? HEAD : ""}
                tail={index === circleArr.length - 1 ? TAIL : ""}
                extraClass={styles.circle}
              />
              {circleArr.length > index + 1 && <ArrowIcon />}
              {item.extra_circle?.insertion && (
                <Circle
                  isSmall={true}
                  letter={
                    item.extra_circle?.value !== null
                      ? item.extra_circle?.value
                      : ""
                  }
                  state={item.extra_circle.state}
                  extraClass={styles.circle_top}
                />
              )}
              {item.extra_circle?.removal && (
                <Circle
                  isSmall={true}
                  letter={
                    item.extra_circle?.value !== null
                      ? item.extra_circle?.value
                      : ""
                  }
                  state={item.extra_circle.state}
                  extraClass={styles.circle_bottom}
                />
              )}
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
