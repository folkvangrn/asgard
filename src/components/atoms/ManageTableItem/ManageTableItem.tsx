import React from 'react';
import { User, UserRole } from '@/types/User';
import styles from './ManageTableItem.module.scss';
import Button from '../Button/Button';
import { Role } from '../Role/Role';

type ManageTabkeItemProps = {
  userData: User;
};

export function ManageTableItem({ userData }: ManageTabkeItemProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.nameDetails}>
        <p>{userData?.firstName}</p>
        <p>{userData?.lastName}</p>
      </div>
      <Role role={userData.role} />
      <Button text="Edit" />
      <button>{userData?.isActive ? 'Deactivate' : 'Activate'}</button>
    </div>
  );
}
