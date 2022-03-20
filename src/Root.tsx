import styles from './Root.module.scss';
import { FormEvent } from 'react';
import { FormField } from '@/components/molecules/FormField/FormField';
import Button from '@/components/atoms/Button/Button';

function Root() {
  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log('login');
  };

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={handleLoginSubmit}>
        <h2 className={styles.signInTitle}>Sign in</h2>
        <FormField id="username" placeholder="Enter username" label="Username" />
        <FormField id="password" placeholder="Enter password" type="password" label="Password" />
        <Button type="submit" text="Login" />
      </form>
    </div>
  );
}

export default Root;
