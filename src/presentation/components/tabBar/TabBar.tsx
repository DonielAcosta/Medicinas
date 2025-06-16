
import { View, StyleSheet } from 'react-native';
import { useLogin } from '../../hooks';
import React from 'react';
import { themeColors } from 'src/styles/themeColors';
import { IconProfile } from './IconProfile';
import { IconPlus } from './IconPlus';

export const TabBar = () => {
  const { colorprincipal } = themeColors;
  const { myUser } = useLogin();

  if (!myUser) {return null;} // o puedes renderizar un loader


  return (
    <View style={[styles.container,{ backgroundColor: colorprincipal }]}>
      <View style={styles.iconContainer}><IconProfile /></View>
      <View style={styles.iconContainer}><IconPlus /></View>
      <View style={styles.iconContainer}><IconProfile /></View>


    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 64, // equivalente a h-16 (16 * 4)
  },
  iconContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

