import { useGet } from '@/hooks/useGet';
import { useModal } from '@/hooks/useModal';

import { CreateVehicle } from '@/components/organisms/Create/CreateVehicle';
import { ListWrapper } from '@/components/molecules/ListWrapper/ListWrapper';
import { VehicleListItem } from '@/components/molecules/ListItems/VehicleListItem';

import { Vehicle } from '@/types/Vehicle';

export function VehicleList() {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);

  const {
    data: vehicles,
    error,
    isLoading,
    refetchData: refetchVehicles,
  } = useGet<Vehicle[] | undefined>({
    query: 'http://localhost:8000/api/vehicles',
  });

  return (
    <ListWrapper handleOpenModal={handleOpenModal} singularName="vehicle" isLoading={isLoading}>
      {isModalOpen ? (
        <CreateVehicle
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          refetchVehicles={refetchVehicles}
        />
      ) : null}
      {error ? (
        <p>{error}</p>
      ) : (
        vehicles?.map((vehicle) => (
          <VehicleListItem vehicle={vehicle} refetchVehicles={refetchVehicles} key={vehicle.vin} />
        ))
      )}
    </ListWrapper>
  );
}
