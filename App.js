
import React,{useEffect} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';

const stack = createNativeStackNavigator();
const App = () => {

  return (
    <AuthProvider>
      <AppNav /> 
       </AuthProvider>
  );
};

export default App;