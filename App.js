
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';
import NavigationContainerWithDarkMode from './src/navigation/NavigationContainerWithDarkMode';

const stack = createNativeStackNavigator();
const App = () => {

  return (

    <AuthProvider>
      {/* <NavigationContainerWithDarkMode> */}
        <AppNav/>
      {/* </NavigationContainerWithDarkMode> */}
    </AuthProvider>

  );
};

export default App;