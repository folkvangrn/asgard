import { useField } from 'formik';
import { SelectHTMLAttributes } from 'react';
import styles from './SelectFieldInput.module.scss';

type SelectFieldInputProps = {
  label: string;
  props?: SelectHTMLAttributes<HTMLInputElement>;
  name: string;
};

export function SelectFieldInput({ label, ...props }: SelectFieldInputProps) {
  const [field, meta] = useField(props);
  return (
    <div className={styles.textFieldWrapper}>
      <div className={styles.inputWrapper}>
        <label htmlFor={props.name}>{label}</label>
        <select {...field} {...props} />
      </div>
      {meta.touched && meta.error ? <div className={styles.errorMessage}>{meta.error}</div> : null}
    </div>
  );
}
