import { useAuth } from '@/hooks/useAuth';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Modal } from '@/components/molecules/Modal/Modal';
import { SelectFieldInput } from '@/components/molecules/SelectFieldInput/SelectFieldInput';
import { TextAreaFieldInput } from '@/components/molecules/TextAraFieldInput/TextAraFieldInput';
import { TextFieldInput } from '@/components/molecules/TextFieldInput/TextFieldInput';
import { FormWrapper } from '@/components/atoms/FormWrapper/FormWrapper';

import { Vehicle } from '@/types/Vehicle';

type RequestFormValues = {
  description: string;
  result: string;
  vehicleVIN: string;
  managerId: number;
};

type UserModalProps = {
  isOpen: boolean;
  handleCloseModal: VoidFunction;
};

const tempVehicles: Vehicle[] = [
  {
    vin: '12323',
  },
  {
    vin: '12dssd',
  },
];

export function RequestModal({ isOpen, handleCloseModal }: UserModalProps) {
  const { user } = useAuth();

  const initialValues: RequestFormValues = {
    description: '',
    result: '',
    vehicleVIN: tempVehicles[0].vin,
    managerId: user?.id!,
  };

  const handleAddRequest = async (
    values: RequestFormValues,
    { resetForm }: { resetForm: VoidFunction },
  ) => {
    console.log(values);
    resetForm();
  };

  return (
    <Modal headerText="Add Request" isOpen={isOpen} handleClose={handleCloseModal}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleAddRequest}
        validationSchema={Yup.object({
          description: Yup.string()
            .min(10, 'Description cannot be shorter than 10 characters.')
            .max(500, 'Description cannot be longer than 500 characters.')
            .required('Required'),
          result: Yup.string()
            .min(10, 'Result cannot be shorter than 10 characters.')
            .max(500, 'Result cannot be longer than 500 characters.')
            .required('Required'),
          vehicleVIN: Yup.string().required('Required'),
          managerId: Yup.number().required('Required'),
        })}
      >
        <FormWrapper handleCloseForm={handleCloseModal}>
          <TextAreaFieldInput label="Description" name="description" />
          <TextAreaFieldInput label="Result" name="result" />
          <TextFieldInput
            label="Manager"
            name="managerId"
            value={`${user?.firstName} ${user?.lastName}`}
            disabled
          />
          <SelectFieldInput label="Vehicle" name="vehicleVIN">
            {tempVehicles.map(({ vin, type }) => (
              <option value={vin}>
                {vin} {type}
              </option>
            ))}
          </SelectFieldInput>
        </FormWrapper>
      </Formik>
    </Modal>
  );
}
