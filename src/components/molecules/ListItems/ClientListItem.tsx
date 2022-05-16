import { useModal } from '@/hooks/useModal';

import { Button } from '@/components/atoms/Button/Button';
import { CreateClient } from '@/components/organisms/Create/CreateClient';
import { ListItemElements } from '@/components/atoms/ListItemElements/ListItemElements';

import { Client } from '@/types/Client';

type ClientListItemProps = {
  client: Client;
  refetchClients: VoidFunction;
};

export function ClientListItem({ client, refetchClients }: ClientListItemProps) {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);

  const componentsArray = [
    <p>{`${client.firstName} ${client.lastName}`}</p>,
    <p>{client.phoneNumber}</p>,
    <p>{client.email}</p>,
    <Button text="Edit" onClick={handleOpenModal} />,
  ];

  return (
    <>
      <ListItemElements componentsArray={componentsArray} />

      {isModalOpen ? (
        <CreateClient
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          clientId={client.id}
          refetchClients={refetchClients}
        />
      ) : null}
    </>
  );
}
