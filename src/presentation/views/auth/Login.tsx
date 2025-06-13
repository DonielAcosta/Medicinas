/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TextInput as RNTextInput,
} from 'react-native';

import {Loader} from '../../../components/elements/Loader';
import { setDataStorage } from '../../../config/api/asyncStorage';
import { fetchLogin } from '../../../config/api/proteoApi';
import {useNavigation} from '../../../hooks/useNavigation';
import { useLogin } from '../../../hooks';
import React from 'react';

export const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);
  const [requiredFields, setRequiredFields] = useState({ user: false, password: false });

  const { loadingAuth, setLoadingAuth, setMyUser, setLogin } = useLogin();
  const navigation = useNavigation();

  const textInputRefUser = useRef<RNTextInput>(null);
  const textInputRefPassword = useRef<RNTextInput>(null);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', removeInputFocus);
    return () => keyboardDidHideListener.remove();
  }, []);

  const removeInputFocus = () => {
    textInputRefUser.current?.blur();
    textInputRefPassword.current?.blur();
  };

  const auth = async () => {
    if (!user || !password) {
      setRequiredFields({ user: !user, password: !password });
      setIncorrectCredentials(false);
      return;
    }

    setLoadingAuth(true);
    setIncorrectCredentials(false);

    const res = await fetchLogin({ usuario: user, password });
    const dataUser = res[0];

    if (res?.message) {
      setLoadingAuth(false);
      setIncorrectCredentials(true);
    } else {
      const access = {
        customerAccess: !!dataUser?.cliente,
        labAccess: !!dataUser?.clipro,
        salespersonAccess: dataUser?.clipro === '',
      };

      const userData = { ...dataUser, access };

      setMyUser(userData);
      await setDataStorage('myUser', userData);
      await setDataStorage('login', true);

      setLogin(true);
      setLoadingAuth(false);
      setShowPassword(false);
      setUser('');
      setPassword('');
      // navigation.navigate('Home');
      navigation.replace('Login');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <TextInput
        ref={textInputRefUser}
        placeholder="Usuario"
        value={user}
        onChangeText={setUser}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      {requiredFields.user && <Text style={{ color: 'red' }}>* Campo obligatorio</Text>}

      <TextInput
        ref={textInputRefPassword}
        placeholder="Contraseña"
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      {requiredFields.password && <Text style={{ color: 'red' }}>* Campo obligatorio</Text>}

      {incorrectCredentials && <Text style={{ color: 'red' }}>* Datos incorrectos</Text>}

      <TouchableOpacity
        onPress={auth}
        style={{ padding: 10, backgroundColor: '#92BF1E', marginTop: 10, alignItems: 'center' }}
      >
        {!loadingAuth ? (
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Iniciar Sesión</Text>
        ) : (
          <Loader size={24} color="#fff" />
        )}
      </TouchableOpacity>
    </View>
  );
};

