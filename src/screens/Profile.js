import { View, Text, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import Header from '../common/Header';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';

const Profile = ({ navigation }) => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const { isLoading } = useContext(AuthContext);

    return (
        <View style={{ flex: 1, }}>
            <Header
                rightIcon={require('../images/Logoelibrary.png')}
                leftIcon={require('../images/menu.png')}
                onClickLeftIcon={() => {
                    navigation.openDrawer();
                }}
            />
            <ScrollView>

                <Text style={{
                    fontFamily: 'Philosopher-Bold',
                    fontSize: 27,
                    fontWeight: '600',
                    color: '#000',
                    textAlign: 'center',
                    marginTop: 20
                }}>Profile</Text>

                {/* line starts ============== */}
                <View style={{
                    marginTop: 10,
                    width: 150,
                    height: 2,
                    backgroundColor: '#c27b7f',
                    alignItems: 'center',
                    marginLeft: 130,
                }}></View>
                {/* line ends ============== */}



                <Spinner visible={isLoading} />
                <View style={styles.floatView}>

                    {/* <View style={{ marginTop: 20 }}> */}
                    <View
                        style={{
                            gap: 5,
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: "row",
                            marginTop: 15,
                            marginLeft: 15,
                            marginRight: 15,
                        }}>
                        <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>First Name</Text>
                        <Text style={{ color: 'red', fontSize: 20 }}>*</Text>
                    </View>
                    <View
                        style={{
                            backgroundColor: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 15,
                            marginLeft: 15,
                            marginRight: 15,
                            marginBottom: 15,
                        }}>
                        <TextInput
                            autoCompleteType="first_name"
                            keyboardType="name-phone-pad"
                            value={first_name}
                            onChangeText={setFirstName}
                        />
                    </View>
                    <View
                        style={{
                            gap: 5,
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: "row",
                            marginLeft: 15,
                            marginRight: 15,
                        }}>
                        <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Last Name</Text>
                        <Text style={{ color: 'red', fontSize: 20 }}>*</Text>
                    </View>
                    <View
                        style={{
                            backgroundColor: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 15,
                            marginLeft: 15,
                            marginRight: 15,
                        }}>
                        <TextInput
                            autoCompleteType="last_name"
                            keyboardType="name-phone-pad"
                            value={last_name}
                            onChangeText={setLastName}

                        />
                    </View>

                    <View
                        style={{
                            gap: 5,
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: "row",
                            marginTop: 15,
                            marginLeft: 15,
                            marginRight: 15,
                        }}>
                        <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Email</Text>
                        <Text style={{ color: 'red', fontSize: 20 }}>*</Text>
                    </View>
                    <View
                        style={{
                            backgroundColor: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 15,
                            marginLeft: 15,
                            marginRight: 15,
                        }}>
                        <TextInput
                            autoCompleteType="last_name"
                            keyboardType="name-phone-pad"
                            value={last_name}
                            onChangeText={setLastName}

                        />
                    </View>

                    <View
                        style={{
                            gap: 5,
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: "row",
                            marginTop: 15,
                            marginLeft: 15,
                            marginRight: 15,
                        }}>
                        <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Phone No.</Text>
                        <Text style={{ color: 'red', fontSize: 20 }}>*</Text>
                    </View>
                    <View
                        style={{
                            backgroundColor: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 15,
                            marginLeft: 15,
                            marginRight: 15,
                        }}>
                        <TextInput
                            autoCompleteType="last_name"
                            keyboardType="name-phone-pad"
                            value={last_name}
                            onChangeText={setLastName}
                        />
                    </View>

                    <View
                        style={{

                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: "row",
                            marginTop: 15,
                            marginLeft: 15,
                            marginRight: 15,
                        }}>
                        <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Member Profile</Text>
                    </View>

                    <TouchableOpacity>
                        <View
                            style={{
                                marginTop: 15,
                                marginLeft: 15,
                                marginRight: 15,
                            }}>
                            <Image source={require('../images/user.png')}
                                style={{ width: 100, height: 100, }} />
                        </View>
                    </TouchableOpacity>

                    <View style={{
                                marginTop: 5,
                                marginLeft: 15,
                                flexDirection:'row',
                                gap:10
                            }}>
                    <TouchableOpacity
                        style={{
                            width: '40%',
                            height: 70,
                            justifyContent: 'center',
                        }}
                        onPress={() =>
                            navigation.goBack()
                        }
                    >
                        <Text style={{
                            padding: 5,
                            color: '#fff',
                            backgroundColor: '#c27b7f',
                            fontWeight: '700',
                            fontSize: 18,
                            textAlign: 'center',
                            borderRadius:5,
                        }}>Change Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            width: '40%',
                            height: 70,
                            justifyContent: 'center',
                        }}
                        onPress={() =>
                            navigation.goBack()
                        }
                    >
                        <Text style={{
                            padding: 5,
                            color: '#fff',
                            backgroundColor: '#c27b7f',
                            fontWeight: '700',
                            fontSize: 18,
                            textAlign: 'center',
                            borderRadius:5,
                        }}>Remove Profile</Text>
                    </TouchableOpacity>
                    </View>


                    <View
                        style={{
                            gap: 5,
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: "row",
                            marginTop: 15,
                            marginLeft: 15,
                            marginRight: 15,
                        }}>
                        <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Address1</Text>
                    </View>
                    <View
                        style={{
                            backgroundColor: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 15,
                            marginLeft: 15,
                            marginRight: 15,
                        }}>
                        <TextInput
                            autoCompleteType="last_name"
                            keyboardType="name-phone-pad"
                            value={last_name}
                            onChangeText={setLastName}
                        />
                    </View>

                    <View
                        style={{
                            gap: 5,
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: "row",
                            marginTop: 15,
                            marginLeft: 15,
                            marginRight: 15,
                        }}>
                        <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Address2</Text>
                    </View>
                    <View
                        style={{
                            backgroundColor: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 15,
                            marginLeft: 15,
                            marginRight: 15,
                            marginBottom: 15
                        }}>
                        <TextInput
                            autoCompleteType="last_name"
                            keyboardType="name-phone-pad"
                            value={last_name}
                            onChangeText={setLastName}
                        />
                    </View>

                    <View
                        style={{
                            gap: 5,
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: "row",
                            marginTop: 15,
                            marginLeft: 15,
                            marginRight: 15,
                        }}>
                        <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>State</Text>
                    </View>
                    <View
                        style={{
                            backgroundColor: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 15,
                            marginLeft: 15,
                            marginRight: 15,
                            marginBottom: 15
                        }}>
                        <TextInput
                            autoCompleteType="last_name"
                            keyboardType="name-phone-pad"
                            value={last_name}
                            onChangeText={setLastName}
                        />
                    </View>

                    <View
                        style={{
                            gap: 5,
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: "row",
                            marginTop: 15,
                            marginLeft: 15,
                            marginRight: 15,
                        }}>
                        <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>City</Text>
                    </View>
                    <View
                        style={{
                            backgroundColor: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 15,
                            marginLeft: 15,
                            marginRight: 15,
                            marginBottom: 15
                        }}>
                        <TextInput
                            autoCompleteType="last_name"
                            keyboardType="name-phone-pad"
                            value={last_name}
                            onChangeText={setLastName}
                        />
                    </View>

                    <View
                        style={{
                            gap: 5,
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: "row",
                            marginTop: 15,
                            marginLeft: 15,
                            marginRight: 15,
                        }}>
                        <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Zip Code</Text>
                    </View>
                    <View
                        style={{
                            backgroundColor: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 15,
                            marginLeft: 15,
                            marginRight: 15,
                            marginBottom: 15
                        }}>
                        <TextInput
                            autoCompleteType="last_name"
                            keyboardType="name-phone-pad"
                            value={last_name}
                            onChangeText={setLastName}
                        />
                    </View><View style={{
                                marginTop: 5,
                                marginLeft: 15,
                                flexDirection:'row',
                                gap:10
                            }}>
                    <TouchableOpacity
                        style={{
                            width: '40%',
                            height: 70,
                            justifyContent: 'center',
                        }}
                        onPress={() =>
                            navigation.goBack()
                        }
                    >
                        <Text style={{
                            padding: 5,
                            color: '#fff',
                            backgroundColor: '#c27b7f',
                            fontWeight: '700',
                            fontSize: 18,
                            textAlign: 'center',
                            borderRadius:5,
                        }}>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            width: '40%',
                            height: 70,
                            justifyContent: 'center',
                        }}
                        onPress={() =>
                            navigation.goBack()
                        }
                    >
                        <Text style={{
                            padding: 5,
                            color: '#fff',
                            backgroundColor: '#c27b7f',
                            fontWeight: '700',
                            fontSize: 18,
                            textAlign: 'center',
                            borderRadius:5,
                        }}>Cancel</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Profile;
const styles = StyleSheet.create({

    floatView: {
        backgroundColor: '#fff3cd',
        justifyContent: 'center',
        flexDirection: 'column',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 30,
        marginBottom: 30
    }

});