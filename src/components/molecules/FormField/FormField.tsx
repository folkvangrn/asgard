import styles from './FormField.module.scss';

type FormFieldProps = {
  id: string;
  placeholder: string;
  type?: string;
  label: string;
  handleValueChange: (e: any) => void;
  value: string;
  isTouched?: boolean;
  error?: string;
  handleBlur: (e: any) => void;
};

export function FormField({
  id,
  placeholder,
  type,
  label,
  value,
  isTouched,
  error,
  handleBlur,
  handleValueChange,
}: FormFieldProps) {
  return (
    <div>
      <div className={styles.formFieldWrapper} key={id}>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          name={id}
          value={value}
          onChange={handleValueChange}
          onBlur={handleBlur}
        />
      </div>
      {isTouched && error ? <p className={styles.errorMessage}>{error}</p> : null}
    </div>
  );
}
