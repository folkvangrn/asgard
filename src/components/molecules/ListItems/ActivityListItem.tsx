import { useModal } from '@/hooks/useModal';

import { Button } from '@/components/atoms/Button/Button';
import { ListItemElements } from '@/components/atoms/ListItemElements/ListItemElements';
import { CreateActivity } from '@/components/organisms/Create/CreateActivity';

import { Activity } from '@/types';

type ActivityListItemProps = {
  activity: Activity;
  refetchActivities: VoidFunction;
};

export function ActivityListItem({ activity, refetchActivities }: ActivityListItemProps) {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);

  const componentsArray = [
    <p>{activity.status}</p>,
    <p> Sequence nr{activity.sequenceNumber}</p>,
    <p>{activity.activityDictionaryActivityType}</p>,
    <Button text="Edit" onClick={handleOpenModal} />,
  ];

  return (
    <>
      <ListItemElements componentsArray={componentsArray} />
      {isModalOpen ? (
        <CreateActivity
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          activityId={activity.id}
          refetchActivities={refetchActivities}
          requestId={activity.requestId}
        />
      ) : null}
    </>
  );
}
