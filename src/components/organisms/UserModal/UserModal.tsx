import Button from '@/components/atoms/Button/Button';
import styles from './UserModal.module.scss';

type UserModalProps = {
  headerText: string;
  buttonText: string;
  children: JSX.Element[];
};

export function UserModal({ headerText, buttonText, children }: UserModalProps) {
  return (
    <div className={styles.modalWrapper}>
      <header className={styles.modalHeader}>
        <h3>{headerText}</h3>
      </header>
      <form className={styles.userContent}>
        {children}
        <div className={styles.buttonsWrapper}>
          <Button text={buttonText} type="submit" />
          <Button text="Cancel" />
        </div>
      </form>
    </div>
  );
}
