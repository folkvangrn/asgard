import { User } from '@/types/User';
import styles from './ManageTableItem.module.scss';
import { Role } from '@/components/atoms/Role/Role';
import { Button } from '@/components/atoms/Button/Button';

import { FormField } from '@/components/molecules/FormField/FormField';
import { Modal } from '@/components/organisms/UserModal/UserModal';
import { useModal } from '@/hooks/useModal';

type ManageTabkeItemProps = {
  userData: User;
};

export function ManageTableItem({ userData }: ManageTabkeItemProps) {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.nameDetails}>
        <p>{userData?.firstName}</p>
        <p>{userData?.lastName}</p>
      </div>
      <Role role={userData.role} />
      <Button text="Edit" onClick={handleOpenModal} />
      <Button text={userData?.isActive ? 'Deactivate' : 'Activate'} />
      <Modal
        headerText={`Add admin`} //add logic to handle role
        buttonText="Edit"
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
      >
        <FormField id="firstName" placeholder="Edit first name" label="First name" />
        <FormField id="lastName" placeholder="Edit last name" label="Last name" />
        <FormField id="password" placeholder="Enter password" label="Password" type="password" />
      </Modal>
    </div>
  );
}
