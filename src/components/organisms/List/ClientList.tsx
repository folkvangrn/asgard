import { useState } from 'react';
import { useGet, useModal } from '@/hooks';

import { ListWrapper } from '@/components/molecules/ListWrapper/ListWrapper';
import { CreateClient } from '../Create/CreateClient';
import { ClientListItem } from '@/components/molecules/ListItems/ClientListItem';
import { filterBySearchingPhrase } from './helpers';

import { Client } from '@/types/Client';

export function ClientList() {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);
  const [searchingPhrase, setSearchingPhrase] = useState<string>('');

  const {
    data: clients,
    error,
    isLoading,
    refetchData: refetchClients,
  } = useGet<Client[] | undefined>({
    query: 'http://localhost:8000/api/clients',
  });

  const filteredClients = clients?.filter((client) =>
    filterBySearchingPhrase(searchingPhrase, [client.firstName, client.lastName]),
  );

  return (
    <ListWrapper
      handleOpenModal={handleOpenModal}
      singularName="client"
      isLoading={isLoading}
      handleChangeSearchInput={setSearchingPhrase}
    >
      {isModalOpen ? (
        <CreateClient
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          refetchClients={refetchClients}
        />
      ) : null}
      {error ? (
        <p>{error}</p>
      ) : (
        filteredClients?.map((client) => (
          <ClientListItem client={client} refetchClients={refetchClients} key={client.id} />
        ))
      )}
    </ListWrapper>
  );
}
