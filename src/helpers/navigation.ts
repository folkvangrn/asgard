import { UserRole } from '@/types/User';

export const getDefaultRoute = (role: UserRole | undefined) => {
  switch (role) {
    case UserRole.Worker:
      return '/dashboard/activities';
    case UserRole.Manager:
      return '/dashboard/clients ';
    case UserRole.Admin:
      return '/dashboard/users';
    default:
      return '/';
  }
};
