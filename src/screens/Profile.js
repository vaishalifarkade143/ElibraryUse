


// import { View, Text, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native'
// import React, { useContext, useEffect, useState } from 'react'
// import Header from '../common/Header';
// import Spinner from 'react-native-loading-spinner-overlay';
// import { AuthContext } from '../context/AuthContext';
// import ImagePicker from 'react-native-image-crop-picker';

// const Profile = ({ navigation }) => {

//     const [image, setImage] = useState('');

//     const [first_name, setFirstName] = useState('');
//     const [last_name, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [phone, setPhone] = useState('');
//     const [address_1, setAddress1] = useState('');
//     const [address_2, setAddress2] = useState('');
//     const [state, setState] = useState('');
//     const [city, setCity] = useState('');
//     const [zip, setZip] = useState('');
//     const [profile, setProfile] = useState([]);
//     const { userToken } = useContext(AuthContext);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isData, setIsData] = useState(false);


//     //======================image========================
//     const takePhotoFromCamera = () => {
//         ImagePicker.openCamera({
//             compressImageMaxWidth: 300,
//             compressImageMaxHeight: 300,
//             cropping: true,
//             compressImageQuality: 0.7
//         }).then(image => {
//             console.log(image);
//             setImage(image.path);
//             Alert.alert(
//                 'Success!',
//                 `Image set successfully `,
//             );
//         });
//     }

//     const choosePhotoFromLibrary = () => {
//         ImagePicker.openPicker({
//             width: 300,
//             height: 300,
//             cropping: true,
//             compressImageQuality: 0.7
//         }).then(image => {
//             console.log(image);
//             setImage(image.path);
//             Alert.alert(
//                 'Success!',
//                 `Image set successfully `,
//             );
//         });
//     }


//     useEffect(() => {
//         // Fetch user profile data on component load
//         fetchProfileData();
//     }, [userToken]);

//     const fetchProfileData = () => {
//         const singleUrl = 'https://dindayalupadhyay.smartcitylibrary.com/api/v1/member-details';

//         fetch(singleUrl, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${userToken}`,
//                 'Content-Type': 'application/json',
//             },
//         })
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
//                 return response.json();
//             })
//             .then((res) => {
//                 setProfile(res.data);
//                 setFirstName(res.data.first_name);
//                 setLastName(res.data.last_name);
//                 setEmail(res.data.email);
//                 setPhone(res.data.phone);
//                 console.log("image:", res.data.image_path);
//                 setImage(res.data.image_path);
//                 setAddress1(res.data.address.address_1);
//                 setAddress2(res.data.address.address_2);
//                 setState(res.data.address.state);
//                 setCity(res.data.address.city);
//                 setZip(res.data.address.zip);
//                 setIsLoading(false);
//             })
//             .catch((error) => {
//                 console.error('Error fetching data:', error);
//                 setIsLoading(false);
//             });
//     };

//     const handleSave = async () => {
//         const urlUpdate = 'https://dindayalupadhyay.smartcitylibrary.com/api/v1/update-member-profile';

//         const formData = new FormData();
//         formData.append('is_active', '1');
//         formData.append('first_name', first_name);
//         formData.append('last_name', last_name);
//         formData.append('email', email);
//         formData.append('phone', phone);
//         formData.append('address_1', address_1);
//         formData.append('address_2', address_2);
//         formData.append('city', city);
//         formData.append('state', state);
//         formData.append('zip', zip);

//         if (image) {
//             // If there's an image, add it to the form data
//             const imageFileName = image.split('/').pop();
//             const imageData = {
//                 uri: image,
//                 type: 'image/jpeg', // Change the type if necessary
//                 name: imageFileName,
//             };
//             formData.append('image', imageData);
//         }

//         try {
//             const response = await fetch(urlUpdate, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'multipart/form-data', // Important for sending files
//                     Authorization: `Bearer ${userToken}`,
//                 },
//                 body: formData,
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             console.log('Data updated successfully:', response);
//             // After successfully updating, fetch the updated profile data
//             await fetchProfileData();
//             setIsData(false);
//             Alert.alert(
//                 'Success!',
//                 `Data Updtated successfully `,
//             );
//         } catch (error) {
//             console.error('Error updating data:', error);
//         }
//     };



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



