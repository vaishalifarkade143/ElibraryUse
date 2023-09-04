import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import Header from '../common/Header';
import { AuthContext } from '../context/AuthContext';



const User = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  const { userInfo } = useContext(AuthContext);
  const { userToken } = useContext(AuthContext);
  return (
    <View style={{ flex: 1, }}>
      <Header
        rightIcon={require('../images/Logoelibrary.png')}
        leftIcon={require('../images/menu.png')}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
      />
      <View style={{
        margin: 5,
        height: 200,
        backgroundColor: "#fff3cd",
        flexDirection: 'column',
        paddingRight: 10,
        justifyContent: 'center'
      }}>

        <View style={{
          flexDirection: 'row',
          marginTop: 20,
          position: 'fixed'
        }}>
          <View >
            <Image
              source={require('../images/hero-brownElib.png')}
              style={{
                width: 180,
                height: '90%'
              }}
              resizeMode='contain'
            />

          </View>
          <View style={{ flexDirection: 'column', }}>

            {/* <Text> Hello{userInfo.data.user.first_name} {userInfo.data.user.last_name}</Text>
          <Text> {userInfo.data.user.email}</Text>
          <Text> {userInfo.data.user.phone}</Text>  */}

            {userToken != null ?
              <View>
                <Text> {userInfo.data.user.first_name} {userInfo.data.user.last_name}</Text>
                <Text> {userInfo.data.user.email}</Text>
                <Text> {userInfo.data.user.phone}</Text></View>
              : null}

{userToken === null ?
            <TouchableOpacity
              style={{
                backgroundColor: '#c27b7f',
                alignItems: 'center',
                padding: 10,
                borderRadius: 5,
                width: '100%',
                height: 50,
                justifyContent: 'center',
                marginTop: 50
              }}

              // {/* on login button click */}
              onPress={() => {
                navigation.navigate('Loginnn');
              }}
            // disabled={!email || !password}
            >
              <Text style={{
                color: '#fff',
                fontWeight: '700',
                fontSize: 18
              }}>Login/Join</Text>

            </TouchableOpacity>:null}

          </View>

        </View>
      </View>


      <View style={{ bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
      {userToken != null ?
        <TouchableOpacity
          style={{
            backgroundColor: '#c27b7f',
            alignItems: 'center',
            padding: 10,
            borderRadius: 5,
            width: '50%',
            height: 50,
            justifyContent: 'center',
            //bottom:0
          }}

          // {/* on login button click */}
          //   onPress={()=> {
          //     navigation.navigate('Home2');
          // }}

          onPress={() => { logout() }}
        // disabled={!email || !password}
        >
          <Text style={{
            color: '#fff',
            fontWeight: '700',
            fontSize: 18
          }}>Logout</Text>

        </TouchableOpacity>:null}
      </View>

    </View>

  );
};

export default User;