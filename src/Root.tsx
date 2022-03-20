import { Routes, Route } from 'react-router-dom';
import { LoginPanel } from './components/organisms/LoginPanel/LoginPanel';

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
