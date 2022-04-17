import { useAuth } from '@/hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navigation.module.scss';

type NavbarItemProps = {
  path: string;
};

const NavbarItem = ({ path }: NavbarItemProps) => {
  return (
    <div className={styles.navbarItem}>
      <Link className={styles.navLink} to={`/dashboard/${path}`}>
        <p>{path}</p>
      </Link>
    </div>
  );
};

export function Navigation() {
  const { user, paths, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className={styles.navigationWrapper}>
      <div className={styles.logo}>
        <h1 className={styles.companyName}>Vehicle Remedy</h1>
        <p className={styles.userRoleInfo}>
          Logged as <span className={styles.userRole}>{user?.role}</span>
        </p>
      </div>
      <nav>
        {paths.map((path) => (
          <NavbarItem path={path} key={path} />
        ))}
        <button
          onClick={() => {
            signOut();
            navigate('/', { replace: true });
          }}
        >
          Sign out
        </button>
      </nav>
    </div>
  );
}
