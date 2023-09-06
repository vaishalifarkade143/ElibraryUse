import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import Header from '../common/Header';

import { ScrollView } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

const Registration = ({ navigation }) => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const { isLoading, register } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Header
                rightIcon={require('../images/Logoelibrary.png')}
                leftIcon={require('../images/back.png')}
                onClickLeftIcon={() => {
                    // navigation.navigate('Login');
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
                        paddingHorizontal: 80,
                        paddingVertical: 'auto',
                        fontFamily: 'Philosopher-Bold',
                        color: '#2f4858'
                    }} >
                        Registration</Text>
                    <Text style={{
                        marginTop: 10,
                        paddingHorizontal: 50,
                        textAlign: 'center',
                        fontSize: 16,
                        fontFamily: 'Poppin-Thin'
                    }}>
                        Register your membership</Text>
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
                            <Image source={require('../images/user.png')}
                                style={{ width: 15, height: 15, }} />
                            <TextInput
                                placeholder="First Name"
                                autoCompleteType="first_name"
                                keyboardType="name-phone-pad"
                                value={first_name}
                                onChangeText={setFirstName}

                            />
                        </View>
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
                            <Image source={require('../images/user.png')}
                                style={{ width: 15, height: 15, }} />
                            <TextInput
                                placeholder="Last Name"
                                autoCompleteType="last_name"
                                keyboardType="name-phone-pad"
                                value={last_name}
                                onChangeText={setLastName}

                            />
                        </View>

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
                                onChangeText={setEmail}

                            />
                        </View>

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
                            <Image source={require('../images/telephone.png')}
                                style={{ width: 15, height: 15, }} />
                            <TextInput
                                placeholder="Phone"
                                autoCompleteType="phone"
                                keyboardType="number-pad"
                                value={phone}
                                onChangeText={setPhone}

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
                                onChangeText={setPassword}

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
                                placeholder="Confirm Password"
                                autoCompleteType="confirmpassword"
                                secureTextEntry={true}
                                value={confirmpassword}
                                onChangeText={setConfirmPassword}

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

                            onPress={() => {
                                register(first_name,
                                    last_name,
                                    email,
                                    phone,
                                    password);
                                //navigation.navigate('Loginn');
                            }}
                        // disabled={!email || !password}
                        >
                            <Text style={{
                                color: '#fff',
                                fontWeight: '700',
                                fontSize: 18
                            }}>Register</Text>

                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                padding: 10,
                                width: '40%',
                                height: 50,
                                justifyContent: 'center',
                                marginLeft: 110
                            }}
                            onPress={() =>
                                // navigation.navigate('Loginn')
                                navigation.goBack()
                            }

                        // onPress={handleLogin}
                        // disabled={!email || !password}
                        >
                            <Text style={{
                                color: '#c27b7f',
                                fontWeight: '700',
                                fontSize: 18,
                            }}>Login</Text>

                        </TouchableOpacity>


                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Registration;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    floatView: {
        height: 700,
        backgroundColor: '#fff3cd',
        justifyContent: 'center',
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        margin: 30
    }

});