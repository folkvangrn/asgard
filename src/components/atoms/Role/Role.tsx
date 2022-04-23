import { UserRole } from '@/types/User';
import styles from './Role.module.scss';

type RoleProps = {
  role: UserRole;
};

export function Role({ role }: RoleProps) {
  return (
    <div className={styles.role}>
      <p>{role}</p>
    </div>
  );
}
