import Button from '@/components/atoms/Button/Button';
import { FormField } from '@/components/molecules/FormField/FormField';
import { Link } from 'react-router-dom';
import styles from './LoginPanel.module.scss';

export function LoginPanel() {
  return (
    <div className={styles.formWrapper}>
      <form>
        <h2 className={styles.signInTitle}>Sign in</h2>
        <FormField id="username" placeholder="Enter username" label="Username" />
        <FormField id="password" placeholder="Enter password" type="password" label="Password" />
        <Link to="/dashboard">
          <Button text="Login" />
        </Link>
      </form>
    </div>
  );
}
