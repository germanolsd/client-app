import styles from "./Button.module.css";

type ButtonProps = {
  type?: "action" | "danger";
  visual?: "solid" | "outline";
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
};

function Button({
  type = "action",
  visual = "solid",
  children,
  onClick,
  icon,
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[type]} ${styles[visual]}`}
      onClick={onClick}
    >
      {icon && <i data-testid="button-icon">{icon}</i>}
      {children}
    </button>
  );
}

export enum ButtonVisual {
  Solid = "solid",
  Outline = "outline",
}
export enum ButtonType {
  Action = "action",
  Danger = "danger",
}

export default Button;
