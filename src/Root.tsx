import styles from './Root.module.scss';
import { FormField } from '@/components/molecules/FormField/FormField';
import Button from '@/components/atoms/Button/Button';
import { Routes, Route, Link } from 'react-router-dom';
const LoginPanel = () => {
  return (
    <div className={styles.formWrapper}>
      <form>
        <h2 className={styles.signInTitle}>Sign in</h2>
        <FormField id="username" placeholder="Enter username" label="Username" />
        <FormField id="password" placeholder="Enter password" type="password" label="Password" />
        <Link to="/dashboard">
          <Button text="Login" />
        </Link>
      </form>
    </div>
  );
};

const Dashboard = () => {
  return <h2>dashboard</h2>;
};

function Root() {
  return (
    <Routes>
      <Route path="/" element={<LoginPanel />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default Root;
