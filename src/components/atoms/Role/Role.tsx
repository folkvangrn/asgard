import styles from './Role.module.scss';
import { UserRole } from '@/types/User';

const roleToString = (role: UserRole) => {
  switch (role) {
    case UserRole.Admin:
      return 'Admin';
    case UserRole.Manager:
      return 'Manager';
    case UserRole.Worker:
      return 'Worker';
  }
};

type RoleProps = {
  role: UserRole;
};

export function Role({ role }: RoleProps) {
  return (
    <div className={styles.role}>
      <p>{roleToString(role)}</p>
    </div>
  );
}
