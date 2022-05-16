import * as Yup from 'yup';
import { useGet } from '@/hooks/useGet';

import { TextFieldInput } from '@/components/molecules/TextFieldInput/TextFieldInput';
import { SelectFieldInput } from '@/components/molecules/SelectFieldInput/SelectFieldInput';
import { GenericCreateForm } from './GenericCreateForm';

import { Vehicle } from '@/types/Vehicle';
import { Client } from '@/types/Client';
import { Request } from '@/types';
import { useAuth } from '@/hooks/useAuth';

type CreateRequestProps = {
  isOpen: boolean;
  handleCloseModal: VoidFunction;
  requestId?: string | undefined;
  refetchRequests: VoidFunction;
};

const GET_VEHICLES_QUERY = 'http://localhost:8000/api/vehicles';

export function CreateRequest({
  isOpen,
  handleCloseModal,
  requestId,
  refetchRequests,
}: CreateRequestProps) {
  const { data: vehicles, error: clientsError } = useGet<Vehicle[]>({
    query: GET_VEHICLES_QUERY,
  });

  const { user } = useAuth();

  const initialValues: Request = {
    managerId: user?.id,
    description: '',
    result: '',
    vehicleId: vehicles?.at(0)?.vin,
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
        vehicleClass: Yup.string().required('Required'), // TODO: improve validation
        client: Yup.number(), // TODO: improve validation
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
        <SelectFieldInput label="Client" name="client" isEmpty={clients?.length === 0}>
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

// type RequestFormValues = {
//   description: string;
//   result: string;
//   vehicleVIN: string;
//   managerId: number;
// };

// type UserModalProps = {
//   isOpen: boolean;
//   handleCloseModal: VoidFunction;
// };

// const tempVehicles: Vehicle[] = [
//   {
//     vin: '12323',
//   },
//   {
//     vin: '12dssd',
//   },
// ];

// export function RequestModal({ isOpen, handleCloseModal }: UserModalProps) {
//   const { user } = useAuth();

//   const initialValues: RequestFormValues = {
//     description: '',
//     result: '',
//     vehicleVIN: tempVehicles[0].vin,
//     managerId: user?.id!,
//   };

//   const handleAddRequest = async (
//     values: RequestFormValues,
//     { resetForm }: { resetForm: VoidFunction },
//   ) => {
//     console.log(values);
//     resetForm();
//   };

//   return (
//     <Modal headerText="Add Request" isOpen={isOpen} handleClose={handleCloseModal}>
//       <Formik
//         initialValues={initialValues}
//         onSubmit={handleAddRequest}
//         validationSchema={Yup.object({
//           description: Yup.string()
//             .min(10, 'Description cannot be shorter than 10 characters.')
//             .max(500, 'Description cannot be longer than 500 characters.')
//             .required('Required'),
//           result: Yup.string()
//             .min(10, 'Result cannot be shorter than 10 characters.')
//             .max(500, 'Result cannot be longer than 500 characters.')
//             .required('Required'),
//           vehicleVIN: Yup.string().required('Required'),
//           managerId: Yup.number().required('Required'),
//         })}
//       >
//         <FormWrapper handleCloseForm={handleCloseModal}>
//           <TextAreaFieldInput label="Description" name="description" />
//           <TextAreaFieldInput label="Result" name="result" />
//           <TextFieldInput
//             label="Manager"
//             name="managerId"
//             value={`${user?.firstName} ${user?.lastName}`}
//             disabled
//           />
//           <SelectFieldInput label="Vehicle" name="vehicleVIN">
//             {tempVehicles.map(({ vin, type }) => (
//               <option value={vin}>
//                 {vin} {type}
//               </option>
//             ))}
//           </SelectFieldInput>
//         </FormWrapper>
//       </Formik>
//     </Modal>
//   );
// }
