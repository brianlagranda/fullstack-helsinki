import styles from "./styles/Button.module.css";

const Button = ({ id, type, text, btn, onClick }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      type={type}
      className={`${styles.button} ${styles[btn]}`}
    >
      {text}
    </button>
  );
};

export default Button;
