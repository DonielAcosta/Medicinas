import { useNavigation as useNavigationHook } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../config/api/types';

export const useNavigation = () => {
  return useNavigationHook<NativeStackNavigationProp<RootStackParamList>>();
};

