import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../views/auth/Login';
import { Home } from '../views/home/Home';
import { Loading } from '../views/loading/Loading';
import { useLogin } from '../../hooks/useLogin';
import { getDataStorage } from '../../config/api/asyncStorage';
import { LoaderLogoScreen } from '../../components/certra/LoaderLogoScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const [loadingStorage, setLoadingStorage] = useState(true);
  const { login, setLogin, setMyUser } = useLogin();

  useEffect(() => {
    const getStorage = async () => {
      const loginStorage = await getDataStorage('login');
      const myUserStorage = await getDataStorage('myUser');

      setLogin(loginStorage === 'true');
      setMyUser(myUserStorage ? JSON.parse(myUserStorage) : {});
    };

    getStorage().then(() => {
      setTimeout(() => {
        setLoadingStorage(false);
      }, 1000);
    });
  }, []);

  if (loadingStorage) {
    return <LoaderLogoScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Login'}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
