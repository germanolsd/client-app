import styles from "./TitleBar.module.css";

type TopBarProps = {
  title: string;
  children?: React.ReactNode;
};

const TopBar: React.FC<TopBarProps> = ({ title, children }) => {
  return (
    <div className={styles.TitleBar}>
      <h1>{title}</h1>
      {children && <div className={styles.SelfAlignEnd}>{children}</div>}
    </div>
  );
};

export default TopBar;
