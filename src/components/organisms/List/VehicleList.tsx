import { useState } from 'react';
import { useGet, useModal } from '@/hooks';

import { CreateVehicle } from '@/components/organisms/Create/CreateVehicle';
import { ListWrapper } from '@/components/molecules/ListWrapper/ListWrapper';
import { VehicleListItem } from '@/components/molecules/ListItems/VehicleListItem';
import { filterBySearchingPhrase } from './helpers';

import { Vehicle } from '@/types/Vehicle';
import { ItemsWrapper } from '@/components/atoms/ItemsWrapper/ItemsWrapper';

const requestUrl = "http://172.17.0.1:8000";

export function VehicleList() {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);
  const [searchingPhrase, setSearchingPhrase] = useState<string>('');

  const {
    data: vehicles,
    error,
    isLoading,
    refetchData: refetchVehicles,
  } = useGet<Vehicle[]>({
    query: requestUrl + '/api/vehicles',
  });

  const filteredVehicles = vehicles?.filter((vehicle) =>
    filterBySearchingPhrase(searchingPhrase, [vehicle.vin, vehicle.vehicleClass]),
  );

  return (
    <ListWrapper
      handleOpenModal={handleOpenModal}
      singularName="vehicle"
      handleChangeSearchInput={setSearchingPhrase}
    >
      {isModalOpen ? (
        <CreateVehicle
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          refetchVehicles={refetchVehicles}
        />
      ) : null}
      <ItemsWrapper errorMessage={error} isLoading={isLoading} isEmpty={vehicles?.length === 0}>
        {filteredVehicles?.map((vehicle) => (
          <VehicleListItem vehicle={vehicle} refetchVehicles={refetchVehicles} key={vehicle.vin} />
        ))}
      </ItemsWrapper>
    </ListWrapper>
  );
}
