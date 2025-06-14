import axios from 'axios';
import { STAGE, API_URL as PROD_URL, API_URL_IOS, API_URL_ANDROID } from '@env';
import { Platform } from 'react-native';

// -----------------------------------------------
// BASE URL
// -----------------------------------------------

export const API_URL =
  STAGE === 'prod'
    ? PROD_URL
    : Platform.OS === 'ios'
    ? API_URL_IOS
    : API_URL_ANDROID;

// -----------------------------------------------
// ENDPOINTS
// -----------------------------------------------

const loginEndpoint = () => `${API_URL}/appmovilnotifica/login`;


// -----------------------------------------------
// AXIOS WRAPPER
// -----------------------------------------------

const apiCall = async (
  endpoint: string,
  method: Uppercase<string>,
  data?: unknown,
  headers?: Record<string, string>
) => {
  try {
    const response = await axios.request({
      method,
      url: endpoint,
      data: data ?? {},
      headers: headers ?? {},
    });

    return response.data;
  } catch (error) {
    console.error(error);
    // throw new Error(String(error));
  }
};

// -----------------------------------------------
// FUNCTIONS
// -----------------------------------------------

export const fetchLogin = (data: { usuario: string; password: string }) => {
  return apiCall(loginEndpoint(), 'POST', data);
};
