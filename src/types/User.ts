export enum UserRole {
  Admin = 'admin',
  Manager = 'manager',
  Worker = 'worker',
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  username: string;
  password: string;
}

export interface LoggedUser extends User {
  token: string;
}
