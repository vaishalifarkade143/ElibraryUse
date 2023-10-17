
import React from 'react'
import AuthStack from './src/navigation/AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './src/navigation/AppStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';
import BooksDetail from './src/screens/BooksDetail';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
const stack = createNativeStackNavigator();
const App = () => {
  return (
    // <Provider store={store}>
    <AuthProvider>
      <AppNav />

{/* added AuthProvider here code above */}
      {/* <NavigationContainer independent={true}>
      <AuthStack />
      {/* <AppStack/> */}
      {/* </NavigationContainer> */}
      

    </AuthProvider>
    
    //  </Provider>
  );
};

export default App;