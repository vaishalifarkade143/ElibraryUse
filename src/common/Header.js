import { View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'


const Header = ({ leftIcon, rightIcon, onClickLeftIcon }) => {
    return (
        <View style={styles.header}>

            <TouchableOpacity style={styles.btn}
                onPress={() => {
                    onClickLeftIcon();
                }}>
                <Image source={leftIcon} style={styles.icon} />
            </TouchableOpacity>
            <Image source={rightIcon} style={styles.logoicon} />
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    header: {
        height: 70,
        backgroundColor: '#f5ebe6',
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
    logoicon: {
        width: 170,
        height: 55,
    },
    icon: {
        width: 40,
        height: 40,
    },

});