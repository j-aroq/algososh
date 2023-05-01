import { TCircle } from "../../types/circle";
import { swap } from "../../utils/swap";

describe("Reverse string algorithm", () => {
  it("Should reverse empty string", () => {
    const circleArr = [{}];
    const checkArr: TCircle[] = [{}];
    expect(checkArr).toEqual(checkArr);
  });

  it("Should reverse string with 1 symbol", () => {
    const circleArr = [{ value: "A" }];
    const checkArr: TCircle[] = [{ value: "A" }];
    expect(checkArr).toEqual(checkArr);
  });

  it("Should reverse string with odd symbols", () => {
    const circleArr = [{ value: "A" }, { value: "B" }, { value: "C" }];
    const checkArr: TCircle[] = [
      { value: "C" },
      { value: "B" },
      { value: "A" },
    ];
    swap(circleArr, 0, 2);
    expect(circleArr).toEqual(checkArr);
  });

  it("Should reverse string with even symbols", () => {
    const circleArr = [
      { value: "A" },
      { value: "B" },
      { value: "C" },
      { value: "D" },
    ];
    const checkArr: TCircle[] = [
      { value: "D" },
      { value: "C" },
      { value: "B" },
      { value: "A" },
    ];
    swap(circleArr, 0, 3);
    swap(circleArr, 1, 2);
    expect(circleArr).toEqual(checkArr);
  });
});
