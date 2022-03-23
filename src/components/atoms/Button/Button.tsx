import styles from './Button.module.scss';
import classnames from 'classnames';

type ButtonProps = {
  type?: JSX.IntrinsicElements['button']['type'];
  text: string;
  className?: string;
};

function Button({ type = 'button', text, className }: ButtonProps) {
  return (
    <button className={classnames(styles.defaultButton, className)} type={type}>
      {text}
    </button>
  );
}

export default Button;
