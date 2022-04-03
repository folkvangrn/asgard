import { Link } from 'react-router-dom';
import styles from './Navigation.module.scss';

type NavbarItemProps = {
  roles: string;
};

const NavbarItem = ({ roles }: NavbarItemProps) => {
  return (
    <div className={styles.navbarItem}>
      <Link className={styles.navLink} to={`/dashboard/${roles}`}>
        <p>{roles}</p>
      </Link>
    </div>
  );
};

const routes = ['admins', 'workers', 'managers'];

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
          <NavbarItem roles={route} />
        ))}
      </nav>
    </div>
  );
}
