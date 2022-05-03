import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Modal } from '@/components/molecules/Modal/Modal';
import { TextFieldInput } from '@/components/molecules/TextFieldInput/TextFieldInput';
import { FormWrapper } from '@/components/atoms/FormWrapper/FormWrapper';

type ClientFormValues = {
  firstName: string;
  lastName: string;
  phone: string;
};

type UserModalProps = {
  isOpen: boolean;
  handleCloseModal: VoidFunction;
  initialClient?: Client;
  editMode?: boolean;
};

type Client = {
  firstName: string;
  lastName: string;
  phone: string;
};

export function ClientModal({ isOpen, handleCloseModal, initialClient, editMode }: UserModalProps) {
  const headerText = editMode ? 'Edit Client' : 'Add client';

  const [message, setMessage] = useState<string>('');

  const initialValues: ClientFormValues = {
    firstName: initialClient?.firstName || '',
    lastName: initialClient?.lastName || '',
    phone: initialClient?.phone || '',
  };

  const handleAddClient = async (values: ClientFormValues, resetForm: any) => {
    try {
      const response = await fetch('http://localhost:8000/api/users/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, active: true }),
      });
      if (response.status === 200) {
        setMessage('User has been added succesfully!');
        resetForm();
      } else {
        setMessage('There was a problem when adding a user.');
      }
    } catch (e) {
      setMessage('There was a problem when adding a user.');
    }
  };

  return (
    <Modal headerText={headerText} isOpen={isOpen} handleClose={handleCloseModal}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleAddClient}
        validationSchema={Yup.object({
          firstName: Yup.string().required('Required'),
          lastName: Yup.string().required('Required'),
          phone: Yup.string()
            .matches(/[1-9]{1}[0-9]{8}/, 'Invalid phone number')
            .required('Required'),
        })}
      >
        <FormWrapper handleCloseForm={handleCloseModal}>
          <TextFieldInput label="First name" name="firstName" />
          <TextFieldInput label="Last name" name="lastName" />
          <TextFieldInput label="Phone" name="phone" />
        </FormWrapper>
      </Formik>
    </Modal>
  );
}
