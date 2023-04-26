import { TColumn } from "../../types/column";
import { ElementStates } from "../../types/element-states";
import { bubbleSorting } from "../../utils/bubble-sorting";
import { selectionSorting } from "../../utils/selection-sorting";

describe("Bubble sorting ascending", () => {
  it("Should sort empty array", async () => {
    const numbersArr = [{}];
    const checkArr: TColumn[] = [{ state: ElementStates.Modified }];
    const arr = await bubbleSorting(numbersArr, "ascending");
    expect(arr).toEqual(checkArr);
  });

  it("Should sort array with 1 element", async () => {
    const numbersArr = [{ number: 5 }];
    const checkArr: TColumn[] = [{ number: 5, state: ElementStates.Modified }];
    const arr = await bubbleSorting(numbersArr, "ascending");
    expect(arr).toEqual(checkArr);
  });

  it("Should sort array with several elements", async () => {
    const numbersArr = [{ number: 5 }, { number: 30 }, { number: 15 }];
    const checkArr: TColumn[] = [
      { number: 5, state: ElementStates.Modified },
      { number: 15, state: ElementStates.Modified },
      { number: 30, state: ElementStates.Modified },
    ];
    const arr = await bubbleSorting(numbersArr, "ascending");
    expect(arr).toEqual(checkArr);
  });
});

describe("Bubble sorting descending", () => {
  it("Should sort empty array", async () => {
    const numbersArr = [{}];
    const checkArr: TColumn[] = [{ state: ElementStates.Modified }];
    const arr = await bubbleSorting(numbersArr, "descending");
    expect(arr).toEqual(checkArr);
  });

  it("Should sort array with 1 element", async () => {
    const numbersArr = [{ number: 5 }];
    const checkArr: TColumn[] = [{ number: 5, state: ElementStates.Modified }];
    const arr = await bubbleSorting(numbersArr, "descending");
    expect(arr).toEqual(checkArr);
  });

  it("Should sort array with several elements", async () => {
    const numbersArr = [{ number: 5 }, { number: 30 }, { number: 15 }];
    const checkArr: TColumn[] = [
      { number: 30, state: ElementStates.Modified },
      { number: 15, state: ElementStates.Modified },
      { number: 5, state: ElementStates.Modified },
    ];
    const arr = await bubbleSorting(numbersArr, "descending");
    expect(arr).toEqual(checkArr);
  });
});

describe("Selection sorting ascending", () => {
  it("Should sort empty array", async () => {
    const numbersArr = [{}];
    const checkArr: TColumn[] = [{ state: ElementStates.Modified }];
    const arr = await selectionSorting(numbersArr, "ascending");
    expect(arr).toEqual(checkArr);
  });

  it("Should sort array with 1 element", async () => {
    const numbersArr = [{ number: 5 }];
    const checkArr: TColumn[] = [{ number: 5, state: ElementStates.Modified }];
    const arr = await selectionSorting(numbersArr, "ascending");
    expect(arr).toEqual(checkArr);
  });

  it("Should sort array with several elements", async () => {
    const numbersArr = [{ number: 5 }, { number: 30 }, { number: 15 }];
    const checkArr: TColumn[] = [
      { number: 5, state: ElementStates.Modified },
      { number: 15, state: ElementStates.Modified },
      { number: 30, state: ElementStates.Modified },
    ];
    const arr = await selectionSorting(numbersArr, "ascending");
    expect(arr).toEqual(checkArr);
  });
});

describe("Selection sorting descending", () => {
  it("Should sort empty array", async () => {
    const numbersArr = [{}];
    const checkArr: TColumn[] = [{ state: ElementStates.Modified }];
    const arr = await selectionSorting(numbersArr, "descending");
    expect(arr).toEqual(checkArr);
  });

  it("Should sort array with 1 element", async () => {
    const numbersArr = [{ number: 5 }];
    const checkArr: TColumn[] = [{ number: 5, state: ElementStates.Modified }];
    const arr = await selectionSorting(numbersArr, "descending");
    expect(arr).toEqual(checkArr);
  });

  it("Should sort array with several elements", async () => {
    const numbersArr = [{ number: 5 }, { number: 30 }, { number: 15 }];
    const checkArr: TColumn[] = [
      { number: 30, state: ElementStates.Modified },
      { number: 15, state: ElementStates.Modified },
      { number: 5, state: ElementStates.Modified },
    ];
    const arr = await selectionSorting(numbersArr, "descending");
    expect(arr).toEqual(checkArr);
  });
});
