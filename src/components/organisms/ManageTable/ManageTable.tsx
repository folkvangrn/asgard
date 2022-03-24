import Button from '@/components/atoms/Button/Button';
import styles from './ManageTable.module.scss';

export function ManageTable() {
  return (
    <main className={styles.tableWrapper}>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <input placeholder="Search" type="text" />
          <Button text="Add admin" className={styles.addUser} />
        </div>
        <div className={styles.tableContent}></div>
      </div>
    </main>
  );
}
