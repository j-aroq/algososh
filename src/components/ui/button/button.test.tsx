import renderer from "react-test-renderer";
import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "./button";

const buttonText = "Добавить";

describe("Button component", () => {
  it("Should render button with text", () => {
    const tree = renderer.create(<Button text={buttonText} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should render button without text", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should render disabled button", () => {
    const tree = renderer
      .create(<Button text={buttonText} disabled />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should render button with loader", () => {
    const tree = renderer
      .create(<Button text={buttonText} isLoader />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should invoke callback on click", () => {
    const mockFn = jest.fn();
    render(<Button text={buttonText} onClick={mockFn} />);
    const button = screen.getByText(buttonText);
    fireEvent.click(button);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
