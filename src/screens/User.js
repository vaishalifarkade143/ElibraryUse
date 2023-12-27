// import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, ImageBackground } from 'react-native'
// import React, { useContext, useState } from 'react'
// import Header from '../common/Header';
// import { AuthContext } from '../context/AuthContext';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// const User = ({ navigation }) => {
//   const { logout } = useContext(AuthContext);
//   const { userInfo, userToken } = useContext(AuthContext);
//   const [image, setImage] = useState('');
//   const { register } = useContext(AuthContext);

//   const userFirstName = userInfo && userInfo.data ? userInfo.data.user.first_name : '';
//   const userLastName = userInfo && userInfo.data ? userInfo.data.user.last_name : '';
//   const userImage = userInfo && userInfo.data ? userInfo.data.user.image_path : '';

//   console.log("user Info:", userInfo);

//   return (
//     <View style={{ flex: 1, }}>
//       <Header
//         rightIcon={require('../images/Logoelibrary.png')}
//         leftIcon={require('../images/menu.png')}
//         onClickLeftIcon={() => {
//           navigation.openDrawer();
//         }}
//       />
//       <View style={{
//         margin: 5,
//         height: 200,
//         backgroundColor: "#fff3cd",
//         flexDirection: 'column',
//         paddingRight: 10,
//         justifyContent: 'center'
//       }}>

//         <View style={{
//           flexDirection: 'row',
//           position: 'fixed'
//         }}>




// {userToken !==null?
//           (<View
//             style={{
//               height: 150,
//               width: 150,
//               backgroundColor: '#cbb7b8',
//               borderRadius: 75,
//               justifyContent: 'center',
//               alignItems: 'center',
//               marginLeft: 10,
//               marginTop: 10,
//             }}>
//             {userImage !== null ?
//               (<ImageBackground
//                 source={{
//                   uri: userInfo.data.user.image_path,
//                 }}
//                 style={{
//                   height: 150,
//                   width: 150,

//                 }}
//                 imageStyle={{borderRadius:75}} />)
//               :
//               (<Text style={{
//                 fontSize: 18,
//                 borderRadius: 80,
//                 padding: 35,
//                 backgroundColor: '#7d68f0'
//               }}>
//                 {userFirstName.charAt(0).toUpperCase() + " " + userLastName.charAt(0).toUpperCase()}
//                </Text>)
//             }
//           </View>):(<ImageBackground
//                source={require('../images/profile.png')}
//                 style={{
//                   height: 150,
//                   width: 150,

//                 }}
//                 imageStyle={{borderRadius:75}} />)

//           }


//           <View style={{ flexDirection: 'column', marginLeft: 40, marginTop: 10 }}>

//             {userToken != null ?
//               <View>
//                 <Text
//                   style={{
//                     fontWeight: 'bold',
//                     fontSize: 20,
//                     color: '#000',
//                     fontFamily: 'Philosopher-Bold',
//                   }}> {userInfo.data.user.first_name} {userInfo.data.user.last_name}</Text>
//                 <Text
//                   style={{
//                     fontWeight: 'bold',
//                     fontSize: 14,
//                     fontFamily: 'Poppin-Thin',
//                   }}> {userInfo.data.user.email}</Text>
//                 <Text
//                   style={{
//                     fontWeight: 'bold',
//                     fontSize: 15,
//                     fontFamily: 'Poppin-Thin',
//                   }}> {userInfo.data.user.phone}</Text>
//               </View>
//               : null}

//             {userToken === null ?
//               <TouchableOpacity
//                 style={{
//                   backgroundColor: '#c27b7f',
//                   alignItems: 'center',
//                   padding: 10,
//                   borderRadius: 5,
//                   width: '100%',
//                   height: 50,
//                   justifyContent: 'center',
//                   marginTop: 50
//                 }}

//                 // {/* on login button click */}
//                 onPress={() => {
//                   navigation.navigate('Loginnn');
//                 }}

//               >
//                 <Text style={{
//                   color: '#fff',
//                   fontWeight: '700',
//                   fontSize: 18
//                 }}>Sign Up/Login</Text>

//               </TouchableOpacity> : null}

//           </View>

//         </View>
//       </View>

//       <ScrollView>
//         <View style={{ flexDirection: 'column', marginBottom: 40 }}>
//           {userToken != null ?
//             (<View>
//               <TouchableOpacity onPress={() => {
//                 navigation.navigate('profile')
//               }}>
//                 <View style={{ marginTop: 2, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', }}>
//                   <Text style={{
//                     fontWeight: '400', fontSize: 18, color: '#000',
//                     paddingLeft: 10, paddingTop: 10, paddingBottom: 10
//                   }}>Profile </Text>
//                   <AntDesign name="right" color={'#000'} size={20} style={{ marginLeft: 258 }} />
//                 </View>
//               </TouchableOpacity>



