import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";
import { vi } from "vitest";
import Button, { ButtonVisual } from "../button/Button";

describe("Modal Component", () => {
  const onClose = vi.fn();

  beforeEach(() => {
    const dialogMock = HTMLDialogElement.prototype;
    // Mock showModal and close methods
    dialogMock.showModal = vi.fn();
    dialogMock.close = vi.fn();
    onClose.mockClear();
  });

  it("renders the modal when open is true", () => {
    render(
      <Modal open={true} onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("does not render the modal when open is false", () => {
    render(
      <Modal open={false} onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
  });

  it("renders the title prop if provided", () => {
    render(
      <Modal open={true} onClose={onClose} title="Modal Title">
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByText("Modal Title")).toBeInTheDocument();
  });

  it("renders children prop correctly", () => {
    render(
      <Modal open={true} onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("renders actionButton prop if provided", () => {
    const actionButton = <Button visual={ButtonVisual.Outline}>Action</Button>;

    render(
      <Modal open={true} onClose={onClose} actionButton={actionButton}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("closes the modal when the action button is clicked", () => {
    const actionButton = (
      <Button visual={ButtonVisual.Outline} onClick={onClose}>
        Action
      </Button>
    );

    render(
      <Modal open={true} onClose={onClose} actionButton={actionButton}>
        <div>Modal Content</div>
      </Modal>
    );

    const actionButtonElement = screen.getByText("Action");
    fireEvent.click(actionButtonElement);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
