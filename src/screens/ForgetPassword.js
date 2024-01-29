import { View, Text, Image, TouchableOpacity, TextInput, Modal } from 'react-native'
import React, { useContext,  useState } from 'react'
import Header from '../common/Header';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import messaging from '@react-native-firebase/messaging';
import getStyles from '../Style/logNRegStyle';
import Theme from './Theme';

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
        <Theme>
        {({ theme }) => {
          const styles = getStyles(theme);
          return (
        <View style={styles.container}>
            <Header
                // rightIcon={require('../images/Logoelibrary.png')}
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

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
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
                            <Text style={
                                styles.cancel
                            //     {
                            //     marginTop: 15,
                            //     paddingHorizontal: 50,
                            //     textAlign: 'center',
                            //     fontSize: 18,
                            //     fontFamily: 'Roboto-Bold',
                            //     color: '#c27b7f'
                            // }
                            }>Go Back To Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <View style={[styles.floatView, { height: 400 },]}>

                <Text style={[styles.lognregHead,{paddingHorizontal: 60, marginTop:-150}]} >
                    Forgot Password</Text>
                <Text style={styles.subHeadinglognregHead}>
                    Enter Your email for reset your password</Text>
                <View style={{ marginTop: 20 }}>


                    <View
                        style={styles.txtInputView}>
                        <Image source={require('../images/email.png')}
                            style={styles.vectorIcon} />
                        <TextInput
                         style={{color:theme=== 'LIGHT'? 'grey':'#000'}}
                            placeholderTextColor= {theme=== 'LIGHT'? 'grey':'#000'}
                            placeholder="Email"
                            autoCompleteType="email"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.allbutton, { backgroundColor: '#c27b7f' }]}

                        onPress={() => {
                            handleForgotPassword();
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <Text style={styles.allButtonText}>Submit</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                            onPress={() =>
                            navigation.navigate('Loginnn')
                        }>
                        <Text style={styles.loginText}>Cancel</Text>
                    </TouchableOpacity>


                </View>
            </View>
        </View>
          );
        }}
      </Theme>
    );
};

export default ForgetPassword;
