import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Modal } from '@/components/molecules/Modal/Modal';
import { TextFieldInput } from '@/components/molecules/TextFieldInput/TextFieldInput';
import { SelectFieldInput } from '@/components/molecules/SelectFieldInput/SelectFieldInput';
import { FormWrapper } from '@/components/atoms/FormWrapper/FormWrapper';
import { User, UserRole } from '@/types/User';

type UserFormValues = {
  firstName: string;
  lastName: string;
  role: UserRole;
  username: string;
  password: string;
};

type UserModalProps = {
  isOpen: boolean;
  handleCloseModal: VoidFunction;
  initialUser?: User;
  editMode?: boolean;
};

export function UserModal({ isOpen, handleCloseModal, initialUser, editMode }: UserModalProps) {
  const headerText = editMode ? 'Edit user' : 'Add user';

  const [message, setMessage] = useState<string>('');

  const initialValues: UserFormValues = {
    firstName: initialUser?.firstName || '',
    lastName: initialUser?.lastName || '',
    role: initialUser?.role || UserRole.Worker,
    username: initialUser?.username || '',
    password: initialUser?.password || '',
  };

  const handleAddUser = async (
    values: UserFormValues,
    { resetForm }: { resetForm: VoidFunction },
  ) => {
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
        onSubmit={handleAddUser}
        validationSchema={Yup.object({
          firstName: Yup.string().required('Required'),
          lastName: Yup.string().required('Required'),
          role: Yup.mixed<UserRole>().oneOf(Object.values(UserRole)).required('Required'),
          username: Yup.string().required('Required'),
          password: Yup.string().required('Required'),
        })}
        className="formWrapper"
      >
        <FormWrapper handleCloseForm={handleCloseModal}>
          <TextFieldInput label="First name" name="firstName" />
          <TextFieldInput label="Last name" name="lastName" />
          <TextFieldInput label="Username" name="username" disabled={!!initialUser} />
          <TextFieldInput label="Password" name="password" type="password" />
          <SelectFieldInput label="Role" name="role">
            {Object.entries(UserRole).map(([key, value]) => (
              <option key={key} value={value}>
                {key}
              </option>
            ))}
          </SelectFieldInput>
        </FormWrapper>
      </Formik>
      {message ? <p>{message}</p> : null}
    </Modal>
  );
}
