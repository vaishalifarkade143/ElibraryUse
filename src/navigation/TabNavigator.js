
import React, { useContext, useState, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Books from '../screens/Books';
import User from '../screens/User';
import HomeScreen from '../screens/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Registration from '../screens/Registration';
import ForgetPassword from '../screens/ForgetPassword';
import LoginScreen from '../screens/LoginScreen';
import BooksDetail from '../screens/BooksDetail';
import BookHistory from '../screens/BookHistory';
import MyEBook from '../screens/MyEBook';
import ReadEBook from '../screens/ReadEBook';
import MembershipPlan from '../screens/MembershipPlan';
import MembershipScreen from '../screens/MembershipScreen';
import Transaction from '../screens/Transaction';
import Profile from '../screens/Profile';
import Resources from '../screens/Resources';
import Search from '../screens/Search';
import FilterData from '../screens/FilterData';
import GoBackLogin from '../screens/GoBackLogin';
import Searchbar from '../screens/Searchbar';
import FilterDataRecently from '../screens/FilterDataRecently';
import FilterDataBooks from '../screens/FilterDataBooks';
import FilterDataEbooks from '../screens/FilterDataEbooks';


const stack = createNativeStackNavigator();

const LoginAndRegister = () => {
  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>

      <stack.Screen name='Userr' component={User} />
      <stack.Screen name='Loginnn' component={LoginScreen} />
      <stack.Screen name='Registration' component={Registration} />
      <stack.Screen name='ForgetPassword' component={ForgetPassword} />
      <stack.Screen name='goBackLogin' component={GoBackLogin} />
      <stack.Screen name='MyeBook' component={MyEBook} />
      <stack.Screen name='ReadEBook' component={ReadEBook} />
      <stack.Screen name='Bookhistory' component={BookHistory} />
      <stack.Screen name='MembershipPlan' component={MembershipPlan} />
      <stack.Screen name='MembershipScreen' component={MembershipScreen} />
      <stack.Screen name='transaction' component={Transaction} />
      <stack.Screen name='profile' component={Profile} />
      <stack.Screen name='resources' component={Resources} />
    </stack.Navigator>
  );
};
const Bookstack = createNativeStackNavigator();
const BookDetails = () => {
  return (
    <Bookstack.Navigator screenOptions={{ headerShown: false }}>
      <Bookstack.Screen name='Home' component={HomeScreen} />
      <Bookstack.Screen name='searchbar' component={Searchbar} />
      <Bookstack.Screen name='filterData' component={FilterData} />
      <Bookstack.Screen name='filterDataRecently' component={FilterDataRecently} />
      <Bookstack.Screen name='filterDatabooks' component={FilterDataBooks} />
      <Bookstack.Screen name='filterDataebooks' component={FilterDataEbooks} />
      <Bookstack.Screen name='BooksDetailPage' component={BooksDetail} />
      <Bookstack.Screen name='sLogin' component={LoginAndRegister} />
      <Bookstack.Screen name='subscribebookHistory' component={BookHistory} />
      <Bookstack.Screen name='myEBook' component={MyEBook} />
      <Bookstack.Screen name='ReadeBook' component={ReadEBook} />
      <Bookstack.Screen name='Membershipplan' component={MembershipPlan} />
      <Bookstack.Screen name='membershipscreen' component={MembershipScreen} />
    </Bookstack.Navigator>
  );
};


const Bookstack2 = createNativeStackNavigator();
const BookDetails2 = () => {
  return (
    <Bookstack2.Navigator screenOptions={{ headerShown: false }}>
      
      <Bookstack2.Screen name='Book' component={Books} />
      <Bookstack2.Screen name='search' component={Search} />
      <Bookstack2.Screen name='filterData' component={FilterData} />
      <Bookstack2.Screen name='filterDataRecently' component={FilterDataRecently} />
      <Bookstack2.Screen name='filterDatabooks' component={FilterDataBooks} />
      <Bookstack2.Screen name='filterDataebooks' component={FilterDataEbooks} />
      <Bookstack2.Screen name='BooksDetailPage' component={BooksDetail} />
      <Bookstack2.Screen name='sLogin' component={LoginAndRegister} />
      <Bookstack2.Screen name='subscribebookHistory' component={BookHistory} />
      <Bookstack2.Screen name='myEBook' component={MyEBook} />
      <Bookstack2.Screen name='ReadeBook' component={ReadEBook} />
      <Bookstack2.Screen name='Membershipplan' component={MembershipPlan} />
      <Bookstack2.Screen name='membershipscreen' component={MembershipScreen} />
    </Bookstack2.Navigator>
  );
};

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  // const { userInfo } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);


  useEffect(() => {
    if (refresh) {

      setRefresh(false);
    }
  }, [refresh]);



  return (

    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: { backgroundColor: '#fff' },//'#f5ebe6'
      tabBarInactiveTintColor: '#000',
      tabBarActiveTintColor: '#c27b7f',
      refresh: refresh,




    }}>
      <Tab.Screen name='Home2' component={BookDetails}
        options={{
          tabBarIcon: ({ color, size }) =>
            <Ionicons name="home-outline" color={color} size={size} />
        }}
      />

      <Tab.Screen name='Books' component={BookDetails2}//Books
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

};

export default TabNavigator;
