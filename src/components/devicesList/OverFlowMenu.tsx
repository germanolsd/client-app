import { useEffect, useRef, useState } from "react";
import styles from "./OverflowMenu.module.css";

type OverFlowMenuProps = {
  onEditHandler: () => void;
  onDeleteHandler: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
};

const OverFlowMenu = ({
  onEditHandler,
  onDeleteHandler,
  triggerRef,
}: OverFlowMenuProps) => {
  const [invertY, setInvertY] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const checkForOverflow = () => {
    if (!menuRef.current || !triggerRef.current) return;
    const { top: triggerTop } = triggerRef.current.getBoundingClientRect();
    const windowCenter = window.innerHeight / 2;
    setInvertY(triggerTop > windowCenter);
  };

  useEffect(() => {
    checkForOverflow();
    window.addEventListener("scroll", checkForOverflow);
    return () => {
      window.removeEventListener("scroll", checkForOverflow);
    };
  }, []);

  return (
    <div
      className={`${styles.menu} ${invertY ? styles.invertY : null}`}
      ref={menuRef}
    >
      <ul>
        <li>
          <button onClick={onEditHandler}>Edit</button>
        </li>
        <li>
          <button className={styles.danger} onClick={onDeleteHandler}>
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
};

export default OverFlowMenu;
