export enum UserRole {
  Admin = 'admin',
  Manager = 'manager',
  Worker = 'worker',
}

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
};
