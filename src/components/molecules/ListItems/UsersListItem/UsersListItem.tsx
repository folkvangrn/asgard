import { useModal } from '@/hooks/useModal';

import { Role } from '@/components/atoms/Role/Role';
import { Button } from '@/components/atoms/Button/Button';
import { UserModal } from '@/components/organisms/Modals/UserModal/UserModal';

import { User } from '@/types/User';

import styles from './UsersListItem.module.scss';

type UsersListItemProps = {
  user: User;
  refetchUsers: VoidFunction;
};

export function UsersListItem({ user, refetchUsers }: UsersListItemProps) {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);

  return (
    <div className={styles.wrapper} key={user?.id}>
      <div className={styles.gridChild}>
        <p className={styles.nameDetails}>
          {user?.firstName} {user?.lastName}
        </p>
      </div>
      <div className={styles.gridChild}>
        <Role role={user?.role} />
      </div>
      <div className={styles.gridChild}>
        <Button text="Edit" onClick={handleOpenModal} />
      </div>
      {isModalOpen ? (
        <UserModal
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          userId={user.id}
          refetchUsers={refetchUsers}
        />
      ) : null}
    </div>
  );
}
