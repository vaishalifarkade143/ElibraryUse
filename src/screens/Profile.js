// // import { View, Text, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
// // import React, { useContext, useEffect, useState } from 'react'
// // import Header from '../common/Header';
// // import Spinner from 'react-native-loading-spinner-overlay';
// // import { AuthContext } from '../context/AuthContext';

// // const Profile = ({ navigation }) => {
// //     const [first_name, setFirstName] = useState('');
// //     const [last_name, setLastName] = useState('');
// //     const [email, setEmail] = useState('');
// //     const [phone, setPhone] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [confirmpassword, setConfirmPassword] = useState('');
// //    // const { isLoading } = useContext(AuthContext);
// //     const [Profile, setProfile] = useState([]);
// //     const { userToken } = useContext(AuthContext);
// //     const [isLoading, setIsLoading] = useState(true);









// //     // =================  for profile data view ============================
// //     useEffect(() => {
// //     const singleUrl = 'https://dindayalupadhyay.smartcitylibrary.com/api/v1/member-details';

// //     fetch(singleUrl, {
// //       method: 'GET',
// //       headers: {
// //         'Authorization': `Bearer ${userToken}`,
// //         'Content-Type': 'application/json',
// //       },
// //     })
// //       .then((response) => {
// //         if (!response.ok) {
// //           throw new Error(`HTTP error! Status: ${response.status}`);
// //         }
// //         return response.json();
// //       })
// //       .then((res) => {
// //         console.log('Single Plan Data:', res.data);
// //         setProfile(res.data);
// //         setIsLoading(false); // Data has been loaded
// //       })
// //       .catch((error) => {
// //         console.error('Error fetching data:', error);
// //         setIsLoading(false); // Handle error and set isLoading to false
// //       });
// //     }, [userToken]);



// //     return (
// //         <View style={{ flex: 1, }}>
// //             <Header
// //                 rightIcon={require('../images/Logoelibrary.png')}
// //                 leftIcon={require('../images/menu.png')}
// //                 onClickLeftIcon={() => {
// //                     navigation.openDrawer();
// //                 }}
// //             /> 
// //             <ScrollView>

// //                 <Text style={{
// //                     fontFamily: 'Philosopher-Bold',
// //                     fontSize: 27,
// //                     fontWeight: '600',
// //                     color: '#000',
// //                     textAlign: 'center',
// //                     marginTop: 20
// //                 }}>Profile</Text>

// //                 {/* line starts ============== */}
// //                 <View style={{
// //                     marginTop: 10,
// //                     width: 150,
// //                     height: 2,
// //                     backgroundColor: '#c27b7f',
// //                     alignItems: 'center',
// //                     marginLeft: 130,
// //                 }}></View>
// //                 {/* line ends ============== */}



// //                 <Spinner visible={isLoading} />
// //                 <View style={styles.floatView}>

// //                     {/* <View style={{ marginTop: 20 }}> */}
// //                     <View
// //                         style={{
// //                             gap: 5,
// //                             display: 'flex',
// //                             alignItems: 'center',
// //                             flexDirection: "row",
// //                             marginTop: 15,
// //                             marginLeft: 15,
// //                             marginRight: 15,
// //                         }}>
// //                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>First Name</Text>
// //                         <Text style={{ color: 'red', fontSize: 20 }}>*</Text>
// //                     </View>
// //                     <View
// //                         style={{
// //                             backgroundColor: '#fff',
// //                             display: 'flex',
// //                             //alignItems: 'center',
// //                             marginTop: 15,
// //                             marginLeft: 15,
// //                             marginRight: 15,
// //                             marginBottom: 15,
// //                         }}>
// //                         <TextInput
// //                             autoCompleteType="first_name"
// //                             keyboardType="name-phone-pad"
// //                             value={Profile.first_name}
// //                             onChangeText={setFirstName}
// //                         />
// //                     </View>
// //                     <View
// //                         style={{
// //                             gap: 5,
// //                             display: 'flex',
// //                             alignItems: 'center',
// //                             flexDirection: "row",
// //                             marginLeft: 15,
// //                             marginRight: 15,
// //                         }}>
// //                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Last Name</Text>
// //                         <Text style={{ color: 'red', fontSize: 20 }}>*</Text>
// //                     </View>
// //                     <View
// //                         style={{
// //                             backgroundColor: '#fff',
// //                             display: 'flex',
// //                             //alignItems: 'center',
// //                             marginTop: 15,
// //                             marginLeft: 15,
// //                             marginRight: 15,
// //                         }}>
// //                         <TextInput
// //                             autoCompleteType="last_name"
// //                             keyboardType="name-phone-pad"
// //                             value={Profile.last_name}
// //                             onChangeText={setLastName}

// //                         />
// //                     </View>

// //                     <View
// //                         style={{
// //                             gap: 5,
// //                             display: 'flex',
// //                             alignItems: 'center',
// //                             flexDirection: "row",
// //                             marginTop: 15,
// //                             marginLeft: 15,
// //                             marginRight: 15,
// //                         }}>
// //                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Email</Text>
// //                         <Text style={{ color: 'red', fontSize: 20 }}>*</Text>
// //                     </View>
// //                     <View
// //                         style={{
// //                             backgroundColor: '#fff',
// //                             display: 'flex',
// //                             //alignItems: 'center',
// //                             marginTop: 15,
// //                             marginLeft: 15,
// //                             marginRight: 15,
// //                         }}>
// //                         <TextInput
// //                             autoCompleteType="last_name"
// //                             keyboardType="name-phone-pad"
// //                             value={Profile.email}
// //                             onChangeText={setLastName}

// //                         />
// //                     </View>

// //                     <View
// //                         style={{
// //                             gap: 5,
// //                             display: 'flex',
// //                             alignItems: 'center',
// //                             flexDirection: "row",
// //                             marginTop: 15,
// //                             marginLeft: 15,
// //                             marginRight: 15,
// //                         }}>
// //                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Phone No.</Text>
// //                         <Text style={{ color: 'red', fontSize: 20 }}>*</Text>
// //                     </View>
// //                     <View
// //                         style={{
// //                             backgroundColor: '#fff',
// //                             display: 'flex',
// //                             //alignItems: 'center',
// //                             marginTop: 15,
// //                             marginLeft: 15,
// //                             marginRight: 15,
// //                         }}>
// //                         <TextInput
// //                             autoCompleteType="last_name"
// //                             keyboardType="name-phone-pad"
// //                             value={Profile.phone}
// //                             onChangeText={setLastName}
// //                         />
// //                     </View>

// //                     <View
// //                         style={{

// //                             display: 'flex',
// //                             alignItems: 'center',
// //                             flexDirection: "row",
// //                             marginTop: 15,
// //                             marginLeft: 15,
// //                             marginRight: 15,
// //                         }}>
// //                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Member Profile</Text>
// //                     </View>

// //                     <TouchableOpacity>
// //                         <View
// //                             style={{
// //                                 marginTop: 15,
// //                                 marginLeft: 15,
// //                                 marginRight: 15,
// //                             }}>
// //                             <Image source={require('../images/user.png')}
// //                                 style={{ width: 100, height: 100, }} />
// //                         </View>
// //                     </TouchableOpacity>

