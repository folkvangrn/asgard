import { Navigate, Route, Routes } from 'react-router-dom';
import { RequireAuth } from './components/RequireAuth';
import { Dashboard } from './components/views/Dashboard/Dashboard';
import { LoginPanel } from './components/views/LoginPanel/LoginPanel';
import { Layout } from './Layout';
import { UserRole } from './types/User';

function Root() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<LoginPanel />} />
        <Route element={<RequireAuth allowedRoles={[UserRole.Admin]} />}>
          <Route path="dashboard/users" element={<Dashboard />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[UserRole.Manager]} />}>
          <Route path="dashboard/workers/" element={<Dashboard />} />
          <Route path="dashboard/workers/:id" element={<Dashboard />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[UserRole.Worker, UserRole.Manager]} />}>
          <Route path="dashboard/requests" element={<Dashboard />} />
          <Route path="dashboard/requests/:id" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default Root;
