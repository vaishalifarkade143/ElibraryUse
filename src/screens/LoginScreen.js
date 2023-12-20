import { View, Image, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import Header from '../common/Header';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { Formik } from 'formik';
import * as Yup from 'yup';
import messaging from '@react-native-firebase/messaging';
import { getDatabase, ref, push, onValue } from '@react-native-firebase/database';
import  logNRegStyle from '../Style/logNRegStyle';

const LoginScreen = ({ navigation }) => {
    const { isLoading, login } = useContext(AuthContext);
    const [rememberMe, setRememberMe] = useState(false);

    // ==================Important get device token on load of app and to store device token========================//
  

    const getDeviceToken = async () => {
        

        try {
            const token = await messaging().getToken();
            console.log('Token is:', token);
        
            // Check if the token already exists in the database
            const tokensRef = ref(getDatabase(), 'deviceTokens');
        
            // Use onValue to check if the data exists at the specified location
            const snapshot = await new Promise(resolve => {
              onValue(tokensRef, snapshot => resolve(snapshot));
            });
        
            if (!token || (snapshot.exists() && snapshot.val())) {
              console.log('Token already exists or is empty. Not storing in Firebase.');
              return token;
            }
        
            // Store the token in Firebase Realtime Database without replacing the previous tokens
            const newTokenRef = push(tokensRef);
            newTokenRef.set({ token });
        
            console.log('FCM token is stored successfully in Firebase.');
            return token;
          } catch (error) {
            console.error('Error storing FCM token:', error);
            return null;
          }
    };

// =================permition code============================
    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    };
    useEffect(() => {
        requestUserPermission();
    }, []);
    //   ===========================validtion code ========================================

    const validationSchema = Yup.object().shape({
        email: Yup.string().
            email('Invalid email address').
            required('Please Enter Email Address'),
        password: Yup.string()
            .required('Please Enter password')
        });
    //===============on click of login button=================================

    const handleLogin = async (values) => {
        login(values.email, values.password);  //imp 
        getDeviceToken();

        //-----------redirect to membershipplan screen-------------------------

        // console.log("plan is::", userInfo.data.user.membership_plan_name);
        // if (userInfo.data.user.membership_plan_name !== null) {
        //     login(values.email, values.password);
        //     console.log(values.email);
        // }
        // else {
        //     navigation.navigate('Membershipplan');
        //     console.log("error");
        // }

        // ================for push notification======================

        // Get the device token
        // const token = await getDeviceToken();

        // if (token) {
        //   // Send a push notification or use the token as needed
        //   messaging()
        //     .sendMessage({
        //       to: token,
        //       notification: {
        //         title: 'Login Successful',
        //         body: 'You have successfully logged in!',
        //       },
        //     })
        //     .then(() => console.log('Notification sent successfully'))
        //     .catch((error) => console.error('Error sending notification:', error));
        // }
    };

    return (

        <View style={styles.container}>
            <Header
                rightIcon={require('../images/Logoelibrary.png')}
                leftIcon={require('../images/back.png')}
                onClickLeftIcon={() => {
                    navigation.goBack();
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 15, }}>
                <Spinner visible={isLoading} />
                <View style={[logNRegStyle.floatView,{height: 500,}]}>

                    <Text 
                    style={
                        {
                        fontSize: 36,
                        fontWeight: '500',
                        textAlign: 'center',
                        paddingHorizontal: 90,
                        fontFamily: 'Philosopher-Bold',
                        color: '#2f4858'
                    }
                }
                     >
                        Login</Text>
                    <Text style={{
                        marginTop: 10,
                        paddingHorizontal: 50,
                        textAlign: 'center',
                        fontSize: 16,
                        fontFamily: 'Poppin-Thin'
                    }}>
                        Sign In to your account</Text>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleLogin}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (

                            <View style={{ marginTop: 20 }}>

                                <View>
                                    <View
                                        style={{
                                            backgroundColor: '#fff',
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexDirection: "row",
                                            margin: 15,
                                            paddingLeft: 15,
                                            gap: 10
                                        }}>
                                        <Image source={require('../images/email.png')}
                                            style={{ width: 15, height: 15, }} />
                                        <TextInput
                                            placeholder="Email"
                                            autoCompleteType="email"
                                            keyboardType="email-address"
                                            value={values.email}
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}

                                        />
                                    </View>
                                    {touched.email && errors.email && <Text style={{ color: 'red', marginLeft: 30 }}>{errors.email}</Text>}
                                </View>


                                <View>
                                    <View style={{
                                        backgroundColor: '#fff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexDirection: "row",
                                        margin: 15,
                                        paddingLeft: 15,
                                        gap: 10,
                                    }}>
                                        <Image source={require('../images/password.png')}
                                            style={{ width: 15, height: 15, }} />
                                        <TextInput
                                            placeholder="Password"
                                            autoCompleteType="password"
                                            secureTextEntry={true}
                                            value={values.password}
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                        />

                                    </View>
                                    {touched.password && errors.password && <Text style={{ color: 'red', marginLeft: 30 }}>{errors.password}</Text>}
                                </View>

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                    <TouchableOpacity
                                        onPress={() => setRememberMe(!rememberMe)}>
                                        <View
                                            style={{
                                                width: 20,
                                                height: 20,
                                                marginRight: 10,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                margin: 20, backgroundColor: '#fff'
                                            }}
                                        >
                                            {rememberMe && <View style={{
                                                width: 10, height: 10,
                                                backgroundColor: 'black'
                                            }} />}
                                        </View>
                                    </TouchableOpacity>
                                    <Text
                                        style={{
                                            color: '#000',
                                            fontFamily: 'Poppin',
                                            fontWeight: '700',
                                            fontSize: 15
                                        }}>Remember Me</Text>
                                </View>
                                <TouchableOpacity
                                    style={[logNRegStyle.allbutton, { backgroundColor: isValid ? '#c27b7f' : '#e4e7ea' }]}
                                    onPress={handleSubmit}
                                    disabled={!isValid}
                                >
                                     <Text style={logNRegStyle.allButtonText}>Login</Text>

                                </TouchableOpacity>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginTop: 10,
                                }}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate('Registration')
                                        }>
                                        <Text style={logNRegStyle.forgotNRegister}>
                                            New Membership</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate('ForgetPassword')
                                        }
                                    >
                                        <Text style={logNRegStyle.forgotNRegister}>
                                            Forgot Password ?</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </View>

    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
   

});