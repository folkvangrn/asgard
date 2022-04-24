import { Form, Formik } from 'formik';
import { Modal } from '@/components/molecules/Modal/Modal';
import { TextFieldInput } from '@/components/molecules/TextFieldInput/TextFieldInput';
import { SelectFieldInput } from '@/components/molecules/SelectFieldInput/SelectFieldInput';
import { Button } from '@/components/atoms/Button/Button';
import { UserRole } from '@/types/User';
import * as Yup from 'yup';
import { FormButtons } from '@/components/molecules/FormButtons/FormButtons';

type AddUserFormValues = {
  firstName: string;
  lastName: string;
  role: UserRole;
  username: string;
  password: string;
};

type UserModalProps = {
  isOpen: boolean;
  handleCloseModal: VoidFunction;
};

export function UserModal({ isOpen, handleCloseModal }: UserModalProps) {
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
          <FormButtons buttonsText={['Submit', 'Cancel']} handleCloseForm={handleCloseModal} />
        </Form>
      </Formik>
    </Modal>
  );
}
