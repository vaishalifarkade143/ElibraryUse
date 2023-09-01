import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Drawer from '../customComponent/Drawer';
import Contact from '../screens/Contact';
import About from '../screens/About';
import LoginScreen from '../screens/LoginScreen';
import Terms from '../screens/Terms';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import Disclaimer from '../screens/Disclaimer';
import TabNavigator from './TabNavigator';
import Registration from '../screens/Registration';
import ForgetPassword from '../screens/ForgetPassword';
import { AuthContext } from '../context/AuthContext';



const stack = createNativeStackNavigator();
const LoginNRegister = () => {
  const { userInfo } = useContext(AuthContext);
  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Screen name='Loginn' component={LoginScreen} />
      <stack.Screen name='Registration' component={Registration} />
      <stack.Screen name='ForgetPassword' component={ForgetPassword} />
    </stack.Navigator>
  );
};


const drawer = createDrawerNavigator();
const AppStack = () => {
  return (
    <drawer.Navigator
      drawerContent={props => <Drawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#c07b7f',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          fontFamily: 'Poppin',
          fontSize: 15,
          fontWeight: '800',
        },
      }}>

      <drawer.Screen name='Home'
        component={TabNavigator} />
      <drawer.Screen
        name="Contact"
        component={Contact}
        options={{ headerShown: false }} />
      <drawer.Screen
        name="About"
        component={About}
        options={{ headerShown: false }} />
       <drawer.Screen
        name='Login'
        component={LoginNRegister}
        options={{ headerShown: false }}
      />  

      <drawer.Screen
        name="Terms"
        component={Terms}
        options={{ headerShown: false }}
      />
      <drawer.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{ headerShown: false }}
      />
      <drawer.Screen
        name="Disclaimer"
        component={Disclaimer}
        options={{ headerShown: false }}
      />


    </drawer.Navigator>

  );
};


export default AppStack;