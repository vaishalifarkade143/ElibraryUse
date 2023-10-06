import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Search from '../screens/Search';
import Books from '../screens/Books';
import User from '../screens/User';
import HomeScreen from '../screens/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Registration from '../screens/Registration';
import ForgetPassword from '../screens/ForgetPassword';
import LoginScreen from '../screens/LoginScreen';
import BooksDetail from '../screens/BooksDetail';
// import SubscribePage from '../screens/SubscribePage';
import BookHistory from '../screens/BookHistory';
import MyEBook from '../screens/MyEBook';
import ReadEBook from '../screens/ReadEBook';

const stack = createNativeStackNavigator();
const LoginAndRegister = () => {
  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>

      <stack.Screen name='Userr' component={User} />
      <stack.Screen name='Loginnn' component={LoginScreen} />
      <stack.Screen name='Registration' component={Registration} />
      <stack.Screen name='ForgetPassword' component={ForgetPassword}/>
      <stack.Screen name='Bookhistory' component={BookHistory}/>
      <stack.Screen name='ReadEBook' component={ReadEBook}/>
      {/* <stack.Screen name='MyeBook' component={MyEBook}/> */}
    </stack.Navigator>
  );
};
const Bookstack = createNativeStackNavigator();
const BookDetails = () => {
  return (
    <Bookstack.Navigator screenOptions={{ headerShown: false }}>
      <Bookstack.Screen name='Home' component={HomeScreen} />
      <Bookstack.Screen name='Book' component={Books} />
      <Bookstack.Screen name='BooksDetailPage' component={BooksDetail} />
      <Bookstack.Screen name='sLogin' component={LoginAndRegister} />
      <Bookstack.Screen name='subscribebookHistory' component={BookHistory} />
      <Bookstack.Screen name='myEBook' component={MyEBook} />
      <stack.Screen name='ReadeBook' component={ReadEBook}/>
    </Bookstack.Navigator>
  );
};


const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  // const { userInfo } = useContext(AuthContext);
  return (

    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: { backgroundColor: '#fff3cd' },
      //tabBarActiveBackgroundColor:'#c27b7f',
      tabBarInactiveTintColor: '#000',
      tabBarActiveTintColor: '#c27b7f'


    }}>
      <Tab.Screen name='Home2' component={BookDetails}
        options={{
          tabBarIcon: ({ color, size }) =>
            <Ionicons name="home-outline" color={color} size={size} />
        }}
      />
      <Tab.Screen name='Search' component={Search}
        options={{
          tabBarIcon: ({ color, size }) =>
            <Ionicons name="search-outline" color={color} size={size} />
        }}
      />
      <Tab.Screen name='Books' component={Books}
        options={{
          tabBarIcon: ({ color, size }) =>
            <Ionicons name="book-outline" color={color} size={size} />

        }}
      />
      <Tab.Screen name='User' component={LoginAndRegister}
        options={{
          tabBarIcon: ({ color, size }) =>
            <Ionicons name="person-circle-outline" color={color} size={size} />
        }}
      />
    </Tab.Navigator>

  )
}

export default TabNavigator;
const styles = StyleSheet.create({
  bottomView: {
    position: 'absolute',
    bottom: 0,
    width: '20%',
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white'
  },
});