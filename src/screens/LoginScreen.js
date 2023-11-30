import { View, Image, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView ,Alert} from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import Header from '../common/Header';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { Formik } from 'formik';
import * as Yup from 'yup';
import messaging from '@react-native-firebase/messaging'

const LoginScreen = ({ navigation }) => {
    const { isLoading, login } = useContext(AuthContext);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [rememberMe, setRememberMe] = useState(false);
    const { userInfo } = useContext(AuthContext);

    // ======================== imp  push notification   get token============================

    // useEffect(() => {
    //     getDeviceToken();
    // }, []);


    // const getDeviceToken = async () => {
    //     try {
    //       const token = await messaging().getToken();
    //       console.log('Token is:', token);
    //       return token;
    //     } catch (error) {
    //       console.error('Error getting FCM token:', error);
    //       return null;
    //     }
    //   };



    // ================        imp  to get alert in app ==========================

    // useEffect(() => {
    //     const unsubscribe = messaging().onMessage(async remoteMessage => {
    //         Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    //         console.log("A new FCM message arrived:", JSON.stringify(remoteMessage));
    //     });

    //     return unsubscribe;
    // }, []);



    // const requestUserPermission = async () => {
    //     const authStatus = await messaging().requestPermission();
    //     const enabled =
    //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //       authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
    //     if (enabled) {
    //       console.log('Authorization status:', authStatus);
    //     }
    //   };
      
    //   // Call the function when the component mounts
    //   useEffect(() => {
    //     requestUserPermission();
    //   }, []);

    //   ===========================validtion code ========================================

    const validationSchema = Yup.object().shape({
        email: Yup.string().
            email('Invalid email address').
            required('Please Enter Email Address'),
        password: Yup.string()
            //  .min(8)
            .required('Please Enter password')
        // .matches('Please Enter password'),
        // .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Must contain minimum 8 characters,at least one uppercase letter,at least one lowercase letter, one special character and one number'),

    });

   

    

      //===============on click of login button=================================
    
      const handleLogin = async (values) => {
        // Call the login function with the form values
        login(values.email, values.password);
    
        // Get the device token
        const token = await getDeviceToken();
    
        if (token) {
          // Send a push notification or use the token as needed
          messaging()
            .sendMessage({
              to: token,
              notification: {
                title: 'Login Successful',
                body: 'You have successfully logged in!',
              },
            })
            .then(() => console.log('Notification sent successfully'))
            .catch((error) => console.error('Error sending notification:', error));
        }
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
                <View style={styles.floatView}>

                    <Text style={{
                        fontSize: 36,
                        fontWeight: '500',
                        textAlign: 'center',
                        paddingHorizontal: 90,
                        fontFamily: 'Philosopher-Bold',
                        color: '#2f4858'
                    }} >
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
                                    style={[styles.loginbtn, { backgroundColor: isValid ? '#c27b7f' : '#e4e7ea' }]}

                                    // {/* on login button click */}
                                    // onPress={() => { login(email, password) }}
                                    onPress={handleSubmit}
                                    disabled={!isValid}
                                >

                                    <Text style={{
                                        color: '#fff',
                                        fontWeight: '700',
                                        fontSize: 18
                                    }}>Login</Text>

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
                                        <Text style={{
                                            color: '#c27b7f',
                                            margin: 15,
                                            fontFamily: 'Poppin',
                                            fontWeight: '700',
                                            fontSize: 15
                                        }}>
                                            New Membership</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate('ForgetPassword')
                                        }
                                    >
                                        <Text style={{
                                            color: '#c27b7f',
                                            margin: 15,
                                            fontFamily: 'Poppin',
                                            fontWeight: '700',
                                            fontSize: 15,
                                        }}>
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
    floatView: {
        height: 500,
        backgroundColor: '#f5ebe6',
        justifyContent: 'center',
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        margin: 30
    },
    loginbtn: {
        //backgroundColor: '#c27b7f',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        width: '40%',
        height: 60,
        justifyContent: 'center',
        marginLeft: 110
    }

});