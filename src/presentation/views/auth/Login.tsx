/* eslint-disable react-native/no-inline-styles */
import { useState, useEffect, useRef } from 'react';
import {View,Text,TextInput,TouchableOpacity,Keyboard} from 'react-native';
import {Loader} from '../../components/elements/Loader';
import { setDataStorage } from '../../../config/api/asyncStorage';
import { fetchLogin } from '../../../config/api/proteoApi';
import {useNavigation} from '../../hooks/useNavigation';
import { useLogin } from '../../hooks';
import React from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);
  const [requiredFields, setRequiredFields] = useState({ user: false, password: false });

  const { loadingAuth, setLoadingAuth, setMyUser, setLogin } = useLogin();
  const navigation = useNavigation();
  const textInputRefUser = useRef<TextInput | null>(null);
  const textInputRefPassword = useRef<TextInput | null>(null);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', removeInputFocus);
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  const removeInputFocus = () => {
    textInputRefUser.current?.blur();
    textInputRefPassword.current?.blur();
  };

  const auth = async () => {
    // required fields
    if (user === '' && password === '') {
      setRequiredFields({ ...requiredFields, user: true, password: true });
      setIncorrectCredentials(false);
      return;
    } else if (user === '' || password === '') {
      setRequiredFields({ ...requiredFields, user: true, password: false });
      setIncorrectCredentials(false);
      return;
    }
    setLoadingAuth(true);
    setIncorrectCredentials(false);

    // llamada al metodo en proteoerp
    const res = await fetchLogin({ usuario: user, password });
    // console.log('Respuesta del login de proteo:', res);
    const dataUser = res[0];

    if (!res || res.length === 0 || !res[0]) {//credenciales malas
      setLoadingAuth(false);
      setIncorrectCredentials(true);
      return;
    } else {

      /********************************************* */
      // Guardar usuario en contexto y storage

      setMyUser(dataUser);
      await setDataStorage('myUser', dataUser);
      await setDataStorage('login', true);
    /************************************************** */

      setLogin(true);
      setLoadingAuth(false);
      setShowPassword(false);
      navigation.navigate('Home');
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'Home' }],
      // });

      setUser('');
      setPassword('');
    }
  };

  return (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f0f0f0' }}>
    <View style={{width: '100%',maxWidth: 400,backgroundColor: '#fff',borderRadius: 10,padding: 20,elevation: 5,shadowColor: '#000',shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.25,shadowRadius: 4}}>

      {/* Usuario */}
      <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: requiredFields.user ? 'red' : '#ccc', borderRadius: 5, paddingHorizontal: 10, marginBottom: 10 }}>
        <Fontisto name="person" color="black" size={24} />
        <TextInput
          ref={textInputRefUser}
          placeholder="Usuario"
          value={user}
          onChangeText={setUser}
          style={{ flex: 1, paddingVertical: 10, paddingLeft: 10, fontSize: 16 }}
        />
      {requiredFields.user && <Text style={{ color: 'red', marginBottom: 8 }}>* Campo obligatorio</Text>}
      </View>

      {/* Contraseña */}
      <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: requiredFields.password ? 'red' : '#ccc', borderRadius: 5, paddingHorizontal: 10, marginBottom: 10 }}>
        <MaterialIcons name="lock" color="black" size={24} />
        <TextInput
          ref={textInputRefPassword}
          placeholder="Contraseña"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          style={{ flex: 1, paddingVertical: 10, paddingLeft: 10, fontSize: 16 }}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'} size={24} color="gray" />
        </TouchableOpacity>
      {requiredFields.password && <Text style={{ color: 'red', marginBottom: 8 }}>* Campo obligatorio</Text>}
      {incorrectCredentials && <Text style={{ color: 'red', marginBottom: 8 }}>* Datos incorrectos</Text>}
      </View>

      {/* Botón Iniciar sesión */}
      <TouchableOpacity
        onPress={auth}
        style={{padding: 12,backgroundColor: '#e94ea3',borderRadius: 5,marginTop: 10,alignItems: 'center'}}
      >
        {!loadingAuth ? (<Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Iniciar Sesión</Text>) : (<Loader size={24} color="#fff" />)}
      </TouchableOpacity>
    </View>
  </View>
  );
};
