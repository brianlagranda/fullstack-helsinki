import styles from "./styles/Button.module.css";

const Button = ({ type, text, btn, onClick }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${styles.button} ${styles[btn]}`}
    >
      {text}
    </button>
  );
};

export default Button;
