import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../common/Header';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import messaging from '@react-native-firebase/messaging';
import logNRegStyle from '../Style/logNRegStyle';

const ForgetPassword = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const { forgotPassword, } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);

    const handleForgotPassword = async () => {
        // Call the forgotPassword function with the form values
        const resetPasswordUrl = 'https://dindayalupadhyay.smartcitylibrary.com/#/lms/reset-password'; // Replace with the actual URL
        await forgotPassword(email, resetPasswordUrl);

        console.log("email is:", email);
        setEmail(email);
        console.log("resetPasswordUrl is:", resetPasswordUrl);

        // Send a foreground push notification
        messaging()
            .sendMessage({
                notification: {
                    title: 'Email sent successfully',
                    body: 'Check your registered Email!',
                },
            })
            .then(() => console.log('Notification sent successfully'))
            .catch((error) => console.error('Error sending notification:', error));

    };

    return (
        <View style={logNRegStyle.container}>
            <Header
                rightIcon={require('../images/Logoelibrary.png')}
                leftIcon={require('../images/back.png')}
                onClickLeftIcon={() => {
                    navigation.goBack();
                }}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>

                <View style={logNRegStyle.centeredView}>
                    <View style={logNRegStyle.modalView}>
                        <Text style={{
                            marginTop: 10,
                            paddingHorizontal: 50,
                            textAlign: 'center',
                            fontSize: 16,
                            fontFamily: 'bold'
                        }}>Reset link has been sent on your mailing address. please check your mail.</Text>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('Loginnn');
                        }}>
                            <Text style={{
                                marginTop: 15,
                                paddingHorizontal: 50,
                                textAlign: 'center',
                                fontSize: 18,
                                fontFamily: 'Roboto-Bold',
                                color: '#c27b7f'
                            }}>Go Back To Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <View style={[logNRegStyle.floatView, { height: 400 },]}>

                <Text style={{
                    fontSize: 36,
                    fontWeight: '500',
                    textAlign: 'center',
                    paddingHorizontal: 80,
                    paddingVertical: 'auto',
                    fontFamily: 'Philosopher-Bold',
                    color: '#2f4858'
                }} >
                    Forgot Password</Text>
                <Text style={{
                    marginTop: 10,
                    paddingHorizontal: 50,
                    textAlign: 'center',
                    fontSize: 16,
                    fontFamily: 'Poppin-Thin'
                }}>
                    Enter Your email for reset your password</Text>
                <View style={{ marginTop: 20 }}>


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
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>

                    <TouchableOpacity
                        style={[logNRegStyle.allbutton, { backgroundColor: '#c27b7f' }]}

                        onPress={() => {
                            handleForgotPassword();
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <Text style={logNRegStyle.allButtonText}>submit</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={logNRegStyle.cancel}
                        onPress={() =>
                            navigation.navigate('Loginnn')
                        }
                    >
                        <Text style={logNRegStyle.loginText}>Cancel</Text>

                    </TouchableOpacity>


                </View>
            </View>
        </View>
    );
};

export default ForgetPassword;
