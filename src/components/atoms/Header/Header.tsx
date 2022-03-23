import styles from './Header.module.scss';

type HeaderProps = {
  name: string;
};

export function Header({ name }: HeaderProps) {
  return (
    <header className={styles.wrapper}>
      <h2 className={styles.welcomeMessage}>
        Welcome back, <span className={styles.firstName}>{name}</span>
      </h2>
    </header>
  );
}
