import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import Registration from '../screens/Registration'
import ForgetPassword from '../screens/ForgetPassword'
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import AppStack from './AppStack';

//import {HomeScreen } from '../screens/HomeScreen';



const stack = createNativeStackNavigator();
const AuthStack = () => {
    return (
        // add bottomtab n drawer
        <NavigationContainer independent={true}>
            <stack.Navigator screenOptions={{headerShown:false}}>
            <stack.Screen name='Splash' component={SplashScreen} />
            <stack.Screen name='Home3' component={AppStack} />
            {/* <stack.Screen name='Login' component={LoginScreen} />
            <stack.Screen name='Registration' component={Registration}/>
            <stack.Screen name='ForgetPassword' component={ForgetPassword}/> */}
            </stack.Navigator>
        </NavigationContainer>
        
    )
}

export default AuthStack;