// //                     <View style={{
// //                                 marginTop: 5,
// //                                 marginLeft: 15,
// //                                 flexDirection:'row',
// //                                 gap:10
// //                             }}>
// //                     <TouchableOpacity
// //                         style={{
// //                             width: '40%',
// //                             height: 70,
// //                             justifyContent: 'center',
// //                         }}
// //                         onPress={() =>
// //                             navigation.goBack()
// //                         }
// //                     >
// //                         <Text style={{
// //                             padding: 5,
// //                             color: '#fff',
// //                             backgroundColor: '#c27b7f',
// //                             fontWeight: '700',
// //                             fontSize: 18,
// //                             textAlign: 'center',
// //                             borderRadius:5,
// //                         }}>Change Profile</Text>
// //                     </TouchableOpacity>

// //                     <TouchableOpacity
// //                         style={{
// //                             width: '45%',
// //                             height: 70,
// //                             justifyContent: 'center',
// //                         }}
// //                         onPress={() =>
// //                             navigation.goBack()
// //                         }
// //                     >
// //                         <Text style={{
// //                             padding: 5,
// //                             color: '#fff',
// //                             backgroundColor: '#c27b7f',
// //                             fontWeight: '700',
// //                             fontSize: 18,
// //                             textAlign: 'center',
// //                             borderRadius:5,
// //                         }}>Remove Profile</Text>
// //                     </TouchableOpacity>
// //                     </View>


// //                     <View
// //                         style={{
// //                             gap: 5,
// //                             display: 'flex',
// //                             alignItems: 'center',
// //                             flexDirection: "row",
// //                             marginTop: 15,
// //                             marginLeft: 15,
// //                             marginRight: 15,
// //                         }}>
// //                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Address1</Text>
// //                     </View>
// //                     <View
// //                         style={{
// //                             backgroundColor: '#fff',
// //                             display: 'flex',
// //                             marginTop: 15,
// //                             marginLeft: 15,
// //                             marginRight: 15,
// //                         }}>
// //                         <TextInput
// //                             autoCompleteType="last_name"
// //                             keyboardType="name-phone-pad"
// //                             value={Profile.address.address_1}
// //                             onChangeText={setLastName}
// //                         />
// //                     </View>

// //                     <View
// //                         style={{
// //                             gap: 5,
// //                             display: 'flex',
// //                             alignItems: 'center',
// //                             flexDirection: "row",
// //                             marginTop: 15,
// //                             marginLeft: 15,
// //                             marginRight: 15,
// //                         }}>
// //                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Address2</Text>
// //                     </View>
// //                     <View
// //                         style={{
// //                             backgroundColor: '#fff',
// //                             display: 'flex',
// //                             marginTop: 15,
// //                             marginLeft: 15,
// //                             marginRight: 15,
// //                             marginBottom: 15
// //                         }}>
// //                         <TextInput
// //                             autoCompleteType="last_name"
// //                             keyboardType="name-phone-pad"
// //                             value={Profile.address.address_2}
// //                             onChangeText={setLastName}
// //                         />
// //                     </View>

// //                     <View
// //                         style={{
// //                             gap: 5,
// //                             display: 'flex',
// //                             alignItems: 'center',
// //                             flexDirection: "row",
// //                             marginTop: 15,
// //                             marginLeft: 15,
// //                             marginRight: 15,
// //                         }}>
// //                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>State</Text>
// //                     </View>
// //                     <View
// //                         style={{
// //                             backgroundColor: '#fff',
// //                             display: 'flex',
// //                             marginTop: 15,
// //                             marginLeft: 15,
// //                             marginRight: 15,
// //                             marginBottom: 15
// //                         }}>
// //                         <TextInput
// //                             autoCompleteType="last_name"
// //                             keyboardType="name-phone-pad"
// //                             value={Profile.address.state}
// //                             onChangeText={setLastName}
// //                         />
// //                     </View>

// //                     <View
// //                         style={{
// //                             gap: 5,
// //                             display: 'flex',
// //                             alignItems: 'center',
// //                             flexDirection: "row",
// //                             marginTop: 15,
// //                             marginLeft: 15,
// //                             marginRight: 15,
// //                         }}>
// //                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>City</Text>
// //                     </View>
// //                     <View
// //                         style={{
// //                             backgroundColor: '#fff',
// //                             display: 'flex',
// //                             marginTop: 15,
// //                             marginLeft: 15,
// //                             marginRight: 15,
// //                             marginBottom: 15
// //                         }}>
// //                         <TextInput
// //                             autoCompleteType="last_name"
// //                             keyboardType="name-phone-pad"
// //                             value={Profile.address.city}
// //                             onChangeText={setLastName}
// //                         />
// //                     </View>

// //                     <View
// //                         style={{
// //                             gap: 5,
// //                             display: 'flex',
// //                             alignItems: 'center',
// //                             flexDirection: "row",
// //                             marginTop: 15,
// //                             marginLeft: 15,
// //                             marginRight: 15,
// //                         }}>
// //                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Zip Code</Text>
// //                     </View>
// //                     <View
// //                         style={{
// //                             backgroundColor: '#fff',
// //                             display: 'flex',
// //                             marginTop: 15,
// //                             marginLeft: 15,
// //                             marginRight: 15,
// //                             marginBottom: 15
// //                         }}>
// //                         <TextInput
// //                             autoCompleteType="last_name"
// //                             //autoCompleteType="phone"
// //                             keyboardType="number-pad"
// //                             value={Profile.address.zip}
// //                             onChangeText={setLastName}
// //                         />
// //                     </View><View style={{
// //                                 marginTop: 5,
// //                                 marginLeft: 15,
// //                                 flexDirection:'row',
// //                                 gap:10
// //                             }}>
// //                     <TouchableOpacity
// //                         style={{
// //                             width: '40%',
// //                             height: 70,
// //                             justifyContent: 'center',
// //                         }}
// //                         onPress={() =>
// //                             navigation.goBack()
// //                         }
// //                     >
// //                         <Text style={{
// //                             padding: 5,
// //                             color: '#fff',
// //                             backgroundColor: '#c27b7f',
// //                             fontWeight: '700',
// //                             fontSize: 18,
// //                             textAlign: 'center',
// //                             borderRadius:5,
// //                         }}>Save</Text>
// //                     </TouchableOpacity>

// //                     <TouchableOpacity
// //                         style={{
// //                             width: '40%',
// //                             height: 70,
// //                             justifyContent: 'center',
// //                         }}
// //                         onPress={() =>
// //                             navigation.goBack()
// //                         }
// //                     >
// //                         <Text style={{
// //                             padding: 5,
// //                             color: '#fff',
// //                             backgroundColor: '#c27b7f',
// //                             fontWeight: '700',
// //                             fontSize: 18,
// //                             textAlign: 'center',
// //                             borderRadius:5,
// //                         }}>Cancel</Text>
// //                     </TouchableOpacity>
// //                     </View>
// //                 </View>
// //             </ScrollView>
// //         </View>
// //     );
// // };

// // export default Profile;
// // const styles = StyleSheet.create({

// //     floatView: {
// //         backgroundColor: '#fff3cd',
// //         justifyContent: 'center',
// //         flexDirection: 'column',
// //         marginLeft: 10,
// //         marginRight: 10,
// //         marginTop: 30,
// //         marginBottom: 30
// //     }

