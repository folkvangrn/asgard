import * as Yup from 'yup';

import { GenericCreateForm } from './GenericCreateForm';
import { TextFieldInput } from '@/components/atoms/Inputs';

import { Client } from '@/types/Client';

type CreateClientProps = {
  isOpen: boolean;
  handleCloseModal: VoidFunction;
  clientId?: number | undefined;
  refetchClients: VoidFunction;
};

const GET_CLIENTS_QUERY = 'http://192.168.1.234:8000/api/clients';

export function CreateClient({
  isOpen,
  handleCloseModal,
  clientId,
  refetchClients,
}: CreateClientProps) {
  const initialValues: Client = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    companyName: '',
  };

  return (
    <GenericCreateForm<Client>
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      initialId={clientId}
      initialFormValues={initialValues}
      singularName="Client"
      validationSchema={Yup.object({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        phoneNumber: Yup.string().required('Required'),
        email: Yup.string().required('Required'),
        companyName: Yup.string(),
      })}
      refetchData={refetchClients}
      query={clientId ? `${GET_CLIENTS_QUERY}/${clientId}` : GET_CLIENTS_QUERY}
    >
      <TextFieldInput label="First name" name="firstName" />
      <TextFieldInput label="Last name" name="lastName" />
      <TextFieldInput label="Phone number" name="phoneNumber" />
      <TextFieldInput label="E-mail address" name="email" />
      <TextFieldInput label="Company name" name="companyName" />
    </GenericCreateForm>
  );
}
