import { useGet } from '@/hooks/useGet';
import { useModal } from '@/hooks/useModal';

import { CreateVehicle } from '@/components/organisms/Create/CreateVehicle';
import { ListWrapper } from '@/components/molecules/ListWrapper/ListWrapper';

import { Vehicle } from '@/types/Vehicle';

export function VehicleList() {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);

  const {
    data: vehicles,
    error,
    isLoading,
    refetchData: refetchVehicles,
  } = useGet<Vehicle[] | undefined>({
    query: 'shttp://localhost:8000/api/vehicles',
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
      <p>hi</p>
      {/* {error ? (
        <p>{error}</p>
      ) : (
        users?.map((user) => <UsersListItem user={user} refetchUsers={refetchData} />)
      )} */}
    </ListWrapper>
  );
}
