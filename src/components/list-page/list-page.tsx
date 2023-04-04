import React from "react";
import styles from "./list-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";

export const ListPage: React.FC = () => {
  return (
    <SolutionLayout title="Связный список">
      <div className={`${styles.form_input} mb-6`}>
        <Input isLimitText={true} maxLength={4} extraClass="mr-6"></Input>
        <Button text="Добавить в head"></Button>
        <Button text="Добавить в tail"></Button>
        <Button text="Удалить из head"></Button>
        <Button text="Удалить из tail"></Button>
      </div>
      <div className={styles.form_input_index}>
        <Input extraClass="mr-6"></Input>
        <Button text="Добавить по индексу"></Button>
        <Button text="Удалить по индексу"></Button>
      </div>
      <div className={styles.circles_container}>
        <Circle
          letter="10"
          index={0}
          head="head"
          // extraClass={styles.circle_margin}
        ></Circle>
        <ArrowIcon />
        <Circle
          letter="21"
          index={1}
          // extraClass={styles.circle_margin}
        ></Circle>
        <ArrowIcon />
        <Circle
          letter="3"
          index={2}
          tail="tail"
          // extraClass={styles.circle_margin}
        ></Circle>
      </div>
      {/* <div className={styles.circles_container}>
        <div className={styles.circles_column}>
          <Circle letter="1" isSmall></Circle>
          <Circle
            letter="1"
            index={0}
            head="head"
            extraClass={styles.circle_margin}
          ></Circle>
          <Circle letter="1" isSmall></Circle>
        </div>
        <ArrowIcon />
        <div className={styles.circles_column}>
          <Circle letter="2" isSmall></Circle>
          <Circle
            letter="2"
            index={1}
            extraClass={styles.circle_margin}
          ></Circle>
          <Circle letter="2" isSmall></Circle>
        </div>
        <ArrowIcon />
        <div className={styles.circles_column}>
          <Circle letter="3" isSmall></Circle>
          <Circle
            letter="3"
            index={2}
            tail="tail"
            extraClass={styles.circle_margin}
          ></Circle>
          <Circle letter="3" isSmall></Circle>
        </div>
      </div> */}
    </SolutionLayout>
  );
};
