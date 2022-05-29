import { toast, TypeOptions } from 'react-toastify';
import styles from './useToast.module.scss';

export const useToast = () => {
  const myToast = (message: string, type: TypeOptions) => {
    toast(message, {
      type: type,
      position: 'bottom-center',
      autoClose: 5000,
      closeOnClick: true,
      draggable: false,
      className: styles.toast,
      pauseOnFocusLoss: false,
    });
  };
  return {
    toast: myToast,
  };
};
