import { View, Text } from 'react-native'
import React from 'react'

import SplashScreen from '../screens/SplashScreen';
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

const drawer = createDrawerNavigator();

//const stack = createNativeStackNavigator();

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
        component={LoginScreen}
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




    // <stack.Navigator screenOptions={{headerShown:false}}>
    //         <stack.Screen name='Splash' component={SplashScreen} />
    //         <stack.Screen name='Home' component={HomScreen} />
    //     </stack.Navigator>
    
  );
};

export default AppStack;