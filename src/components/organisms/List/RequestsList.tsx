import { useGet } from '@/hooks/useGet';
import { useModal } from '@/hooks/useModal';

import { ListWrapper } from '@/components/molecules/ListWrapper/ListWrapper';

import { Request } from '@/types';
import { CreateUser } from '../Create/CreateUser';

export function RequestsList() {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);

  const {
    data: requests,
    error,
    isLoading,
    refetchData,
  } = useGet<Request | undefined>({
    query: 'http://localhost:8000/api/requests',
  });

  return (
    <ListWrapper handleOpenModal={handleOpenModal} singularName="request" isLoading={isLoading}>
      {isModalOpen ? (
        <CreateUser
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          refetchUsers={refetchData}
        />
      ) : null}
      <p>requests</p>
    </ListWrapper>
  );
}
