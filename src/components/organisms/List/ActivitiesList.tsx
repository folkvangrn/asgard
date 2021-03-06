import { useGet, useModal, useAuth } from '@/hooks';
import { useState } from 'react';

import { ListWrapper } from '@/components/molecules/ListWrapper/ListWrapper';
import { CreateActivity } from '../Create/CreateActivity';
import { ActivityListItem } from '@/components/molecules/ListItems/ActivityListItem';
import { ListFilter } from '@/components/molecules/ListFilter/ListFilter';
import { filterBySearchingPhrase } from './helpers';

import { Activity } from '@/types';
import { ItemsWrapper } from '@/components/atoms/ItemsWrapper/ItemsWrapper';

type ActivitiesListProps = {
  requestId?: number;
};
const requestUrl = "http://vehicle-remedy.nixenos.ovh";
export function ActivitiesList({ requestId }: ActivitiesListProps) {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);
  const [searchingPhrase, setSearchingPhrase] = useState<string>('');

  const { user } = useAuth();

  const GET_ACTIVITIES_QUERY = requestId
    ? requestUrl + `/api/v1/requests/${requestId}/activities`
    : requestUrl + `/api/v1/activities?workerid=${user?.id}`;

  const {
    data: activities,
    error,
    isLoading,
    refetchData: refetchActivities,
  } = useGet<Activity[]>({
    query: GET_ACTIVITIES_QUERY,
  });

  const filteredActivities = activities?.filter((activity) =>
    filterBySearchingPhrase(searchingPhrase, [activity.status]),
  );

  return (
    <ListWrapper
      handleOpenModal={handleOpenModal}
      singularName="activity"
      ListFilter={!requestId && <ListFilter refetchData={refetchActivities} />}
      handleChangeSearchInput={setSearchingPhrase}
    >
      {isModalOpen ? (
        <CreateActivity
          requestId={requestId!}
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          refetchActivities={refetchActivities}
        />
      ) : null}
      <ItemsWrapper errorMessage={error} isLoading={isLoading} isEmpty={activities?.length === 0}>
        {(filteredActivities || []).map((activity) => (
          <ActivityListItem
            activity={activity}
            refetchActivities={refetchActivities}
            key={activity.id}
          />
        ))}
      </ItemsWrapper>
    </ListWrapper>
  );
}