//                 <Spinner visible={isLoading} style={{ color: 'yellow' }} />
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
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                             marginBottom: 15,
//                         }}>
//                         <TextInput
//                             autoCompleteType="first_name"
//                             keyboardType="name-phone-pad"
//                             value={first_name}
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
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <TextInput
//                             autoCompleteType="last_name"
//                             keyboardType="name-phone-pad"
//                             value={last_name}
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
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <TextInput
//                             autoCompleteType="last_name"
//                             keyboardType="name-phone-pad"
//                             value={email}
//                             onChangeText={setEmail}

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
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <TextInput
//                             autoCompleteType="last_name"
//                             keyboardType="name-phone-pad"
//                             value={phone}
//                             onChangeText={setPhone}
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
//                         <Text style={{
//                             color: '#000',
//                             fontSize: 14,
//                             fontWeight: 'bold'
//                         }}>Member Profile</Text>
//                     </View>

//                     <View
//                         style={{
//                             height: 130,
//                             width: 130,
//                             backgroundColor: '#cbb7b8',
//                             borderRadius: 15,
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             marginLeft: 10,
//                             marginTop: 10,
//                         }}>
//                         {image ?
//                             (<ImageBackground
//                                 source={{
//                                     uri: image,
//                                 }}
//                                 style={{
//                                     height: 130,
//                                     width: 130,
//                                 }}
//                                 imageStyle={{ borderRadius: 15 }} />)
//                             :
//                             (<Text style={{
//                                 fontSize: 18,
//                                 borderRadius: 80,
//                                 padding: 35,
//                                 backgroundColor: '#7d68f0'
//                             }}>{first_name.charAt(0).toUpperCase() + "" + last_name.charAt(0).toUpperCase()}</Text>)
//                         }
//                     </View>

//                     <View style={{
//                         marginTop: 5,
//                         marginLeft: 15,
//                         flexDirection: 'row',
//                         gap: 10
//                     }}>
//                         <TouchableOpacity
//                             style={{
//                                 width: '35%',
//                                 height: 70,
//                                 justifyContent: 'center',

//                             }}
//                             onPress={takePhotoFromCamera}
//                         >
//                             <Text style={{
//                                 padding: 8,
//                                 color: '#fff',
//                                 backgroundColor: '#c27b7f',
//                                 fontWeight: '700',
//                                 fontSize: 18,
//                                 textAlign: 'center',
//                                 borderRadius: 5,
//                                 backgroundColor: '#c27b7f',

//                             }}>Take Photo</Text>
//                         </TouchableOpacity>

//                         <TouchableOpacity
//                             style={{
//                                 width: '60%',
//                                 height: 70,
//                                 justifyContent: 'center',
//                             }}
//                             onPress=
//                             {choosePhotoFromLibrary}
//                         >
//                             <Text style={{
//                                 padding: 8,
//                                 color: '#fff',
//                                 backgroundColor: '#c27b7f',
//                                 fontWeight: '700',
//                                 fontSize: 18,
//                                 textAlign: 'center',
//                                 borderRadius: 5,
//                             }}>Choose from Gallary</Text>
//                         </TouchableOpacity>
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
//                             keyboardType="name-phone-pad"
//                             value={address_1}
//                             onChangeText={setAddress1}
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
//                             keyboardType="name-phone-pad"
//                             value={address_2}
//                             onChangeText={setAddress2}
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
//                             keyboardType="name-phone-pad"
//                             value={state}
//                             onChangeText={setState}
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
//                             keyboardType="name-phone-pad"
//                             value={city}
//                             onChangeText={setCity}
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
//                             keyboardType="number-pad"
//                             value={zip.toString()}
//                             onChangeText={setZip}
//                         />

