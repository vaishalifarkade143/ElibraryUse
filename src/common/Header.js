import { View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'


const Header = ({ leftIcon, rightIcon, middleIcon, onClickLeftIcon, onClickRightIcon }) => {
    return (
        <View style={styles.header}>

            <TouchableOpacity style={styles.btn}
                onPress={() => {
                    onClickLeftIcon();

                }}>
                <Image source={leftIcon} style={styles.icon} />
            </TouchableOpacity>
            <Image source={middleIcon} style={styles.midicon} />

            <TouchableOpacity style={styles.btn}
                onPress={() => {

                    onClickRightIcon();
                }}>
                <Image source={rightIcon} style={styles.logoicon} />
            </TouchableOpacity>

        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: '#fff',//,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
    },
    btn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    midicon: {
        width: 150,
        height: 45,
    },
    logoicon: {
        width: 20,
        height: 20,
    },
    icon: {
        width: 40,
        height: 40,
    },

});