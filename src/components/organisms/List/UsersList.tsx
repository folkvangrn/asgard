import { useState } from 'react';
import { useGet, useModal } from '@/hooks';

import { UsersListItem } from '@/components/molecules/ListItems/UsersListItem/UsersListItem';
import { ListWrapper } from '@/components/molecules/ListWrapper/ListWrapper';
import { CreateUser } from '../Create/CreateUser';
import { filterBySearchingPhrase } from './helpers';

import { User } from '@/types/User';
import { ItemsWrapper } from '@/components/atoms/ItemsWrapper/ItemsWrapper';

const requestUrl = process.env.REACT_APP_BACKEND_URL;

export function UsersList() {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);
  const [searchingPhrase, setSearchingPhrase] = useState<string>('');

  const {
    data: users,
    error,
    isLoading,
    refetchData,
  } = useGet<User[]>({
    query: requestUrl + '/api/users',
  });

  const filteredUsers = users?.filter((user) =>
    filterBySearchingPhrase(searchingPhrase, [user.firstName, user.lastName]),
  );

  return (
    <ListWrapper
      handleOpenModal={handleOpenModal}
      singularName="user"
      handleChangeSearchInput={setSearchingPhrase}
    >
      {isModalOpen ? (
        <CreateUser
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          refetchUsers={refetchData}
        />
      ) : null}
      <ItemsWrapper errorMessage={error} isLoading={isLoading} isEmpty={users?.length === 0}>
        {filteredUsers?.map((user) => (
          <UsersListItem user={user} refetchUsers={refetchData} key={user.id} />
        ))}
      </ItemsWrapper>
    </ListWrapper>
  );
}
