import { FormField } from './styles/components/molecules/FormField/FormField';
import './styles/main.scss';
import styles from './Root.module.scss';
import { FormEvent } from 'react';
import { Button } from './styles/components/atoms/Button/Button';

function Root() {
  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('login');
  };

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={handleLoginSubmit}>
        <FormField id="username" placeholder="Enter username" label="Username" />
        <FormField id="password" placeholder="Enter password" type="password" label="Password" />
        <Button type="submit" text="Login" />
      </form>
    </div>
  );
}

export default Root;
