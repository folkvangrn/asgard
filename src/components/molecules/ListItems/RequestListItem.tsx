import { ListItemElements } from '@/components/atoms/ListItemElements/ListItemElements';
import { Request } from '@/types';

type RequestListItemProps = {
  request: Request;
};

export function RequestListItem({ request }: RequestListItemProps) {
  const componentsArray = [
    <p>{request.status}</p>,
    <p>Request date {request.dateRequest}</p>,
    <p>VIN {request.vehicleVin}</p>,
  ];

  return <ListItemElements componentsArray={componentsArray} />;
}
