import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Modal } from '@/components/molecules/Modal/Modal';
import { TextFieldInput } from '@/components/molecules/TextFieldInput/TextFieldInput';
import { SelectFieldInput } from '@/components/molecules/SelectFieldInput/SelectFieldInput';
import { VehicleType } from '@/types/Vehicle';
import { FormWrapper } from '@/components/atoms/FormWrapper/FormWrapper';

type VehicleFormValues = {
  vin: string;
  type: VehicleType;
  clientId: number;
};

type VehicleModalProps = {
  isOpen: boolean;
  handleCloseModal: VoidFunction;
};

const tempClients = [
  {
    id: 1,
    firstName: 'Jan',
    lastName: 'Kowalski',
    phone: '123456789',
  },
  {
    id: 2,
    firstName: 'Ada',
    lastName: 'Nowak',
    phone: '123456789',
  },
];

export function VehicleModal({ isOpen, handleCloseModal }: VehicleModalProps) {
  const headerText = 'Add vehicle';

  const [message, setMessage] = useState<string>('');

  const initialValues: VehicleFormValues = {
    vin: '',
    type: VehicleType.CityCar,
    clientId: 0,
  };

  const handleAddVehicle = async (
    values: VehicleFormValues,
    { resetForm }: { resetForm: VoidFunction },
  ) => {
    console.log(values);
  };

  return (
    <Modal headerText={headerText} isOpen={isOpen} handleClose={handleCloseModal}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleAddVehicle}
        validationSchema={Yup.object({
          vin: Yup.string().required('Required'),
          type: Yup.mixed<VehicleType>().oneOf(Object.values(VehicleType)).required('Required'),
        })}
      >
        <FormWrapper handleCloseForm={handleCloseModal}>
          <TextFieldInput label="VIN" name="vin" />
          <SelectFieldInput label="Type" name="type">
            {Object.entries(VehicleType).map(([key, value]) => (
              <option key={key} value={value}>
                {key}
              </option>
            ))}
          </SelectFieldInput>
          <SelectFieldInput label="Client" name="clientId">
            {tempClients.map(({ id, firstName, lastName, phone }) => (
              <option key={id} value={id}>
                {firstName} {lastName} {phone}
              </option>
            ))}
          </SelectFieldInput>
        </FormWrapper>
      </Formik>
      {message ? <p>{message}</p> : null}
    </Modal>
  );
}
