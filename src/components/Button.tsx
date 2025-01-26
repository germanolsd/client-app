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
      {icon && <i>{icon}</i>}
      {children}
    </button>
  );
}

export default Button;
