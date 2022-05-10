import { useModal } from '@/hooks/useModal';

import { Role } from '@/components/atoms/Role/Role';
import { Button } from '@/components/atoms/Button/Button';
import { UserModal } from '@/components/organisms/Modals/UserModal/UserModal';

import { ListUser } from '@/types/User';

import styles from './ManageTableItem.module.scss';

type ManageTabkeItemProps = {
  user: ListUser;
};

export function ManageTableItem({ user }: ManageTabkeItemProps) {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);

  return (
    <div className={styles.wrapper} key={user.id}>
      <div className={styles.gridChild}>
        <p className={styles.nameDetails}>
          {user.firstName} {user.lastName}
        </p>
      </div>
      <div className={styles.gridChild}>
        <Role role={user.role} />
      </div>
      <div className={styles.gridChild}>
        <Button text="Edit" onClick={handleOpenModal} />
      </div>
      {isModalOpen ? (
        <UserModal isOpen={isModalOpen} handleCloseModal={handleCloseModal} initialUser={user} />
      ) : null}
    </div>
  );
}
