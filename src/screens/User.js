import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useContext } from 'react'
import Header from '../common/Header';
import { AuthContext } from '../context/AuthContext';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const User = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  const { userInfo } = useContext(AuthContext);
  const { userToken } = useContext(AuthContext);

  const { register } = useContext(AuthContext);
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
          marginTop: 5,
          position: 'fixed'
        }}>
          <View >
            <Image
              source={require('../images/profile.png')}
              style={{
                width: 160,
                height: '80%'
              }}
              resizeMode='contain'
            />

          </View>
          <View style={{ flexDirection: 'column', }}>

            {userToken != null ?
              <View>
                <Text style={{ fontWeight: 'bold', color: '#000' }}> {userInfo.data.user.first_name} {userInfo.data.user.last_name}</Text>
                <Text> {userInfo.data.user.email}</Text>
                <Text> {userInfo.data.user.phone}</Text>

              </View>
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
                }}>Sign Up/Login</Text>

              </TouchableOpacity> : null}

          </View>

        </View>
      </View>


      <View style={{ flexDirection: 'column' }}>
        {userToken != null ? (<View>
          <View style={{ marginTop: 2, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', }}>
            <Text style={{ fontWeight: '400', fontSize: 18, color: '#000', paddingLeft: 10, paddingTop: 10, paddingBottom: 10 }}>Profile </Text>
            <AntDesign name="right" color={'#000'} size={20} style={{ marginLeft: 258 }} />
          </View>

          <TouchableOpacity onPress={(item) => {
            navigation.navigate('MyeBook',{data:item})
          }}>
          <View style={{ marginTop: 2, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', }}>
            <Text style={{ fontWeight: '400', fontSize: 18, color: '#000', paddingLeft: 10, paddingTop: 10, paddingBottom: 10 }}>My E-Book </Text>
            <AntDesign name="right" color={'#000'} size={20} style={{ marginLeft: 225 }} />
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={(item) => {
            navigation.navigate('Bookhistory',{data:item})
          }}>
            <View style={{ marginTop: 2, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', }}>
              <Text style={{ fontWeight: '400', fontSize: 18, color: '#000', paddingLeft: 10, paddingTop: 10, paddingBottom: 10 }}>Book History</Text>
              <AntDesign name="right" color={'#000'} size={20} style={{ marginLeft: 211 }} />
            </View>
          </TouchableOpacity>
          <View style={{ marginTop: 2, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', }}>
            <Text style={{ fontWeight: '400', fontSize: 18, color: '#000', paddingLeft: 10, paddingTop: 10, paddingBottom: 10 }}>Membership Plans</Text>
            <AntDesign name="right" color={'#000'} size={20} style={{ marginLeft: 164 }} />
          </View>
          <View style={{ marginTop: 2, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', }}>
            <Text style={{ fontWeight: '400', fontSize: 18, color: '#000', paddingLeft: 10, paddingTop: 10, paddingBottom: 10 }}>Transactions</Text>
            <AntDesign name="right" color={'#000'} size={20} style={{ marginLeft: 210 }} />
          </View>
          <View style={{ bottom: 0, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>

            <TouchableOpacity
              style={{
                backgroundColor: '#c27b7f',
                alignItems: 'center',
                padding: 10,
                borderRadius: 5,
                width: '50%',
                height: 50,
                justifyContent: 'center',

              }}


              onPress={() => { logout() }}

            // disabled={!email || !password}
            >
              <Text style={{
                color: '#fff',
                fontWeight: '700',
                fontSize: 18
              }}>Logout</Text>

            </TouchableOpacity>
          </View>
        </View>) : null}

      </View>

      {/* <View style={{width: Dimensions.get('window'),height: 1,backgroundColor: '#000'}}></View>  */}





    </View>

  );
};

export default User;
