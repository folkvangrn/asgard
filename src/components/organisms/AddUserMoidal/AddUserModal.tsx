import { Modal } from '../Modal/Modal';
import { Form, Formik } from 'formik';
import { UserRole } from '@/types/User';
import { TextFieldInput } from '@/components/molecules/TextFieldInput/TextFieldInput';
import * as Yup from 'yup';
import { SelectFieldInput } from '@/components/molecules/SelectFieldInput/SelectFieldInput';
import { Button } from '@/components/atoms/Button/Button';

type AddUserFormValues = {
  firstName: string;
  lastName: string;
  role: UserRole;
  username: string;
  password: string;
};

export function UserModal({ isOpen, handleCloseModal }) {
  const initialValues: AddUserFormValues = {
    firstName: '',
    lastName: '',
    role: UserRole.Worker,
    username: '',
    password: '',
  };

  const handleAddUser = (values: AddUserFormValues) => {
    console.log(values);
  };

  return (
    <Modal headerText="Add User" isOpen={isOpen} handleClose={handleCloseModal}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleAddUser}
        validationSchema={Yup.object({
          firstName: Yup.string().required('Required'),
          lastName: Yup.string().required('Required'),
          role: Yup.mixed()
            .oneOf([UserRole.Admin, UserRole.Manager, UserRole.Worker])
            .required('Required'),
          username: Yup.string().required('Required'),
          password: Yup.string().required('Required'),
        })}
      >
        <Form>
          <TextFieldInput label="First name" name="firstName" />
          <TextFieldInput label="Last name" name="lastName" />
          <TextFieldInput label="Username" name="username" />
          <TextFieldInput label="Password" name="password" type="password" />
          <SelectFieldInput label="Role" name="role">
            <option value={UserRole.Worker}>Worker</option>
            <option value={UserRole.Manager}>Manager</option>
            <option value={UserRole.Admin}>Admin</option>
          </SelectFieldInput>
          <Button text="Submit" type="submit" />
        </Form>
      </Formik>
    </Modal>
  );
}
