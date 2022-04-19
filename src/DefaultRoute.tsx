import { Navigate } from 'react-router-dom';
import { getDefaultRoute } from './helpers/navigation';
import { useAuth } from './hooks/useAuth';

export function DefaultRoute() {
  const { user } = useAuth();
  const defaultRoute = getDefaultRoute(user?.role);

  return <Navigate to={defaultRoute} replace />;
}