// // });




















// // import React, { useState, useContext } from 'react';
// // import { View, Text, TextInput, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
// // import { AuthContext } from '../context/AuthContext';
// // import axios from 'axios'; 
// // // import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
// // import Header from '../common/Header';


// // const Profile = ({ navigation }) => {
// //       const { userInfo } = useContext(AuthContext);
// //       const [address, setAddress] = useState('');
// //       const [state, setState] = useState('');
// //       const [city, setCity] = useState('');
// //       const [zip, setZip] = useState('');
// //       const [isDirty, setIsDirty] = useState(false);
// //       const [selectedImage, setSelectedImage] = useState(null);

//       // const openImagePicker = () => {
//       //   const options = {
//       //     mediaType: 'photo',
//       //     includeBase64: false,
//       //     maxHeight: 2000,
//       //     maxWidth: 2000,
//       //   };

//       //   launchImageLibrary(options, (response) => {
//       //     if (response.didCancel) {
//       //       console.log('User cancelled image picker');
//       //     } else if (response.error) {
//       //       console.log('Image picker error: ', response.error);
//       //     } else {
//       //       let imageUri = response.uri || response.assets?.[0]?.uri;
//       //       setSelectedImage(imageUri);
//       //       setIsDirty(true); 
//       //     }
//       //   });
//       // };




//       // const handleCameraLaunch = () => {
//       //   const options = {
//       //     mediaType: 'photo',
//       //     includeBase64: false,
//       //     maxHeight: 2000,
//       //     maxWidth: 2000,
//       //   };

//       //   launchCamera(options, response => {
//       //     if (response.didCancel) {
//       //       console.log('User cancelled camera');
//       //     } else if (response.error) {
//       //       console.log('Camera Error: ', response.error);
//       //     } else {
//       //       let imageUri = response.uri || response.assets?.[0]?.uri;
//       //       setSelectedImage(imageUri);
//       //       setIsDirty(true); 
//       //     }
//       //   });
//       // };



//       // const handleSave = () => {

//       //   setIsDirty(false);
//       // };








// //       const handleSave = async () => {

// //         try {
// //           const dataToSend = {
// //             id: userInfo.data.id,
// //             first_name: userInfo.data.user.first_name,
// //             last_name: userInfo.data.user.last_name,
// //             email: userInfo.data.user.email,

// //           };

// //           const response = await axios.post('https://dindayalupadhyay.smartcitylibrary.com/api/v1/update-member-profile', dataToSend);

// //           if (response.data.success) {

// //             setIsDirty(false);
// //             console.log('Data saved successfully:', response.data);
// //           }
// //            else {

// //             console.log('Error while saving data:', response.data.message);
// //           }
// //         } catch (error) {
// //           console.error('Error while saving data:', error);
// //         }
// //       };

// //       const handleCancel = () => {
// //         navigation.navigate('Home');
// //       };





// //       return (


// //         <ScrollView style={{ flex: 1 }}>
// //           <Header
// //                     rightIcon={require('../images/Logoelibrary.png')}
// //                     leftIcon={require('../images/back.png')}
// //                     onClickLeftIcon={() => {
// //                         //navigation.navigate('Home');
// //                         navigation.goBack();
// //                     }}
// //                 />
// //             <View >
// //               <Text style={{ alignItems: 'center',marginTop:20,marginBottom:20,marginLeft:160,fontSize: 20, fontWeight: 'bold', color: 'black' }}>Profile</Text>
// //             </View>

// //           <View style={{  padding: 20 }}>

// //             <View style={{ marginBottom: 20, flexDirection: 'row', marginLeft: 20 }}>
// //               <Text>Member Profile</Text>
// //             </View>

// //             {/* <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
// //               <TouchableOpacity >
// //                 <View style={{ width: 140, height: 140, borderRadius: 70, backgroundColor: '#ccc', alignItems: 'center', justifyContent: 'center' }}>
// //                   {selectedImage ? (
// //                     <Image source={{ uri: selectedImage }} style={{ width: 140, height: 140, borderRadius: 70 }} />
// //                   ) : (
// //                     <Text style={{ fontSize: 18 }}>JD</Text>
// //                   )}
// //                 </View>
// //               </TouchableOpacity>
// //               <View style={{ marginTop: 20 }}>
// //                 <Button title="Choose from Device" onPress={openImagePicker} />
// //               </View>
// //               <View style={{ marginTop: 20, marginBottom: 50 }}>
// //                 <Button title="Open Camera" onPress={handleCameraLaunch} />
// //               </View>
// //             </View> */}


// //           <View style={{ padding: 20 }}>
// //             <TextInput
// //               placeholder="First Name"
// //               value={userInfo.data.user.first_name}
// //               onChangeText={() => {
// //                 setIsDirty(true);
// //               }}
// //             />
// //             <TextInput
// //               placeholder="Last Name"
// //               value={userInfo.data.user.last_name}
// //               onChangeText={(text) => {
// //                 setIsDirty(true);
// //               }}
// //             />
// //             <TextInput
// //               placeholder="Email"
// //               value={userInfo.data.user.email}
// //               editable={false}
// //             />
// //             <TextInput
// //               placeholder="Address"
// //               value={address}
// //               onChangeText={(text) => {
// //                 setAddress(text);
// //                 setIsDirty(true);
// //               }}
// //             />
// //             <TextInput
// //               placeholder="State"
// //               value={state}
// //               onChangeText={(text) => {
// //                 setState(text);
// //                 setIsDirty(true);
// //               }}
// //             />
// //             <TextInput
// //               placeholder="City"
// //               value={city}
// //               onChangeText={(text) => {
// //                 setCity(text);
// //                 setIsDirty(true);
// //               }}
// //             />
// //             <TextInput
// //               placeholder="Zip Code"
// //               value={zip}
// //               onChangeText={(text) => {
// //                 setZip(text);
// //                 setIsDirty(true);
// //               }}
// //               keyboardType="numeric"
// //             />
// //             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
// //               <Button title="Save" onPress={handleSave} disabled={!isDirty} />
// //               <Button title="Cancel" onPress={handleCancel} />
// //             </View>
// //           </View>
// //           </View>
// //         </ScrollView>
// //       );
// //     };


// // export default Profile;
































// import { View, Text, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
// import React, { useContext, useEffect, useState } from 'react'
// import Header from '../common/Header';
// import Spinner from 'react-native-loading-spinner-overlay';
// import { AuthContext } from '../context/AuthContext';

// const Profile = ({ navigation }) => {
//     const [first_name, setFirstName] = useState('');
//     const [last_name, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [phone, setPhone] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmpassword, setConfirmPassword] = useState('');
//    // const { isLoading } = useContext(AuthContext);
//     const [Profile, setProfile] = useState([]);
//     const { userToken } = useContext(AuthContext);
//     const [isLoading, setIsLoading] = useState(true);

//     // const [addressData, setAddressData] = useState({
//     //   address1: "",
//     //   address2: "",
//     //   state: "",
//     //   city: "",
//     //   zip: "",
//     // });


