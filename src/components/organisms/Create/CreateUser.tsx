import * as Yup from 'yup';

import { GenericCreateForm } from './GenericCreateForm';
import { SelectFieldInput, TextFieldInput } from '@/components/atoms/Inputs';

import { User, UserRole } from '@/types/User';

type CreateUserProps = {
  isOpen: boolean;
  handleCloseModal: VoidFunction;
  userId?: number | undefined;
  refetchUsers: VoidFunction;
};

//const GET_USERS_QUERY = 'http://localhost:8000/api/users';
const GET_USERS_QUERY = process.env.REACT_APP_BACKEND_URL + '/api/users';

export function CreateUser({ isOpen, handleCloseModal, userId, refetchUsers }: CreateUserProps) {
  const initialValues: User = {
    firstName: '',
    lastName: '',
    role: UserRole.Worker,
    username: '',
    active: true,
    password: '',
  };

  return (
    <GenericCreateForm<User>
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      initialId={userId}
      initialFormValues={initialValues}
      singularName="User"
      validationSchema={Yup.object({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        role: Yup.mixed<UserRole>().oneOf(Object.values(UserRole)).required('Required'),
        username: Yup.string().required('Required'),
        password: !userId ? Yup.string().required('Required') : Yup.string(),
      })}
      refetchData={refetchUsers}
      query={userId ? `${GET_USERS_QUERY}/${userId}` : GET_USERS_QUERY}
    >
      <TextFieldInput label="First name" name="firstName" />
      <TextFieldInput label="Last name" name="lastName" />
      <TextFieldInput label="Username" name="username" disabled={!!userId} />
      {!userId && <TextFieldInput label="Password" name="password" type="password" />}
      <SelectFieldInput label="Role" name="role" disabled={!!userId}>
        {Object.entries(UserRole).map(([key, value]) => (
          <option key={key} value={value}>
            {key}
          </option>
        ))}
      </SelectFieldInput>
      {userId ? (
        <SelectFieldInput label="Active" name="active">
          <option key={1} value={'true'}>
            Yes
          </option>
          <option key={2} value={'false'}>
            No
          </option>
        </SelectFieldInput>
      ) : null}
    </GenericCreateForm>
  );
}
