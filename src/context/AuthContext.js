import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import { BASE_URL } from "../config";
import HomeScreen from "../screens/HomeScreen";
import AppStack from "../navigation/AppStack";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo,setUserInfo] = useState(null);

    const login = (email,password) => {
        setIsLoading(true);
        axios.post(`${BASE_URL}/member-login`,{
            email,
            password
        })
        .then(res => {
          //  console.log(res.data);
            let userInfo = res.data;
            setUserInfo(userInfo);
            setUserToken(userInfo.data.token)
        
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            AsyncStorage.setItem('userToken', userInfo.data.token);
            
            console.log('User Token : ' +userInfo.data.token);
            console.log(userInfo);
          
        })
        .catch(e=> {
            console.log(`Login error ${e}`);
        });
        //setUserToken('ioiojlkad');
        
        setIsLoading(false);
    }

    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        
        AsyncStorage.removeItem('userInfo');
        AsyncStorage.removeItem('userToken');

        setIsLoading(false);
    }


//Login code

    const isLoggedIn = async() => {
        try {
            setIsLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');
            userInfo = JSON.parse(userInfo);

            if(userInfo)
            {
                setUserToken(userToken);
                setUserInfo(userInfo);
            }
            
           
            setIsLoading(false);

        }
        catch (e) {
            console.log(`isLogged in error ${e}`);
        }
    }

    useEffect(() => {
      isLoggedIn();
    }, [AppStack])


    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
            {children}
        </AuthContext.Provider>
    );
}