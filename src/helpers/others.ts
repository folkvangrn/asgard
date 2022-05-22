import { UserRole } from './../types/User';
export const pluralizeRole = (word: string): string => `${word}s`;

export const addIdToRole = (role: UserRole | undefined): string => `${role}id`;
