import { Routes, Route } from 'react-router-dom';
import { LoginPanel } from './components/views/LoginPanel/LoginPanel';
import { Dashboard } from './components/views/Dashboard/Dashboard';
import { AuthProvider } from './hooks/useAuth';

function Root() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPanel />}/>
        <Route path="/dashboard/:roles" element={<Dashboard />} />
      </Routes>
    </AuthProvider>
  );
}

export default Root;
