import { Routes, Route } from 'react-router-dom';
import { LoginPanel } from './components/organisms/LoginPanel/LoginPanel';
import { Dashboard } from './components/views/Dashboard/Dashboard';

function Root() {
  return (
    <Routes>
      <Route path="/" element={<LoginPanel />} />
      <Route path="/dashboard/:roles" element={<Dashboard />} />
    </Routes>
  );
}

export default Root;
