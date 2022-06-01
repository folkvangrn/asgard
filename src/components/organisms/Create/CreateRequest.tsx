import * as Yup from 'yup';
import { useGet, useAuth } from '@/hooks/';

import { GenericCreateForm } from './GenericCreateForm';
import { SelectFieldInput, TextAreaFieldInput, TextFieldInput } from '@/components/atoms/Inputs';

import { Vehicle, Request, Status } from '@/types';

type CreateRequestProps = {
  isOpen: boolean;
  handleCloseModal: VoidFunction;
  requestId?: number | undefined;
  refetchRequests: VoidFunction;
};

const GET_VEHICLES_QUERY = 'http://192.168.1.234:8000/api/vehicles';
const GET_REQUESTS_QUERY = 'http://192.168.1.234:8000/api/requests';

export function CreateRequest({
  isOpen,
  handleCloseModal,
  requestId,
  refetchRequests,
}: CreateRequestProps) {
  const { data: vehicles, error: vehiclesError } = useGet<Vehicle[]>({
    query: GET_VEHICLES_QUERY,
  });

  const { user } = useAuth();

  const initialValues: Request = {
    description: '',
    managerId: user?.id,
    vehicleVin: vehicles?.at(0)?.vin,
    status: Status.Open,
  };
  return (
    <GenericCreateForm<Request>
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      initialId={requestId}
      initialFormValues={initialValues}
      singularName="Request"
      validationSchema={Yup.object({
        description: Yup.string()
          .min(10, 'Description cannot be shorter than 10 characters.')
          .max(500, 'Description cannot be longer than 500 characters.')
          .required('Required'),
        managerId: Yup.number(), //TODO: work on validation
        vehicleVin: Yup.string().required(),
        status: Yup.string(),
      })}
      refetchData={refetchRequests}
      query={requestId ? `${GET_REQUESTS_QUERY}/${requestId}` : GET_REQUESTS_QUERY}
    >
      <TextAreaFieldInput label="Description" name="description" />
      <TextAreaFieldInput label="Result" name="result" />
      <TextFieldInput
        label="Manager"
        name="managerId"
        value={`${user?.firstName} ${user?.lastName}`}
        disabled
      />
      {vehiclesError ? (
        <p>{vehiclesError}</p>
      ) : (
        <SelectFieldInput
          label="Vehicle"
          name="vehicleVin"
          isEmpty={vehicles?.length === 0}
          disabled={!!requestId}
        >
          {vehicles?.map(({ vin, vehicleClass }) => (
            <option key={vin} value={vin}>
              {`${vin} ${vehicleClass}`}
            </option>
          ))}
        </SelectFieldInput>
      )}
      {requestId ? (
        <SelectFieldInput label="Status" name="status">
          {Object.values(Status).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </SelectFieldInput>
      ) : null}
    </GenericCreateForm>
  );
}
