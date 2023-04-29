import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";
import { HEAD, TAIL } from "../../../constants/element-captions";

const circleLetter = "A";

describe("Circle component", () => {
  it("Should render circle without letter", () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should render circle with letter", () => {
    const tree = renderer.create(<Circle letter={circleLetter} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should render circle with head", () => {
    const tree = renderer
      .create(<Circle letter={circleLetter} head={HEAD} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should render circle with head react element", () => {
    const tree = renderer
      .create(<Circle letter={circleLetter} head={<Circle />} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should render circle with tail", () => {
    const tree = renderer
      .create(<Circle letter={circleLetter} tail={TAIL} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should render circle with tail react element", () => {
    const tree = renderer
      .create(<Circle letter={circleLetter} tail={<Circle />} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should render circle with index", () => {
    const tree = renderer
      .create(<Circle letter={circleLetter} index={0} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should render small circle", () => {
    const tree = renderer
      .create(<Circle letter={circleLetter} isSmall />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should render circle with default state", () => {
    const tree = renderer
      .create(<Circle letter={circleLetter} state={ElementStates.Default} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should render circle with changing state", () => {
    const tree = renderer
      .create(<Circle letter={circleLetter} state={ElementStates.Changing} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should render circle with modified state", () => {
    const tree = renderer
      .create(<Circle letter={circleLetter} state={ElementStates.Modified} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
