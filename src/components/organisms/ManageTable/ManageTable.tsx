import { useParams } from 'react-router-dom';
import { ManageTableItem } from '@/components/atoms/ManageTableItem/ManageTableItem';
import { FormField } from '@/components/molecules/FormField/FormField';
import { User, UserRole } from '@/types/User';
import { Modal } from '@/components/organisms/UserModal/UserModal';
import { Button } from '@/components/atoms/Button/Button';
import styles from './ManageTable.module.scss';
import { useModal } from '@/hooks/useModal';

const singularizeRoleName = (roles: string): string => {
  return roles.slice(0, -1);
};

const tempUser: User = {
  id: '123',
  firstName: 'Jan',
  lastName: 'Kowalski',
  role: UserRole.Admin,
  isActive: true,
};

export function ManageTable() {
  const { roles } = useParams();
  const role = singularizeRoleName(roles ?? '');
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);

  return (
    <main className={styles.tableWrapper}>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <input placeholder="Search" type="text" />
          <Button text={`Add ${role}`} className={styles.addUser} onClick={handleOpenModal} />
          <Modal
            headerText={`Add ${role}`}
            buttonText="Submit"
            isOpen={isModalOpen}
            handleClose={handleCloseModal}
          >
            <FormField id="firstName" placeholder="Enter first name" label="First name" />
            <FormField id="lastName" placeholder="Enter last name" label="Last name" />
            <FormField id="username" placeholder="Enter username" label="Username" />
            <FormField
              id="password"
              placeholder="Enter password"
              label="Password"
              type="password"
            />
          </Modal>
        </div>
        <div className={styles.tableContent}>
          <ManageTableItem userData={tempUser} />
        </div>
      </div>
    </main>
  );
}
