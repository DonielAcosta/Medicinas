import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { LoginProvider } from './presentation/context/LoginProvider';
import { AppNavigator } from './presentation/navigation/AppNavigator';

export const MedicinasApp = () => {
  return (
    <NativeBaseProvider>
      <LoginProvider>
        <AppNavigator />
      </LoginProvider>
    </NativeBaseProvider>
  );
};
