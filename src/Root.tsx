import { Outlet, Route, Routes } from 'react-router-dom';

import { RequireAuth } from './routes/RequireAuth';
import { Dashboard } from '@/components/views/Dashboard/Dashboard';
import { LoginPanel } from '@/components/views/LoginPanel/LoginPanel';
import { DefaultRoute } from '@/routes/DefaultRoute';

import { UserRole } from './types/User';

function Root() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="/" element={<LoginPanel />} />
        <Route element={<RequireAuth allowedRoles={[UserRole.Admin]} />}>
          <Route path="dashboard/users" element={<Dashboard path="users" />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[UserRole.Worker]} />}>
          <Route path="dashboard/activities/" element={<Dashboard path="activities" />} />
          {/* <Route path="dashboard/activities/:id" element={<Dashboard path="activities" />} /> */}
        </Route>
        <Route element={<RequireAuth allowedRoles={[UserRole.Manager]} />}>
          <Route path="dashboard/requests" element={<Dashboard path="requests" />} />
          {/* <Route path="dashboard/requests/:id" element={<Dashboard path="requests" />} /> */}
          <Route path="dashboard/clients" element={<Dashboard path="clients" />} />
          <Route path="dashboard/vehicles" element={<Dashboard path="vehicles" />} />
        </Route>
        <Route path="*" element={<DefaultRoute />} />
      </Route>
    </Routes>
  );
}

export default Root;
