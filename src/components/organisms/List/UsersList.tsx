import { useGet, useModal } from '@/hooks';

import { UsersListItem } from '@/components/molecules/ListItems/UsersListItem/UsersListItem';
import { ListWrapper } from '@/components/molecules/ListWrapper/ListWrapper';
import { CreateUser } from '../Create/CreateUser';

import { User } from '@/types/User';

export function UsersList() {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);

  const {
    data: users,
    error,
    isLoading,
    refetchData,
  } = useGet<User[] | undefined>({
    query: 'http://localhost:8000/api/users',
  });

  return (
    <ListWrapper handleOpenModal={handleOpenModal} singularName="user" isLoading={isLoading}>
      {isModalOpen ? (
        <CreateUser
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          refetchUsers={refetchData}
        />
      ) : null}
      {error ? (
        <p>{error}</p>
      ) : (
        users?.map((user) => <UsersListItem user={user} refetchUsers={refetchData} key={user.id} />)
      )}
    </ListWrapper>
  );
}
