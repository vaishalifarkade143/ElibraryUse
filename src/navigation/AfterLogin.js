import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import User from '../screens/User';
import Contact from '../screens/Contact';
import About from '../screens/About';
import Terms from '../screens/Terms';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import Disclaimer from '../screens/Disclaimer';
import Books from '../screens/Books';
import Search from '../screens/Search';
import HomeScreen from '../screens/HomeScreen';
import Drawer from '../customComponent/Drawer';

const Tab = createBottomTabNavigator();
const AfterLoginTab = () => {
   return (
        
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle:{backgroundColor:'#fff3cd'},
            tabBarInactiveTintColor:'#000',
            tabBarActiveTintColor:'#c27b7f'
            
          
        }}>
            <Tab.Screen name='Home2' component={HomeScreen}
                options={{
                    tabBarIcon: ({color,size}) =>
                        <Ionicons name="home-outline" color={color} size={size}/>
                }}
            />
            <Tab.Screen name='Search' component={Search}
                options={{
                    tabBarIcon: ({color,size}) =>
                        <Ionicons name="search-outline" color={color} size={size}/>
               }}
            />
            <Tab.Screen name='Books' component={Books}
                options={{
                    tabBarIcon: ({color,size}) =>
                      <Ionicons name="book-outline" color={color} size={size}/>

                }}
            />
            <Tab.Screen name='User' component={User}
                options={{
                    tabBarIcon: ({color,size}) =>
                      <Ionicons name="person-circle-outline" color={color} size={size}/>
                }}
            />
        </Tab.Navigator>
      
    );
};


const drawer = createDrawerNavigator();

const AfterLoginDrawer = () => {
     
      return (
        <drawer.Navigator
        drawerContent={props => <Drawer {...props} />}
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: '#c07b7f',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#333',
          drawerLabelStyle: {
            fontFamily: 'Poppin',
            fontSize: 15,
            fontWeight: '800',
          },
        }}>
    
        <drawer.Screen name='Home'
          component={AfterLoginTab} />
        <drawer.Screen
          name="Contact"
          component={Contact}
          options={{ headerShown: false }} />
        <drawer.Screen
          name="About"
          component={About}
          options={{ headerShown: false }} /> 
    
        <drawer.Screen
          name="Terms"
          component={Terms}
          options={{ headerShown: false }}
        />
        <drawer.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{ headerShown: false }}
        />
        <drawer.Screen
          name="Disclaimer"
          component={Disclaimer}
          options={{ headerShown: false }}
        />
    
    
      </drawer.Navigator>
      );
};

const stack = createNativeStackNavigator();
const AfterLogin = () => {
    return (
        <stack.Navigator screenOptions={{ headerShown: false }}>
          <stack.Screen name='HomeAfterLogin' component={AfterLoginDrawer} />
        </stack.Navigator>
      );

};

export default AfterLogin;

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