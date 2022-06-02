import { UserRole } from '@/types/User';
import * as dayjs from 'dayjs';

export const pluralize = (word: string): string => `${word}s`;
export const addIdToRole = (role: UserRole | undefined): string => `${role}id`;

export const prettifyDate = (date?: string): string => {
  if (!date) return '-';

  try {
    return dayjs(date).format('DD/MM/YYYY');
  } catch {
    return 'Invalid date format';
  }
};
