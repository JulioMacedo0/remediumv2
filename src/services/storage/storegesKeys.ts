export const STORAGE_KEYS = {
  USER: 'USER',
  TOKEN: 'TOKEN',
  LOCALE: 'LOCALE',
  THEME: 'THEME',
  VIEWONBOARING: 'VIEWONBOARING',
} as const;
export type StorageKeys = typeof STORAGE_KEYS;
