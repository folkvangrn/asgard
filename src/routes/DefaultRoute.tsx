import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { getDefaultRoute } from '@/helpers/navigation';

export function DefaultRoute() {
  const { user } = useAuth();
  const defaultRoute = getDefaultRoute(user?.role);

  return <Navigate to={defaultRoute} replace />;
}
