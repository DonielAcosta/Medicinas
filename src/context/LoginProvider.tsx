/* eslint-disable react/react-in-jsx-scope */
import { createContext, useState, useEffect } from 'react';
import { setDataStorage } from '../utils/asyncStorage';
import { MyUserInterface } from '../infrastructure/interfaces/auth.responses';

const LoginContext = createContext<{
  login: boolean;
  setLogin: (login: boolean) => void;
  myUser: MyUserInterface;
  setMyUser: (myUser: MyUserInterface) => void;
  loadingAuth: boolean;
  setLoadingAuth: (loadingAuth: boolean) => void;
}>({
  login: false,
  setLogin: () => {},
  myUser: {
    access: {
      labAccess: false,
      salespersonAccess: false,
    },
  },
  setMyUser: () => {},
  loadingAuth: false,
  setLoadingAuth: () => {},
});

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [login, setLogin] = useState(false);
  const [myUser, setMyUser] = useState<MyUserInterface>({
    access: {
      labAccess: false,
      salespersonAccess: false,
    },
  });

  const [loadingAuth, setLoadingAuth] = useState(false);

  useEffect(() => {
    if (myUser) {
      const setMyUserStorage = async () => {
        try {
          await setDataStorage('myUser', myUser);
        } catch (error) {
          console.log(error);
        }
      };
      setMyUserStorage();
    }
  }, [myUser]);

  return (
    <LoginContext.Provider value={{
      login,
      setLogin,
      myUser,
      setMyUser,
      loadingAuth,
      setLoadingAuth,
    }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
