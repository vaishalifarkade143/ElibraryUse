// import { View, Text, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
// import React, { useContext, useState } from 'react'
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
//     const { isLoading } = useContext(AuthContext);

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
//                             alignItems: 'center',
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
//                             alignItems: 'center',
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
//                             alignItems: 'center',
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
//                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Phone No.</Text>
//                         <Text style={{ color: 'red', fontSize: 20 }}>*</Text>
//                     </View>
//                     <View
//                         style={{
//                             backgroundColor: '#fff',
//                             display: 'flex',
//                             alignItems: 'center',
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
//                             alignItems: 'center',
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
//                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Address2</Text>
//                     </View>
//                     <View
//                         style={{
//                             backgroundColor: '#fff',
//                             display: 'flex',
//                             alignItems: 'center',
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                             marginBottom: 15
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
//                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>State</Text>
//                     </View>
//                     <View
//                         style={{
//                             backgroundColor: '#fff',
//                             display: 'flex',
//                             alignItems: 'center',
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                             marginBottom: 15
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
//                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>City</Text>
//                     </View>
//                     <View
//                         style={{
//                             backgroundColor: '#fff',
//                             display: 'flex',
//                             alignItems: 'center',
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                             marginBottom: 15
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
//                         <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Zip Code</Text>
//                     </View>
//                     <View
//                         style={{
//                             backgroundColor: '#fff',
//                             display: 'flex',
//                             alignItems: 'center',
//                             marginTop: 15,
//                             marginLeft: 15,
//                             marginRight: 15,
//                             marginBottom: 15
//                         }}>
//                         <TextInput
//                             autoCompleteType="last_name"
//                             keyboardType="name-phone-pad"
//                             value={last_name}
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



import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios'; 
// import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import Header from '../common/Header';


const Profile = ({ navigation }) => {
      const { userInfo } = useContext(AuthContext);
      const [address, setAddress] = useState('');
      const [state, setState] = useState('');
      const [city, setCity] = useState('');
      const [zip, setZip] = useState('');
      const [isDirty, setIsDirty] = useState(false);
      const [selectedImage, setSelectedImage] = useState(null);
    
      const openImagePicker = () => {
        const options = {
          mediaType: 'photo',
          includeBase64: false,
          maxHeight: 2000,
          maxWidth: 2000,
        };
    
        launchImageLibrary(options, (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('Image picker error: ', response.error);
          } else {
            let imageUri = response.uri || response.assets?.[0]?.uri;
            setSelectedImage(imageUri);
            setIsDirty(true); 
          }
        });
      };
    
      
      
      
      const handleCameraLaunch = () => {
        const options = {
          mediaType: 'photo',
          includeBase64: false,
          maxHeight: 2000,
          maxWidth: 2000,
        };
    
        launchCamera(options, response => {
          if (response.didCancel) {
            console.log('User cancelled camera');
          } else if (response.error) {
            console.log('Camera Error: ', response.error);
          } else {
            let imageUri = response.uri || response.assets?.[0]?.uri;
            setSelectedImage(imageUri);
            setIsDirty(true); 
          }
        });
      };
    
      
      
      // const handleSave = () => {
    
      //   setIsDirty(false);
      // };
    
    
      
      
      
      
      
      
      const handleSave = async () => {
        
        try {
          const dataToSend = {
            id: userInfo.data.id,
            first_name: userInfo.data.user.first_name,
            last_name: userInfo.data.user.last_name,
            email: userInfo.data.user.email,
            
          };
    
          const response = await axios.post('https://dindayalupadhyay.smartcitylibrary.com/api/v1/update-member-profile', dataToSend);
    
          if (response.data.success) {
            
            setIsDirty(false);
            console.log('Data saved successfully:', response.data);
          }
           else {
    
            console.log('Error while saving data:', response.data.message);
          }
        } catch (error) {
          console.error('Error while saving data:', error);
        }
      };
    
    
      
      
      
      const handleCancel = () => {
        navigation.navigate('Home');
      };
    
      
      
      
      
      return (
    
    
        <ScrollView style={{ flex: 1 }}>
          <Header
                    rightIcon={require('../images/Logoelibrary.png')}
                    leftIcon={require('../images/back.png')}
                    onClickLeftIcon={() => {
                        //navigation.navigate('Home');
                        navigation.goBack();
                    }}
                />
            <View >
              <Text style={{ alignItems: 'center',marginTop:20,marginBottom:20,marginLeft:160,fontSize: 20, fontWeight: 'bold', color: 'black' }}>Profile</Text>
            </View>
            
          <View style={{  padding: 20 }}>
            
            <View style={{ marginBottom: 20, flexDirection: 'row', marginLeft: 20 }}>
              <Text>Member Profile</Text>
            </View>
            
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
              <TouchableOpacity onPress={openImagePicker}>
                <View style={{ width: 140, height: 140, borderRadius: 70, backgroundColor: '#ccc', alignItems: 'center', justifyContent: 'center' }}>
                  {selectedImage ? (
                    <Image source={{ uri: selectedImage }} style={{ width: 140, height: 140, borderRadius: 70 }} />
                  ) : (
                    <Text style={{ fontSize: 18 }}>JD</Text>
                  )}
                </View>
              </TouchableOpacity>
              <View style={{ marginTop: 20 }}>
                <Button title="Choose from Device" onPress={openImagePicker} />
              </View>
              <View style={{ marginTop: 20, marginBottom: 50 }}>
                <Button title="Open Camera" onPress={handleCameraLaunch} />
              </View>
            </View>
         
          
          <View style={{ padding: 20 }}>
            <TextInput
              placeholder="First Name"
              value={userInfo.data.user.first_name}
              onChangeText={() => {
                setIsDirty(true);
              }}
            />
            <TextInput
              placeholder="Last Name"
              value={userInfo.data.user.last_name}
              onChangeText={(text) => {
                setIsDirty(true);
              }}
            />
            <TextInput
              placeholder="Email"
              value={userInfo.data.user.email}
              editable={false}
            />
            <TextInput
              placeholder="Address"
              value={address}
              onChangeText={(text) => {
                setAddress(text);
                setIsDirty(true);
              }}
            />
            <TextInput
              placeholder="State"
              value={state}
              onChangeText={(text) => {
                setState(text);
                setIsDirty(true);
              }}
            />
            <TextInput
              placeholder="City"
              value={city}
              onChangeText={(text) => {
                setCity(text);
                setIsDirty(true);
              }}
            />
            <TextInput
              placeholder="Zip Code"
              value={zip}
              onChangeText={(text) => {
                setZip(text);
                setIsDirty(true);
              }}
              keyboardType="numeric"
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Button title="Save" onPress={handleSave} disabled={!isDirty} />
              <Button title="Cancel" onPress={handleCancel} />
            </View>
          </View>
          </View>
        </ScrollView>
      );
    };
    

export default Profile;