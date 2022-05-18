import { Header } from '@/components/atoms/Header/Header';
import { UsersList } from '@/components/organisms/List/UsersList';
import { Navigation } from '@/components/organisms/Navigation/Navigation';
import { VehicleList } from '@/components/organisms/List/VehicleList';

import { ClientList } from '@/components/organisms/List/ClientList';
import { RequestsList } from '@/components/organisms/List/RequestsList';
import styles from './Dashboard.module.scss';

const ManageTableByPath: React.FC<{ path: string }> = ({ path }) => {
  switch (path) {
    case 'users':
      return <UsersList />;
    case 'vehicles':
      return <VehicleList />;
    case 'clients':
      return <ClientList />;
    case 'requests':
      return <RequestsList />;
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