//               <TouchableOpacity onPress={(item) => {
//                 navigation.navigate('MyeBook')
//               }}>
//                 <View style={{ marginTop: 2, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', }}>
//                   <Text style={{ fontWeight: '400', fontSize: 18, color: '#000', paddingLeft: 10, paddingTop: 10, paddingBottom: 10 }}>My E-Book </Text>
//                   <AntDesign name="right" color={'#000'} size={20} style={{ marginLeft: 225 }} />
//                 </View>
//               </TouchableOpacity>





//               <TouchableOpacity onPress={() => {
//                 navigation.navigate('Bookhistory')
//               }}>
//                 <View style={{ marginTop: 2, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', }}>
//                   <Text style={{ fontWeight: '400', fontSize: 18, color: '#000', paddingLeft: 10, paddingTop: 10, paddingBottom: 10 }}>Book History</Text>
//                   <AntDesign name="right" color={'#000'} size={20} style={{ marginLeft: 211 }} />
//                 </View>
//               </TouchableOpacity>



//               <TouchableOpacity onPress={(item) => {
//                 navigation.navigate('MembershipPlan')
//               }}>
//                 <View style={{ marginTop: 2, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', }}>
//                   <Text style={{ fontWeight: '400', fontSize: 18, color: '#000', paddingLeft: 10, paddingTop: 10, paddingBottom: 10 }}>Membership Plans</Text>
//                   <AntDesign name="right" color={'#000'} size={20} style={{ marginLeft: 164 }} />
//                 </View>
//               </TouchableOpacity>


//               <TouchableOpacity onPress={(item) => {
//                 navigation.navigate('transaction')
//               }}>
//                 <View style={{ marginTop: 2, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', }}>
//                   <Text style={{
//                     fontWeight: '400', fontSize: 18, color: '#000',
//                     paddingLeft: 10, paddingTop: 10, paddingBottom: 10
//                   }}>Transactions</Text>
//                   <AntDesign name="right" color={'#000'} size={20} style={{ marginLeft: 210 }} />
//                 </View>
//               </TouchableOpacity>



//               <TouchableOpacity onPress={(item) => {
//                 navigation.navigate('MembershipScreen')
//               }}>
//                 <View style={{ marginTop: 2, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', }}>
//                   <Text style={{
//                     fontWeight: '400', fontSize: 18, color: '#000',
//                     paddingLeft: 10, paddingTop: 10, paddingBottom: 10
//                   }}>MembershipScreen</Text>
//                   <AntDesign name="right" color={'#000'} size={20} style={{ marginLeft: 160 }} />
//                 </View>
//               </TouchableOpacity>




//               <View style={{ bottom: 0, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>

//                 <TouchableOpacity
//                   style={{
//                     backgroundColor: '#c27b7f',
//                     alignItems: 'center',
//                     padding: 10,
//                     borderRadius: 5,
//                     width: '50%',
//                     height: 50,
//                     justifyContent: 'center',

//                   }}
//                   onPress={() => { logout() }}

//                 >
//                   <Text style={{
//                     color: '#fff',
//                     fontWeight: '700',
//                     fontSize: 18
//                   }}>Logout</Text>

//                 </TouchableOpacity>
//               </View>
//             </View>) : null}

//         </View>
//       </ScrollView>
//     </View>

//   );
// };

// export default User;








import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, ImageBackground } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import Header from '../common/Header';
import { AuthContext } from '../context/AuthContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import getStyles from '../Style/logNRegStyle';
import Theme from './Theme';


