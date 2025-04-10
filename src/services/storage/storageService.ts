import {mmkvStorage} from './mmkvStorageService';

export interface StorageService {
  getItem: <T>(key: string) => T | null;
  setItem: <T>(key: string, value: T) => void;
  removeItem: (key: string) => void;
}

export const storageService: StorageService = mmkvStorage;
