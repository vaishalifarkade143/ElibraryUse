
// import { View, Text, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
// import React, { useContext, useState, useEffect } from 'react'
// import Header from '../common/Header';
// import { AuthContext } from '../context/AuthContext';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import messaging from '@react-native-firebase/messaging';
// import axios from 'axios';
// import getStyles from '../Style/logNRegStyle';
// import Theme from './Theme';


// const User = ({ navigation }) => {
//   const { logout } = useContext(AuthContext);
//   const { userInfo, userToken } = useContext(AuthContext);
//   const [image, setImage] = useState(null);

//   const [first_name, setFirstName] = useState('');
//   const [last_name, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [profile, setProfile] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);


//   const fetchProfileData = () => {
//     const singleUrl = 'https://dindayalupadhyay.smartcitylibrary.com/api/v1/member-details';
//     fetch(singleUrl, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${userToken}`,
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((res) => {
//         setProfile(res.data);
//         setFirstName(res.data.first_name);
//         setLastName(res.data.last_name);
//         setEmail(res.data.email);
//         setPhone(res.data.phone);
//         setImage(res.data.image_path);
//         setIsLoading(false);
//         saveDeviceToken();
//       })
//       .catch((error) => {
//         console.error('Error fetching data in user:', error);
//       });
//   };


//   const saveDeviceToken = async () => {
//     try {
//       const deviceToken = await messaging().getToken();
//       const response = await axios.post(
//         'https://dindayalupadhyay.smartcitylibrary.com/api/m1/fcm-token',
//         { token: deviceToken },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${userToken}`,
//           },
//         }
//       );
//       if (response) {
//         console.log('Device token saved successfully.', response.data);
//       } else {
//         console.error('Error saving device token:', response.status, response.data);
//       }
//     } catch (error) {
//       console.error('Error saving device token:', error.response?.data || error.message || error);
//     }
//   };


//   useEffect(() => {
//     if (userToken !== null) {
//       if (userInfo.data.user.membership_plan_name !== null) {
//         const unsubscribe = navigation.addListener('focus', () => {
//           fetchProfileData();
//         });
//         return unsubscribe;
//       }
//       else {

//         const unsubscribe = navigation.addListener('focus', () => {
//           before_plan();
//         });

//         return unsubscribe;
//       }

//     }
//   }, [navigation, userToken]);

//   const before_plan = () => {

//     if (userToken !== null) {
//       setFirstName(userInfo.data.user.first_name);
//       setLastName(userInfo.data.user.last_name);
//       setPhone(userInfo.data.user.phone);
//       setEmail(userInfo.data.user.email);

//       setImage(userInfo.data.user.image_path);
//     }
//   }

//   // console.log("userToken:", userToken);

//   console.log("usrInfo", userInfo, first_name, last_name, email, phone, image);


//   return (
//     <Theme>
//       {({ theme }) => {
//         const styles = getStyles(theme);
//         return (
//           <View style={styles.container}>
//             <Header
//               rightIcon={require('../images/Logoelibrary.png')}
//               leftIcon={require('../images/menu.png')}
//               onClickLeftIcon={() => {
//                 navigation.openDrawer();
//               }}
//             />

//             <View style={styles.bannar}>

//               <View style={styles.mainImgNText}>



//                 {userToken !== null 
//                 && userInfo.data.user.membership_plan_name !== null
//                  ?
//                   (<View
//                     style={{
//                       height: 140,
//                       width: 140,
//                       backgroundColor: '#cbb7b8',
//                       borderRadius: 75,
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                       marginLeft: 10,
//                       marginTop: -20,
//                     }}>
//                     {image !== null ?
//                       (<ImageBackground
//                         source={{
//                           uri: image,
//                         }}
//                         style={{
//                           height: 150,
//                           width: 150,

//                         }}
//                         imageStyle={{ borderRadius: 75 }} />)
//                       :
//                       (<Text style={{
//                         fontSize: 18,
//                         borderRadius: 80,
//                         padding: 35,
//                         backgroundColor: '#7d68f0'
//                       }}>
//                         {first_name.charAt(0).toUpperCase() + "" + last_name.charAt(0).toUpperCase()}
//                       </Text>)
//                     }
//                   </View>)
//                   : (<ImageBackground
//                     source={require('../images/profile.png')}
//                     style={{
//                       height: 150,
//                       width: 150,

//                     }}
//                     imageStyle={{ borderRadius: 75 }} />)
//                 }

























//                 <View style={{
//                   flexDirection: 'column',
//                   marginLeft: 40,
//                   marginTop: 10
//                 }}>

//                   {userToken !== null ?
//                     <View>
//                       <Text
//                         style={{
//                           // fontWeight: 'bold',
//                           fontSize: 20,
//                           color: '#000',
//                           fontFamily: 'Philosopher-Bold',
//                         }}>
//                         {first_name} {last_name}
//                       </Text>
//                       <Text
//                         style={[styles.userpageText, { fontSize: 14, }]}>
//                         {email}
//                       </Text>
//                       <Text
//                         style={[styles.userpageText, { fontSize: 15, }]}>
//                         {phone}
//                       </Text>
//                     </View>
//                     : null}




//                   {userToken === null ?
//                     <TouchableOpacity
//                       style={{
//                         backgroundColor: '#c27b7f',
//                         alignItems: 'center',
//                         padding: 10,
//                         borderRadius: 5,
//                         width: '100%',
//                         height: 60,
//                         justifyContent: 'center',
//                         marginTop: 50
//                       }}
//                       onPress={() => {
//                         navigation.navigate('Loginnn');
//                       }}

//                     >
//                       <Text style={{
//                         color: '#fff',
//                         fontWeight: '700',
//                         fontSize: 18
//                       }}>Sign Up/Login</Text>

//                     </TouchableOpacity> : null}

//                 </View>

//               </View>
//             </View>



//             <ScrollView>
//               <View style={{ flexDirection: 'column', marginBottom: 40 }}>
//                 {userToken != null ?
//                   (<View>
//                     <TouchableOpacity onPress={() => {
//                       navigation.navigate('profile')
//                     }}>
//                       <View style={
//                         styles.userView}>
//                         <Text style={styles.userText}>Profile </Text>
//                         <AntDesign name="right" color={theme === 'LIGHT' ? '#000' : '#fff'} size={20}
//                           style={{ marginLeft: 246 }} />
//                       </View>
//                     </TouchableOpacity>



//                     <TouchableOpacity onPress={(item) => {
//                       navigation.navigate('MyeBook')
//                     }}>
//                       <View style={styles.userView}>
//                         <Text style={styles.userText}>My E-Book </Text>
//                         <AntDesign name="right" color={theme === 'LIGHT' ? '#000' : '#fff'} size={20}
//                           style={{ marginLeft: 215 }} />
//                       </View>
//                     </TouchableOpacity>


//                     <TouchableOpacity onPress={() => {
//                       navigation.navigate('Bookhistory')
//                     }}>
//                       <View style={styles.userView}>
//                         <Text style={styles.userText}>Book History</Text>
//                         <AntDesign name="right" color={theme === 'LIGHT' ? '#000' : '#fff'} size={20}
//                           style={{ marginLeft: 200 }} />
//                       </View>
//                     </TouchableOpacity>

//                     {userInfo.data.user.membership_plan_name === null && isLoading === true && (
//                       <TouchableOpacity onPress={(item) => {
//                         navigation.navigate('MembershipPlan')
//                       }}>
//                         <View style={styles.userView}>
//                           <Text style={styles.userText}>Membership Plans</Text>
//                           <AntDesign name="right" color={theme === 'LIGHT' ? '#000' : '#fff'} size={20}
//                             style={{ marginLeft: 160 }} />
//                         </View>
//                       </TouchableOpacity>
//           )} 


//                     <TouchableOpacity onPress={(item) => {
//                       navigation.navigate('transaction')
//                     }}>
//                       <View style={styles.userView}>
//                         <Text style={styles.userText}>Transactions</Text>
//                         <AntDesign name="right" color={theme === 'LIGHT' ? '#000' : '#fff'} size={20}
//                           style={{ marginLeft: 197 }} />
//                       </View>
//                     </TouchableOpacity>

//                     <TouchableOpacity onPress={(item) => {
//                       navigation.navigate('MembershipScreen')
//                     }}>
//                       <View style={styles.userView}>
//                         <Text style={styles.userText}>MembershipScreen</Text>
//                         <AntDesign name="right" color={theme === 'LIGHT' ? '#000' : '#fff'} size={20}
//                           style={{ marginLeft: 150 }} />
//                       </View>
//                     </TouchableOpacity>

//                     <TouchableOpacity onPress={(item) => {
//                       navigation.navigate('resources')
//                     }}>
//                       <View style={styles.userView}>
//                         <Text style={styles.userText}>Resources</Text>
//                         <AntDesign name="right" color={theme === 'LIGHT' ? '#000' : '#fff'} size={20}
//                           style={{ marginLeft: 215 }} />
//                       </View>
//                     </TouchableOpacity>




//                     <View style={{ bottom: 0, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>

//                       <TouchableOpacity
//                         style={[styles.allbutton, { backgroundColor: '#c27b7f', marginLeft: -10 }]

//                         }
//                         onPress={() => { logout() }}

//                       >
//                         <Text style={styles.allButtonText}>Logout</Text>

//                       </TouchableOpacity>
//                     </View>
//                   </View>) : null}

//               </View>
//             </ScrollView>
//           </View>
//         );
//       }}
//     </Theme>
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
  const { userInfo, userToken, login } = useContext(AuthContext);
  const [image, setImage] = useState(null);

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profile, setProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [singleSubscribedPlan, setSingleSubscribedPlan] = useState(null);


  // =================  for single data view ============================
  const fetchSinglePlan = () => {
    const singleUrl = 'https://dindayalupadhyay.smartcitylibrary.com/api/v1/membership-details';

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
        // console.log('Single Subscribed Plan Data:', res.data);
        setSingleSubscribedPlan(res.data);
        // setIsLoading(false); // Data has been loaded
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        // setIsLoading(false); // Handle error and set isLoading to false

      });
  };



  useEffect(() => {
    if (userToken !== null) {
      const unsubscribe = navigation.addListener('focus', () => {
        fetchSinglePlan();
      });
      return unsubscribe;
    }



  }, [navigation, userToken]);
  console.log('userpage', singleSubscribedPlan);




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
        setIsLoading(true);
        saveDeviceToken();


      })
      .catch((error) => {
        console.error('Error fetching data in user:', error);
        // setIsLoading(false);
      });
  };


  const saveDeviceToken = async () => {
    try {
      const deviceToken = await messaging().getToken();
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
      if (response) {
        console.log('Device token saved successfully.', response.data);
      } else {
        console.error('Error saving device token:', response.status, response.data);
      }
    } catch (error) {
      console.error('Error saving device token:', error.response?.data || error.message || error);
    }
  };


  useEffect(() => {
    if (userToken !== null) {
      if (userInfo.data.user.membership_plan_name !== null) {
        const unsubscribe = navigation.addListener('focus', () => {
          fetchProfileData();
        });
        return unsubscribe;
      }


      else {

        const unsubscribe = navigation.addListener('focus', () => {
          before_plan();
        });

        return unsubscribe;
      }

    }
  }, [navigation, userToken]);

  const before_plan = () => {

    if (userToken !== null) {
      setFirstName(userInfo.data.user.first_name);
      setLastName(userInfo.data.user.last_name);
      setPhone(userInfo.data.user.phone);
      setEmail(userInfo.data.user.email);

      setImage(userInfo.data.user.image_path);
    }
  }

  console.log("userToken:", userToken);

  // console.log("usrInfo", userInfo, first_name, last_name, email, phone, image);



  return (
    <Theme>
      {({ theme }) => {
        const styles = getStyles(theme);
        return (





          <View style={styles.container}>
            <Header
             middleIcon={require('../images/Logoelibrary.png')}
              leftIcon={require('../images/menu.png')}
              onClickLeftIcon={() => {
                navigation.openDrawer();
              }}
            />





            <View style={styles.bannar1}>

              
              {userToken !== null && userInfo.data.user.membership_plan_name !== null ?
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
                  {image ?
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




              <View style={{
                marginTop: 15
              }}>

                {userToken !== null ?
                  <View>
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#000',
                        fontFamily: 'Poppins-Regular',
                        textAlign:'center'
                      }}>
                      {first_name} {last_name}
                    </Text>
                    <Text
                      style={[styles.userpageText, { fontSize: 11, }]}>
                      {email}
                    </Text>
                    {/* <Text
                      style={[styles.userpageText, { fontSize: 15, }]}>
                      {phone}
                    </Text> */}
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
                      height: 40,
                      justifyContent: 'center',
                    }}

                    // {/* on login button click */}
                    onPress={() => {
                      navigation.navigate('Loginnn');
                    }}

                  >
                    <Text style={{
                      color: '#fff',
                      fontSize: 15,
                      fontFamily: 'Poppins-Regular',
                    }}>Sign Up/Login</Text>

                  </TouchableOpacity> : null}



              </View>

            </View>

            <ScrollView>
              <View style={{ flexDirection: 'column', marginBottom: 40 }}>
                {userToken != null ?
                  (<View style={{ marginTop: 20 }}>
                    <TouchableOpacity onPress={() => {
                      navigation.navigate('profile', { singleSubscribedPlan })
                    }}>
                      <View style={
                        styles.userView}>
                        <Text style={styles.userText}>Profile </Text>
                        <AntDesign name="right" color={theme === 'LIGHT' ? '#000' : '#fff'} size={16}
                          style={{marginLeft: 245}} />
                      </View>
                    </TouchableOpacity>



                    <TouchableOpacity onPress={(item) => {
                      navigation.navigate('MyeBook', { singleSubscribedPlan })
                    }}>
                      <View style={styles.userView}>
                        <Text style={styles.userText}>My E-Book </Text>
                        <AntDesign name="right" color={theme === 'LIGHT' ? '#000' : '#fff'} size={16}
                          style={{ marginLeft: 210 }}
                        />
                      </View>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => {
                      navigation.navigate('Bookhistory', { singleSubscribedPlan })
                    }}>
                      <View style={styles.userView}>
                        <Text style={styles.userText}>Book History</Text>
                        <AntDesign name="right" color={theme === 'LIGHT' ? '#000' : '#fff'} size={16}
                         style={{ marginLeft: 200 }}
                        />
                      </View>
                    </TouchableOpacity>

                    {singleSubscribedPlan === null && (
                      <TouchableOpacity onPress={(item) => {
                        navigation.navigate('MembershipPlan')
                      }}>
                        <View style={styles.userView}>
                          <Text style={styles.userText}>Membership Plans</Text>
                          <AntDesign name="right" color={theme === 'LIGHT' ? '#000' : '#fff'} size={16}
                           style={{ marginLeft: 150 }} 
                          />
                        </View>
                      </TouchableOpacity>
                    )}


                    <TouchableOpacity onPress={(item) => {
                      navigation.navigate('transaction', { singleSubscribedPlan })
                    }}>
                      <View style={styles.userView}>
                        <Text style={styles.userText}>Transactions</Text>
                        <AntDesign name="right" color={theme === 'LIGHT' ? '#000' : '#fff'} size={16}
                         style={{ marginLeft: 195 }} 
                        />
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={(item) => {
                      navigation.navigate('MembershipScreen')
                    }}>
                      <View style={styles.userView}>
                        <Text style={styles.userText}>MembershipScreen</Text>
                        <AntDesign name="right" color={theme === 'LIGHT' ? '#000' : '#fff'} size={16}
                        style={{ marginLeft: 141 }} 
                        />
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={(item) => {
                      navigation.navigate('resources')
                    }}>
                      <View style={styles.userView}>
                        <Text style={styles.userText}>eResources</Text>
                        <View style={{ justifyContent: 'flex-end' }}>
                          <AntDesign name="right" color={theme === 'LIGHT' ? '#000' : '#fff'} size={16}
                           style={{ marginLeft: 211 }}

                          />
                        </View>
                      </View>
                    </TouchableOpacity>




                    <View style={{
                      bottom: 0, marginTop: 20
                    }}>

                      <TouchableOpacity
                        style={[styles.allbutton, { backgroundColor: '#c27b7f', }]

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
    </Theme >
  );
};

export default User;