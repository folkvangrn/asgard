import { ManageTableItem } from '@/components/atoms/ManageTableItem/ManageTableItem';
import { User, UserRole } from '@/types/User';
import { Button } from '@/components/atoms/Button/Button';
import styles from './ManageTable.module.scss';
import { useModal } from '@/hooks/useModal';
import { UserModal } from '../AddUserMoidal/AddUserModal';

const tempUser: User = {
  username: 'test',
  id: '123',
  firstName: 'Jan',
  lastName: 'Kowalski',
  role: UserRole.Admin,
};

export function ManageTable() {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);

  return (
    <main className={styles.tableWrapper}>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <input placeholder="Search" type="text" />
          <Button text="Add user" className={styles.addUser} onClick={handleOpenModal} />
          {isModalOpen ? (
            <UserModal isOpen={isModalOpen} handleCloseModal={handleCloseModal} />
          ) : null}
        </div>
        <div className={styles.tableContent}>
          <ManageTableItem user={tempUser} />
        </div>
      </div>
    </main>
  );
}
