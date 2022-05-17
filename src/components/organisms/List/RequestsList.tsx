import { useGet } from '@/hooks/useGet';
import { useModal } from '@/hooks/useModal';

import { ListWrapper } from '@/components/molecules/ListWrapper/ListWrapper';
import { CreateRequest } from '../Create/CreateRequest';

import { Request } from '@/types';

export function RequestsList() {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);

  const {
    data: requests,
    error,
    isLoading,
    refetchData: refetchRequests,
  } = useGet<Request | undefined>({
    query: 'http://localhost:8000/api/requests',
  });

  return (
    <ListWrapper handleOpenModal={handleOpenModal} singularName="request" isLoading={isLoading}>
      {isModalOpen ? (
        <CreateRequest
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          refetchRequests={refetchRequests}
        />
      ) : null}
      <p>requests</p>
    </ListWrapper>
  );
}
