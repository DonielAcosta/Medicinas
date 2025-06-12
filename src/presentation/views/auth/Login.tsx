/* eslint-disable react-native/no-inline-styles */
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { MyIcon } from '../../components/ui/MyIcon';
import { API_URL } from '@env';
import { fetchLogin } from '../../../config/api/proteoApi';

export const Login = () => {
  const { height } = useWindowDimensions();
  console.log(API_URL);

  const [user, setUser]         = useState('');
  const [password, setPassword] = useState('');
  //para mostrar la contrasena que copiamos
  const [showPassword, setShowPassword] = useState(false);
  // cuando copien los datos malos
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);
  //datos que necesito para ingresar
  const [requiredFields, setRequiredFields] = useState({
    user: false,
    password: false,
  });

  const { loadingAuth, setLoadingAuth, setMyUser, setLogin, checkLocationPermission } = useLogin();
  const navigation = useNavigation();
  const textInputRefUser = useRef<TextInput | null>(null);
  const textInputRefPassword = useRef<TextInput | null>(null);

  // -----------------------------------------------
  // AUTH
  // -----------------------------------------------

  const auth = async () => {
    // required fields
    if (user === '' && password === '') {
      setRequiredFields({ ...requiredFields, user: true, password: true });
      setIncorrectCredentials(false);
      return;
    } else if (user === '') {
      setRequiredFields({ ...requiredFields, user: true, password: false });
      setIncorrectCredentials(false);
      return;
    } else if (password === '') {
      setRequiredFields({ ...requiredFields, user: false, password: true });
      setIncorrectCredentials(false);
      return;
    } else {
      setRequiredFields({ ...requiredFields, user: false, password: false });
    }

    setLoadingAuth(true);
    setIncorrectCredentials(false);

    // api call
    const res = await fetchLogin({ usuario: user, password });
    const dataUser = res[0];

    if (res?.message) { // incorrect credentials
      setLoadingAuth(false);
      setIncorrectCredentials(true);
    } else {
      setIncorrectCredentials(false);

      setUser({
        ...dataUser,
        access: {
          customerAccess: dataUser?.cliente ? true : false,
          labAccess: dataUser?.clipro ? true : false,
          salespersonAccess: dataUser?.clipro === '' ? true : false,
        },
      });

      await setDataStorage('myUser', {
        ...dataUser,
        access: {
          customerAccess: dataUser?.cliente ? true : false,
          labAccess: dataUser?.clipro ? true : false,
          salespersonAccess: dataUser?.clipro === '' ? true : false
        },
      });
      await setDataStorage('login', true);

      setLogin(true);
      setLoadingAuth(false);
      setShowPassword(false);
      navigation.navigate('Home');

      setUser('');
      setPassword('');
    }
  };

  return (
    <Layout style={{ flex: 1, paddingHorizontal: 40 }}>
      <Layout style={{ flex: 1, justifyContent: 'flex-start', paddingTop: height * 0.35 }}>
        <Text category="h1" style={{ fontWeight: 'bold' }}>Ingresar</Text>
        <Text category="p2" style={{ fontWeight: 'bold', marginBottom: 20 }}>
          Por favor, ingresar para continuar
        </Text>

        <Input
          placeholder="Usuario"
          keyboardType="default"
          autoCapitalize="none"
          accessoryLeft={<MyIcon name="person-outline" />}
          style={{ marginBottom: 10 }}
        />

        <Input
          placeholder="Contraseña"
          autoCapitalize="none"
          secureTextEntry
          accessoryLeft={<MyIcon name="lock-outline" />}
          style={{ marginBottom: 10 }}
        />

        <Button
        accessoryRight={<MyIcon  name="arrow-forward-outline" white/>}
         onPress={() => {}}
         style={{ backgroundColor: '#00C851', borderColor: '#00C851' }}
         >
          Ingresar
        </Button>
      </Layout>
    </Layout>
  );
};


     