//                     </View><View style={{
//                         marginTop: 5,
//                         marginLeft: 15,
//                         flexDirection: 'row',
//                         gap: 10
//                     }}>
//                         <TouchableOpacity
//                             style={{
//                                 width: '40%',
//                                 height: 70,
//                                 justifyContent: 'center',
//                             }}
//                             onPress={handleSave}

//                         // disabled={!isData}
//                         >
//                             {/* { isData?( */}
//                             <Text style={{
//                                 padding: 10,
//                                 color: '#fff',
//                                 backgroundColor: '#c27b7f',
//                                 fontWeight: '700',
//                                 fontSize: 18,
//                                 textAlign: 'center',
//                                 borderRadius: 5,
//                             }}>Save</Text>
//                             {/* )
//                             :(<Text style={{
//                                 padding: 10,
//                                 color: '#fff',
//                                 backgroundColor: 'grey',
//                                 fontWeight: '700',
//                                 fontSize: 18,
//                                 textAlign: 'center',
//                                 borderRadius: 5,
//                             }}>Save</Text>)} */}
//                         </TouchableOpacity>

//                         <TouchableOpacity
//                             style={{
//                                 width: '40%',
//                                 height: 70,
//                                 justifyContent: 'center',
//                             }}
//                             //    
//                             onPress={() =>
//                                 navigation.goBack()
//                             }
//                         >
//                             <Text style={{
//                                 padding: 10,
//                                 color: '#fff',
//                                 backgroundColor: '#c27b7f',
//                                 fontWeight: '700',
//                                 fontSize: 18,
//                                 textAlign: 'center',
//                                 borderRadius: 5,
//                             }}>Cancel</Text>
//                         </TouchableOpacity>
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




//=====================================bottom sheet code===================================
// import { View, Text, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native'
// import React, { useContext, useEffect, useState, useRef } from 'react'
// import Header from '../common/Header';
// import Spinner from 'react-native-loading-spinner-overlay';
// import { AuthContext } from '../context/AuthContext';
// import ImagePicker from 'react-native-image-crop-picker';
// import Animated from 'react-native-reanimated';
// import BottomSheet from 'reanimated-bottom-sheet';

// const Profile = ({ navigation }) => {
//     const bs = useRef(null);
//   const fall = new Animated.Value(1);
//     const [image, setImage] = useState('');

//     const [first_name, setFirstName] = useState('');
//     const [last_name, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [phone, setPhone] = useState('');
//     const [address_1, setAddress1] = useState('');
//     const [address_2, setAddress2] = useState('');
//     const [state, setState] = useState('');
//     const [city, setCity] = useState('');
//     const [zip, setZip] = useState('');
//     const [profile, setProfile] = useState([]);
//     const { userToken } = useContext(AuthContext);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isData, setIsData] = useState(false);


//     //======================image========================
//     const takePhotoFromCamera = () => {
//         ImagePicker.openCamera({
//             compressImageMaxWidth: 300,
//             compressImageMaxHeight: 300,
//             cropping: true,
//             compressImageQuality: 0.7
//         }).then(image => {
//             console.log(image);
//             setImage(image.path);
//             Alert.alert(
//                 'Success!',
//                 `Image set successfully `,
//             );
//         });
//     }

//     const choosePhotoFromLibrary = () => {
//         ImagePicker.openPicker({
//             width: 300,
//             height: 300,
//             cropping: true,
//             compressImageQuality: 0.7
//         }).then(image => {
//             console.log(image);
//             setImage(image.path);
//             Alert.alert(
//                 'Success!',
//                 `Image set successfully `,
//             );
//         });
//     }



//     //================================================

//     useEffect(() => {
//         // Fetch user profile data on component load
//         fetchProfileData();
//     }, [userToken]);

//     const fetchProfileData = () => {
//         const singleUrl = 'https://dindayalupadhyay.smartcitylibrary.com/api/v1/member-details';

