export enum UserRole {
  Admin = 'admin',
  Manager = 'manager',
  Worker = 'worker',
}

export type User = {
  firstName: string;
  lastName: string;
  role: UserRole;
  username: string;
  active: boolean;
};

export type ListUser = {
  id: number;
} & User;

export type LoggedUser = {
  token: string;
  password: string;
} & ListUser;
