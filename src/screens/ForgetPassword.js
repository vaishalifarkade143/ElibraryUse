import { View, Text,StyleSheet,Image,ScrollView,TouchableOpacity,TextInput } from 'react-native'
import React , { useContext,useEffect,useState } from 'react'
import Header from '../common/Header';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import messaging from '@react-native-firebase/messaging';

const ForgetPassword = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const { isLoading, forgotPassword ,useremail} = useContext(AuthContext);


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

        navigation.navigate('goBackLogin');
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
    <View style={styles.floatView}>

        <Text style={{
            fontSize: 36,
            fontWeight: '500',
            textAlign: 'center',
            paddingHorizontal: 80,
            paddingVertical:'auto',
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
                style={{
                    backgroundColor: '#c27b7f',
                    alignItems: 'center',
                    padding: 10,
                    borderRadius: 5,
                    width: '40%',
                    height: 60,
                    justifyContent: 'center',
                    marginLeft: 110
                }}
                onPress={handleForgotPassword }
            >
                <Text style={{
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: 18
                }}>submit</Text>

            </TouchableOpacity>

            <TouchableOpacity
                style={{
                   
                    alignItems: 'center',
                    padding: 10,
                    width: '40%',
                    height: 60,
                    justifyContent: 'center',
                    marginLeft: 110
                }}
                onPress={() => 
                  navigation.navigate('Loginn')
                
              }

            >
                <Text style={{
                    color: '#c27b7f',
                    fontWeight: '700',
                    fontSize: 18
                }}>Cancel</Text>

            </TouchableOpacity>
            
       
        </View>
    </View>
</View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    floatView: {
        height: 400,
        backgroundColor: '#f5ebe6',
        justifyContent: 'center',
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30
    }
  
  });