import { render, screen, fireEvent } from "@testing-library/react";
import Button, { ButtonType, ButtonVisual } from "./Button";
import "@testing-library/jest-dom";
import { vi } from "vitest";

describe("Button component", () => {
  it("renders with children", () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it("renders with an icon", () => {
    render(<Button icon={<i>Icon</i>}>With Icon</Button>);
    const iconElement = screen.getByTestId("button-icon");
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveTextContent("Icon");
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const buttonElement = screen.getByText(/click me/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders with danger type", () => {
    render(<Button type={ButtonType.Danger}>Delete</Button>);
    const buttonElement = screen.getByText(/delete/i);
    const className = buttonElement.className;
    expect(buttonElement).toHaveTextContent("Delete");
    expect(className).toMatch(/danger/);
  });

  it("renders with outline visual", () => {
    render(<Button visual={ButtonVisual.Outline}>Outline</Button>);
    const buttonElement = screen.getByText(/outline/i);
    const className = buttonElement.className;
    expect(buttonElement).toHaveTextContent("Outline");
    expect(className).toMatch(/action/);
  });
});
