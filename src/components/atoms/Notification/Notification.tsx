import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import styles from './Notification.module.scss';

export function Notification() {
  return (
    <ToastContainer
      autoClose={5000}
      closeOnClick
      draggable={false}
      pauseOnFocusLoss={false}
      position={'bottom-center'}
      className={styles.toast}
    />
  );
}
