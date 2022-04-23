import { User } from '@/types/User';
import { Role } from '@/components/atoms/Role/Role';
import styles from './ManageTableItem.module.scss';

type ManageTabkeItemProps = {
  user: User;
};

export function ManageTableItem({ user }: ManageTabkeItemProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.nameDetails}>
        <p>{user?.firstName}</p>
        <p>{user?.lastName}</p>
      </div>
      <Role role={user.role} />
    </div>
  );
}
