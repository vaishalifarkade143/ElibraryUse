import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';



const stack = createNativeStackNavigator();
const AuthStack = () => {
    return (
        // add bottomtab n drawer
        <stack.Navigator screenOptions={{headerShown:false}}>
            <stack.Screen name='Splash' component={SplashScreen} />
            <stack.Screen name='Login' component={LoginScreen} />
        </stack.Navigator>
    )
}

export default AuthStack;