//     const [address1, setAddress1] = useState('');
//     const [address2, setAddress2] = useState('');
//     const [state, setState] = useState('');
//     const [city, setCity] = useState('');
//     const [zip, setZip] = useState('');
//     const [isDirty, setIsDirty] = useState(false);
//     const [selectedImage, setSelectedImage] = useState(null);



//     // =================  for profile data view ============================
//     useEffect(() => {
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
//         console.log('Single Plan Data:', res.data);
//         setProfile(res.data);
//         setIsLoading(false); // Data has been loaded
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//         setIsLoading(false); // Handle error and set isLoading to false
//       });
//     }, [userToken]);





//     const handleSave = () => {

//       const url = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/update-member-profile`;
//     fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${userToken}`,
//       },

//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         console.log("responce is:", response);
//         return response.json();
//       })
//       .then((responseData) => {
//         console.log('Data stored successfully:', responseData);





//       })

//       .catch((error) => {
//         console.error('Error storing data:', error);
//       });


//         };







//     // const handleSave = () => {
//     //   const url = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/update-member-profile`;

//     //   const requestBody = {
//     //     address: {
//     //       address_1: addressData.address1,
//     //       address_2: addressData.address2,
//     //       state: addressData.state,
//     //       city: addressData.city,
//     //       zip: addressData.zip,
//     //     },
//     //   };

//     //   fetch(url, {
//     //     method: 'POST',
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //       Authorization: `Bearer ${userToken}`,
//     //     },
//     //     body: JSON.stringify(requestBody),
//     //   })
//     //     .then((response) => {
//     //       if (!response.ok) {
//     //         throw new Error('Network response was not ok');
//     //       }
//     //       return response.json();
//     //     })
//     //     .then((responseData) => {
//     //       console.log('Data stored successfully:', responseData);

//     //     })
//     //     .catch((error) => {
//     //       console.error('Error storing data:', error);

//     //     });
//     // };














//     return (
//         <View style={{ flex: 1, }}>
//             <Header
//                 rightIcon={require('../images/Logoelibrary.png')}
//                 leftIcon={require('../images/menu.png')}
//                 onClickLeftIcon={() => {
//                     navigation.openDrawer();
//                 }}
//             /> 
//             <ScrollView>

//                 <Text style={{
//                     fontFamily: 'Philosopher-Bold',
//                     fontSize: 27,
//                     fontWeight: '600',
//                     color: '#000',
//                     textAlign: 'center',
//                     marginTop: 20
//                 }}>Profile</Text>

//                 {/* line starts ============== */}
//                 <View style={{
//                     marginTop: 10,
//                     width: 150,
//                     height: 2,
//                     backgroundColor: '#c27b7f',
//                     alignItems: 'center',
//                     marginLeft: 130,
//                 }}></View>
//                 {/* line ends ============== */}



//                 <Spinner visible={isLoading} />
//                 <View style={styles.floatView}>

//                     {/* <View style={{ marginTop: 20 }}> */}
//                     <View
//                         style={{
//                             gap: 5,
//                             display: 'flex',
//                             alignItems: 'center',
//                             flexDirection: "row",
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>First Name</Text>
//                         <Text style={{ color: 'red', fontSize: 20 }}>*</Text>
//                     </View>
//                     <View
//                         style={{
//                             backgroundColor: '#fff',
//                             display: 'flex',
//                             //alignItems: 'center',
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                             marginBottom: 15,
//                         }}>
//                         <TextInput
//                             autoCompleteType="first_name"
//                             keyboardType="name-phone-pad"
//                             value={Profile.first_name}
//                             onChangeText={setFirstName}
//                         />
//                     </View>
//                     <View
//                         style={{
//                             gap: 5,
//                             display: 'flex',
//                             alignItems: 'center',
//                             flexDirection: "row",
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Last Name</Text>
//                         <Text style={{ color: 'red', fontSize: 20 }}>*</Text>
//                     </View>
//                     <View
//                         style={{
//                             backgroundColor: '#fff',
//                             display: 'flex',
//                             //alignItems: 'center',
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <TextInput
//                             autoCompleteType="last_name"
//                             keyboardType="name-phone-pad"
//                             value={Profile.last_name}
//                             onChangeText={setLastName}

//                         />
//                     </View>

//                     <View
//                         style={{
//                             gap: 5,
//                             display: 'flex',
//                             alignItems: 'center',
//                             flexDirection: "row",
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Email</Text>
//                         <Text style={{ color: 'red', fontSize: 20 }}>*</Text>
//                     </View>
//                     <View
//                         style={{
//                             backgroundColor: '#fff',
//                             display: 'flex',
//                             //alignItems: 'center',
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <TextInput
//                             autoCompleteType="last_name"
//                             keyboardType="name-phone-pad"
//                             value={Profile.email}
//                             onChangeText={setLastName}

//                         />
//                     </View>

//                     <View
//                         style={{
//                             gap: 5,
//                             display: 'flex',
//                             alignItems: 'center',
//                             flexDirection: "row",
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Phone No.</Text>
//                         <Text style={{ color: 'red', fontSize: 20 }}>*</Text>
//                     </View>
//                     <View
//                         style={{
//                             backgroundColor: '#fff',
//                             display: 'flex',
//                             //alignItems: 'center',
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <TextInput
//                             autoCompleteType="last_name"
//                             keyboardType="name-phone-pad"
//                             value={Profile.phone}
//                             onChangeText={setLastName}
//                         />
//                     </View>

//                     <View
//                         style={{

//                             display: 'flex',
//                             alignItems: 'center',
//                             flexDirection: "row",
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Member Profile</Text>
//                     </View>

//                     <TouchableOpacity>
//                         <View
//                             style={{
//                                 marginTop: 15,
//                                 marginLeft: 15,
//                                 marginRight: 15,
//                             }}>
//                             <Image source={require('../images/user.png')}
//                                 style={{ width: 100, height: 100, }} />
//                         </View>
//                     </TouchableOpacity>

//                     <View style={{
//                                 marginTop: 5,
//                                 marginLeft: 15,
//                                 flexDirection:'row',
//                                 gap:10
//                             }}>
//                     <TouchableOpacity
//                         style={{
//                             width: '40%',
//                             height: 70,
//                             justifyContent: 'center',
//                         }}
//                         onPress={() =>
//                             navigation.goBack()
//                         }
//                     >
//                         <Text style={{
//                             padding: 5,
//                             color: '#fff',
//                             backgroundColor: '#c27b7f',
//                             fontWeight: '700',
//                             fontSize: 18,
//                             textAlign: 'center',
//                             borderRadius:5,
//                         }}>Change Profile</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                         style={{
//                             width: '45%',
//                             height: 70,
//                             justifyContent: 'center',
//                         }}
//                         onPress={() =>
//                             navigation.goBack()
//                         }
//                     >
//                         <Text style={{
//                             padding: 5,
//                             color: '#fff',
//                             backgroundColor: '#c27b7f',
//                             fontWeight: '700',
//                             fontSize: 18,
//                             textAlign: 'center',
//                             borderRadius:5,
//                         }}>Remove Profile</Text>
//                     </TouchableOpacity>
//                     </View>


