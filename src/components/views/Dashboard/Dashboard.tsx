import { Header } from '@/components/atoms/Header/Header';
import { AdminManageTable } from '@/components/organisms/ManageTables/AdminManageTable/AdminManageTable';
import { Navigation } from '@/components/organisms/Navigation/Navigation';
import styles from './Dashboard.module.scss';
import { UserRole } from '@/types/User';
import { ManagerManageTable } from '@/components/organisms/ManageTables/ManagerManageTable/ManagerManageTable';

const ManageTableByRole: React.FC<{ path: string }> = ({ path }) => {
  switch (path) {
    case 'users':
      return <AdminManageTable />;
    case 'vehicles':
      return <ManagerManageTable />;
    case 'clients':
      return <ManagerManageTable />;
    case 'requests':
      return <ManagerManageTable />;
    default:
      return null;
  }
};

export function Dashboard(prop: { path: string }) {
  return (
    <div className={styles.dashboardWrapper}>
      <Navigation />
      <Header />
      <ManageTableByRole path={prop.path} />
    </div>
  );
}
