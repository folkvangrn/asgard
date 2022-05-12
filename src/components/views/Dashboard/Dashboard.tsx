import { Header } from '@/components/atoms/Header/Header';
import { UsersList } from '@/components/organisms/UsersList/UsersList';
import { Navigation } from '@/components/organisms/Navigation/Navigation';
import styles from './Dashboard.module.scss';
import { ManagerManageTable } from '@/components/organisms/ManageTables/ManagerManageTable/ManagerManageTable';

const ManageTableByPath: React.FC<{ path: string }> = ({ path }) => {
  switch (path) {
    case 'users':
      return <UsersList />;
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
      <ManageTableByPath path={prop.path} />
    </div>
  );
}
