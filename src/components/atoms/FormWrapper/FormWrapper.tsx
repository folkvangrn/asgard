import { FormButtons } from '@/components/molecules/FormButtons/FormButtons';
import { Form } from 'formik';
import { ReactNode } from 'react';
import styles from './FormWrapper.module.scss';

type FormWrapperProps = {
  children: ReactNode[];
  handleCloseForm: VoidFunction;
};

export function FormWrapper({ children, handleCloseForm }: FormWrapperProps) {
  return (
    <Form className={styles.formWrapper}>
      <div className={styles.formFields}>{children}</div>
      <FormButtons buttonsText={['Submit', 'Cancel']} handleCloseForm={handleCloseForm} />
    </Form>
  );
}
