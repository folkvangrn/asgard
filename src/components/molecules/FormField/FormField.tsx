import styles from './FormField.module.scss';

type FormFieldProps = {
  id: string;
  placeholder: string;
  type?: string;
  label: string;
};

export function FormField({ id, placeholder, type, label }: FormFieldProps) {
  return (
    <div className={styles.formFieldWrapper} key={id}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} placeholder={placeholder} />
    </div>
  );
}
