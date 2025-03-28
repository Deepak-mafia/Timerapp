import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

export const zustandStorage = {
  setItem: (name, value) => {
    try {
      // Serialize to JSON string
      const stringValue = JSON.stringify(value);
      storage.set(name, stringValue);
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  },
  getItem: name => {
    try {
      const value = storage.getString(name);
      // Parse JSON if value exists
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error reading from storage:', error);
      return null;
    }
  },
  removeItem: name => {
    try {
      storage.delete(name);
    } catch (error) {
      console.error('Error removing from storage:', error);
    }
  },
};

// // storage.js
// import {MMKV} from 'react-native-mmkv';

// const storage = new MMKV();

// export const zustandStorage = {
//   setItem: (name, value) => {
//     storage.set(name, value);
//   },
//   getItem: name => {
//     const value = storage.getString(name);
//     return value ?? null;
//   },
//   removeItem: name => {
//     storage.delete(name);
//   },
// };
