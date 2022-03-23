import Button from '@/components/atoms/Button/Button';
import { Header } from '@/components/atoms/Header/Header';
import { Navigation } from '@/components/organisms/Navigation/Navigation';
import styles from './Dashboard.module.scss';

export function Dashboard() {
  return (
    <div className={styles.dashboardWrapper}>
      <Navigation />
      <Header name="James" />
      <main className={styles.tableWrapper}>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <input placeholder="Search" type="text" />
            <Button text="Add admin" className={styles.addUser} />
          </div>
          <div className={styles.tableContent}></div>
        </div>
      </main>
    </div>
  );
}
