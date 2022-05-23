import { useState } from 'react';
import { useGet, useModal } from '@/hooks';

import { UsersListItem } from '@/components/molecules/ListItems/UsersListItem/UsersListItem';
import { ListWrapper } from '@/components/molecules/ListWrapper/ListWrapper';
import { CreateUser } from '../Create/CreateUser';
import { filterBySearchingPhrase } from './helpers';

import { User } from '@/types/User';

export function UsersList() {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);
  const [searchingPhrase, setSearchingPhrase] = useState<string>('');

  const {
    data: users,
    error,
    isLoading,
    refetchData,
  } = useGet<User[] | undefined>({
    query: 'http://localhost:8000/api/users',
  });

  const filteredUsers = users?.filter((user) =>
    filterBySearchingPhrase(searchingPhrase, [user.firstName, user.lastName]),
  );

  return (
    <ListWrapper
      handleOpenModal={handleOpenModal}
      singularName="user"
      isLoading={isLoading}
      handleChangeSearchInput={setSearchingPhrase}
    >
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
        filteredUsers?.map((user) => (
          <UsersListItem user={user} refetchUsers={refetchData} key={user.id} />
        ))
      )}
    </ListWrapper>
  );
}
