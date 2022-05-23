import { useState } from 'react';
import { useGet, useModal } from '@/hooks';

import { CreateVehicle } from '@/components/organisms/Create/CreateVehicle';
import { ListWrapper } from '@/components/molecules/ListWrapper/ListWrapper';
import { VehicleListItem } from '@/components/molecules/ListItems/VehicleListItem';
import { filterBySearchingPhrase } from './helpers';

import { Vehicle } from '@/types/Vehicle';

export function VehicleList() {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);
  const [searchingPhrase, setSearchingPhrase] = useState<string>('');

  const {
    data: vehicles,
    error,
    isLoading,
    refetchData: refetchVehicles,
  } = useGet<Vehicle[] | undefined>({
    query: 'http://localhost:8000/api/vehicles',
  });

  const filteredVehicles = vehicles?.filter((vehicle) =>
    filterBySearchingPhrase(searchingPhrase, [vehicle.vin, vehicle.vehicleClass]),
  );

  return (
    <ListWrapper
      handleOpenModal={handleOpenModal}
      singularName="vehicle"
      isLoading={isLoading}
      handleChangeSearchInput={setSearchingPhrase}
    >
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
        filteredVehicles?.map((vehicle) => (
          <VehicleListItem vehicle={vehicle} refetchVehicles={refetchVehicles} key={vehicle.vin} />
        ))
      )}
    </ListWrapper>
  );
}
