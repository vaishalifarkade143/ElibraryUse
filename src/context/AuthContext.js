import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import { BASE_URL } from "../config";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);//for loading
    const [userToken, setUserToken] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const [userInfo, setUserInfo] = useState(null);


    const forgotPassword = (email, url) => {
        console.log('Sending reset password link for email:', email);
        setIsLoading(true);
        axios.post(`https://dindayalupadhyay.smartcitylibrary.com/api/v1/send-reset-member-password-link`, {
            email,
            url,
        })
            .then(res => {
                let userInfo = res.data;
                setUserInfo(userInfo);
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                setIsLoading(false);
                if (userInfo && userInfo.user && userInfo.user.email) {
                    console.log("Forgot Password success:", userInfo.user.email);
                } else {
                    console.log("Forgot Password success: User information not available");
                    console.log("Response Object:", userInfo);
                }

                console.log("Forgot Password success:", userInfo.user.email);
            })
            .catch(e => {
                console.log('Forgot Password error:', e.response?.data || e.message || e);
                setIsLoading(false);

            });
    };


    const register = (first_name,
        last_name,
        email,
        phone,
        password, token) => {
        setIsLoading(true);
        axios.post(`${BASE_URL}/v1/register-member`,
            {
                first_name,
                last_name,
                email,
                phone,
                password
            })
            .then(res => {
                let userInfo = res.data;
                setUserInfo(userInfo);
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                setIsLoading(false);

                Alert.alert(
                    `Account registered successfully`,
                        ` Request email has been sent for approval `

                );
            })
            .catch(e => {
                // console.log(`register error ${e}`);
                setIsLoading(false);
            });

    };


    const login = async (email, password) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/member-login`, {
                email,
                password
            });

            const result = response.data;
            setUserInfo(result);
            setUserToken(result.data.token);
            setUserEmail(result.data.user.email);

            AsyncStorage.setItem('userInfo', JSON.stringify(result));
            AsyncStorage.setItem('userToken', result.data.token);
            AsyncStorage.setItem('userEmail', result.data.user.email);

            // if ( result.data.user.membership_plan_name !== null) {
            //     navigation.navigate('Home2');

            //     console.log(values.email);
            // }
            // else {
            //     navigation.navigate('MembershipPlan');
            //     console.log("error");
            // }

            Alert.alert(
                'Success!',
                `User has successfully signed in!`,
            );
            // loading_page(result);

            return result; // Return the result for further use if needed


        } catch (error) {
            // console.error('Login error:', error);

            // if (error.response) {
            //     console.log('Response data:', error.response.data);
            //     console.log('Response status:', error.response.status);
            // }

            Alert.alert(
                'Login fail',
                `Email Id and Password don't match!`,
            );

            // throw error; // Re-throw the error for further handling if needed
        } finally {
            setIsLoading(false);
            // console.log();
            // loading_page();
         



        }
    };


    // const loading_page = (item) => {
    //     console.log('loading_page', item)

        // if (item.data.user.membership_plan_name !== null) {
        //     navigation.navigate('Home2');

        //     console.log('authcontext', userInfo);
        // }
        // else {
        //     navigation.navigate('MembershipPlan');
        //     console.log("error");
        // }
    // }


    // =========================

    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        setUserInfo(null);

        AsyncStorage.removeItem('userInfo');//login pr info remove hogi
        AsyncStorage.removeItem('userToken');
        AsyncStorage.removeItem('userEmail');
        setIsLoading(false);
        Alert.alert(
            'Success!',
            `User Logout successfully !`,
        );
    }
    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');
            let userEmail = await AsyncStorage.getItem('userEmail');
            userInfo = JSON.parse(userInfo);
            console.log("user Token is:", userToken)
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
        <AuthContext.Provider value={{ isLoading, userInfo, userToken, userEmail, register, login, logout, isLoggedIn, forgotPassword }}>{children}</AuthContext.Provider>
    );
}
