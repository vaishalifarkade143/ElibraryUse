import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import { BASE_URL } from "../config";
import HomeScreen from "../screens/HomeScreen";
import AppStack from "../navigation/AppStack";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);//for loading
    const [userToken, setUserToken] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const [userInfo, setUserInfo] = useState({});
    
    const register = (first_name,
        last_name,
        email,
        phone,
        password,token) => {
      setIsLoading(true);

       // console.log(email, first_name, last_name,password, phone);

        // //to call rest api we use axios package
        axios.post(`${BASE_URL}/v1/register-member`,
         {
            first_name,
            last_name,
            email,
            phone,
            password,token
        })
            .then(res=> {
                let userInfo = res.data;
                setUserInfo(userInfo);
               AsyncStorage.setItem('userInfo',JSON.stringify(userInfo));

                setIsLoading(false);
            //    console.log(userInfo);

                //Alert for login//
                // if (email== '' || password == ''){
                //     alert("please enter email and password")
                // }

                Alert.alert(
                    'Success!',
                    `User has successfully registered!`,
                );
            })

            //  })
            .catch(e => {
                console.log(`Reg error ${e}`);
                setIsLoading(false);
            });

    };


    const login = (email, password) => {
        setIsLoading(true);
        //to call rest api we use axios package
        axios.post(`${BASE_URL}/member-login`, {
            email,
            password
        })
            .then(async (res) => {
                let userInfo = res.data;
                setUserInfo(userInfo);
                setUserToken(userInfo.data.token)
                setUserEmail(userInfo.data.user.email)
                //to check login state is store to the app we use Asynkstorage
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                AsyncStorage.setItem('userToken', userInfo.data.token);
                AsyncStorage.setItem('userEmail', userInfo.data.user.email);
                //console.log('User Token : ' + userInfo.data.token);
                console.log(userInfo);

                //Alert for login//
                // if (email== '' || password == ''){
                //     alert("please enter email and password")
                // }

                Alert.alert(
                    'Success!',
                    `User has successfully signed in!`,
                );
            })

            //  })
            .catch(e => {
                console.log(`Login error ${e}`);
                // Alert.alert('Error!', e.message);
                // return false;
            });


        setIsLoading(false);
    }

    // =========================

    const logout = () => {
        setIsLoading(true);
        setUserToken(null);

        AsyncStorage.removeItem('userInfo');//login pr info remove hogi
        AsyncStorage.removeItem('userToken');
        AsyncStorage.removeItem('userEmail');

        //Alert for logout//
        Alert.alert(
            'Success!',
            `User Logout successfully !`,
        );

        console.log("Removed token")

        setIsLoading(false);
    }


    //Login code

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');
            let userEmail = await AsyncStorage.getItem('userEmail');
            //console.log(userInfo, userToken);
            userInfo = JSON.parse(userInfo);

            if (userInfo) {
                setUserToken(userToken);
                setUserInfo(userInfo);
                setUserEmail(userEmail);
            }

            setIsLoading(false);

        }
        catch (e) {
            console.log(`isLogged in error ${e}`);
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, []);


    return (
        <AuthContext.Provider value={{isLoading,userInfo,userToken,userEmail, register, login, logout}}>{children}</AuthContext.Provider>

    );
}