//         fetch(singleUrl, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${userToken}`,
//                 'Content-Type': 'application/json',
//             },
//         })
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
//                 return response.json();
//             })
//             .then((res) => {
//                 setProfile(res.data);
//                 setFirstName(res.data.first_name);
//                 setLastName(res.data.last_name);
//                 setEmail(res.data.email);
//                 setPhone(res.data.phone);
//                 console.log("image:", res.data.image_path);
//                 setImage(res.data.image_path);
//                 setAddress1(res.data.address.address_1);
//                 setAddress2(res.data.address.address_2);
//                 setState(res.data.address.state);
//                 setCity(res.data.address.city);
//                 setZip(res.data.address.zip);
//                 setIsLoading(false);
//             })
//             .catch((error) => {
//                 console.error('Error fetching data:', error);
//                 setIsLoading(false);
//             });
//     };

//     const handleSave = async () => {
//         const urlUpdate = 'https://dindayalupadhyay.smartcitylibrary.com/api/v1/update-member-profile';

//         const formData = new FormData();
//         formData.append('is_active', '1');
//         formData.append('first_name', first_name);
//         formData.append('last_name', last_name);
//         formData.append('email', email);
//         formData.append('phone', phone);
//         formData.append('address_1', address_1);
//         formData.append('address_2', address_2);
//         formData.append('city', city);
//         formData.append('state', state);
//         formData.append('zip', zip);

//         if (image) {
//             // If there's an image, add it to the form data
//             const imageFileName = image.split('/').pop();
//             const imageData = {
//                 uri: image,
//                 type: 'image/jpeg', // Change the type if necessary
//                 name: imageFileName,
//             };
//             formData.append('image', imageData);
//         }

//         try {
//             const response = await fetch(urlUpdate, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'multipart/form-data', // Important for sending files
//                     Authorization: `Bearer ${userToken}`,
//                 },
//                 body: formData,
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             console.log('Data updated successfully:', response);
//             // After successfully updating, fetch the updated profile data
//             await fetchProfileData();
//             setIsData(false);
//             Alert.alert(
//                 'Success!',
//                 `Data Updtated successfully `,
//             );
//         } catch (error) {
//             console.error('Error updating data:', error);
//         }
//     };




//     const renderInner = () => (
//         <View style={styles.panel}>
//           <View style={{ alignItems: 'center' }}>
//             <Text style={styles.panelTitle}>Upload Photo</Text>
//             <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
//           </View>
//           <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
//             <Text style={styles.panelButtonTitle}>Take Photo</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
//             <Text style={styles.panelButtonTitle}>Choose From Library</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.panelButton}
//             onPress={() => bs.current.snapTo(1)}>
//             <Text style={styles.panelButtonTitle}>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       );

//       const renderHeader = () => (
//         <View style={styles.header}>
//           <View style={styles.panelHeader}>
//             <View style={styles.panelHandle} />
//           </View>
//         </View>
//       );


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



//                 <Spinner visible={isLoading} style={{ color: 'yellow' }} />
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
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                             marginBottom: 15,
//                         }}>
//                         <TextInput
//                             autoCompleteType="first_name"
//                             keyboardType="name-phone-pad"
//                             value={first_name}
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
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <TextInput
//                             autoCompleteType="last_name"
//                             keyboardType="name-phone-pad"
//                             value={last_name}
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
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <TextInput
//                             autoCompleteType="last_name"
//                             keyboardType="name-phone-pad"
//                             value={email}
//                             onChangeText={setEmail}

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
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                         }}>
//                         <TextInput
//                             autoCompleteType="last_name"
//                             keyboardType="name-phone-pad"
//                             value={phone}
//                             onChangeText={setPhone}
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
//                         <Text style={{
//                             color: '#000',
//                             fontSize: 14,
//                             fontWeight: 'bold'
//                         }}>Member Profile</Text>
//                     </View>

//                     <Animated.View
//           style={{
//             margin: 20,
//             opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
//           }}>
//           <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
//                         <View
//                             style={{
//                                 height: 150,
//                                 width: 150,
//                                 backgroundColor: '#cbb7b8',
//                                 borderRadius: 15,
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 marginLeft: 10,
//                                 marginTop: 10,
//                             }}>
//                             {/* <TouchableOpacity
//                                 onPress={() => {

