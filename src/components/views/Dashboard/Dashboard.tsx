import { Header } from '@/components/atoms/Header/Header';
import { AdminManageTable } from '@/components/organisms/ManageTables/AdminManageTable/AdminManageTable';
import { Navigation } from '@/components/organisms/Navigation/Navigation';
import styles from './Dashboard.module.scss';
import { UserRole } from '@/types/User';
import { ManagerManageTable } from '@/components/organisms/ManageTables/ManagerManageTable/ManagerManageTable';

const ManageTableByRole: React.FC<{ role: UserRole }> = ({ role }) => {
  switch (role) {
    case UserRole.Admin:
      return <AdminManageTable />;
    case UserRole.Manager:
      return <ManagerManageTable />;
    default:
      return null;
  }
};

export function Dashboard(prop: { role: UserRole }) {
  return (
    <div className={styles.dashboardWrapper}>
      <Navigation />
      <Header />
      <ManageTableByRole role={prop.role} />
    </div>
  );
}
