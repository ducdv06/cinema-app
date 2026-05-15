import { Platform } from 'react-native';

let storage;

if (Platform.OS === 'web') {
  storage = {
    getItem: async (key) => {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        console.error('localStorage getItem error:', error);
        return null;
      }
    },
    setItem: async (key, value) => {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.error('localStorage setItem error:', error);
      }
    },
    removeItem: async (key) => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('localStorage removeItem error:', error);
      }
    },
  };
} else {
  const AsyncStorage = require('@react-native-async-storage/async-storage').default;
  storage = AsyncStorage;
}

export default storage;