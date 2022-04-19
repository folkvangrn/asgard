import { UserRole } from '@/types/User';

export const getDefaultRoute = (role: UserRole | undefined) => {
  switch (role) {
    case UserRole.Worker:
      return '/dashboard/requests';
    case UserRole.Manager:
      return '/dashboard/requests';
    case UserRole.Admin:
      return '/dashboard/users';
    default:
      return '/';
  }
};
