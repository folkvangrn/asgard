import { Button } from '@/components/atoms/Button/Button';
import styles from './UserModal.module.scss';
import ReactModal from 'react-modal';

type UserModalProps = {
  headerText: string;
  buttonText: string;
  children: JSX.Element[];
  isOpen: boolean;
  handleClose: () => void;
};

export function Modal({ headerText, buttonText, children, isOpen, handleClose }: UserModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      className={styles.modalWrapper}
      appElement={document.getElementById('root')}
      onRequestClose={handleClose}
    >
      <header className={styles.modalHeader}>
        <h3>{headerText}</h3>
      </header>
      <form className={styles.userContent}>
        {children}
        <div className={styles.buttonsWrapper}>
          <Button text={buttonText} type="submit" />
          <Button text="Cancel" onClick={handleClose} />
        </div>
      </form>
    </ReactModal>
  );
}
