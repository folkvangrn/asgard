import { Button } from '@/components/atoms/Button/Button';
import { FormField } from '@/components/molecules/FormField/FormField';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import styles from './LoginPanel.module.scss';
import { useAuth } from '@/hooks/useAuth';
export function LoginPanel() {
  const auth = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      auth.signIn(values.username, values.password);

      if (auth.user !== null) {
        navigate('/dashboard/managers', { replace: true });
      }
    },
  });

  return (
    <div className={styles.formWrapper}>
      <form className={styles.loginForm} onSubmit={formik.handleSubmit}>
        <h2 className={styles.signInTitle}>Sign in</h2>
        <FormField
          id="username"
          label="Username"
          value={formik.values.username}
          handleValueChange={formik.handleChange}
          placeholder="Enter username"
          isTouched={formik.touched.username}
          error={formik.errors.username}
          handleBlur={formik.handleBlur}
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          value={formik.values.password}
          handleValueChange={formik.handleChange}
          placeholder="Enter password"
          isTouched={formik.touched.password}
          error={formik.errors.password}
          handleBlur={formik.handleBlur}
        />
        <Button text="Login" type="submit" />
      </form>
    </div>
  );
}
