

import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import Header from '../common/Header';

import { ScrollView } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import getStyles from '../Style/logNRegStyle';
import Theme from './Theme';
import { Formik } from 'formik';
import * as Yup from 'yup';
import logNRegStyle from '../Style/logNRegStyle';
import messaging from '@react-native-firebase/messaging';

const Registration = ({ navigation }) => {
    const { isLoading, register } = useContext(AuthContext);


    // =========================push notification===================


    // const requestUserPermission = async () => {
    //     try {
    //       const authStatus = await messaging().requestPermission();
    //       const enabled =
    //         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    //       if (enabled) {
    //         console.log('Authorization status:', authStatus);
    //       }
    //     } catch (error) {
    //       console.error('Error requesting permission:', error);
    //     }
    //   };

    //   // Call the function when the component mounts
    //   useEffect(() => {
    //     requestUserPermission();
    //   }, []);




    // =======================validation===================================

    const validationSchema = Yup.object().shape({
        first_name: Yup.string()
            .required('First name must be required.'),
        last_name: Yup.string()
            .required('Last name must be required.'),
        email: Yup.string().
            email('Please Enter Email Address').
            required('Email must be required.'),
        phone: Yup.string()
            .min(10)
            .required('Phone number should be atleast 10 characters.'),
        password: Yup.string()
            // .min(8)
            .required('Password must be required.'),
        // .matches('Must contain minimum 8 characters'),
        // .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Must contain minimum 8 characters,at least one uppercase letter,at least one lowercase letter, one special character and one number'),
        confirmpassword: Yup.string()
            .required('Password is not matching')
    });

    // ===================on click of registrer========================


    const handleRegister = async (values) => {
        // Call the register function with the form values
        register(values.first_name, values.last_name, values.email, values.phone, values.password);
        userSignIn();
        navigation.goBack();
        // Send a foreground push notification
        messaging()
            .sendMessage({
                notification: {
                    title: 'Registration Successful',
                    body: 'You have successfully registered!',
                },
            })
            .then(() => console.log('Notification sent successfully'))
            .catch((error) => console.error('Error sending notification:', error));
    };

    return (
        <Theme>
            {({ theme }) => {
                const styles = getStyles(theme);
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
                            {isLoading && <Spinner visible={true} />}
                            <View style={[styles.floatView, { height: 800, }]}>

                                <Text style={[styles.lognregHead,{paddingHorizontal: 60,}]} >
                                    Registration</Text>
                                <Text style={styles.subHeadinglognregHead}>
                                    Register your membership</Text>

                                <Formik
                                    initialValues={{
                                        first_name: '',
                                        last_name: '',
                                        email: '',
                                        phone: '',
                                        password: '',
                                        confirmpassword: ''
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={handleRegister}
                                >
                                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (

                                        <View style={{ marginTop: 20 }}>
                                            <View>
                                                <View
                                                    style={styles.txtInputView}>
                                                    <Image source={require('../images/user.png')}
                                                        style={styles.vectorIcon} />
                                                    <TextInput
                                                        placeholder="First Name"
                                                        autoCompleteType="first_name"
                                                        keyboardType="name-phone-pad"
                                                        value={values.first_name}
                                                        onChangeText={handleChange('first_name')}
                                                        onBlur={handleBlur('first_name')}
                                                    />
                                                </View>
                                                {touched.first_name && errors.first_name &&
                                                    <Text style={styles.validation}>{errors.first_name}</Text>}
                                            </View>

                                            <View>
                                                <View
                                                    style={styles.txtInputView}>
                                                    <Image source={require('../images/user.png')}
                                                        style={styles.vectorIcon} />
                                                    <TextInput
                                                        placeholder="Last Name"
                                                        autoCompleteType="last_name"
                                                        keyboardType="name-phone-pad"
                                                        value={values.last_name}
                                                        onChangeText={handleChange('last_name')}
                                                        onBlur={handleBlur('last_name')}
                                                    />
                                                </View>
                                                {touched.last_name && errors.last_name &&
                                                    <Text style={styles.validation}>{errors.last_name}</Text>}
                                            </View>

                                            <View>
                                                <View
                                                    style={styles.txtInputView}>
                                                    <Image source={require('../images/email.png')}
                                                        style={styles.vectorIcon} />
                                                    <TextInput
                                                        placeholder="Email"
                                                        autoCompleteType="email"
                                                        keyboardType="email-address"
                                                        value={values.email}
                                                        onChangeText={handleChange('email')}
                                                        onBlur={handleBlur('email')}
                                                    />
                                                </View>
                                                {touched.email && errors.email &&
                                                    <Text style={styles.validation}>{errors.email}</Text>}
                                            </View>

                                            <View>
                                                <View
                                                    style={styles.txtInputView}>
                                                    <Image source={require('../images/telephone.png')}
                                                        style={styles.vectorIcon} />
                                                    <TextInput
                                                        placeholder="Phone"
                                                        autoCompleteType="phone"
                                                        keyboardType="number-pad"
                                                        value={values.phone}
                                                        onChangeText={handleChange('phone')}
                                                        onBlur={handleBlur('phone')}
                                                    />
                                                </View>
                                                {touched.phone && errors.phone &&
                                                    <Text style={styles.validation}>{errors.phone}</Text>}
                                            </View>

                                            <View>
                                                <View style={styles.txtInputView}>
                                                    <Image source={require('../images/password.png')}
                                                        style={styles.vectorIcon} />
                                                    <TextInput
                                                        placeholder="Password"
                                                        autoCompleteType="password"
                                                        secureTextEntry={true}
                                                        value={values.password}
                                                        onChangeText={handleChange('password')}
                                                        onBlur={handleBlur('password')}
                                                    />
                                                </View>
                                                {touched.password && errors.password &&
                                                    <Text style={styles.validation}>
                                                        {errors.password}</Text>}
                                            </View>

                                            <View>
                                                <View style={styles.txtInputView}>
                                                    <Image source={require('../images/password.png')}
                                                        style={styles.vectorIcon} />
                                                    <TextInput
                                                        placeholder="Confirm Password"
                                                        autoCompleteType="confirmpassword"
                                                        secureTextEntry={true}
                                                        value={values.confirmpassword}
                                                        onChangeText={handleChange('confirmpassword')}
                                                        onBlur={handleBlur('confirmpassword')}
                                                    />
                                                </View>
                                                {touched.confirmpassword && errors.confirmpassword &&
                                                    <Text style={styles.validation}>
                                                        {errors.confirmpassword}</Text>}
                                            </View>

                                            <TouchableOpacity
                                                style={[styles.allbutton,
                                                { backgroundColor: isValid ? '#c27b7f' : '#e4e7ea' }]}

                                                onPress={handleSubmit}
                                                disabled={!isValid}
                                            >
                                                <Text style={styles.allButtonText}>Register</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={styles.cancel}
                                                onPress={() =>
                                                    navigation.goBack()
                                                }
                                            >
                                                <Text style={styles.loginText}>Login</Text>

                                            </TouchableOpacity>


                                        </View>
                                    )}
                                </Formik>
                            </View>
                        </ScrollView>
                    </View>
                );
            }}
        </Theme>
    );
};

export default Registration;
