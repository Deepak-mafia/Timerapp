import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export const zustandStorage = {
  setItem: (name, value) => {
    storage.set(name, value);
    return Promise.resolve();
  },
  getItem: name => {
    const value = storage.getString(name);
    return Promise.resolve(value || null);
  },
  removeItem: name => {
    storage.delete(name);
    return Promise.resolve();
  },
};
