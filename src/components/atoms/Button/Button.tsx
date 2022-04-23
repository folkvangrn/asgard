import classnames from 'classnames';
import styles from './Button.module.scss';

type ButtonProps = {
  type?: JSX.IntrinsicElements['button']['type'];
  text: string;
  className?: string;
  onClick?: VoidFunction;
};

export function Button({ type = 'button', text, className, onClick }: ButtonProps) {
  return (
    <button className={classnames(styles.defaultButton, className)} type={type} onClick={onClick}>
      {text}
    </button>
  );
}
