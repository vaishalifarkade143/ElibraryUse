//import { View, Text } from 'react-native'
import React from 'react'
import AuthStack from './src/navigation/AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './src/navigation/AppStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer independent={true}>
      <AuthStack />
      {/* <AppStack/> */}
    </NavigationContainer>


  );
};

export default App;