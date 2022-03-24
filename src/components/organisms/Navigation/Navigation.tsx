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

const routes = ['admins', 'workers', 'managers', 'clients'];

export function Navigation() {
  return (
    <div className={styles.navigationWrapper}>
      <div className={styles.logo}>
        <h1 className={styles.companyName}>Vehicle Remedy</h1>
        <p className={styles.userRoleInfo}>
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