const User = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  const { userInfo, userToken } = useContext(AuthContext);
  const [image, setImage] = useState('');

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profile, setProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  // const [refresh, setRefresh] = useState(false);

  useEffect(() => {

    const fetchProfileData = () => {
      const singleUrl = 'https://dindayalupadhyay.smartcitylibrary.com/api/v1/member-details';

      fetch(singleUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((res) => {
          setProfile(res.data);
          setFirstName(res.data.first_name);
          setLastName(res.data.last_name);
          setEmail(res.data.email);
          setPhone(res.data.phone);
          setImage(res.data.image_path);
          setIsLoading(false);
          saveDeviceToken();
        })
        .catch((error) => {
          // console.error('Error fetching data:', error);
          setIsLoading(false);
        });
    };

    fetchProfileData();
    // saveDeviceToken();
  }, [userToken]);


  const saveDeviceToken = async () => {
    try {
      const deviceToken = await messaging().getToken();
      //   console.log('Saving device token:', deviceToken);
      //  console.log("user Token in fire :",userToken)
      const response = await axios.post(
        'https://dindayalupadhyay.smartcitylibrary.com/api/m1/fcm-token',
        { token: deviceToken },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
          },
        }
      );
      // console.log('Full response:', response);
      if (response) {
        console.log('Device token saved successfully.', response.data);
      } else {
        console.error('Error saving device token:', response.status, response.data);
      }
    } catch (error) {
      console.error('Error saving device token:', error.response?.data || error.message || error);
    }
  };



  // console.log("userToken:", userToken);

  return (
    <Theme>
      {({ theme }) => {
        const styles = getStyles(theme);
        return (
          <View style={styles.container}>
            <Header
              rightIcon={require('../images/Logoelibrary.png')}
              leftIcon={require('../images/menu.png')}
              onClickLeftIcon={() => {
                navigation.openDrawer();
              }}
            />
            <View style={styles.bannar}>

              <View style={styles.mainImgNText}>


                {userToken !== null ?
                  (<View
                    style={{
                      height: 140,
                      width: 140,
                      backgroundColor: '#cbb7b8',
                      borderRadius: 75,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 10,
                      marginTop: -20,
                    }}>
                    {image !== null ?
                      (<ImageBackground
                        source={{
                          uri: image,
                        }}
                        style={{
                          height: 150,
                          width: 150,

                        }}
                        imageStyle={{ borderRadius: 75 }} />)
                      :
                      (<Text style={{
                        fontSize: 18,
                        borderRadius: 80,
                        padding: 35,
                        backgroundColor: '#7d68f0'
                      }}>
                        {first_name.charAt(0).toUpperCase() + "" + last_name.charAt(0).toUpperCase()}
                      </Text>)
                    }
                  </View>)
                  : (<ImageBackground
                    source={require('../images/profile.png')}
                    style={{
                      height: 150,
                      width: 150,

                    }}
                    imageStyle={{ borderRadius: 75 }} />)
                }


                <View style={{ flexDirection: 'column', marginLeft: 40, marginTop: 10 }}>

                  {userToken != null ?
                    <View>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 20,
                          color: '#000',
                          fontFamily: 'Philosopher-Bold',
                        }}>
                        {first_name} {last_name}
                      </Text>
                      <Text
                        style={[styles.userpageText,{fontSize: 14,}]}>
                        {email}
                      </Text>
                      <Text
                        style={[styles.userpageText,{fontSize: 15,}]}>
                        {phone}
                      </Text>
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
                        height: 60,
                        justifyContent: 'center',
                        marginTop: 50
                      }}

                      // {/* on login button click */}
                      onPress={() => {
                        navigation.navigate('Loginnn');
                      }}

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

            <ScrollView>
              <View style={{ flexDirection: 'column', marginBottom: 40 }}>
                {userToken != null ?
                  (<View>
                    <TouchableOpacity onPress={() => {
                      navigation.navigate('profile')
                    }}>
                      <View style={styles.userView}>
                        <Text style={styles.userText}>Profile </Text>
                        <AntDesign name="right" color={theme === 'LIGHT' ? '#000' : '#fff'} size={20} style={{ marginLeft: 258 }} />
                      </View>
                    </TouchableOpacity>



                    <TouchableOpacity onPress={(item) => {
                      navigation.navigate('MyeBook')
                    }}>
                      <View style={styles.userView}>
                        <Text style={styles.userText}>My E-Book </Text>
                        <AntDesign name="right" color={theme === 'LIGHT' ? '#000' : '#fff'} size={20} style={{ marginLeft: 225 }} />
                      </View>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => {
                      navigation.navigate('Bookhistory')
                    }}>
                      <View style={styles.userView}>
                        <Text style={styles.userText}>Book History</Text>
                        <AntDesign name="right" color={theme === 'LIGHT' ? '#000' : '#fff'} size={20} style={{ marginLeft: 211 }} />
                      </View>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={(item) => {
                      navigation.navigate('MembershipPlan')
                    }}>
                      <View style={styles.userView}>
                        <Text style={styles.userText}>Membership Plans</Text>
                        <AntDesign name="right" color={theme === 'LIGHT' ? '#000' : '#fff'} size={20} style={{ marginLeft: 164 }} />
                      </View>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={(item) => {
                      navigation.navigate('transaction')
                    }}>
                      <View style={styles.userView}>
                        <Text style={styles.userText}>Transactions</Text>
                        <AntDesign name="right" color={theme === 'LIGHT' ? '#000' : '#fff'} size={20} style={{ marginLeft: 210 }} />
                      </View>
                    </TouchableOpacity>



                    <TouchableOpacity onPress={(item) => {
                      navigation.navigate('MembershipScreen')
                    }}>
                      <View style={styles.userView}>
                        <Text style={styles.userText}>MembershipScreen</Text>
                        <AntDesign name="right" color={theme === 'LIGHT' ? '#000' : '#fff'} size={20} style={{ marginLeft: 160 }} />
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={(item) => {
                      navigation.navigate('resources')
                    }}>
                      <View style={styles.userView}>
                        <Text style={styles.userText}>Resources</Text>
                        <AntDesign name="right" color={theme === 'LIGHT' ? '#000' : '#fff'} size={20} style={{ marginLeft: 230 }} />
                      </View>
                    </TouchableOpacity>




                    <View style={{ bottom: 0, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>

                      <TouchableOpacity
                        style={[styles.allbutton, { backgroundColor: '#c27b7f', marginLeft: -10 }]

                        }
                        onPress={() => { logout() }}

                      >
                        <Text style={styles.allButtonText}>Logout</Text>

                      </TouchableOpacity>
                    </View>
                  </View>) : null}

              </View>
            </ScrollView>
          </View>
        );
      }}
    </Theme>
  );
};

export default User;
