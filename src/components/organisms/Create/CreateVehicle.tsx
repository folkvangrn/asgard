import * as Yup from 'yup';
import { useGet } from '@/hooks/useGet';

import { GenericCreateForm } from './GenericCreateForm';
import { SelectFieldInput, TextFieldInput } from '@/components/atoms/Inputs';

import { Vehicle, Client } from '@/types';

type CreateVehicleProps = {
  isOpen: boolean;
  handleCloseModal: VoidFunction;
  vehicleId?: string | undefined;
  refetchVehicles: VoidFunction;
};

const GET_VEHICLES_QUERY = 'http://vehicle-remedy.nixenos.ovh/api/v1/vehicles';
const GET_CLIENTS_QUERY = 'http://vehicle-remedy.nixenos.ovh/api/v1/clients';
const GET_VEHICLETYPES_QUERY = 'http://vehicle-remedy.nixenos.ovh/api/v1/vehicles/types';
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

  const initialValues: Vehicle = {
    vin: '',
    vehicleClass: vehicleTypes?.[0] || '',
    clientId: clients?.at(0)?.id || 0,
  };

  return (
    <GenericCreateForm<Vehicle>
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      initialId={vehicleId}
      initialFormValues={initialValues}
      singularName="Vehicle"
      validationSchema={Yup.object({
        vin: Yup.string()
          .required('Required')
         .matches(/^[A-Z]{1}[A-Z0-9]{15}[0-9]$/, { message: 'Invalid VIN' }),
        vehicleClass: Yup.string().required('Required'), // TODO: improve validation
        clientId: Yup.number(), // TODO: improve validation
      })}
      refetchData={refetchVehicles}
      query={vehicleId ? `${GET_VEHICLES_QUERY}/${vehicleId}` : GET_VEHICLES_QUERY}
    >
      <TextFieldInput label="VIN" name="vin" disabled={!!vehicleId} />
      {vehicleTypesError ? (
        <p>{vehicleTypesError}</p>
      ) : (
        <SelectFieldInput label="Type" name="vehicleClass" disabled={!!vehicleId}>
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
        <SelectFieldInput label="Client" name="clientId" isEmpty={clients?.length === 0}>
          {clients?.map(({ id, firstName, lastName, phoneNumber }) => (
            <option key={id} value={id}>
              {`${firstName} ${lastName} ${phoneNumber}`}
            </option>
          ))}
        </SelectFieldInput>
      )}
    </GenericCreateForm>
  );
}
