import { Outlet, Route, Routes } from 'react-router-dom';
import { RequireAuth } from './routes/RequireAuth';
import { Dashboard } from './components/views/Dashboard/Dashboard';
import { LoginPanel } from './components/views/LoginPanel/LoginPanel';
import { DefaultRoute } from './routes/DefaultRoute';
import { UserRole } from './types/User';

function Root() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="/" element={<LoginPanel />} />
        <Route element={<RequireAuth allowedRoles={[UserRole.Admin]} />}>
          <Route path="dashboard/users" element={<Dashboard role={UserRole.Admin} />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[UserRole.Worker]} />}>
          <Route path="dashboard/activities/" element={<Dashboard role={UserRole.Worker} />} />
          <Route path="dashboard/activities/:id" element={<Dashboard role={UserRole.Worker} />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[UserRole.Manager]} />}>
          <Route path="dashboard/requests" element={<Dashboard role={UserRole.Manager} />} />
          <Route path="dashboard/requests/:id" element={<Dashboard role={UserRole.Manager} />} />
        </Route>
        <Route path="*" element={<DefaultRoute />} />
      </Route>
    </Routes>
  );
}

export default Root;
