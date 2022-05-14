import { useGet } from '@/hooks/useGet';
import { useModal } from '@/hooks/useModal';

import { ListWrapper } from '@/components/molecules/ListWrapper/ListWrapper';
import { CreateClient } from '../Create/CreateClient';

import { User } from '@/types/User';

export function ClientList() {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);

  const {
    data: clients,
    error,
    isLoading,
    refetchData: refetchClients,
  } = useGet<User[] | undefined>({
    query: 'http://localhost:8000/api/clients',
  });

  console.log(clients);

  return (
    <ListWrapper handleOpenModal={handleOpenModal} singularName="client" isLoading={isLoading}>
      {isModalOpen ? (
        <CreateClient
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          refetchClients={refetchClients}
        />
      ) : null}
      {error ? <p>{error}</p> : <p>clients</p>}
    </ListWrapper>
  );
}
