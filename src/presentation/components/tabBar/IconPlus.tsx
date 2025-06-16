import { Text, Pressable, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/config/api/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const IconPlus = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <Pressable onPress={() => navigation.navigate('Salud')} style={styles.container}>
      <SimpleLineIcons
        name="plus"
        size={wp(7)}
        color="#ffffff"
      />
      <Text style={styles.text}>MAS</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  text: {
    fontSize: 9.5,
    textAlign: 'center',
    fontWeight: '400',
    color: '#ffffff',
  },
});
