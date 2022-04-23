import ReactModal from 'react-modal';
import styles from './UserModal.module.scss';

type ModalProps = {
  headerText: string;
  buttonText: string;
  children: JSX.Element[];
  isOpen: boolean;
  handleClose: VoidFunction;
};

export function Modal({ headerText, children, isOpen, handleClose }: ModalProps) {
  return (
    <ReactModal isOpen={isOpen} className={styles.modalWrapper} onRequestClose={handleClose}>
      <header className={styles.modalHeader}>
        <h3>{headerText}</h3>
      </header>
      <div className={styles.modalContent}>{children}</div>
    </ReactModal>
  );
}
