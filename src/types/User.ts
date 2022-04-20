export enum UserRole {
  Admin = 'admin',
  Manager = 'manager',
  Worker = 'worker',
}

export interface User {
  username: string;
  id: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}
