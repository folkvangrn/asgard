import * as Yup from 'yup';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';

import { Button } from '@/components/atoms/Button/Button';
import { TextFieldInput } from '@/components/atoms/Inputs';
import { getDefaultRoute } from '@/helpers/navigation';

import styles from './LoginPanel.module.scss';

type LoginFormValues = {
  username: string;
  password: string;
};

export function LoginPanel() {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();

  const initialValues: LoginFormValues = {
    username: '',
    password: '',
  };

  const handleFormSubmit = ({ username, password }: LoginFormValues) => {
    signIn(username, password);
  };

  useEffect(() => {
    const defaultRoute = getDefaultRoute(user?.role);
    if (user?.active) navigate(`${defaultRoute}`, { replace: true });
    else if (!user?.active === false) alert('Your account was deactivated');
  }, [user]);

  return (
    <div className={styles.formWrapper}>
      <div className={styles.loginForm}>
        <h2 className={styles.signInTitle}>Sign in</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            username: Yup.string().required('Required'),
            password: Yup.string().required('Required'),
          })}
          onSubmit={handleFormSubmit}
        >
          <Form className={styles.formikForm}>
            <TextFieldInput label="Username" name="username" type="text" />
            <TextFieldInput label="Password" name="password" type="password" />
            <Button text="Login" className={styles.centeredButton} type="submit" />
          </Form>
        </Formik>
      </div>
    </div>
  );
}
