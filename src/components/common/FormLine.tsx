import styles from "./FormLine.module.css";

type FormLineProps = {
  children: React.ReactNode;
  label: string;
  errorMessage?: string;
};

const FormLine = ({ children, label, errorMessage }: FormLineProps) => (
  <div className={styles.formLine}>
    <label className={styles.formLabel}>
      {label}
      {children}
      {errorMessage?.length && (
        <span className={styles.errorMsg}>{errorMessage}</span>
      )}
    </label>
  </div>
);

export default FormLine;
