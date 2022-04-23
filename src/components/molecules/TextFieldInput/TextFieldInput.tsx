import { useField } from 'formik';
import { InputHTMLAttributes } from 'react';
import styles from './TextFieldInput.module.scss';

type FormFieldProps = {
  label: string;
  props: InputHTMLAttributes<HTMLInputElement>;
  name: string;
};

export function TextFieldInput({ label, name, ...props }: FormFieldProps) {
  const [field, meta] = useField(name);

  return (
    <div className={styles.textFieldWrapper} key={label}>
      <div className={styles.inputWrapper}>
        <label htmlFor={name}>{label}</label>
        <input {...field} {...props} />
      </div>
      {meta.touched && meta.error ? <p className={styles.errorMessage}>{meta.error}</p> : null}
    </div>
  );
}
