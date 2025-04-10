import {MMKV} from 'react-native-mmkv';
import {StorageService} from './storageService';

export const storage = new MMKV();

export const mmkvStorage: StorageService = {
  getItem: key => {
    const item = storage.getString(key);
    if (!item) {
      return null;
    }

    try {
      return JSON.parse(item);
    } catch (error) {
      return item;
    }
  },
  setItem: (key, value) => {
    const valueAux = JSON.stringify(value);
    storage.set(key, valueAux);
  },
  removeItem: key => {
    storage.delete(key);
  },
};
