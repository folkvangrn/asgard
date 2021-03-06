import { useModal } from '@/hooks/useModal';

import { Role } from '@/components/atoms/Role/Role';
import { Button } from '@/components/atoms/Button/Button';
import { CreateUser } from '@/components/organisms/Create/CreateUser';
import { ListItemElements } from '@/components/atoms/ListItemElements/ListItemElements';

import { User } from '@/types/User';

import styles from './UsersListItem.module.scss';

type UsersListItemProps = {
  user: User;
  refetchUsers: VoidFunction;
};

export function UsersListItem({ user, refetchUsers }: UsersListItemProps) {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);

  const componentsArray = [
    <p className={styles.nameDetails}>{`${user.firstName} ${user.lastName}`}</p>,
    <Role role={user.role} />,
    <Button text="Edit" onClick={handleOpenModal} />,
  ];

  return (
    <>
      <ListItemElements componentsArray={componentsArray} />
      {isModalOpen ? (
        <CreateUser
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          userId={user.id}
          refetchUsers={refetchUsers}
        />
      ) : null}
    </>
  );
}
