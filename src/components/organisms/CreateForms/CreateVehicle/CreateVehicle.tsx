import * as Yup from 'yup';
import { useGet } from '@/hooks/useGet';

import { TextFieldInput } from '@/components/molecules/TextFieldInput/TextFieldInput';
import { SelectFieldInput } from '@/components/molecules/SelectFieldInput/SelectFieldInput';
import { GenericCreateForm } from '../GenericCreateForm';

import { Vehicle } from '@/types/Vehicle';
import { Client } from '@/types/Client';

type CreateVehicleProps = {
  isOpen: boolean;
  handleCloseModal: VoidFunction;
  vehicleId?: number | undefined;
  refetchVehicles: VoidFunction;
};

const GET_VEHICLES_QUERY = 'http://localhost:8000/api/vehicles';
const GET_CLIENTS_QUERY = 'http://localhost:8000/api/clients';
const GET_VEHICLETYPES_QUERY = 'http://localhost:8000/api/vehicles/types';

export function CreateVehicle({
  isOpen,
  handleCloseModal,
  vehicleId,
  refetchVehicles,
}: CreateVehicleProps) {
  const { data: clients, error: clientsError } = useGet<Client[]>({
    query: GET_CLIENTS_QUERY,
  });

  const { data: vehicleTypes, error: vehicleTypesError } = useGet<string[]>({
    query: GET_VEHICLETYPES_QUERY,
  });

  console.log(vehicleTypes);
  const initialValues: Vehicle = {
    vin: '',
    type: vehicleTypes?.[0] || '',
    clientId: 0,
  };

  return (
    <GenericCreateForm
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      initialId={vehicleId}
      initialFormValues={initialValues}
      singularName="Vehicle"
      validationSchema={Yup.object({
        vin: Yup.string().required('Required'),
        type: Yup.string().required('Required'), // TODO: improve validation
        client: Yup.string().required('Required'), // TODO: improve validation
      })}
      refetchData={refetchVehicles}
      query={vehicleId ? `${GET_VEHICLES_QUERY}/${vehicleId}` : GET_VEHICLES_QUERY}
    >
      <TextFieldInput label="VIN" name="vin" disabled={!!vehicleId} />
      {vehicleTypesError ? (
        <p>{vehicleTypesError}</p>
      ) : (
        <SelectFieldInput label="Type" name="type" disabled={!!vehicleId}>
          {vehicleTypes?.map((vt) => (
            <option key={vt} value={vt}>
              {vt}
            </option>
          ))}
        </SelectFieldInput>
      )}
      {clientsError ? (
        <p>{clientsError}</p>
      ) : (
        <SelectFieldInput label="Client" name="client" isEmpty={clients?.length === 0}>
          {clients?.map(({ id, firstName, lastName, phone }) => {
            <option key={id} value={id}>
              {`${firstName} ${lastName} ${phone}`}
            </option>;
          })}
        </SelectFieldInput>
      )}
    </GenericCreateForm>
  );
}
