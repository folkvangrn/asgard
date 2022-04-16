import { useAuth } from '@/hooks/useAuth';
import styles from './Header.module.scss';

export function Header() {
  const { user } = useAuth();

  return (
    <header className={styles.wrapper}>
      <h2 className={styles.welcomeMessage}>
        Welcome back, <span className={styles.firstName}>{user?.firstName}</span>
      </h2>
    </header>
  );
}
