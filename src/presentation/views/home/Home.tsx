import React, { useEffect } from 'react';
import {View,StatusBar,BackHandler,StyleSheet} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import {SelectCustomer,Logos,ProductsHome,TabBar} from '../components';
import { themeColors } from 'src/styles/themeColors';
// import { useLogin } from 'src/presentation/hooks';
import {TabBar} from '../../components/tabBar/TabBar';

export const Home = () => {
  const { background } = themeColors;
  // const {myUser: { image_url }} = useLogin();
  const { name } = useRoute();

  // Back handler para cerrar la app si está en Home
  useEffect(() => {
    if (name === 'Home') {
      const backAction = () => {
        BackHandler.exitApp();
        return true;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => backHandler.remove();
    }
  }, [name]);

  return (
    <>
      <SafeAreaView style={[styles.container, { backgroundColor: background }]}>
        <StatusBar backgroundColor={background} barStyle="dark-content" />

        <View style={styles.innerContainer}>
          {/* <Logos image={image_url as URL} /> */}

          <View style={styles.content}>
            {/* <SelectCustomer />
            <ProductsHome /> */}
          </View>
        </View>
      </SafeAreaView>

      <View style={styles.tabBar}>
        <TabBar />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  innerContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
