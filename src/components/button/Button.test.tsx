import { render, screen, fireEvent } from "@testing-library/react";
import Button, { ButtonType, ButtonVisual } from "./Button";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";

describe("Button component", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("button action solid");
  });

  it("renders with danger type", () => {
    render(<Button type={ButtonType.Danger}>Delete</Button>);
    const buttonElement = screen.getByText(/delete/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("button danger solid");
  });

  it("renders with outline visual", () => {
    render(<Button visual={ButtonVisual.Outline}>Outline</Button>);
    const buttonElement = screen.getByText(/outline/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("button action outline");
  });

  it("renders with an icon", () => {
    render(<Button icon={<span>Icon</span>}>With Icon</Button>);
    const buttonElement = screen.getByText(/with icon/i);
    const iconElement = screen.getByText(/icon/i);
    expect(buttonElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const buttonElement = screen.getByText(/click me/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
