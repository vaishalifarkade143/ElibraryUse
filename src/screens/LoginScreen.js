import { View, Image, Text, StyleSheet, TextInput, TouchableOpacity ,ScrollView} from 'react-native'
import React, { useState, useContext } from 'react'
import Header from '../common/Header';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

const LoginScreen = ({ navigation }) => {
    const { isLoading,login } = useContext(AuthContext);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [rememberMe, setRememberMe] = useState(false);
    const {userInfo} = useContext(AuthContext);
    
    const { register } = useContext(AuthContext);

    // const handleLogin = () => {
    //     // Implement your login logic here


    //     //console.log('Login button clicked');
    // };

    return (
        <View style={styles.container}>
            <Header
                rightIcon={require('../images/Logoelibrary.png')}
                leftIcon={require('../images/back.png')}
                onClickLeftIcon={() => {
                    //navigation.navigate('Home');
                    navigation.goBack();
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom:15, }}>
            <Spinner visible={isLoading}/> 
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

                {/* <Text>{test}</Text> */}
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
                            onChangeText={text=>setEmail(text)}

                        />
                    </View>

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
                            value={password}
                            onChangeText={text=>setPassword(text)}

                        />
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
                    
                        // {/* on login button click */}
                       onPress={()=> {login(email,password)}}
                       // disabled={!email || !password}

                //        onPress={()=> {
                //         navigation.navigate('Home2');
                //         console.log();
                //        }
                // }
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
        backgroundColor: '#fff3cd',
        justifyContent: 'center',
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        margin: 30
    }

});