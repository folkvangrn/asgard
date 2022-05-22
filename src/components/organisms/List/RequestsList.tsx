import { useAuth, useGet, useModal } from '@/hooks';

import { ListWrapper } from '@/components/molecules/ListWrapper/ListWrapper';
import { CreateRequest } from '../Create/CreateRequest';
import { ListFilter } from '@/components/molecules/ListFilter/ListFilter';
import { RequestListItem } from '@/components/molecules/ListItems/RequestListItem';

import { Request, Status } from '@/types';

export function RequestsList() {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);
  const { user } = useAuth();

  const {
    data: requests,
    error,
    isLoading,
    refetchData: refetchRequests,
  } = useGet<Request[] | undefined>({
    query: `http://localhost:8000/api/requests?managerid=${user?.id}&status=${Status.Open}`,
  });

  return (
    <ListWrapper
      handleOpenModal={handleOpenModal}
      singularName="request"
      isLoading={isLoading}
      ListFilter={<ListFilter refetchData={refetchRequests} />}
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
