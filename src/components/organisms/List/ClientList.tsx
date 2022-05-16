import { useGet } from '@/hooks/useGet';
import { useModal } from '@/hooks/useModal';

import { ListWrapper } from '@/components/molecules/ListWrapper/ListWrapper';
import { CreateClient } from '../Create/CreateClient';
import { ClientListItem } from '@/components/molecules/ListItems/ClientListItem';

import { Client } from '@/types/Client';

export function ClientList() {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);

  const {
    data: clients,
    error,
    isLoading,
    refetchData: refetchClients,
  } = useGet<Client[] | undefined>({
    query: 'http://localhost:8000/api/clients',
  });

  return (
    <ListWrapper handleOpenModal={handleOpenModal} singularName="client" isLoading={isLoading}>
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
        clients?.map((client) => (
          <ClientListItem client={client} refetchClients={refetchClients} key={client.id} />
        ))
      )}
    </ListWrapper>
  );
}
