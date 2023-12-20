import { StyleSheet } from "react-native";

const logNRegStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    allbutton: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        width: '40%',
        height: 60,
        justifyContent: 'center',
        marginLeft: 100
    },
    allButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 18
    },
    forgotNRegister: {
        color: '#c27b7f',
        margin: 15,
        fontFamily: 'Poppin',
        fontWeight: '700',
        fontSize: 15
    },
    floatView: {
        backgroundColor: '#f5ebe6',
        justifyContent: 'center',
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        margin: 30
    },
    loginText:
        {
            marginLeft:-20,
            textAlign:'center',
            color: '#c27b7f',
            fontWeight: '700',
            fontSize: 18,
        },
        cancel:{
            alignItems: 'center',
                    padding: 10,
                    width: '40%',
                    height: 60,
                    justifyContent: 'center',
                    marginLeft: 110
        },
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
        
          },
          modalView: {
            margin: 10,
            backgroundColor: '#fff',
            borderRadius: 20,
            padding: 15,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              height: 3,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          },
    
})

export default logNRegStyle;