//                     <View
//                         style={{
//                             gap: 5,
//                             display: 'flex',
//                             alignItems: 'center',
//                             flexDirection: "row",
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Address1</Text>
//                     </View>
//                     <View
//                         style={{
//                             backgroundColor: '#fff',
//                             display: 'flex',
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <TextInput
//                             // autoCompleteType="last_name"
//                             keyboardType="name-phone-pad"
//                             value={Profile.address.address1}
//                           onChangeText={(text) => {
//                             setAddress1(text);
//                             setIsDirty(true);
//                           }}
//                         />
//                         {/* <TextInput
//                          keyboardType="name-phone-pad"
//   value={addressData.address1}
//   onChangeText={(text) =>
//     setAddressData({ ...addressData, address1: text })
//   }
// /> */}
//                     </View>

//                     <View
//                         style={{
//                             gap: 5,
//                             display: 'flex',
//                             alignItems: 'center',
//                             flexDirection: "row",
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Address2</Text>
//                     </View>
//                     <View
//                         style={{
//                             backgroundColor: '#fff',
//                             display: 'flex',
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                             marginBottom: 15
//                         }}>
//                         <TextInput
//                             // autoCompleteType="last_name"
//                             keyboardType="name-phone-pad"
//                             value={address2}
//                           onChangeText={(text) => {
//                             setAddress2(text);
//                             setIsDirty(true);
//                           }}
//                         />
//                         {/* <TextInput
//   value={addressData.address2}
//   onChangeText={(text) =>
//     setAddressData({ ...addressData, address2: text })
//   }
// /> */}
//                     </View>

//                     <View
//                         style={{
//                             gap: 5,
//                             display: 'flex',
//                             alignItems: 'center',
//                             flexDirection: "row",
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>State</Text>
//                     </View>
//                     <View
//                         style={{
//                             backgroundColor: '#fff',
//                             display: 'flex',
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                             marginBottom: 15
//                         }}>
//                         <TextInput
//                             // autoCompleteType="last_name"
//                             keyboardType="name-phone-pad"
//                             value={state}
//                                 onChangeText={(text) => {
//                                   setState(text);
//                                   setIsDirty(true);
//                                 }}
//                         />
//                         {/* <TextInput
//   value={addressData.state}
//   onChangeText={(text) =>
//     setAddressData({ ...addressData, state: text })
//   }
// /> */}
//                     </View>

//                     <View
//                         style={{
//                             gap: 5,
//                             display: 'flex',
//                             alignItems: 'center',
//                             flexDirection: "row",
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>City</Text>
//                     </View>
//                     <View
//                         style={{
//                             backgroundColor: '#fff',
//                             display: 'flex',
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                             marginBottom: 15
//                         }}>
//                         <TextInput
//                             // autoCompleteType="last_name"
//                             keyboardType="name-phone-pad"
//                             value={city}
//                             onChangeText={(text) => {
//                               setCity(text);
//                               setIsDirty(true);
//                             }}
//                         />
//                         {/* <TextInput
//   value={addressData.city}
//   onChangeText={(text) =>
//     setAddressData({ ...addressData, city: text })
//   }
// /> */}
//                     </View>

//                     <View
//                         style={{
//                             gap: 5,
//                             display: 'flex',
//                             alignItems: 'center',
//                             flexDirection: "row",
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Zip Code</Text>
//                     </View>
//                     <View
//                         style={{
//                             backgroundColor: '#fff',
//                             display: 'flex',
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                             marginBottom: 15
//                         }}>
//                         <TextInput
//                             // autoCompleteType="last_name"
//                             //autoCompleteType="phone"
//                             keyboardType="number-pad"
//                             value={zip}
//                                       onChangeText={(text) => {
//                                         setZip(text);
//                                         setIsDirty(true);
//                                       }}
//                                       // keyboardType="numeric"
//                         />
//                         {/* <TextInput
//   value={addressData.zip}
//   onChangeText={(text) =>
//     setAddressData({ ...addressData, zip: text })

//   }
// /> */}
//                     </View><View style={{
//                                 marginTop: 5,
//                                 marginLeft: 15,
//                                 flexDirection:'row',
//                                 gap:10
//                             }}>
//                     <TouchableOpacity
//                         style={{
//                             width: '40%',
//                             height: 70,
//                             justifyContent: 'center',
//                         }}
//                         onPress={handleSave}
//                         disabled={!isDirty}
//                     >
//                         <Text style={{
//                             padding: 5,
//                             color: '#fff',
//                             backgroundColor: '#c27b7f',
//                             fontWeight: '700',
//                             fontSize: 18,
//                             textAlign: 'center',
//                             borderRadius:5,
//                         }}>Save</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                         style={{
//                             width: '40%',
//                             height: 70,
//                             justifyContent: 'center',
//                         }}
//                     //    
//                     onPress={() =>
//                       navigation.goBack()
//                   }   
//               >
//                         <Text style={{
//                             padding: 5,
//                             color: '#fff',
//                             backgroundColor: '#c27b7f',
//                             fontWeight: '700',
//                             fontSize: 18,
//                             textAlign: 'center',
//                             borderRadius:5,
//                         }}>Cancel</Text>
//                     </TouchableOpacity>
//                     </View>
//                 </View>
//             </ScrollView>
//         </View>
//     );
// };

// export default Profile;
// const styles = StyleSheet.create({

//     floatView: {
//         backgroundColor: '#fff3cd',
//         justifyContent: 'center',
//         flexDirection: 'column',
//         marginLeft: 10,
//         marginRight: 10,
//         marginTop: 30,
//         marginBottom: 30
//     }

// });













// import { View, Text, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
// import React, { useContext, useEffect, useState } from 'react'
// import Header from '../common/Header';
// import Spinner from 'react-native-loading-spinner-overlay';
// import { AuthContext } from '../context/AuthContext';

// const Profile = ({ navigation }) => {
//     const [first_name, setFirstName] = useState('');
//     const [last_name, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [phone, setPhone] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmpassword, setConfirmPassword] = useState('');
//    // const { isLoading } = useContext(AuthContext);
//     const [Profile, setProfile] = useState([]);
//     const { userToken } = useContext(AuthContext);
//     const [isLoading, setIsLoading] = useState(true);









//     // =================  for profile data view ============================
//     useEffect(() => {
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
//         console.log('Single Plan Data:', res.data);
//         setProfile(res.data);
//         setIsLoading(false); // Data has been loaded
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//         setIsLoading(false); // Handle error and set isLoading to false
//       });
//     }, [userToken]);



//     return (
//         <View style={{ flex: 1, }}>
//             <Header
//                 rightIcon={require('../images/Logoelibrary.png')}
//                 leftIcon={require('../images/menu.png')}
//                 onClickLeftIcon={() => {
//                     navigation.openDrawer();
//                 }}
//             /> 
//             <ScrollView>

//                 <Text style={{
//                     fontFamily: 'Philosopher-Bold',
//                     fontSize: 27,
//                     fontWeight: '600',
//                     color: '#000',
//                     textAlign: 'center',
//                     marginTop: 20
//                 }}>Profile</Text>

//                 {/* line starts ============== */}
//                 <View style={{
//                     marginTop: 10,
//                     width: 150,
//                     height: 2,
//                     backgroundColor: '#c27b7f',
//                     alignItems: 'center',
//                     marginLeft: 130,
//                 }}></View>
//                 {/* line ends ============== */}



