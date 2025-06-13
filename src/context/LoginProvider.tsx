/* eslint-disable react/react-in-jsx-scope */
import { createContext, useState, useEffect } from 'react';
import { fetchTableData } from '../config/api/proteoApi';
import { setDataStorage } from '../config/api/asyncStorage';
import { MyUserInterface, UserFromScliInterface } from '../infrastructure/interfaces/auth.responses';
import React from 'react';

export const LoginContext = createContext<{
  login: boolean;
  setLogin: (login: boolean) => void;
  myUser: MyUserInterface;
  setMyUser: (myUser: MyUserInterface) => void;
  loadingAuth: boolean;
  setLoadingAuth: (loadingAuth: boolean) => void;
  allCustomers: UserFromScliInterface[];
}>({
  login: false,
  setLogin: () => {},
  myUser: {
    access: {
      customerAccess: false,
      labAccess: false,
      salespersonAccess: false,
    },
  },
  setMyUser: () => {},
  loadingAuth: false,
  setLoadingAuth: () => {},
  allCustomers: [],
});

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [login, setLogin] = useState(false);
  const [myUser, setMyUser] = useState<MyUserInterface>({
    access: {
      customerAccess: false,
      labAccess: false,
      salespersonAccess: false,
    },
  });
  const [allCustomers, setAllCustomers] = useState<UserFromScliInterface[]>([]);
  const [loadingAuth, setLoadingAuth] = useState(false);

  useEffect(() => {
    if (myUser?.customer) {
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

  useEffect(() => {
    if (login) {
      const getCustomers = async () => {
        try {
          const resScli = await fetchTableData('appClientes/scli');
          setAllCustomers(resScli);
        } catch (error) {
          console.log(error);
        }
      };
      getCustomers();
    }
  }, [login]);

  return (
    <LoginContext.Provider
      value={{
        login,
        setLogin,
        myUser,
        setMyUser,
        loadingAuth,
        setLoadingAuth,
        allCustomers,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

