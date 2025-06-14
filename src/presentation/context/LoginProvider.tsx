import React, { createContext, useState, useEffect } from 'react';
import { setDataStorage } from '../../config/api/asyncStorage';
import { AuthResponse } from '../../infrastructure/interfaces/auth.responses';

export const LoginContext = createContext<{
  login: boolean;
  setLogin: (login: boolean) => void;
  myUser: AuthResponse | null;
  setMyUser: (user: AuthResponse) => void;
  loadingAuth: boolean;
  setLoadingAuth: (loading: boolean) => void;
}>({
  login: false,
  setLogin: () => {},
  myUser: null,
  setMyUser: () => {},
  loadingAuth: false,
  setLoadingAuth: () => {},
});

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [login, setLogin] = useState(false);
  const [myUser, setMyUser] = useState<AuthResponse | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

  useEffect(() => {
    const storeUser = async () => {
      try {
        if (myUser) {
          await setDataStorage('myUser', myUser);
        }
      } catch (error) {
        console.log('Error saving user:', error);
      }
    };
    storeUser();
  }, [myUser]);

  return (
    <LoginContext.Provider
      value={{
        login,
        setLogin,
        myUser,
        setMyUser,
        loadingAuth,
        setLoadingAuth,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
