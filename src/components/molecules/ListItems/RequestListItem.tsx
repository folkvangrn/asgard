import { useNavigate } from 'react-router-dom';
import { ListItemElements } from '@/components/atoms/ListItemElements/ListItemElements';

import { Request } from '@/types';

type RequestListItemProps = {
  request: Request;
};

export function RequestListItem({ request }: RequestListItemProps) {
  const navigate = useNavigate();
  const componentsArray = [
    <p>{request.status}</p>,
    <p>Request date {request.dateRequest}</p>,
    <p>VIN {request.vehicleVin}</p>,
  ];

  const handleNavigateToDetails = () => {
    navigate(`/dashboard/requests/${request.id}`, { replace: true });
  };

  return (
    <ListItemElements
      navigateToDetails={handleNavigateToDetails}
      componentsArray={componentsArray}
    />
  );
}