//                                 }}
//                             > */}
//                                 {image ?
//                                     (<ImageBackground
//                                         source={{
//                                             uri: image,
//                                         }}
//                                         style={{
//                                             height: 150,
//                                             width: 150,
//                                         }}
//                                         imageStyle={{ borderRadius: 15 }} />)
//                                     :
//                                     (<Text style={{
//                                         fontSize: 18,
//                                         borderRadius: 80,
//                                         padding: 35,
//                                         backgroundColor: '#7d68f0'
//                                     }}>{first_name.charAt(0).toUpperCase() + "" + last_name.charAt(0).toUpperCase()}</Text>)
//                                 }

//                             {/* </TouchableOpacity> */}
//                         </View>
//                         </TouchableOpacity>
//         </Animated.View>           


//                     <View style={{
//                         marginTop: 5,
//                         marginLeft: 15,
//                         flexDirection: 'row',
//                         gap: 10
//                     }}>
//                         <TouchableOpacity
//                             style={{
//                                 width: '35%',
//                                 height: 70,
//                                 justifyContent: 'center',

//                             }}
//                             onPress={takePhotoFromCamera}
//                         >
//                             <Text style={{
//                                 padding: 8,
//                                 color: '#fff',
//                                 backgroundColor: '#c27b7f',
//                                 fontWeight: '700',
//                                 fontSize: 18,
//                                 textAlign: 'center',
//                                 borderRadius: 5,
//                                 backgroundColor: '#c27b7f',

//                             }}>Take Photo</Text>
//                         </TouchableOpacity>

//                         <TouchableOpacity
//                             style={{
//                                 width: '60%',
//                                 height: 70,
//                                 justifyContent: 'center',
//                             }}
//                             onPress=
//                             {choosePhotoFromLibrary}
//                         >
//                             <Text style={{
//                                 padding: 8,
//                                 color: '#fff',
//                                 backgroundColor: '#c27b7f',
//                                 fontWeight: '700',
//                                 fontSize: 18,
//                                 textAlign: 'center',
//                                 borderRadius: 5,
//                             }}>Choose from Gallary</Text>
//                         </TouchableOpacity>
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
//                             keyboardType="name-phone-pad"
//                             value={address_1}
//                             onChangeText={setAddress1}
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
//                             keyboardType="name-phone-pad"
//                             value={address_2}
//                             onChangeText={setAddress2}
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
//                             keyboardType="name-phone-pad"
//                             value={state}
//                             onChangeText={setState}
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
//                             keyboardType="name-phone-pad"
//                             value={city}
//                             onChangeText={setCity}
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
//                             keyboardType="number-pad"
//                             value={zip.toString()}
//                             onChangeText={setZip}
//                         />

//                     </View><View style={{
//                         marginTop: 5,
//                         marginLeft: 15,
//                         flexDirection: 'row',
//                         gap: 10
//                     }}>
//                         <TouchableOpacity
//                             style={{
//                                 width: '40%',
//                                 height: 70,
//                                 justifyContent: 'center',
//                             }}
//                             onPress={handleSave}

//                         // disabled={!isData}
//                         >
//                             {/* { isData?( */}
//                             <Text style={{
//                                 padding: 10,
//                                 color: '#fff',
//                                 backgroundColor: '#c27b7f',
//                                 fontWeight: '700',
//                                 fontSize: 18,
//                                 textAlign: 'center',
//                                 borderRadius: 5,
//                             }}>Save</Text>
//                             {/* )
//                             :(<Text style={{
//                                 padding: 10,
//                                 color: '#fff',
//                                 backgroundColor: 'grey',
//                                 fontWeight: '700',
//                                 fontSize: 18,
//                                 textAlign: 'center',
//                                 borderRadius: 5,
//                             }}>Save</Text>)} */}
//                         </TouchableOpacity>

