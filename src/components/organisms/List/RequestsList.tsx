import { useAuth, useGet, useModal } from '@/hooks';
import { useState } from 'react';

import { ListWrapper } from '@/components/molecules/ListWrapper/ListWrapper';
import { CreateRequest } from '../Create/CreateRequest';
import { ListFilter } from '@/components/molecules/ListFilter/ListFilter';
import { RequestListItem } from '@/components/molecules/ListItems/RequestListItem';
import { ItemsWrapper } from '@/components/atoms/ItemsWrapper/ItemsWrapper';
import { filterBySearchingPhrase } from './helpers';

import { Request } from '@/types';

const requestUrl = "http://vehicle-remedy.nixenos.ovh";

export function RequestsList() {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);
  const [searchingPhrase, setSearchingPhrase] = useState<string>('');

  const { user } = useAuth();

  const {
    data: requests,
    error,
    isLoading,
    refetchData: refetchRequests,
  } = useGet<Request[]>({
    query: requestUrl + `/api/v1/requests?managerid=${user?.id}`,
  });

  const filteredRequests = requests?.filter((request) =>
    filterBySearchingPhrase(searchingPhrase, [request.status]),
  );

  return (
    <ListWrapper
      handleOpenModal={handleOpenModal}
      singularName="request"
      ListFilter={<ListFilter refetchData={refetchRequests} />}
      handleChangeSearchInput={setSearchingPhrase}
    >
      {isModalOpen ? (
        <CreateRequest
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          refetchRequests={refetchRequests}
        />
      ) : null}
      <ItemsWrapper errorMessage={error} isLoading={isLoading} isEmpty={requests?.length === 0}>
        {filteredRequests?.map((request) => (
          <RequestListItem request={request} />
        ))}
      </ItemsWrapper>
    </ListWrapper>
  );
}
