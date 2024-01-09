
import React, { useEffect, useState } from 'react'
import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';
import { Appearance } from 'react-native';
import Theme from './src/screens/Theme';

const App = () => {

  return (
 
    <AuthProvider  >
      
        <AppNav />
     
    </AuthProvider>
           
  );
};

export default App;