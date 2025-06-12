/* eslint-disable react/react-in-jsx-scope */

// import { StackCardStyleInterpolator } from '@react-navigation/stack';

import { Login } from '../views/auth/Login';
import {Home} from '../views/home/Home';
import {Loading} from '../views/loading/Loading';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



export type RootStackParams = {
    Loading: undefined;
    Login:undefined;
    Home: undefined;
}

// const fadeAnimation: StackCardStyleInterpolator = ({current}) => {
//   return{
//     cardStyle:{
//       opacity: current.progress,
//     },
//   };
// };
const Tab = createBottomTabNavigator();

export const TabNavigator = ()=> {
  return (
    <Tab.Navigator
    initialRouteName="Login"
     screenOptions={{
        headerShown:false,
        // cardStyleInterpolator: 'fade',
    }}>
      <Tab.Screen   name="Loading"  component={Loading} />
      <Tab.Screen   name="Login"    component={Login} />
      <Tab.Screen   name="Home"     component={Home} />
      {/* <Tab.Screen  name="ProductScreen"  component={ProductScreen} /> */}
    </Tab.Navigator>
  );
};


