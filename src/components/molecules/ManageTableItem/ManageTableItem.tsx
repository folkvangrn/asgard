import { User } from '@/types/User';
import { Role } from '@/components/atoms/Role/Role';
import { Button } from '@/components/atoms/Button/Button';
import { useModal } from '@/hooks/useModal';
import { UserModal } from '@/components/organisms/UserModal/UserModal';
import styles from './ManageTableItem.module.scss';

type ManageTabkeItemProps = {
  user: User;
};

export function ManageTableItem({ user }: ManageTabkeItemProps) {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);

  return (
    <div className={styles.wrapper}>
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
        <UserModal
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          initialUser={user}
          editMode
        />
      ) : null}
      <div className={styles.gridChild}>
        <Button text="Deactivate" />
      </div>
    </div>
  );
}
