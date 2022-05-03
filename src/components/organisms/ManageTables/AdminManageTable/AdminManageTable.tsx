import { useEffect, useState } from 'react';
import { useModal } from '@/hooks/useModal';
import { UserModal } from '@/components/organisms/Modals/UserModal/UserModal';
import { ManageTableItem } from '@/components/molecules/ManageTableItem/ManageTableItem';
import { Button } from '@/components/atoms/Button/Button';
import { User, UserRole } from '@/types/User';
import styles from './AdminManageTable.module.scss';

const tempUser: User = {
  username: 'test',
  id: 123,
  firstName: 'Jan',
  lastName: 'Kowalski',
  password: 'test',
  role: UserRole.Admin,
};

const getUsers = async () => {
  const token = localStorage.getItem('token');
  const users = await fetch('http://localhost:8000/api/users/all', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return await users.json();
};

export function AdminManageTable() {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    try {
      (async () => {
        setUsers(await getUsers());
      })();
    } catch (e) {}
  }, []);

  return (
    <main className={styles.tableWrapper}>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <input placeholder="Search" type="text" />
          <Button text="Add user" className={styles.addButton} onClick={handleOpenModal} />
          {isModalOpen ? (
            <UserModal isOpen={isModalOpen} handleCloseModal={handleCloseModal} />
          ) : null}
        </div>
        <div className={styles.tableContent}>
          {users.length > 0 ? users.map((user) => <ManageTableItem user={user} />) : null}
        </div>
      </div>
    </main>
  );
}
