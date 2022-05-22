import { UserRole } from '@/types/User';
export const pluralize = (word: string): string => `${word}s`;

export const addIdToRole = (role: UserRole | undefined): string => `${role}id`;
