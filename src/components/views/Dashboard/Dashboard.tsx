import { Header } from '@/components/atoms/Header/Header';
import { ManageTable } from '@/components/organisms/ManageTable/ManageTable';
import { Navigation } from '@/components/organisms/Navigation/Navigation';
import styles from './Dashboard.module.scss';

export function Dashboard() {
  return (
    <div className={styles.dashboardWrapper}>
      <Navigation />
      <Header />
      <ManageTable />
    </div>
  );
}
