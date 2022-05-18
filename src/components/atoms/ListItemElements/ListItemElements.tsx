import { ReactNode } from 'react';
import styles from './ListItemElements.module.scss';

type ListItemElementsProps = {
  componentsArray: ReactNode[];
  navigateToDetails: VoidFunction;
};

export function ListItemElements({ componentsArray, navigateToDetails }: ListItemElementsProps) {
  return (
    <div className={styles.wrapper} onClick={navigateToDetails}>
      {componentsArray.map((component, i) => (
        <div key={i} className={styles.gridChild}>
          {component}
        </div>
      ))}
    </div>
  );
}
