import { Header } from '@/components/atoms/Header/Header';
import { RequestDetails } from '@/components/organisms/Details/RequestDetails/RequestsDetails';
import {
  ActivitiesList,
  ClientList,
  RequestsList,
  UsersList,
  VehicleList,
} from '@/components/organisms/List';
import { Navigation } from '@/components/organisms/Navigation/Navigation';

import styles from './Dashboard.module.scss';

const ManageTableByPath: React.FC<{ path: string }> = ({ path }) => {
  switch (path) {
    case 'users': {
      document.title = 'Users';
      return <UsersList />;
    }
    case 'vehicles': {
      document.title = 'Vehicles';
      return <VehicleList />;
    }
    case 'clients': {
      document.title = 'Clients';
      return <ClientList />;
    }
    case 'requests': {
      document.title = 'Requests';
      return <RequestsList />;
    }
    case 'requestDetails': {
      document.title = 'Request details';
      return <RequestDetails />;
    }
    case 'activities': {
      document.title = 'Activities';
      return <ActivitiesList />;
    }
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
