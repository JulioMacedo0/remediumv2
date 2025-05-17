import {UserType} from '../../@types/userTypes';

export const STORAGE_KEYS = {
  USER: 'USER',
  TOKEN: 'TOKEN',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
  LOCALE: 'LOCALE',
  THEME: 'THEME',
  VIEWONBOARING: 'VIEWONBOARING',
} as const;

export type StorageKeys = keyof typeof STORAGE_KEYS;

export type StorageValueMap = {
  USER: UserType;
  TOKEN: string;
  REFRESH_TOKEN: string;
  LOCALE: string;
  THEME: 'light' | 'dark';
  VIEWONBOARING: boolean;
};
