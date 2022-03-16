import styles from './Button.module.scss';
type ButtonProps = {
  type?: ButtonType;
  text: string;
};

type ButtonType = 'button' | 'submit' | 'reset';

export function Button({ type = 'button', text }: ButtonProps) {
  return (
    <button className={styles.defaultButton} type={type}>
      {text}
    </button>
  );
}
