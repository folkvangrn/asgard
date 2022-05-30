import { useGet, useModal, useAuth } from '@/hooks';

import { ListWrapper } from '@/components/molecules/ListWrapper/ListWrapper';
import { CreateActivity } from '../Create/CreateActivity';
import { ActivityListItem } from '@/components/molecules/ListItems/ActivityListItem';
import { ListFilter } from '@/components/molecules/ListFilter/ListFilter';

import { Activity, Status } from '@/types';
import { ItemsWrapper } from '@/components/atoms/ItemsWrapper/ItemsWrapper';

type ActivitiesListProps = {
  requestId?: number;
};

export function ActivitiesList({ requestId }: ActivitiesListProps) {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);
  const { user } = useAuth();

  const GET_ACTIVITIES_QUERY = requestId
    ? `http://localhost:8000/api/requests/${requestId}/activities`
    : `http://localhost:8000/api/activities?workerid=${user?.id}&status=${Status.Open}`;

  const {
    data: activities,
    error,
    isLoading,
    refetchData: refetchActivities,
  } = useGet<Activity[]>({
    query: GET_ACTIVITIES_QUERY,
  });

  return (
    <ListWrapper
      handleOpenModal={handleOpenModal}
      singularName="activity"
      ListFilter={!requestId && <ListFilter refetchData={refetchActivities} />}
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
        {(activities || []).map((activity) => (
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
