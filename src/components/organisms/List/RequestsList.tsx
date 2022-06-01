import { useAuth, useGet, useModal } from '@/hooks';

import { ListWrapper } from '@/components/molecules/ListWrapper/ListWrapper';
import { CreateRequest } from '../Create/CreateRequest';
import { ListFilter } from '@/components/molecules/ListFilter/ListFilter';
import { RequestListItem } from '@/components/molecules/ListItems/RequestListItem';
import { ItemsWrapper } from '@/components/atoms/ItemsWrapper/ItemsWrapper';

import { Request, Status } from '@/types';

const requestUrl = process.env.REACT_APP_BACKEND_URL;

export function RequestsList() {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);
  const { user } = useAuth();

  const {
    data: requests,
    error,
    isLoading,
    refetchData: refetchRequests,
  } = useGet<Request[]>({
    query: requestUrl + `/api/requests?managerid=${user?.id}`,
  });

  return (
    <ListWrapper
      handleOpenModal={handleOpenModal}
      singularName="request"
      ListFilter={<ListFilter refetchData={refetchRequests} />}
    >
      {isModalOpen ? (
        <CreateRequest
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          refetchRequests={refetchRequests}
        />
      ) : null}
      <ItemsWrapper errorMessage={error} isLoading={isLoading} isEmpty={requests?.length === 0}>
        {requests?.map((request) => (
          <RequestListItem request={request} />
        ))}
      </ItemsWrapper>
    </ListWrapper>
  );
}
