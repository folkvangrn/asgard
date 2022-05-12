import { useState, ReactNode } from 'react';
import { Formik } from 'formik';
import { useGet } from '@/hooks/useGet';

import { Modal } from '@/components/molecules/Modal/Modal';
import { FormWrapper } from '@/components/atoms/FormWrapper/FormWrapper';
import { User } from '@/types/User';
import { Vehicle } from '@/types/Vehicle';

type GenericCreateForm<T> = {
  isOpen: boolean;
  handleCloseModal: VoidFunction;
  initialFormValues: T;
  children: ReactNode[];
  singularName: string;
  validationSchema: any;
  query: string;
  initialId?: number;
  refetchData: VoidFunction;
};

const getHeaderText = (isEditMode: boolean, singularName: string): string => {
  return !isEditMode ? `Add ${singularName}` : `Edit ${singularName}`;
};

export function GenericCreateForm<T extends User | Vehicle>({
  isOpen,
  handleCloseModal,
  initialId,
  initialFormValues,
  children,
  singularName,
  validationSchema,
  query,
  refetchData,
}: GenericCreateForm<T>) {
  const headerText = getHeaderText(!!initialId, singularName);
  const [message, setMessage] = useState<string>('');

  const { data: user } = useGet<User>({
    query,
    skip: initialId ? false : true,
  });

  const helper = () => {
    refetchData();
    handleCloseModal();
    console.log('dodano git');
  };

  const givenValues: T = initialId ? user : initialFormValues;

  const handleSubmitForm = async (values: T, { resetForm }: { resetForm: VoidFunction }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(query, {
        method: !initialId ? 'POST' : 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...values }),
      });
      if (response.status === 200) {
        setMessage(
          !initialId
            ? `${singularName} has been added succesfully!`
            : `${singularName} has been edited succesfully!`,
        );
        !initialId && resetForm();
        helper();
      } else {
        setMessage(
          !initialId
            ? `There was a problem when adding a ${singularName}`
            : `There was a problem when editing a ${singularName}`,
        );
      }
    } catch (e) {
      setMessage(
        !initialId
          ? `There was a problem when adding a ${singularName}`
          : `There was a problem when editing a ${singularName}`,
      );
    }
  };
  return (
    <Modal headerText={headerText} isOpen={isOpen} handleClose={handleCloseModal}>
      <Formik
        enableReinitialize={true}
        validationSchema={validationSchema}
        initialValues={givenValues}
        onSubmit={handleSubmitForm}
      >
        <FormWrapper handleCloseForm={handleCloseModal}>
          {children}
          {message ? <p>{message}</p> : null}
        </FormWrapper>
      </Formik>
    </Modal>
  );
}
