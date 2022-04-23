import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/User';

type RequireAuthProps = {
  allowedRoles: UserRole[];
};

export const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const { user } = useAuth();
  const location = useLocation();

  return allowedRoles.includes(user?.role!) ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};
