import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../common/Header';
import { useNavigation } from '@react-navigation/native';

const GoBackLogin = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header
                rightIcon={require('../images/Logoelibrary.png')}
                leftIcon={require('../images/back.png')}
                onClickLeftIcon={() => {
                    navigation.goBack();
                }}
            />
            <View style={styles.floatView}>
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
    )
}

export default GoBackLogin;

const styles = StyleSheet.create({
    floatView: {
        height: 200,
        backgroundColor: '#f5ebe6',
        justifyContent: 'center',
        alignItems: 'center',

        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30
    }

});