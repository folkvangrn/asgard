import { useEffect, useState } from 'react';
import { useModal } from '@/hooks/useModal';
import { UserModal } from '@/components/organisms/UserModal/UserModal';
import { ManageTableItem } from '@/components/molecules/ManageTableItem/ManageTableItem';
import { User, UserRole } from '@/types/User';
import { Button } from '@/components/atoms/Button/Button';
import styles from './ManageTable.module.scss';

const tempUser: User = {
  username: 'test',
  id: '123',
  firstName: 'Jan',
  lastName: 'Kowalski',
  password: 'test',
  role: UserRole.Admin,
};

export function ManageTable() {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/users/all', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        setUsers(await response.json());
      } catch (e) {}
    })();
  }, []);

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
          {users.length > 0 ? users.map((user) => <ManageTableItem user={user} />) : null}
        </div>
      </div>
    </main>
  );
}