//                 <Spinner visible={isLoading} />
//                 <View style={styles.floatView}>

//                     {/* <View style={{ marginTop: 20 }}> */}
//                     <View
//                         style={{
//                             gap: 5,
//                             display: 'flex',
//                             alignItems: 'center',
//                             flexDirection: "row",
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>First Name</Text>
//                         <Text style={{ color: 'red', fontSize: 20 }}>*</Text>
//                     </View>
//                     <View
//                         style={{
//                             backgroundColor: '#fff',
//                             display: 'flex',
//                             //alignItems: 'center',
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                             marginBottom: 15,
//                         }}>
//                         <TextInput
//                             autoCompleteType="first_name"
//                             keyboardType="name-phone-pad"
//                             value={Profile.first_name}
//                             onChangeText={setFirstName}
//                         />
//                     </View>
//                     <View
//                         style={{
//                             gap: 5,
//                             display: 'flex',
//                             alignItems: 'center',
//                             flexDirection: "row",
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Last Name</Text>
//                         <Text style={{ color: 'red', fontSize: 20 }}>*</Text>
//                     </View>
//                     <View
//                         style={{
//                             backgroundColor: '#fff',
//                             display: 'flex',
//                             //alignItems: 'center',
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <TextInput
//                             autoCompleteType="last_name"
//                             keyboardType="name-phone-pad"
//                             value={Profile.last_name}
//                             onChangeText={setLastName}

//                         />
//                     </View>

//                     <View
//                         style={{
//                             gap: 5,
//                             display: 'flex',
//                             alignItems: 'center',
//                             flexDirection: "row",
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Email</Text>
//                         <Text style={{ color: 'red', fontSize: 20 }}>*</Text>
//                     </View>
//                     <View
//                         style={{
//                             backgroundColor: '#fff',
//                             display: 'flex',
//                             //alignItems: 'center',
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <TextInput
//                             autoCompleteType="last_name"
//                             keyboardType="name-phone-pad"
//                             value={Profile.email}
//                             onChangeText={setLastName}

//                         />
//                     </View>

//                     <View
//                         style={{
//                             gap: 5,
//                             display: 'flex',
//                             alignItems: 'center',
//                             flexDirection: "row",
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Phone No.</Text>
//                         <Text style={{ color: 'red', fontSize: 20 }}>*</Text>
//                     </View>
//                     <View
//                         style={{
//                             backgroundColor: '#fff',
//                             display: 'flex',
//                             //alignItems: 'center',
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <TextInput
//                             autoCompleteType="last_name"
//                             keyboardType="name-phone-pad"
//                             value={Profile.phone}
//                             onChangeText={setLastName}
//                         />
//                     </View>

//                     <View
//                         style={{

//                             display: 'flex',
//                             alignItems: 'center',
//                             flexDirection: "row",
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Member Profile</Text>
//                     </View>

//                     <TouchableOpacity>
//                         <View
//                             style={{
//                                 marginTop: 15,
//                                 marginLeft: 15,
//                                 marginRight: 15,
//                             }}>
//                             <Image source={require('../images/user.png')}
//                                 style={{ width: 100, height: 100, }} />
//                         </View>
//                     </TouchableOpacity>

//                     <View style={{
//                                 marginTop: 5,
//                                 marginLeft: 15,
//                                 flexDirection:'row',
//                                 gap:10
//                             }}>
//                     <TouchableOpacity
//                         style={{
//                             width: '40%',
//                             height: 70,
//                             justifyContent: 'center',
//                         }}
//                         onPress={() =>
//                             navigation.goBack()
//                         }
//                     >
//                         <Text style={{
//                             padding: 5,
//                             color: '#fff',
//                             backgroundColor: '#c27b7f',
//                             fontWeight: '700',
//                             fontSize: 18,
//                             textAlign: 'center',
//                             borderRadius:5,
//                         }}>Change Profile</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                         style={{
//                             width: '45%',
//                             height: 70,
//                             justifyContent: 'center',
//                         }}
//                         onPress={() =>
//                             navigation.goBack()
//                         }
//                     >
//                         <Text style={{
//                             padding: 5,
//                             color: '#fff',
//                             backgroundColor: '#c27b7f',
//                             fontWeight: '700',
//                             fontSize: 18,
//                             textAlign: 'center',
//                             borderRadius:5,
//                         }}>Remove Profile</Text>
//                     </TouchableOpacity>
//                     </View>


//                     <View
//                         style={{
//                             gap: 5,
//                             display: 'flex',
//                             alignItems: 'center',
//                             flexDirection: "row",
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Address1</Text>
//                     </View>
//                     <View
//                         style={{
//                             backgroundColor: '#fff',
//                             display: 'flex',
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <TextInput
//                             autoCompleteType="last_name"
//                             keyboardType="name-phone-pad"
//                             value={Profile.address.address_1}
//                             onChangeText={setLastName}
//                         />
//                     </View>

//                     <View
//                         style={{
//                             gap: 5,
//                             display: 'flex',
//                             alignItems: 'center',
//                             flexDirection: "row",
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Address2</Text>
//                     </View>
//                     <View
//                         style={{
//                             backgroundColor: '#fff',
//                             display: 'flex',
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                             marginBottom: 15
//                         }}>
//                         <TextInput
//                             autoCompleteType="last_name"
//                             keyboardType="name-phone-pad"
//                             value={Profile.address.address_2}
//                             onChangeText={setLastName}
//                         />
//                     </View>

//                     <View
//                         style={{
//                             gap: 5,
//                             display: 'flex',
//                             alignItems: 'center',
//                             flexDirection: "row",
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>State</Text>
//                     </View>
//                     <View
//                         style={{
//                             backgroundColor: '#fff',
//                             display: 'flex',
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                             marginBottom: 15
//                         }}>
//                         <TextInput
//                             autoCompleteType="last_name"
//                             keyboardType="name-phone-pad"
//                             value={Profile.address.state}
//                             onChangeText={setLastName}
//                         />
//                     </View>

//                     <View
//                         style={{
//                             gap: 5,
//                             display: 'flex',
//                             alignItems: 'center',
//                             flexDirection: "row",
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>City</Text>
//                     </View>
//                     <View
//                         style={{
//                             backgroundColor: '#fff',
//                             display: 'flex',
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                             marginBottom: 15
//                         }}>
//                         <TextInput
//                             autoCompleteType="last_name"
//                             keyboardType="name-phone-pad"
//                             value={Profile.address.city}
//                             onChangeText={setLastName}
//                         />
//                     </View>

