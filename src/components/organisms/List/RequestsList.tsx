import { useGet } from '@/hooks/useGet';
import { useModal } from '@/hooks/useModal';
import { useAuth } from '@/hooks/useAuth';

import { ListWrapper } from '@/components/molecules/ListWrapper/ListWrapper';
import { CreateRequest } from '../Create/CreateRequest';
import { RequestListFilter } from '@/components/molecules/RequestListFilter/RequestListFilter';

import { Request, RequestStatus } from '@/types';
import { RequestListItem } from '@/components/molecules/ListItems/RequestListItem';

export function RequestsList() {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);

  const { user } = useAuth();
  const {
    data: requests,
    error,
    isLoading,
    refetchData: refetchRequests,
  } = useGet<Request[] | undefined>({
    query: `http://localhost:8000/api/requests?managerid=${user.id}&status=${RequestStatus.Open}`,
  });

  return (
    <ListWrapper
      handleOpenModal={handleOpenModal}
      singularName="request"
      isLoading={isLoading}
      ListFilter={<RequestListFilter refetchRequests={refetchRequests} managerId={user.id} />}
    >
      {isModalOpen ? (
        <CreateRequest
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          refetchRequests={refetchRequests}
        />
      ) : null}
      {error ? (
        <p>{error}</p>
      ) : (
        requests?.map((request) => <RequestListItem request={request} key={request.id} />)
      )}
    </ListWrapper>
  );
}
