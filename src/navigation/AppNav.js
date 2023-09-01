
import { View, Text, ActivityIndicator } from 'react-native'
import React,{useContext} from 'react'
//import AuthStack from './src/navigation/AuthStack';
import { NavigationContainer } from '@react-navigation/native';
//import AppStack from './src/navigation/AppStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import { AuthContext } from '../context/AuthContext';
import AppStack from './AppStack';
import HomeScreen from '../screens/HomeScreen';
import TabNavigator from './TabNavigator';
import AfterLogin from './AfterLogin';
import User from '../screens/User';


const stack = createNativeStackNavigator();

const AppNav = () => {
const {isLoading,userToken} = useContext(AuthContext);

//for login
if(isLoading)
{
<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
  <ActivityIndicator size={'large'}/>
</View>
}
  return (
    <NavigationContainer independent={true}>

 {userToken != null ? <AppStack/>:<AuthStack/>} 

 {/* //after log in we have to see user screen  in stead of Authstack we sholud write User screen*/}
 {/* {userToken != null ? <AppStack/>:<User/>} */}

 {/* {userToken != null ? <AppStack/>:<AfterLogin/>}  */}



      {/* <AuthStack/> */}

      {/* dont remove comment */}
      {/* <AppStack/> */}
    </NavigationContainer>
  );
};

export default AppNav;