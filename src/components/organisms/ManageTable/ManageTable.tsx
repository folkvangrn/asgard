import { useParams } from 'react-router-dom';
import { ManageTableItem } from '@/components/atoms/ManageTableItem/ManageTableItem';
import { FormField } from '@/components/molecules/FormField/FormField';
import { User, UserRole } from '@/types/User';
import { UserModal } from '@/components/organisms/UserModal/UserModal';
import {Button} from '@/components/atoms/Button/Button';
import styles from './ManageTable.module.scss';

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

  return (
    <main className={styles.tableWrapper}>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <input placeholder="Search" type="text" />
          <Button text={`Add ${role}`} className={styles.addUser} />
        </div>
        <div className={styles.tableContent}>
          <ManageTableItem userData={tempUser} />
          <UserModal headerText={`Edit ${role}`} buttonText="Submit">
            <FormField id="firstName" placeholder="Edit first name" label="First name" />
            <FormField id="lastName" placeholder="Edit last name" label="Last name" />
            <FormField id="password" placeholder="Edit password" label="Password" type="password" />
          </UserModal>
        </div>
      </div>
    </main>
  );
}