//                         <TouchableOpacity
//                             style={{
//                                 width: '40%',
//                                 height: 70,
//                                 justifyContent: 'center',
//                             }}
//                             //    
//                             onPress={() =>
//                                 navigation.goBack()
//                             }
//                         >
//                             <Text style={{
//                                 padding: 10,
//                                 color: '#fff',
//                                 backgroundColor: '#c27b7f',
//                                 fontWeight: '700',
//                                 fontSize: 18,
//                                 textAlign: 'center',
//                                 borderRadius: 5,
//                             }}>Cancel</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </ScrollView>

//             <BottomSheet
//         ref={bs}
//         snapPoints={[330, 0]}
//         renderContent={renderInner}
//         renderHeader={renderHeader}
//         initialSnap={1}
//         callbackNode={fall}
//         enabledGestureInteraction={true}
//       />


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
//     },
//     panel: {
//         padding: 20,
//         backgroundColor: '#FFFFFF',
//         paddingTop: 20,
//         // borderTopLeftRadius: 20,
//         // borderTopRightRadius: 20,
//         // shadowColor: '#000000',
//         // shadowOffset: {width: 0, height: 0},
//         // shadowRadius: 5,
//         // shadowOpacity: 0.4,
//       },
//       header: {
//         backgroundColor: '#FFFFFF',
//         shadowColor: '#333333',
//         shadowOffset: {width: -1, height: -3},
//         shadowRadius: 2,
//         shadowOpacity: 0.4,
//         // elevation: 5,
//         paddingTop: 20,
//         borderTopLeftRadius: 20,
//         borderTopRightRadius: 20,
//       },
//       panelHeader: {
//         alignItems: 'center',
//       },
//       panelHandle: {
//         width: 40,
//         height: 8,
//         borderRadius: 4,
//         backgroundColor: '#00000040',
//         marginBottom: 10,
//       },
//       panelTitle: {
//         fontSize: 27,
//         height: 35,
//       },
//       panelSubtitle: {
//         fontSize: 14,
//         color: 'gray',
//         height: 30,
//         marginBottom: 10,
//       },
//       panelButton: {
//         padding: 13,
//         borderRadius: 10,
//         backgroundColor: '#FF6347',
//         alignItems: 'center',
//         marginVertical: 7,
//       },
//       panelButtonTitle: {
//         fontSize: 17,
//         fontWeight: 'bold',
//         color: 'white',
//       },

// });


















//================================remoove button  ===============================





