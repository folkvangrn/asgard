import { ReactNode } from 'react';
import { Button } from '@/components/atoms/Button/Button';
import styles from './ListWrapper.module.scss';

type ListWrapperProps = {
  children: ReactNode[];
  handleOpenModal: VoidFunction;
  singularName: string;
  isLoading: boolean;
};

export function ListWrapper({
  children,
  handleOpenModal,
  singularName,
  isLoading,
}: ListWrapperProps) {
  return (
    <main className={styles.tableWrapper}>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <input placeholder="Search" type="text" />
          <Button
            text={`Add ${singularName}`}
            className={styles.addButton}
            onClick={handleOpenModal}
          />
        </div>
        <div className={styles.tableContent}>
          {isLoading ? <p>Loading...</p> : null}
          {children}
        </div>
      </div>
    </main>
  );
}
