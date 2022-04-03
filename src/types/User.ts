export enum UserRole {
  Admin,
  Manager,
  Worker,
}

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
};
