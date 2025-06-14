import { useContext } from 'react';
import {LoginContext} from '../context/LoginProvider';

export const useLogin = () => {
  return useContext(LoginContext);
};

