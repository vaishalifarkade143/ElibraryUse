
import React, { useEffect, useState } from 'react'
import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';
import { Appearance } from 'react-native';
import Theme from './src/screens/Theme';
import {StatusBar} from 'react-native'; 


const App = () => {
  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBackgroundColor('#fff');
  }, []); 
  return (
 
    <AuthProvider >
        <AppNav />
    </AuthProvider>
           
  );
};

export default App;