import { Header } from '@/components/atoms/Header/Header';
import { Navigation } from '@/components/organisms/Navigation/Navigation';

import { UsersList } from '@/components/organisms/List/UsersList';
import { VehicleList } from '@/components/organisms/List/VehicleList';
import { ClientList } from '@/components/organisms/List/ClientList';
import { RequestsList } from '@/components/organisms/List/RequestsList';
import { ActivitiesList } from '@/components/organisms/List/ActivitiesList';
import { RequestDetails } from '@/components/organisms/Details/RequestDetails/RequestsDetails';

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
    case 'requestDetails':
      return <RequestDetails />;
    case 'activities':
      return <ActivitiesList />;
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
