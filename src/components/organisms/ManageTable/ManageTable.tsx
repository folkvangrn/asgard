import Button from '@/components/atoms/Button/Button';
import { ManageTableItem } from '@/components/atoms/ManageTableItem/ManageTableItem';
import { FormField } from '@/components/molecules/FormField/FormField';
import { User, UserRole } from '@/types/User';
import { useParams } from 'react-router-dom';
import styles from './ManageTable.module.scss';

const singularizeRolesName = (roles: string): string => {
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
  const role = singularizeRolesName(roles ?? '');

  return (
    <main className={styles.tableWrapper}>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <input placeholder="Search" type="text" />
          <Button text={`Add ${role}`} className={styles.addUser} />
        </div>
        <div className={styles.tableContent}>
          <ManageTableItem userData={tempUser} />
          <div className={styles.editWrapper}>
            <header className={styles.editHeader}>
              <h3>Edit {role}</h3>
            </header>
            <form className={styles.editableContent}>
              <FormField
                id="firstName"
                placeholder="Edit first name"
                label="First name"
                key={'firstName'}
              />
              <FormField
                id="lastName"
                placeholder="Edit last name"
                label="Last name"
                key={'lastName'}
              />
              <FormField
                id="password"
                placeholder="Edit password"
                label="Password"
                type="password"
                key={'password'}
              />
              <div className={styles.buttonsWrapper}>
                <Button text="Submit" type="submit" />
                <Button text="Cancel" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
