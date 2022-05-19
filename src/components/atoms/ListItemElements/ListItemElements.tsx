import classNames from 'classnames';
import { ReactNode } from 'react';
import styles from './ListItemElements.module.scss';

type ListItemElementsProps = {
  componentsArray: ReactNode[];
  navigateToDetails?: VoidFunction;
};

export function ListItemElements({ componentsArray, navigateToDetails }: ListItemElementsProps) {
  return (
    <div
      className={classNames(styles.wrapper, navigateToDetails && styles.hasDetailsView)}
      onClick={navigateToDetails}
    >
      {componentsArray.map((component, i) => (
        <div key={i} className={styles.gridChild}>
          {component}
        </div>
      ))}
    </div>
  );
}
