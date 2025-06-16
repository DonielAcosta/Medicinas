import { Text, Pressable, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import { useNavigation } from '../../hooks';
import React from 'react';

export const IconProfile = () => {
  // const navigation = useNavigation();

  return (
    <Pressable onPress={() => {}} style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={require('../../../assets/profile.png')}
      />
      <Text style={styles.text}>Perfil</Text>
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
  image: {
    width: wp(7),
    height: wp(7),
  },
  text: {
    fontSize: 9.5,
    textAlign: 'center',
    fontWeight: '400',
    color: '#ffffff',
  },
});
