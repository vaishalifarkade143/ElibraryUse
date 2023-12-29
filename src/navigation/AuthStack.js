import { View, Text ,StyleSheet} from 'react-native'
import React, { useContext } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import Registration from '../screens/Registration'
import ForgetPassword from '../screens/ForgetPassword'
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
//import AppStack from './AppStack';
import TabNavigator from './TabNavigator';
import Contact from '../screens/Contact';
import About from '../screens/About';
import Terms from '../screens/Terms';
import Disclaimer from '../screens/Disclaimer';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import Drawer from '../customComponent/Drawer';
import AppStack from './AppStack';
import User from '../screens/User';
import { AuthContext } from '../context/AuthContext';

const stack = createNativeStackNavigator();


const AuthStack = () => {
    return (
        // add bottomtab n drawer
        
        <NavigationContainer independent={true}>
            <stack.Navigator screenOptions={{headerShown:false}}>
            <stack.Screen name='Splash' component={SplashScreen} />
            <stack.Screen name='Home3' component={AppStack} />
            </stack.Navigator>
        </NavigationContainer>
        
    )
}

export default AuthStack;

