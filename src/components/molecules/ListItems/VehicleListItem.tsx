import { useModal } from '@/hooks/useModal';

import { Button } from '@/components/atoms/Button/Button';
import { CreateVehicle } from '@/components/organisms/Create/CreateVehicle';
import { ListItemElements } from '@/components/atoms/ListItemElements/ListItemElements';

import { Vehicle } from '@/types/Vehicle';

type VehicleListItemProps = {
  vehicle: Vehicle;
  refetchVehicles: VoidFunction;
};

export function VehicleListItem({ vehicle, refetchVehicles }: VehicleListItemProps) {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);

  const componentsArray = [
    <p>{vehicle.vin}</p>,
    <p>{vehicle.vehicleClass}</p>,
    <Button text="Edit" onClick={handleOpenModal} />,
  ];

  return (
    <>
      <ListItemElements componentsArray={componentsArray} />
      {isModalOpen ? (
        <CreateVehicle
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          vehicleId={vehicle.vin}
          refetchVehicles={refetchVehicles}
        />
      ) : null}
    </>
  );
}
