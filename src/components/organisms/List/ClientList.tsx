import { useState } from 'react';
import { useGet, useModal } from '@/hooks';

import { ListWrapper } from '@/components/molecules/ListWrapper/ListWrapper';
import { CreateClient } from '../Create/CreateClient';
import { ClientListItem } from '@/components/molecules/ListItems/ClientListItem';
import { filterBySearchingPhrase } from './helpers';

import { Client } from '@/types/Client';
import { ItemsWrapper } from '@/components/atoms/ItemsWrapper/ItemsWrapper';

const requestUrl = "http://localhost:8000" + "/api/clients"

export function ClientList() {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);
  const [searchingPhrase, setSearchingPhrase] = useState<string>('');

  const {
    data: clients,
    error,
    isLoading,
    refetchData: refetchClients,
  } = useGet<Client[]>({
    query: requestUrl,
  });

  const filteredClients = clients?.filter((client) =>
    filterBySearchingPhrase(searchingPhrase, [client.firstName, client.lastName]),
  );

  return (
    <ListWrapper
      handleOpenModal={handleOpenModal}
      singularName="client"
      handleChangeSearchInput={setSearchingPhrase}
    >
      {isModalOpen ? (
        <CreateClient
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          refetchClients={refetchClients}
        />
      ) : null}
      <ItemsWrapper errorMessage={error} isLoading={isLoading} isEmpty={clients?.length === 0}>
        {filteredClients?.map((client) => (
          <ClientListItem client={client} refetchClients={refetchClients} key={client.id} />
        ))}
      </ItemsWrapper>
    </ListWrapper>
  );
}