//                     <View
//                         style={{
//                             gap: 5,
//                             display: 'flex',
//                             alignItems: 'center',
//                             flexDirection: "row",
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Zip Code</Text>
//                     </View>
//                     <View
//                         style={{
//                             backgroundColor: '#fff',
//                             display: 'flex',
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                             marginBottom: 15
//                         }}>
//                         <TextInput
//                             autoCompleteType="last_name"
//                             //autoCompleteType="phone"
//                             keyboardType="number-pad"
//                             value={Profile.address.zip}
//                             onChangeText={setLastName}
//                         />
//                     </View><View style={{
//                                 marginTop: 5,
//                                 marginLeft: 15,
//                                 flexDirection:'row',
//                                 gap:10
//                             }}>
//                     <TouchableOpacity
//                         style={{
//                             width: '40%',
//                             height: 70,
//                             justifyContent: 'center',
//                         }}
//                         onPress={() =>
//                             navigation.goBack()
//                         }
//                     >
//                         <Text style={{
//                             padding: 5,
//                             color: '#fff',
//                             backgroundColor: '#c27b7f',
//                             fontWeight: '700',
//                             fontSize: 18,
//                             textAlign: 'center',
//                             borderRadius:5,
//                         }}>Save</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                         style={{
//                             width: '40%',
//                             height: 70,
//                             justifyContent: 'center',
//                         }}
//                         onPress={() =>
//                             navigation.goBack()
//                         }
//                     >
//                         <Text style={{
//                             padding: 5,
//                             color: '#fff',
//                             backgroundColor: '#c27b7f',
//                             fontWeight: '700',
//                             fontSize: 18,
//                             textAlign: 'center',
//                             borderRadius:5,
//                         }}>Cancel</Text>
//                     </TouchableOpacity>
//                     </View>
//                 </View>
//             </ScrollView>
//         </View>
//     );
// };

// export default Profile;
// const styles = StyleSheet.create({

//     floatView: {
//         backgroundColor: '#fff3cd',
//         justifyContent: 'center',
//         flexDirection: 'column',
//         marginLeft: 10,
//         marginRight: 10,
//         marginTop: 30,
//         marginBottom: 30
//     }

// });




















// import React, { useState, useContext } from 'react';
// import { View, Text, TextInput, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
// import { AuthContext } from '../context/AuthContext';
// import axios from 'axios'; 
// // import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
// import Header from '../common/Header';


// const Profile = ({ navigation }) => {
//       const { userInfo } = useContext(AuthContext);
//       const [address, setAddress] = useState('');
//       const [state, setState] = useState('');
//       const [city, setCity] = useState('');
//       const [zip, setZip] = useState('');
//       const [isDirty, setIsDirty] = useState(false);
//       const [selectedImage, setSelectedImage] = useState(null);

// const openImagePicker = () => {
//   const options = {
//     mediaType: 'photo',
//     includeBase64: false,
//     maxHeight: 2000,
//     maxWidth: 2000,
//   };

//   launchImageLibrary(options, (response) => {
//     if (response.didCancel) {
//       console.log('User cancelled image picker');
//     } else if (response.error) {
//       console.log('Image picker error: ', response.error);
//     } else {
//       let imageUri = response.uri || response.assets?.[0]?.uri;
//       setSelectedImage(imageUri);
//       setIsDirty(true); 
//     }
//   });
// };




// const handleCameraLaunch = () => {
//   const options = {
//     mediaType: 'photo',
//     includeBase64: false,
//     maxHeight: 2000,
//     maxWidth: 2000,
//   };

//   launchCamera(options, response => {
//     if (response.didCancel) {
//       console.log('User cancelled camera');
//     } else if (response.error) {
//       console.log('Camera Error: ', response.error);
//     } else {
//       let imageUri = response.uri || response.assets?.[0]?.uri;
//       setSelectedImage(imageUri);
//       setIsDirty(true); 
//     }
//   });
// };



// const handleSave = () => {

//   setIsDirty(false);
// };








//       const handleSave = async () => {

//         try {
//           const dataToSend = {
//             id: userInfo.data.id,
//             first_name: userInfo.data.user.first_name,
//             last_name: userInfo.data.user.last_name,
//             email: userInfo.data.user.email,

//           };

//           const response = await axios.post('https://dindayalupadhyay.smartcitylibrary.com/api/v1/update-member-profile', dataToSend);

//           if (response.data.success) {

//             setIsDirty(false);
//             console.log('Data saved successfully:', response.data);
//           }
//            else {

//             console.log('Error while saving data:', response.data.message);
//           }
//         } catch (error) {
//           console.error('Error while saving data:', error);
//         }
//       };

//       const handleCancel = () => {
//         navigation.navigate('Home');
//       };





//       return (


//         <ScrollView style={{ flex: 1 }}>
//           <Header
//                     rightIcon={require('../images/Logoelibrary.png')}
//                     leftIcon={require('../images/back.png')}
//                     onClickLeftIcon={() => {
//                         //navigation.navigate('Home');
//                         navigation.goBack();
//                     }}
//                 />
//             <View >
//               <Text style={{ alignItems: 'center',marginTop:20,marginBottom:20,marginLeft:160,fontSize: 20, fontWeight: 'bold', color: 'black' }}>Profile</Text>
//             </View>

//           <View style={{  padding: 20 }}>

//             <View style={{ marginBottom: 20, flexDirection: 'row', marginLeft: 20 }}>
//               <Text>Member Profile</Text>
//             </View>

//             {/* <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
//               <TouchableOpacity >
//                 <View style={{ width: 140, height: 140, borderRadius: 70, backgroundColor: '#ccc', alignItems: 'center', justifyContent: 'center' }}>
//                   {selectedImage ? (
//                     <Image source={{ uri: selectedImage }} style={{ width: 140, height: 140, borderRadius: 70 }} />
//                   ) : (
//                     <Text style={{ fontSize: 18 }}>JD</Text>
//                   )}
//                 </View>
//               </TouchableOpacity>
//               <View style={{ marginTop: 20 }}>
//                 <Button title="Choose from Device" onPress={openImagePicker} />
//               </View>
//               <View style={{ marginTop: 20, marginBottom: 50 }}>
//                 <Button title="Open Camera" onPress={handleCameraLaunch} />
//               </View>
//             </View> */}


//           <View style={{ padding: 20 }}>
//             <TextInput
//               placeholder="First Name"
//               value={userInfo.data.user.first_name}
//               onChangeText={() => {
//                 setIsDirty(true);
//               }}
//             />
//             <TextInput
//               placeholder="Last Name"
//               value={userInfo.data.user.last_name}
//               onChangeText={(text) => {
//                 setIsDirty(true);
//               }}
//             />
//             <TextInput
//               placeholder="Email"
//               value={userInfo.data.user.email}
//               editable={false}
//             />
//             <TextInput
//               placeholder="Address"
//               value={address}
//               onChangeText={(text) => {
//                 setAddress(text);
//                 setIsDirty(true);
//               }}
//             />
//             <TextInput
//               placeholder="State"
//               value={state}
//               onChangeText={(text) => {
//                 setState(text);
//                 setIsDirty(true);
//               }}
//             />
//             <TextInput
//               placeholder="City"
//               value={city}
//               onChangeText={(text) => {
//                 setCity(text);
//                 setIsDirty(true);
//               }}
//             />
//             <TextInput
//               placeholder="Zip Code"
//               value={zip}
//               onChangeText={(text) => {
//                 setZip(text);
//                 setIsDirty(true);
//               }}
//               keyboardType="numeric"
//             />
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
//               <Button title="Save" onPress={handleSave} disabled={!isDirty} />
//               <Button title="Cancel" onPress={handleCancel} />
//             </View>
//           </View>
//           </View>
//         </ScrollView>
//       );
//     };


// export default Profile;












