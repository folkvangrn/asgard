import { useState, ReactNode } from 'react';
import { Formik } from 'formik';
import { useGet } from '@/hooks/useGet';

import { Modal } from '@/components/molecules/Modal/Modal';
import { FormWrapper } from '@/components/atoms/FormWrapper/FormWrapper';

import { User, Client, Vehicle, Request, Activity } from '@/types';
import { useToast } from '@/hooks';

type GenericCreateForm<T> = {
  isOpen: boolean;
  handleCloseModal: VoidFunction;
  initialFormValues: T;
  children: ReactNode[];
  singularName: string;
  validationSchema: any;
  query: string;
  initialId?: number | string;
  refetchData: VoidFunction;
};

const getHeaderText = (isEditMode: boolean, singularName: string): string => {
  return !isEditMode ? `Add ${singularName}` : `Edit ${singularName}`;
};

export function GenericCreateForm<T extends User | Vehicle | Client | Request | Activity>({
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
  const { toast } = useToast();
  const { data: givenData } = useGet<T>({
    query,
    skip: initialId ? false : true,
  });

  const handleAfterCreate = () => {
    refetchData();
    handleCloseModal();
  };
  const preparePositiveMessage = (): string => {
    return !initialId
      ? `${singularName} was added succesfully`
      : `${singularName} was edited succesfully`;
  };

  const prepareNegativeMessage = (message?: string): string => {
    if (message) return message;

    return !initialId
      ? `There was a problem when adding a ${singularName}`
      : `There was a problem when editing a ${singularName}`;
  };

  const givenValues: T = initialId ? givenData! : initialFormValues;

  const handleSubmitForm = async (values: T) => {
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
      console.log(response);
      if (response.status === 200) {
        handleAfterCreate();
        toast(preparePositiveMessage(), 'success');
      } else {
        toast(prepareNegativeMessage(), 'success');
      }
    } catch (e) {
      toast(prepareNegativeMessage(), 'error');
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
        <FormWrapper handleCloseForm={handleCloseModal}>{children}</FormWrapper>
      </Formik>
    </Modal>
  );
}
