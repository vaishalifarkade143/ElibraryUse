import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Search from '../screens/Search';
import Books from '../screens/Books';
import User from '../screens/User';
import HomeScreen from '../screens/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';




const Tab = createBottomTabNavigator();
const TabNavigator = () => {
   return (
        
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle:{backgroundColor:'#fff3cd'},
            //tabBarActiveBackgroundColor:'#c27b7f',
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