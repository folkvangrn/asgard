import { useGet } from '@/hooks/useGet';
import { useModal } from '@/hooks/useModal';

import { useAuth } from '@/hooks/useAuth';
import { ListWrapper } from '@/components/molecules/ListWrapper/ListWrapper';

import { Activity, Status } from '@/types';
import { CreateActivity } from '../Create/CreateActivity';
import { ActivityListItem } from '@/components/molecules/ListItems/ActivityListItem';

type ActivitiesListProps = {
  // isManagerLogged?: boolean;
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
  } = useGet<Activity[] | undefined>({
    query: GET_ACTIVITIES_QUERY,
  });

  return (
    <ListWrapper isLoading={isLoading} handleOpenModal={handleOpenModal} singularName="activity">
      {isModalOpen ? (
        <CreateActivity
          requestId={requestId!}
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          refetchActivities={refetchActivities}
        />
      ) : null}
      {error ? (
        <p>{error}</p>
      ) : (
        activities?.map((activity) => (
          <ActivityListItem
            activity={activity}
            refetchActivities={refetchActivities}
            key={activity.id}
          />
        ))
      )}
    </ListWrapper>
  );
}