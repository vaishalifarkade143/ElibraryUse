import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

const NavigationContainerWithDarkMode = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme === 'light' ?  DefaultTheme: DarkTheme);

  useEffect(() => {
    setTheme(colorScheme === 'light' ?  DefaultTheme: DarkTheme);
  }, [colorScheme]);


  console.log('Current Theme :', theme);
  return <NavigationContainer theme={theme}>{children}</NavigationContainer>;
};

export default NavigationContainerWithDarkMode;