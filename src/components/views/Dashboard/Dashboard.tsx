import Button from '@/components/atoms/Button/Button';
import styles from './Dashboard.module.scss';

type NavbarItemProps = {
  text: string;
};

const NavbarItem = ({ text }: NavbarItemProps) => {
  return (
    <div className={styles.navbarItem}>
      <p>{text}</p>
    </div>
  );
};

export function Dashboard() {
  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.navigationWrapper}>
        <div className={styles.logo}>
          <h2>Vehicle Remedy</h2>
          <p>
            Logged as <span className={styles.permissionTitle}>Admin</span>
          </p>
        </div>
        <NavbarItem text="Admins" />
        <NavbarItem text="Workers" />
        <NavbarItem text="Managers" />
        <NavbarItem text="Clients" />
      </div>
      <header>
        <h3 className={styles.welcomeMessage}>
          Welcome back, <span className={styles.firstName}>James</span>
        </h3>
      </header>
      <main className={styles.dashboard}>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <input placeholder="Search" type="text" />
            <Button text="Add admin" className={styles.addUser} />
          </div>
          <div className={styles.tableContent}></div>
        </div>
      </main>
    </div>
  );
}
