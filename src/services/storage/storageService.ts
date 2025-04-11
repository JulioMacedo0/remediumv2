import {mmkvStorage} from './mmkvStorageService';
import {StorageValueMap, StorageKeys} from './storegesKeys';

export interface StorageService {
  getItem: <K extends StorageKeys>(key: K) => StorageValueMap[K] | null;
  setItem: <K extends StorageKeys>(key: K, value: StorageValueMap[K]) => void;
  removeItem: (key: StorageKeys) => void;
}

export const storageService: StorageService = mmkvStorage;
