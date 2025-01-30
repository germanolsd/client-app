import { useRef, useEffect } from "react";
import styles from "./Modal.module.css";
import Button, { ButtonVisual } from "../button/Button";

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  actionButton?: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  actionButton,
  title,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  function handleBackdropClick(
    event: React.MouseEvent<HTMLDialogElement, MouseEvent>
  ) {
    if (dialogRef.current && event.target === dialogRef.current) {
      dialogRef.current.close();
    }
  }
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dialogRef.current?.close();
        event.preventDefault();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      if (open) {
        document.removeEventListener("keydown", handleEscapeKey);
      }
    };
  }, [open, onClose]);

  return (
    <dialog
      className={styles.dialog}
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
      data-testid="modal"
    >
      {open && (
        <div className={styles.dialogContent}>
          {title && <h2>{title}</h2>}
          {children}
          <div className={styles.buttons}>
            <Button
              visual={ButtonVisual.Outline}
              onClick={() => dialogRef.current?.close()}
            >
              Cancel
            </Button>
            {actionButton}
          </div>
        </div>
      )}
    </dialog>
  );
};

export default Modal;
