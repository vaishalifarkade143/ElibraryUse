
import React from 'react'
import AuthStack from './src/navigation/AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './src/navigation/AppStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';

const stack = createNativeStackNavigator();
const App = () => {
  return (
    <AuthProvider>
      <AppNav />

{/* added AuthProvider here code above */}
      {/* <NavigationContainer independent={true}>
      <AuthStack />
      {/* <AppStack/> */}
      {/* </NavigationContainer> */}


    </AuthProvider>

  );
};

export default App;