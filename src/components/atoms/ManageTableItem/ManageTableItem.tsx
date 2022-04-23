import { useModal } from '@/hooks/useModal';
import { User } from '@/types/User';
import { Role } from '@/components/atoms/Role/Role';
import { Button } from '@/components/atoms/Button/Button';
import styles from './ManageTableItem.module.scss';

type ManageTabkeItemProps = {
  userData: User;
};

export function ManageTableItem({ userData }: ManageTabkeItemProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.nameDetails}>
        <p>{userData?.firstName}</p>
        <p>{userData?.lastName}</p>
      </div>
      <Role role={userData.role} />
    </div>
  );
}
