import { Header } from '@/components/atoms/Header/Header';
import { UsersList } from '@/components/organisms/UsersList/UsersList';
import { Navigation } from '@/components/organisms/Navigation/Navigation';
import { VehicleList } from '@/components/organisms/VehicleList/VehicleList';

import styles from './Dashboard.module.scss';

const ManageTableByPath: React.FC<{ path: string }> = ({ path }) => {
  switch (path) {
    case 'users':
      return <UsersList />;
    case 'vehicles':
      return <VehicleList />;
    case 'clients':
    // return <ManagerManageTable />;
    case 'requests':
    // return <ManagerManageTable />;
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
