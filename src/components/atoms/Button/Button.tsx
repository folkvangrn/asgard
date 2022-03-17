import styles from './Button.module.scss';

type ButtonProps = {
  type: JSX.IntrinsicElements['button']['type'];
  text: string;
};

function Button({ type = 'button', text }: ButtonProps) {
  return (
    <button className={styles.defaultButton} type={type}>
      {text}
    </button>
  );
}

export default Button;
