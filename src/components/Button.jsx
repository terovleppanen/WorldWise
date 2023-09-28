import styles from "./Button.module.css";

function Button({ onCLick, type, children }) {
  return (
    <button onClick={onCLick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
