import { User } from '@/types/User';
import styles from './ManageTableItem.module.scss';
import { Role } from '@/components/atoms/Role/Role';
import { Button } from '@/components/atoms/Button/Button';

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
      <Button text="Edit" />
      <Button text={userData?.isActive ? 'Deactivate' : 'Activate'} />
    </div>
  );
}