import { View, Text, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../common/Header';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';

const Profile = ({ navigation }) => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [Profile, setProfile] = useState([]);
    const { userToken } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isData, setIsData] = useState(false);

    useEffect(() => {
        // Fetch user profile data on component load
        fetchProfileData();
    }, [userToken]);

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
                //console.log('User Profile Data:', res.data);
                setProfile(res.data);
                setFirstName(res.data.first_name); // Set the first_name from the fetched data
                setLastName(res.data.last_name); // Set the last_name from the fetched data
                setEmail(res.data.email);
                setPhone(res.data.phone);
                setAddress1(res.data.address.address_1);
                setAddress2(res.data.address.address_2);
                setState(res.data.address.state);
                setCity(res.data.address.city);
                console.log('Zip:', res.data.address.zip);
                setZip(res.data.address.zip);
                setIsLoading(false); // Data has been loaded
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setIsLoading(false); // Handle error and set isLoading to false
            });
    };

    const handleSave = () => {
        const urlUpdate = 'https://dindayalupadhyay.smartcitylibrary.com/api/v1/update-member-profile';
        const updatedData = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone: phone,
            address: {
                address1: address_1,
                address2: address_2,
                state: state,
                city: city,
                zip: zip,
            },
        };

        fetch(urlUpdate, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify(updatedData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('Data updated successfully:', response);
                // After successfully updating, fetch the updated profile data
                return fetchProfileData();
            })
            .then(() => {
                setIsData(false); // Data is no longer dirty
            })
            .catch((error) => {
                console.error('Error updating data:', error);
            });
    };


    // useEffect(() => {
    //     // Fetch user profile data on component load
    //     fetchProfileData();
    // }, [userToken]);

    // const fetchProfileData = () => {
    //     const singleUrl = 'https://dindayalupadhyay.smartcitylibrary.com/api/v1/member-details';

    //     fetch(singleUrl, {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': `Bearer ${userToken}`,
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! Status: ${response.status}`);
    //             }
    //             return response.json();
    //         })
    //         .then((res) => {
    //             console.log('User Profile Data:', res.data);

    //             // Set the profile data to state
    //             setProfile(res.data);

    //             // Populate the form fields with the profile data
    //             setFirstName(res.data.first_name);
    //             setLastName(res.data.last_name);
    //             setEmail(res.data.email);
    //             setPhone(res.data.phone);

    //             const { address } = res.data;
    //             setAddress1(address.address1);
    //             setAddress2(address.address2);
    //             setState(address.state);
    //             setCity(address.city);
    //             setZip(String(address.zip));

    //             setIsLoading(false); // Data has been loaded
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching data:', error);
    //             setIsLoading(false); // Handle error and set isLoading to false
    //         });
    // };

    // const handleSave = () => {
    //     const urlUpdate = 'https://dindayalupadhyay.smartcitylibrary.com/api/v1/update-member-profile';
    //     const updatedData = {
    //         first_name,
    //         last_name,
    //         email,
    //         phone,
    //         address: {
    //             address1,
    //             address2,
    //             state,
    //             city,
    //             zip: parseInt(zip), // Convert zip to a number if necessary
    //         },
    //     };

    //     fetch(urlUpdate, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${userToken}`,
    //         },
    //         body: JSON.stringify(updatedData),
    //     })
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             console.log('Data updated successfully:', response);

    //             // After successfully updating, fetch the updated profile data
    //             return fetchProfileData();
    //         })
    //         .then((updatedProfile) => {
    //             // Set the updated profile data in the state
    //             setProfile(updatedProfile);
    //             setIsData(false); // Data is no longer dirty
    //         })
    //         .catch((error) => {
    //             console.error('Error updating data:', error);
    //         });
    // };


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



                <Spinner visible={isLoading}  style={{color:'yellow'}}/>
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
                            marginTop: 15,
                            marginLeft: 15,
                            marginRight: 15,
                        }}>
                        <TextInput
                            autoCompleteType="last_name"
                            keyboardType="name-phone-pad"
                            value={email}
                            onChangeText={setEmail}

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
                            marginTop: 15,
                            marginLeft: 15,
                            marginRight: 15,
                        }}>
                        <TextInput
                            autoCompleteType="last_name"
                            keyboardType="name-phone-pad"
                            value={phone}
                            onChangeText={setPhone}
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
                        flexDirection: 'row',
                        gap: 10
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
                                padding: 8,
                                color: '#fff',
                                backgroundColor: '#c27b7f',
                                fontWeight: '700',
                                fontSize: 18,
                                textAlign: 'center',
                                borderRadius: 5,
                                backgroundColor: '#c27b7f',

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
                                padding: 8,
                                color: '#fff',
                                backgroundColor: '#c27b7f',
                                fontWeight: '700',
                                fontSize: 18,
                                textAlign: 'center',
                                borderRadius: 5,
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
                            marginTop: 15,
                            marginLeft: 15,
                            marginRight: 15,
                        }}>
                        <TextInput
                            keyboardType="name-phone-pad"
                            value={address1}
                            onChangeText={setAddress1}
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
                            marginTop: 15,
                            marginLeft: 15,
                            marginRight: 15,
                            marginBottom: 15
                        }}>
                        <TextInput
                            keyboardType="name-phone-pad"
                            value={address2}
                            onChangeText={setAddress2}
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
                            marginTop: 15,
                            marginLeft: 15,
                            marginRight: 15,
                            marginBottom: 15
                        }}>
                        <TextInput
                            keyboardType="name-phone-pad"
                            value={state}
                            onChangeText={setState}
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
                            marginTop: 15,
                            marginLeft: 15,
                            marginRight: 15,
                            marginBottom: 15
                        }}>
                        <TextInput
                            keyboardType="name-phone-pad"
                            value={city}
                            onChangeText={setCity}
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
                            marginTop: 15,
                            marginLeft: 15,
                            marginRight: 15,
                            marginBottom: 15
                        }}>
                        <TextInput
                            keyboardType="number-pad"
                            value={zip.toString()}
                            onChangeText={setZip}
                        />
                        
                    </View><View style={{
                        marginTop: 5,
                        marginLeft: 15,
                        flexDirection: 'row',
                        gap: 10
                    }}>
                        <TouchableOpacity
                            style={{
                                width: '40%',
                                height: 70,
                                justifyContent: 'center',
                            }}
                            // style={styles.saveButton}
                            onPress={handleSave}
                            disabled={!isData}
                        >
                           { isData?(<Text style={{
                                padding: 10,
                                color: '#fff',
                                backgroundColor: '#c27b7f',
                                fontWeight: '700',
                                fontSize: 18,
                                textAlign: 'center',
                                borderRadius: 5,
                            }}>Save</Text>):(<Text style={{
                                padding: 10,
                                color: '#fff',
                                backgroundColor: 'grey',
                                fontWeight: '700',
                                fontSize: 18,
                                textAlign: 'center',
                                borderRadius: 5,
                            }}>Save</Text>)}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                width: '40%',
                                height: 70,
                                justifyContent: 'center',
                            }}
                            //    
                            onPress={() =>
                                navigation.goBack()
                            }
                        >
                            <Text style={{
                                padding: 10,
                                color: '#fff',
                                backgroundColor: '#c27b7f',
                                fontWeight: '700',
                                fontSize: 18,
                                textAlign: 'center',
                                borderRadius: 5,
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