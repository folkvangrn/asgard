export enum UserRole {
  Admin = 'admin',
  Manager = 'manager',
  Worker = 'worker',
}

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  role: UserRole;
  username: string;
  active: boolean;
  password?: string;
  token?: string;
};
