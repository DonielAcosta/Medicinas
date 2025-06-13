import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Guarda datos en AsyncStorage (soporta strings, números, booleanos, objetos, arrays, null/undefined)
 */
export const setDataStorage = async (key: string,value: string | boolean | object | number | any[] | null | undefined): Promise<void> => {
  try {
    if (value === undefined || value === null) {
      await AsyncStorage.removeItem(key); // Elimina la clave si el valor es null/undefined
    } else {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error(`Error saving data for key "${key}":`, error);
    throw error; // Opcional: relanzar el error para manejo externo
  }
};

/**
 * Obtiene datos de AsyncStorage y los parsea automáticamente
 */
export const getDataStorage = async <T = any>(key: string): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error reading data for key "${key}":`, error);
    return null;
  }
};

/**
 * Elimina un item específico
 */
export const removeDataStorage = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing key "${key}":`, error);
    throw error;
  }
};

/**
 * Limpia todo el almacenamiento
 */
export const clearStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing storage:', error);
    throw error;
  }
};
