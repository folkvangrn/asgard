import * as Yup from 'yup';

import { TextFieldInput } from '@/components/molecules/TextFieldInput/TextFieldInput';
import { GenericCreateForm } from './GenericCreateForm';
import { Client } from '@/types/Client';

type CreateClientProps = {
  isOpen: boolean;
  handleCloseModal: VoidFunction;
  clientId?: number | undefined;
  refetchClients: VoidFunction;
};

const GET_CLIENTS_QUERY = 'http://localhost:8000/api/clients';

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
    <GenericCreateForm
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
        companyName: Yup.string().required('Required'),
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

// type ClientFormValues = {
//   firstName: string;
//   lastName: string;
//   phone: string;
// };

// type UserModalProps = {
//   isOpen: boolean;
//   handleCloseModal: VoidFunction;
//   initialClient?: Client;
// };

// type Client = {
//   firstName: string;
//   lastName: string;
//   phone: string;
// };

// export function ClientModal({ isOpen, handleCloseModal, initialClient }: UserModalProps) {
//   const headerText = !!initialClient ? 'Edit Client' : 'Add client';

//   const [message, setMessage] = useState<string>('');

//   const initialValues: ClientFormValues = {
//     firstName: initialClient?.firstName || '',
//     lastName: initialClient?.lastName || '',
//     phone: initialClient?.phone || '',
//   };

//   const handleAddClient = async (values: ClientFormValues, resetForm: any) => {
//     try {
//       const response = await fetch('http://localhost:8000/api/users/register', {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ ...values, active: true }),
//       });
//       if (response.status === 200) {
//         setMessage('User has been added succesfully!');
//         resetForm();
//       } else {
//         setMessage('There was a problem when adding a user.');
//       }
//     } catch (e) {
//       setMessage('There was a problem when adding a user.');
//     }
//   };

//   return (
//     <Modal headerText={headerText} isOpen={isOpen} handleClose={handleCloseModal}>
//       <Formik
//         initialValues={initialValues}
//         onSubmit={handleAddClient}
//         validationSchema={Yup.object({
//           firstName: Yup.string().required('Required'),
//           lastName: Yup.string().required('Required'),
//           phone: Yup.string()
//             .matches(/[1-9]{1}[0-9]{8}/, 'Invalid phone number')
//             .required('Required'),
//         })}
//       >
//         <FormWrapper handleCloseForm={handleCloseModal}>
//           <TextFieldInput label="First name" name="firstName" />
//           <TextFieldInput label="Last name" name="lastName" />
//           <TextFieldInput label="Phone" name="phone" />
//         </FormWrapper>
//       </Formik>
//     </Modal>
//   );
// }