import { View, Text, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../common/Header';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import ImagePicker from 'react-native-image-crop-picker';

const Profile = ({ navigation }) => {

    const [image, setImage] = useState('');

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address_1, setAddress1] = useState('');
    const [address_2, setAddress2] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [profile, setProfile] = useState([]);
    const { userToken } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isData, setIsData] = useState(false);
    const [removeImage, setRemoveImage] = useState(0);

    //======================image========================
    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            cropping: true,
            compressImageQuality: 0.7
        }).then(image => {
            console.log(image);
            setImage(image.path);
            setRemoveImage(0); // Reset the removeImage flag
            Alert.alert(
                'Success!',
                `Image set successfully `,
            );
        });
    }

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            compressImageQuality: 0.7
        }).then(image => {
            console.log(image);
            setImage(image.path);
            setRemoveImage(0); // Reset the removeImage flag
            Alert.alert(
                'Success!',
                `Image set successfully `,
            );
        });
    }


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
                setProfile(res.data);
                setFirstName(res.data.first_name);
                setLastName(res.data.last_name);
                setEmail(res.data.email);
                setPhone(res.data.phone);
                console.log("image:", res.data.image_path);
                setImage(res.data.image_path);
                setAddress1(res.data.address.address_1);
                setAddress2(res.data.address.address_2);
                setState(res.data.address.state);
                setCity(res.data.address.city);
                setZip(res.data.address.zip);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    };

    const handleSave = async () => {
        const urlUpdate = 'https://dindayalupadhyay.smartcitylibrary.com/api/v1/update-member-profile';

        const formData = new FormData();
        formData.append('is_active', '1');
        formData.append('first_name', first_name);
        formData.append('last_name', last_name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('address_1', address_1);
        formData.append('address_2', address_2);
        formData.append('city', city);
        formData.append('state', state);
        formData.append('zip', zip);

        if (removeImage === 1) {
            // Set the remove_image field to 1 when you want to remove the image
            formData.append('remove_image', '1');
        } else if (image) {
            // If there's an image, add it to the form data
            const imageFileName = image.split('/').pop();
            const imageData = {
                uri: image,
                type: 'image/jpeg', // Change the type if necessary
                name: imageFileName,
            };
            formData.append('image', imageData);
        }

        try {
            const response = await fetch(urlUpdate, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data', // Important for sending files
                    Authorization: `Bearer ${userToken}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log('Data updated successfully:', response);
            // After successfully updating, fetch the updated profile data
            await fetchProfileData();
            setIsData(false);
            Alert.alert(
                'Success!',
                `Data Updtated successfully `,
            );
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };



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



                <Spinner visible={isLoading} style={{ color: 'yellow' }} />
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
                        <Text style={{
                            color: '#000',
                            fontSize: 14,
                            fontWeight: 'bold'
                        }}>Member Profile</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        marginTop: 20,
                    }}>
                        <View
                            style={{
                                height: 130,
                                width: 130,
                                backgroundColor: '#cbb7b8',
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 30,
                                marginTop: 15,
                            }}>
                            {image ?
                                (<ImageBackground
                                    source={{
                                        uri: image,
                                    }}
                                    style={{
                                        height: 130,
                                        width: 130,
                                    }}
                                    imageStyle={{ borderRadius: 15 }} />)
                                :
                                (<Text style={{
                                    fontSize: 18,
                                    borderRadius: 80,
                                    padding: 35,
                                    backgroundColor: '#7d68f0'
                                }}>{first_name.charAt(0).toUpperCase() + "" + last_name.charAt(0).toUpperCase()}</Text>)
                            }
                        </View>

                        <View style={{
                            marginTop: -25,
                            alignItems:'center'

                        }}>
                            <TouchableOpacity
                                style={{
                                    width: '70%',
                                    height: 70,
                                    justifyContent: 'center',

                                }}
                                onPress={takePhotoFromCamera}
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

                                }}>Take Photo</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    width: '70%',
                                    height: 70,
                                    justifyContent: 'center',
                                }}
                                onPress=
                                {choosePhotoFromLibrary}
                            >
                                <Text style={{
                                    marginTop:-20,
                                    padding: 8,
                                    color: '#fff',
                                    backgroundColor: '#c27b7f',
                                    fontWeight: '700',
                                    fontSize: 17,
                                    textAlign: 'center',
                                    borderRadius: 5,
                                }}>Choose from Gallary</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    width: '70%',
                                    height: 70,
                                    justifyContent: 'center',
                                }}
                                onPress={() => {
                                    setImage(''); // Reset the image when removing the profile
                                    setRemoveImage(1); // Set removeImage to 1 when removing the profile
                                  }}
                            >
                                <Text style={{
                                    marginTop:-20,
                                    padding: 8,
                                    color: '#fff',
                                    backgroundColor: '#c27b7f',
                                    fontWeight: '700',
                                    fontSize: 17,
                                    textAlign: 'center',
                                    borderRadius: 5,
                                }}>Remove Profile</Text>
                            </TouchableOpacity>
                        </View>
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
                            value={address_1}
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
                            value={address_2}
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
                            onPress={handleSave}

                        // disabled={!isData}
                        >
                            {/* { isData?( */}
                            <Text style={{
                                padding: 10,
                                color: '#fff',
                                backgroundColor: '#c27b7f',
                                fontWeight: '700',
                                fontSize: 18,
                                textAlign: 'center',
                                borderRadius: 5,
                            }}>Save</Text>
                            {/* )
                            :(<Text style={{
                                padding: 10,
                                color: '#fff',
                                backgroundColor: 'grey',
                                fontWeight: '700',
                                fontSize: 18,
                                textAlign: 'center',
                                borderRadius: 5,
                            }}>Save</Text>)} */}
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