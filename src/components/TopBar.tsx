import styles from "./TopBar.module.css";
import NinjaOneLogo from "/NinjaOneLogo.svg";

const TopBar: React.FC = () => {
  return (
    <div className={styles.TopBar}>
      <img src={NinjaOneLogo} alt="" className={styles.logo} />
    </div>
  );
};

export default TopBar;
