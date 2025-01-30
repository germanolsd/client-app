import { render, screen, fireEvent } from "@testing-library/react";
import OverFlowMenu from "../OverFlowMenu";
import { vi } from "vitest";
import React from "react";

describe("OverFlowMenu", () => {
  const onEditHandler = vi.fn();
  const onDeleteHandler = vi.fn();
  const triggerRef = React.createRef<HTMLButtonElement>();

  beforeEach(() => {
    render(
      <div>
        <button ref={triggerRef}>Trigger</button>
        <OverFlowMenu
          onEditHandler={onEditHandler}
          onDeleteHandler={onDeleteHandler}
          triggerRef={triggerRef}
        />
      </div>
    );
  });

  it("should render the menu", () => {
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("should call onEditHandler when Edit button is clicked", () => {
    fireEvent.click(screen.getByText("Edit"));
    expect(onEditHandler).toHaveBeenCalled();
  });

  it("should call onDeleteHandler when Delete button is clicked", () => {
    fireEvent.click(screen.getByText("Delete"));
    expect(onDeleteHandler).toHaveBeenCalled();
  });
});
