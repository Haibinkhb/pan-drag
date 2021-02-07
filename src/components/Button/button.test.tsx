import React from "react";
// import react-testing methods
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Button from "./button";

const defaultButtonProps = {
  onClick: jest.fn(),
};

const disabledButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

const linkButtonProps = {
  btnType: "link",
  href: "www.baidu.com",
};

describe("test Button component", () => {
  it("should render default button component", () => {
    const button = render(
      <Button {...defaultButtonProps}>default button</Button>
    );
    const element = button.getByText("default button") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON");
    expect(element.disabled).toBeFalsy();
    expect(element).toHaveClass("btn btn-default");
    fireEvent.click(element);
    expect(defaultButtonProps.onClick).toHaveBeenCalled();
  });

  it("should render disabled button component", () => {
    const button = render(
      <Button {...disabledButtonProps}>disabled button</Button>
    );
    const element = button.getByText("disabled button") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON");
    expect(element.disabled).toBeTruthy();
    expect(element).toHaveClass("btn btn-default");
    fireEvent.click(element);
    expect(disabledButtonProps.onClick).not.toHaveBeenCalled();
  });

  it("should render link button component when btnType equals link", () => {
    const button = render(<Button {...linkButtonProps}>link button</Button>);
    const element = button.getByText("link button") as HTMLAnchorElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("A");
    expect(element).toHaveClass("btn btn-link");
    expect(element.href).toBeTruthy();
  });
});
