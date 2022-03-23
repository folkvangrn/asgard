import styles from './Navigation.module.scss';

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

const routes = ['Admins', 'Workers', 'Managers', 'Clients'];

export function Navigation() {
  return (
    <div className={styles.navigationWrapper}>
      <div className={styles.logo}>
        <h2>Vehicle Remedy</h2>
        <p>
          Logged as <span className={styles.permissionTitle}>Admin</span>
        </p>
      </div>
      <nav>
        {routes.map((route) => (
          <NavbarItem text={route} />
        ))}
      </nav>
    </div>
  );
}
