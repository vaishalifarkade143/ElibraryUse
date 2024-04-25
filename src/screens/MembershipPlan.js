// //==================================animation added=====================================

// import React, { useEffect, useState, useContext } from 'react';
// import { View, Text, Image, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { AuthContext } from '../context/AuthContext';
// import Header from '../common/Header';
// import getStyles from '../Style/logNRegStyle';
// import Theme from './Theme';
// import RazorpayCheckout from 'react-native-razorpay';
// import CheckBox from '@react-native-community/checkbox';
// import Animated, { useSharedValue, withSpring, useAnimatedStyle, } from 'react-native-reanimated';
// import { ScrollView } from 'react-native-virtualized-view';
// import Modal from "react-native-modal";
// import ImagePicker from 'react-native-image-crop-picker';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// const MembershipPlan = () => {
//   const [isLoaded, setIsLoaded] = useState(true);
//   const [subscript, setSubscript] = useState([]);
//   const navigation = useNavigation();
//   const { userInfo, userToken } = useContext(AuthContext);
//   const [isPlanActivated, setIsPlanActivated] = useState(false);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const [selectedPlan, setSelectedPlan] = useState(null);

//   const [defaultCheckedBookItems, setDefaultCheckedBookItems] = useState({ 1: true, 6: true, 3: true, 2: true });
//   const [checkedBookItems, setCheckedBookItems] = useState(defaultCheckedBookItems);

//   const [defaultCheckedLibraryItems, setDefaultCheckedLibraryItems] = useState({ 1: true, 4: true, });
//   const [checkedLibraryItems, setCheckedLibraryItems] = useState(defaultCheckedLibraryItems);

//   const [defaultCheckedEbookItems, setDefaultCheckedEbookItems] = useState({ 1: true, 5: true });
//   const [checkedEbookItems, setCheckedEbookItems] = useState(defaultCheckedEbookItems);

//   const [checkBox1,setCheckbox1] = useState (false);
//   const [checkBox2,setCheckbox2] = useState (false);
//   const [checkBox3,setCheckbox3] = useState (false);


//   const [modalVisible, setModalVisible] = useState(false);

//   const [input2, setInput2] = useState('');
//   const [input3, setInput3] = useState('');
//   const [input4, setInput4] = useState('');
//   //======================Image choose============================
//   const [visible, setVisible] = useState(false);
//   const [image, setImage] = useState('');
//   const [removeImage, setRemoveImage] = useState(0);

//   const takePhotoFromCamera = () => {
//     ImagePicker.openCamera({
//       compressImageMaxWidth: 300,
//       compressImageMaxHeight: 300,
//       cropping: true,
//       compressImageQuality: 0.7
//     }).then(image => {
//       // console.log("image after chang:", image);
//       setImage(image.path);
//       setRemoveImage(0); // Reset the removeImage flag
//       Alert.alert(
//         'Success!',
//         `Image set successfully `,
//       );
//     });
//   }

//   const choosePhotoFromLibrary = () => {
//     ImagePicker.openPicker({
//       width: 300,
//       height: 300,
//       cropping: true,
//       compressImageQuality: 0.7
//     }).then(image => {
//       setImage(image.path);
//       setRemoveImage(0); // Reset the removeImage flag
//       Alert.alert(
//         'Success!',
//         `Image set successfully `,
//       );
//     });
//   }

//   // ===================Handle Bpl card subscription=====================

//   const handleBplSubscription = async () => {
//     const urlBpl = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/create-membership-payment-session2/1`;
//     const formData = new FormData();
//     if (removeImage === 1) {
//       // Set the remove_image field to 1 when you want to remove the image
//       formData.append('remove_image', '1');
//     } else if (image) {
//       // If there's an image, add it to the form data
//       const imageFileName = image.split('/').pop();
//       const imageData = {
//         uri: image,
//         type: 'image/png', // Change the type if necessary
//         name: imageFileName,
//       };
//       formData.append('pdf_preview_file', imageData);
//       setImage(imageData);
//     }

//     try {
//       const response = await fetch(urlBpl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'multipart/form-data', // Important for sending files
//           Authorization: `Bearer ${userToken}`,
//         },
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       console.log('Data updated successfully:', response.json());

//       // navigation.goBack();
//       navigation.navigate('membershipscreen');
//       // setIsData(false);
//       Alert.alert(
//         'Success!',
//         `Data Updtated successfully `,
//       );
//     } catch (error) {
//       console.error('Error updating data:', error);
//     }

//   }

//   // ===========animation code================
//   const opacity = useSharedValue(20);

//   const startAnimation = () => {
//     opacity.value = withSpring(1, { damping: 4, stiffness: 50 });
//   };

//   const animatedItemStyle = useAnimatedStyle(() => {
//     return {
//       opacity: opacity.value,
//       transform: [{ translateY: opacity.value * 10 }],
//     };
//   });

//   useEffect(() => {
//     startAnimation(); // Trigger the animation when the component mounts
//   }, []); // Empty dependency array ensures the effect runs only once

//   //==============================================================
//   useEffect(() => {
//     const subscription = () => {
//       fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/membership-plans")
//         .then(res => res.json())
//         .then(responce => {
//           setSubscript(responce.data);
//           setIsLoaded(false);
//         });
//     };
//     subscription();
//   }, []);

//   // ==================================== after plan subscribe POST req call =========================

//   const activatePlan = (item) => {
//     const subscriptionData2 = {
//       checkbox1: checkBox1,
//       checkbox2: checkBox2,
//       checkbox3: checkBox3,
//     }; 
//     console.log("subscriptionData2:",subscriptionData2)
//     if (item) {
//       const url = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/create-membership-payment-session/${item.id}`;
//       // console.log("id::", item.id)
//       fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${userToken}`,
//         },
//         body: JSON.stringify(subscriptionData2),
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           return response.json();
//         })
//         .then((responseData) => {
//           setIsPlanActivated(true);
//           navigation.navigate('membershipscreen');

//         })
//         .catch((error) => {
//           console.error('Error storing data:', error);
//         });
//     } 
//   };
//   useEffect(() => {
//     if (paymentSuccess) {
//       activatePlan(selectedPlan);
//     }
//   }, [paymentSuccess, selectedPlan]);


//    // ========================for selection of checkboxes=======================================


//    const handlepayment = (selectedPlan) => {
//     let totalAmount = (selectedPlan.price + selectedPlan.deposit); // Initialize totalAmount with the base price of the selected plan

//     // if (selectedPlan.id === 2) {
//     //   if (checkedLibraryItems[selectedPlan.id] && checkedEbookItems[selectedPlan.id]) {
//     //     totalAmount += 300 + 500;
//     //   } else if (checkedLibraryItems[selectedPlan.id]) {
//     //     totalAmount += 300;
//     //   } else if (checkedEbookItems[selectedPlan.id]) {
//     //     totalAmount += 500;
//     //   }
//     // }

//     if (selectedPlan.id === 3) {
//       if (checkedLibraryItems[selectedPlan.id] && checkedEbookItems[selectedPlan.id]) {
//         totalAmount += 300 + 500;
//       } else if (checkedLibraryItems[selectedPlan.id]) {
//         totalAmount += 300;
//       } else if (checkedEbookItems[selectedPlan.id]) {
//         totalAmount += 500;
//       }
//     }

//     if (selectedPlan.id === 4) {
//       if (checkedBookItems[selectedPlan.id] && checkedEbookItems[selectedPlan.id]) {
//         totalAmount += 370 + 500;
//       } else if (checkedBookItems[selectedPlan.id]) {
//         totalAmount += 370;
//       } else if (checkedEbookItems[selectedPlan.id]) {
//         totalAmount += 500;
//       }
//     }

//     if (selectedPlan.id === 5) {
//       if (checkedBookItems[selectedPlan.id] && checkedLibraryItems[selectedPlan.id]) {
//         totalAmount += 370 + 300;
//       } else if (checkedBookItems[selectedPlan.id]) {
//         totalAmount += 370;
//       } else if (checkedLibraryItems[selectedPlan.id]) {
//         totalAmount += 300;
//       }
//     }

//     if (selectedPlan.id === 6) {
//       if (checkedEbookItems[selectedPlan.id] && checkedLibraryItems[selectedPlan.id]) {
//         totalAmount += 500 + 300;
//       } else if (checkedEbookItems[selectedPlan.id]) {
//         totalAmount += 500;
//       } else if (checkedLibraryItems[selectedPlan.id]) {
//         totalAmount += 300;
//       }
//     }


//     const options = {
//       description: 'Credits towards consultation',
//       image: require('../images/Logoelibrary.png'),
//       currency: 'INR',
//       key: 'rzp_test_iGWfBKpv8IcFlF',
//       amount: totalAmount * 100, // Amount should be in paisa (multiply by 100)
//       name: 'Nagpur Elibrary',
//       order_id: '',
//       prefill: {
//         email: 'gaurav.kumar@example.com',
//         contact: '9191919191',
//         name: 'Nagpur Elibrary'
//       },
//       theme: { color: '#3498DB' }
//     };

//     RazorpayCheckout.open(options)
//       .then(data => {
//         setPaymentSuccess(true);
//         setSelectedPlan(selectedPlan);
//         alert(`Success: ${data.razorpay_payment_id}`);
//       })
//       .catch(error => {
//         alert(`Error: ${error.code} | ${error.description}`);
//       });
//   };


//   // ==================================== after Lifetime plan subscribe POST req call =========================

//   const activateLifeTimePlan = (item1) => {

//     const subscriptionData2 = {
//       memberOne: input2,
//       memberTwo: input3,
//       memberThree: input4,
//       checkbox1: checkBox1,
//       checkbox2: checkBox2,
//       checkbox3: checkBox3,

//     }; 
//     console.log("ssubscriptionDataub:",subscriptionData2)

//     if (item1) {
//       const url = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/create-membership-payment-session3/2`;
//       console.log("id item1::", item1.id)
//       fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${userToken}`,
//         },
//         body: JSON.stringify(subscriptionData2),
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           return response.json();
//         })
//         .then((responseData) => {
//           setIsPlanActivated(true);
//           navigation.navigate('membershipscreen');

//         })
//         .catch((error) => {
//           console.error('Error storing data1:', error);
//         });
//     } 
//   };
//   useEffect(() => {
//     if (paymentSuccess) {
//       activateLifeTimePlan(selectedPlan);
//     }
//   }, [paymentSuccess, selectedPlan]);



//   const handleLifePlanpayment = (selectedPlan) => {
//     // setSelectedPlan(selectedPlan);
//    let totalAmount = (selectedPlan.price + selectedPlan.deposit);
//     // console.log("price:",selectedPlan.price)
//     // console.log("totalAmount:",totalAmount)

//       if (checkedLibraryItems[selectedPlan.id] && checkedEbookItems[selectedPlan.id]) {
//         totalAmount += 300 + 500;
//       } else if (checkedLibraryItems[selectedPlan.id]) {
//         totalAmount += 300;
//       } else if (checkedEbookItems[selectedPlan.id]) {
//         totalAmount += 500;
//       }


//     const options = {
//       description: 'Credits towards consultation',
//       image: require('../images/Logoelibrary.png'),
//       currency: 'INR',
//       key: 'rzp_test_iGWfBKpv8IcFlF',
//       amount: totalAmount * 100,
//       name: 'Nagpur Elibrary',
//       order_id: '',
//       prefill: {
//         email: 'gaurav.kumar@example.com',
//         contact: '9191919191',
//         name: 'Nagpur Elibrary'
//       },
//       theme: { color: '#3498DB' }
//     };

//     RazorpayCheckout.open(options)
//       .then(data => {
//         setPaymentSuccess(true);
//         setSelectedPlan(selectedPlan);
//         console.log("aftercheckbox:",selectedPlan)
//         alert(`Success: ${data.razorpay_payment_id}`);
//       })
//       .catch(error => {
//         alert(`Error: ${error.code} | ${error.description}`);
//       });
//   };



//   // ================================================================================ \\

//   return (
//     <Theme>
//       {({ theme }) => {
//         const styles = getStyles(theme);
//         return (
//           <View style={styles.container}>
//             <Header
//               middleIcon={require('../images/Logoelibrary.png')}
//               leftIcon={require('../images/menu.png')}
//               onClickLeftIcon={() => {
//                 navigation.openDrawer();
//               }}
//             />

//             {/* ======================modal for plan id=2(lifetome plan)===================== */}

//             <Modal
//              isVisible={modalVisible}
//              onBackButtonPress={() => {
//                setModalVisible(false);
//              }}>

//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//           <View style={{ backgroundColor: '#efefef', padding: 20, 
//           borderRadius: 10, width: '90%' }}>

//             <View style={{ alignItems: 'flex-end',marginTop:-12 ,marginBottom:5}}>
//             <TouchableOpacity
//             onPress={() => {
//               setModalVisible(false);
//           }}
//               style={{ padding: 10, alignItems: 'center', 
//               borderRadius: 5,
//              }} >
//               <AntDesign name="close" color={"grey"} size={15} style={{
//                 }} />
//             </TouchableOpacity>
//             </View>

//           <Text
//               style={{ borderWidth: 0.5, borderColor: 'grey',
//                padding: 10, marginBottom: 10 }}>Sub plan</Text>
//             <TextInput
//               placeholder="Member two"
//               value={input2}
//               onChangeText={setInput2}
//               style={{ borderWidth: 0.5, borderColor: 'grey', padding: 7, marginBottom: 10 }}
//             />
//             <TextInput
//               placeholder="Member three"
//               value={input3}
//               onChangeText={setInput3}
//               style={{ borderWidth: 0.5, borderColor: 'grey', padding: 7, marginBottom: 10 }}
//             />
//             <TextInput
//               placeholder="Member four"
//               value={input4}
//               onChangeText={setInput4}
//               style={{ borderWidth: 0.5, borderColor: 'grey', padding: 7, marginBottom: 10 }}
//             />

//             <TouchableOpacity
//                           disabled={isPlanActivated}
//                           onPress={() => {
//                             handleLifePlanpayment(selectedPlan);
//                             setModalVisible(false);
//                           }}
//                           style={{ 
//                             backgroundColor: '#c27b7f',
//                             borderRadius: 20,
//                             paddingBottom: 5,
//                             paddingTop: 5,
//                             alignItems: 'center',
//                             width: 100,
//                             alignSelf: 'center',
//                             marginTop:5
//                           }}
//                         >
//                           <Text style={styles.buttonText}>Subscribe</Text>
//                         </TouchableOpacity>

//           </View>
//         </View>
//       </Modal>

//             {/* ================choose image modal================================== */}

//             <Modal
//               isVisible={visible}
//               onBackButtonPress={() => {
//                 setVisible(false);
//               }}>
//               <View style={{
//                 position: 'absolute',
//                 bottom: 0,
//                 left: 10,
//                 right: 10,
//                 backgroundColor: '#fff',
//                 borderRadius: 15,
//                 marginBottom: 30,
//               }}>

//                 <View style={{
//                   marginTop: 20,
//                   marginBottom: 20,
//                 }}>
//                   <TouchableOpacity
//                     style={{
//                       backgroundColor: '#fff',
//                       padding: 5,
//                     }}
//                     onPress={takePhotoFromCamera}
//                   >
//                     <Text style={{
//                       fontFamily: 'Poppins-Regular',
//                       fontSize: 17,
//                       textAlign: 'center',
//                       color: '#3498DB'
//                     }}>Take Photo</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={{
//                       backgroundColor: '#fff',
//                       padding: 5,

//                     }}
//                     onPress={choosePhotoFromLibrary}
//                   >
//                     <Text style={{
//                       fontFamily: 'Poppins-Regular',
//                       fontSize: 17,
//                       textAlign: 'center', color: '#3498DB'
//                     }}>Choose From Gallary</Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     style={{
//                       marginLeft: 10,
//                       backgroundColor: '#fff',
//                       padding: 5,

//                     }}
//                     onPress={() => {
//                       setImage(''); // Reset the image when removing the profile
//                       setRemoveImage(1); // Set removeImage to 1 when removing the profile
//                     }}
//                   >
//                     <Text style={{
//                       fontFamily: 'Poppins-Regular',
//                       fontSize: 17,
//                       textAlign: 'center',
//                       color: '#3498DB'
//                     }}>Remove Image</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>


//               <View style={{
//                 position: 'absolute',
//                 bottom: 0,
//                 left: 10,
//                 right: 10,
//                 backgroundColor: '#fff',
//                 borderRadius: 10,
//                 marginBottom: -13
//               }}>
//                 <TouchableOpacity
//                   style={{
//                     marginLeft: 10,
//                     backgroundColor: '#fff',
//                     padding: 5,
//                     marginRight: 10
//                   }}
//                   onPress={() => {
//                     setVisible(!visible);
//                   }}
//                 >
//                   <Text style={{
//                     fontFamily: 'Poppins-Regular',
//                     fontSize: 17,
//                     textAlign: 'center',
//                     color: '#3498DB'
//                   }}>Cancel</Text>
//                 </TouchableOpacity>
//               </View>
//             </Modal>
//             {/* ========================================================================= */}


//             <ScrollView>
//               <View style={styles.body}>
//                 <View style={styles.section}>
//                   <Text style={styles.sectionTitle}>LIBRARY</Text>
//                   <Text style={{
//                     fontFamily: 'Poppins-Regular',
//                     fontSize: 24,
//                     marginBottom: 10,
//                     color: theme === 'LIGHT' ? '#000' : '#fff',
//                     textAlign: 'center'
//                   }}>Membership Plan</Text>
//                 </View>


//                 <View style={{ marginBottom: 50 }}>
//                   <FlatList
//                     showsVerticalScrollIndicator={false}
//                     numColumns={1}
//                     data={subscript.slice(1)}
//                     keyExtractor={(item) => item.id.toString()}
//                     renderItem={({ item }) =>
//                     (
//                       <Animated.View style={[styles.animatedItem, animatedItemStyle]}>
//                         <View style={{ backgroundColor: '#f5e0e1', borderTopRightRadius: 20, padding: 10 }}>
//                           <Text style={styles.planName}>{item.name}</Text>
//                         </View>
//                         <View style={styles.planContainer}>

//                           <View style={styles.priceContainer}>
//                             <Image source={require('../images/rupee.png')} style={styles.rupeeIcon} />
//                             <Text style={styles.price}>{item.price}</Text>


//                             {item.id === 6 ? (
//                               <Text style={styles.priceLabel}>/Yearly</Text>
//                             ) : (item.id === 1 ? (
//                               <Text style={styles.priceLabel}>/LifeTime</Text>
//                             ) : (item.id === 2 ? (
//                               <Text style={styles.priceLabel}>/Lifetime</Text>
//                             ) : (item.id === 3 ? (
//                               <Text style={styles.priceLabel}>/Lifetime</Text>
//                             ) : (item.id === 4 ? (
//                               <Text style={styles.priceLabel}>/Monthly</Text>
//                             ) : (item.id === 5 ? (
//                               <Text style={styles.priceLabel}>/Monthly</Text>
//                             )
//                               : (
//                                 <Text style={styles.loadingText}>Loading...</Text>
//                               ))))))}

//                             <Text style={[styles.price, { textAlign: 'center' }]}>  +  </Text>
//                             <Image source={require('../images/rupee.png')} style={styles.rupeeIcon} />
//                             <Text style={styles.price}>{item.deposit}</Text>
//                             <Text style={styles.priceLabel}> Deposite</Text>
//                           </View>

//                           <Text style={styles.description}>{item.description}</Text>

//                           <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>

//                             <CheckBox
//                               tintColors={{ true: '#3498DB', false: 'gray' }}
//                               value={checkedBookItems[item.id]}

//                               onValueChange={() => {
//                                 // Update only if it's not a default selected checkbox
//                                 if (!defaultCheckedBookItems.hasOwnProperty(item.id)) {
//                                   setCheckedBookItems((prevCheckedItems) => ({
//                                     ...prevCheckedItems,
//                                     [item.id]: !prevCheckedItems[item.id],
//                                   }));
//                                 }
//                               }}
//                               style={{
//                                 marginLeft: (item.id === 4 || item.id === 5 || item.id === 6 ? -25 : -115),
//                               }}
//                             />
//                             {item.id === 4 || item.id === 5 || item.id === 6 ?
//                               (<View style={{ marginTop: 10 }}><Text style={{
//                                 alignSelf: 'center', fontSize: 12,
//                                 fontFamily: 'Poppins-Regular', marginLeft: -75,
//                               }}>Access of Books</Text>
//                                 <Text style={{
//                                   alignSelf: 'center', fontSize: 12,
//                                   fontFamily: 'Poppins-Regular',
//                                 }}>(₹ 120 / Yearly + ₹ 250 Deposit)</Text></View>) : (<Text style={{
//                                   alignSelf: 'center', fontSize: 12,
//                                   fontFamily: 'Poppins-Regular',
//                                 }}>Access of Books</Text>)}
//                           </View>

//                           <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
//                             <CheckBox
//                               tintColors={{ true: '#3498DB', false: 'gray' }}
//                               value={checkedLibraryItems[item.id]}
//                               onValueChange={() => {
//                                 // Update only if it's not a default selected checkbox
//                                 if (!defaultCheckedLibraryItems.hasOwnProperty(item.id)) {
//                                   setCheckedLibraryItems((prevCheckedItems) => ({
//                                     ...prevCheckedItems,
//                                     [item.id]: !prevCheckedItems[item.id],
//                                   }));
//                                 }
//                               }}
//                               style={{
//                                 marginLeft: item.id === 2 || item.id === 3 || item.id === 5 || item.id === 6 ? -5 : -110
//                               }}
//                             />
//                             {item.id === 2 || item.id === 3 || item.id === 5 || item.id === 6 ?
//                               (<Text style={{
//                                 fontSize: 12,
//                                 fontFamily: 'Poppins-Regular',
//                               }}>Access of Library(₹ 300 / Monthly)</Text>)
//                               :
//                               (<Text style={{

//                                 fontSize: 12,
//                                 fontFamily: 'Poppins-Regular',

//                               }}>Access of Library</Text>)}
//                           </View>

//                           <View style={{
//                             flexDirection: 'row', alignItems: 'center',
//                             justifyContent: 'center', marginBottom: 10
//                           }}>
//                             <CheckBox
//                               tintColors={{ true: '#3498DB', false: 'gray' }}
//                               value={checkedEbookItems[item.id]}

//                               onValueChange={() => {
//                                 // Update only if it's not a default selected checkbox
//                                 if (!defaultCheckedEbookItems.hasOwnProperty(item.id)) {
//                                   setCheckedEbookItems((prevCheckedItems) => ({
//                                     ...prevCheckedItems,
//                                     [item.id]: !prevCheckedItems[item.id],
//                                   }));
//                                 }
//                               }}

//                               style={{
//                                 marginLeft: item.id === 2 || item.id === 3 || item.id === 4 || item.id === 6 ? -10 : -112
//                               }}
//                             />
//                             {item.id === 2 || item.id === 3 || item.id === 4 || item.id === 6 ?
//                               <Text style={{
//                                 alignSelf: 'center',
//                                 fontSize: 12,
//                                 fontFamily: 'Poppins-Regular',
//                               }}>Access of Ebook(₹ 500 / Monthly)</Text>
//                               :
//                               <Text style={{
//                                 fontSize: 12,
//                                 fontFamily: 'Poppins-Regular',
//                               }}>Access of Ebook</Text>
//                             }
//                           </View>

//                         </View>
//                         <TouchableOpacity
//                           disabled={isPlanActivated}
//                           onPress={() => {
//                             console.log('Selected item:', item);
//                             if (item.id === 2) {
//                               // Open modal containing three text inputs
//                               setModalVisible(true);
//                               setSelectedPlan(item);
//                               setCheckbox1(checkedBookItems);
//                               console.log("checkBox1",checkBox1);
//                               setCheckbox2(checkedLibraryItems);
//                               console.log("checkBox2",checkBox2);
//                               setCheckbox3(checkedEbookItems);
//                               console.log("checkBox3",checkBox3);
//                             } else {
//                               handlepayment(item);
//                             }
//                           }}
//                           style={styles.subscribeButton}
//                         >
//                           <Text style={styles.buttonText}>Subscribe</Text>
//                         </TouchableOpacity>
//                       </Animated.View>
//                     )
//                     }
//                   />
//                 </View>

//               </View>

//               {/* ====================Bpl card holder=========================== */}

//               <Animated.View style={[styles.animatedItem, animatedItemStyle]}>
//                 <View style={{
//                   marginLeft: 20,
//                   marginRight: 20,
//                   padding: 10,
//                   borderTopRightRadius: 20,
//                   backgroundColor: '#f5e0e1',
//                   marginTop: -90,
//                 }}>
//                   <Text style={styles.planName}>{subscript[0]?.name}</Text>
//                 </View>
//                 <View style={{
//                   borderBottomLeftRadius: 15,
//                   marginLeft: 20,
//                   marginRight: 20,
//                   padding: 10,
//                   marginBottom: 40,
//                   backgroundColor: '#f5e0e1'
//                 }}>
//                   {image ? (
//                     <View>
//                       <Image
//                         source={{ uri: image }}
//                         style={{
//                           width: 140,
//                           height: 140,
//                           alignSelf: 'center',
//                         }}
//                         resizeMode="cover"
//                       />
//                     </View>
//                   ) : null}


//                   <View style={{ flex: 0.5 }}>
//                     <TouchableOpacity style={{
//                       marginTop: 10,
//                       borderColor: "grey",
//                       borderWidth: 1,
//                       paddingBottom: 8,
//                       paddingTop: 8,
//                       width: 130,
//                       alignSelf: 'center',
//                       marginBottom: 22,
//                       backgroundColor: '#efefef'
//                     }}
//                       onPress={() => {
//                         setVisible(true);
//                       }}>
//                       <Text style={{
//                         textAlign: 'center',
//                         fontFamily: 'Poppins-Regular',
//                         fontSize: 13,
//                         color: "#000",
//                       }}>Choose Image</Text>
//                     </TouchableOpacity>
//                   </View>

//                 </View>
//                 <TouchableOpacity
//                   disabled={isPlanActivated}
//                   onPress={() => {
//                     handleBplSubscription();
//                   }}
//                   style={{
//                     marginTop: -60,
//                     backgroundColor: '#c27b7f',
//                     borderRadius: 20,
//                     paddingBottom: 8,
//                     paddingTop: 8,
//                     alignItems: 'center',
//                     width: 100,
//                     alignSelf: 'center',
//                     marginBottom: 25
//                   }}
//                 >
//                   <Text style={styles.buttonText}>Subscribe</Text>
//                 </TouchableOpacity>
//               </Animated.View>


//             </ScrollView>

//           </View>
//         );

//       }}
//     </Theme>
//   );
// };

// export default MembershipPlan;




//==================================animation added=====================================

import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import Header from '../common/Header';
import getStyles from '../Style/logNRegStyle';
import Theme from './Theme';
import RazorpayCheckout from 'react-native-razorpay';
import CheckBox from '@react-native-community/checkbox';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, } from 'react-native-reanimated';
import { ScrollView } from 'react-native-virtualized-view';
import Modal from "react-native-modal";
import ImagePicker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';

const MembershipPlan = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [subscript, setSubscript] = useState([]);
  const navigation = useNavigation();
  const { userInfo, userToken } = useContext(AuthContext);
  const [isPlanActivated, setIsPlanActivated] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentSuccess2, setPaymentSuccess2] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [amount, setAmount] = useState(0);



  const [defaultCheckedBookItems, setDefaultCheckedBookItems] = useState({ 1: true, 6: true, 3: true, 2: true });
  const [checkedBookItems, setCheckedBookItems] = useState(defaultCheckedBookItems);

  const [defaultCheckedLibraryItems, setDefaultCheckedLibraryItems] = useState({ 1: true, 4: true, });
  const [checkedLibraryItems, setCheckedLibraryItems] = useState(defaultCheckedLibraryItems);

  const [defaultCheckedEbookItems, setDefaultCheckedEbookItems] = useState({ 1: true, 5: true });
  const [checkedEbookItems, setCheckedEbookItems] = useState(defaultCheckedEbookItems);

  const [modalVisible, setModalVisible] = useState(false);

  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  //======================Image choose============================
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState('');
  const [removeImage, setRemoveImage] = useState(0);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      // console.log("image after chang:", image);
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
      setImage(image.path);
      setRemoveImage(0); // Reset the removeImage flag
      Alert.alert(
        'Success!',
        `Image set successfully `,
      );
    });
  }

  // ===================Handle Bpl card subscription=====================

  const handleBplSubscription = async () => {
    const urlBpl = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/create-membership-payment-session2/1`;
    const formData = new FormData();
    if (removeImage === 1) {
      // Set the remove_image field to 1 when you want to remove the image
      formData.append('remove_image', '1');
    } else if (image) {
      // If there's an image, add it to the form data
      const imageFileName = image.split('/').pop();
      const imageData = {
        uri: image,
        type: 'image/png', // Change the type if necessary
        name: imageFileName,
      };
      formData.append('pdf_preview_file', imageData);
      setImage(imageData);
    }

    try {
      const response = await fetch(urlBpl, {
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

      console.log('Data updated successfully:', response.json());

      // navigation.goBack();
      navigation.navigate('membershipscreen');
      // setIsData(false);
      Alert.alert(
        'Success!',
        `Data Updtated successfully `,
      );
    } catch (error) {
      console.error('Error updating data:', error);
    }

  }

  // ===========animation code================
  const opacity = useSharedValue(20);

  const startAnimation = () => {
    opacity.value = withSpring(1, { damping: 4, stiffness: 50 });
  };

  const animatedItemStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: opacity.value * 10 }],
    };
  });

  useEffect(() => {
    startAnimation(); // Trigger the animation when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once

  //==============================================================
  useEffect(() => {
    const subscription = () => {
      fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/membership-plans")
        .then(res => res.json())
        .then(responce => {
          setSubscript(responce.data);
          setIsLoaded(false);
        });
    };
    subscription();
  }, []);



  // ==================================== after plan subscribe POST req call =========================

  const activatePlan = (item) => {
    if (item) {
      const subscriptionData = {
        checkbox1: checkedBookItems[item.id],
        checkbox2: checkedLibraryItems[item.id],
        checkbox3: checkedEbookItems[item.id],

      }
      // console.log("subscriptionData:",subscriptionData)
      const url = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/create-membership-payment-session/${item.id}`;
      // console.log("id::", item.id)
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(subscriptionData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((responseData) => {
          setIsPlanActivated(true);
          navigation.navigate('membershipscreen');

        })
        .catch((error) => {
          console.error('Error storing data33:', error);
          console.log('Response:', error.response);
        });
    }
  };
  useEffect(() => {
    if (paymentSuccess) {
      activatePlan(selectedPlan);
    }
  }, [paymentSuccess, selectedPlan]);


  // ========================for selection of checkboxes=======================================


  const handlepayment = (selectedPlan) => {
    let totalAmount = (selectedPlan.price + selectedPlan.deposit); // Initialize totalAmount with the base price of the selected plan


    if (selectedPlan.id === 3) {
      if (checkedLibraryItems[selectedPlan.id] && checkedEbookItems[selectedPlan.id]) {
        totalAmount += 300 + 500;
      } else if (checkedLibraryItems[selectedPlan.id]) {
        totalAmount += 300;
      } else if (checkedEbookItems[selectedPlan.id]) {
        totalAmount += 500;
      }
    }

    if (selectedPlan.id === 4) {
      if (checkedBookItems[selectedPlan.id] && checkedEbookItems[selectedPlan.id]) {
        totalAmount += 370 + 500;
      } else if (checkedBookItems[selectedPlan.id]) {
        totalAmount += 370;
      } else if (checkedEbookItems[selectedPlan.id]) {
        totalAmount += 500;
      }
    }

    if (selectedPlan.id === 5) {
      if (checkedBookItems[selectedPlan.id] && checkedLibraryItems[selectedPlan.id]) {
        totalAmount += 370 + 300;
      } else if (checkedBookItems[selectedPlan.id]) {
        totalAmount += 370;
      } else if (checkedLibraryItems[selectedPlan.id]) {
        totalAmount += 300;
      }
    }

    if (selectedPlan.id === 6) {
      if (checkedEbookItems[selectedPlan.id] && checkedLibraryItems[selectedPlan.id]) {
        totalAmount += 500 + 300;
      } else if (checkedEbookItems[selectedPlan.id]) {
        totalAmount += 500;
      } else if (checkedLibraryItems[selectedPlan.id]) {
        totalAmount += 300;
      }
    }


    const options = {
      description: 'Credits towards consultation',
      image: require('../images/Logoelibrary.png'),
      currency: 'INR',
      key: 'rzp_test_iGWfBKpv8IcFlF',
      amount: totalAmount * 100, // Amount should be in paisa (multiply by 100)
      name: 'Nagpur Elibrary',
      order_id: '',
      prefill: {
        email: 'gaurav.kumar@example.com',
        contact: '9191919191',
        name: 'Nagpur Elibrary'
      },
      theme: { color: '#3498DB' }
    };

    RazorpayCheckout.open(options)
      .then(data => {
        setPaymentSuccess(true);
        setSelectedPlan(selectedPlan);
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };


  // ==================================== after Lifetime plan subscribe POST req call =========================

  const activateLifeTimePlan = (item1) => {

    if (item1) {
      const subscriptionData2 = {
        memberOne: input2,
        memberTwo: input3,
        memberThree: input4,
        checkbox1: checkedBookItems[item1.id],
        checkbox2: checkedLibraryItems[item1.id],
        checkbox3: checkedEbookItems[item1.id],
        plan_amount: amount
      };
      console.log("subscriptionData2:", subscriptionData2)
      const url = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/create-membership-payment-session3/${item1.id}`;
      console.log("id item1::", item1.id)
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(subscriptionData2),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();

        })
        .then((responseData) => {
          setIsPlanActivated(true);
          navigation.navigate('membershipscreen');

        })
        .catch((error) => {
          console.error('Error storing data1:', error);
        });
    }
  };
  useEffect(() => {
    if (paymentSuccess2) {
      activateLifeTimePlan(selectedPlan);
    }
  }, [paymentSuccess2, selectedPlan]);



  const handleLifePlanpayment = (selectedPlan,) => {
    let totalAmount = (selectedPlan.price + selectedPlan.deposit);

    if (checkedLibraryItems[selectedPlan.id] && checkedEbookItems[selectedPlan.id]) {
      totalAmount += 300 + 500;
    } else if (checkedLibraryItems[selectedPlan.id]) {
      totalAmount += 300;
    } else if (checkedEbookItems[selectedPlan.id]) {
      totalAmount += 500;
    }
    console.log("totalamount:", totalAmount);
    setAmount(totalAmount);
    const options = {
      description: 'Credits towards consultation',
      image: require('../images/Logoelibrary.png'),
      currency: 'INR',
      key: 'rzp_test_iGWfBKpv8IcFlF',
      amount: totalAmount * 100,
      name: 'Nagpur Elibrary',
      order_id: '',
      prefill: {
        email: 'gaurav.kumar@example.com',
        contact: '9191919191',
        name: 'Nagpur Elibrary'
      },
      theme: { color: '#3498DB' },
    };

    RazorpayCheckout.open(options)
      .then(data => {
        setPaymentSuccess2(true);
        setSelectedPlan(selectedPlan);

        console.log("aftercheckbox:", selectedPlan)
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };



  // ================================================================================ \\

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

            {/* ======================modal for plan id=2(family plan)===================== */}

            <Modal
              isVisible={modalVisible}
              onBackButtonPress={() => {
                setModalVisible(false);
              }}>

              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{
                  backgroundColor: '#efefef', padding: 20,
                  borderRadius: 10, width: '90%'
                }}>

                  <View style={{ alignItems: 'flex-end', marginTop: -12, marginBottom: 5 }}>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(false);
                      }}
                      style={{
                        padding: 10, alignItems: 'center',
                        borderRadius: 5,
                      }} >
                      <AntDesign name="close" color={"grey"} size={15} style={{
                      }} />
                    </TouchableOpacity>
                  </View>

                  <Text
                    style={{
                      borderWidth: 0.5, borderColor: 'grey',
                      padding: 10, marginBottom: 10
                    }}>Sub plan</Text>
                  <TextInput
                    placeholder="Member two"
                    value={input2}
                    onChangeText={setInput2}
                    style={{ borderWidth: 0.5, borderColor: 'grey', padding: 7, marginBottom: 10 }}
                  />
                  <TextInput
                    placeholder="Member three"
                    value={input3}
                    onChangeText={setInput3}
                    style={{ borderWidth: 0.5, borderColor: 'grey', padding: 7, marginBottom: 10 }}
                  />
                  <TextInput
                    placeholder="Member four"
                    value={input4}
                    onChangeText={setInput4}
                    style={{ borderWidth: 0.5, borderColor: 'grey', padding: 7, marginBottom: 10 }}
                  />

                  <TouchableOpacity
                    disabled={isPlanActivated}
                    onPress={() => {
                      handleLifePlanpayment(selectedPlan);
                      setModalVisible(false);
                    }}
                    style={{
                      backgroundColor: '#c27b7f',
                      borderRadius: 20,
                      paddingBottom: 5,
                      paddingTop: 5,
                      alignItems: 'center',
                      width: 100,
                      alignSelf: 'center',
                      marginTop: 5
                    }}
                  >
                    <Text style={styles.buttonText}>Subscribe</Text>
                  </TouchableOpacity>

                </View>
              </View>
            </Modal>

            {/* ================choose image modal================================== */}

            <Modal
              isVisible={visible}
              onBackButtonPress={() => {
                setVisible(false);
              }}>
              <View style={{
                position: 'absolute',
                bottom: 0,
                left: 10,
                right: 10,
                backgroundColor: '#fff',
                borderRadius: 15,
                marginBottom: 30,
              }}>

                <View style={{
                  marginTop: 20,
                  marginBottom: 20,
                }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#fff',
                      padding: 5,
                    }}
                    onPress={takePhotoFromCamera}
                  >
                    <Text style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: 17,
                      textAlign: 'center',
                      color: '#3498DB'
                    }}>Take Photo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#fff',
                      padding: 5,

                    }}
                    onPress={choosePhotoFromLibrary}
                  >
                    <Text style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: 17,
                      textAlign: 'center', color: '#3498DB'
                    }}>Choose From Gallary</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      marginLeft: 10,
                      backgroundColor: '#fff',
                      padding: 5,

                    }}
                    onPress={() => {
                      setImage(''); // Reset the image when removing the profile
                      setRemoveImage(1); // Set removeImage to 1 when removing the profile
                    }}
                  >
                    <Text style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: 17,
                      textAlign: 'center',
                      color: '#3498DB'
                    }}>Remove Image</Text>
                  </TouchableOpacity>
                </View>
              </View>


              <View style={{
                position: 'absolute',
                bottom: 0,
                left: 10,
                right: 10,
                backgroundColor: '#fff',
                borderRadius: 10,
                marginBottom: -13
              }}>
                <TouchableOpacity
                  style={{
                    marginLeft: 10,
                    backgroundColor: '#fff',
                    padding: 5,
                    marginRight: 10
                  }}
                  onPress={() => {
                    setVisible(!visible);
                  }}
                >
                  <Text style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 17,
                    textAlign: 'center',
                    color: '#3498DB'
                  }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </Modal>
            {/* ========================================================================= */}


            <ScrollView>
              <View style={styles.body}>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>LIBRARY</Text>
                  <Text style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 24,
                    marginBottom: 10,
                    color: theme === 'LIGHT' ? '#000' : '#fff',
                    textAlign: 'center'
                  }}>Membership Plan</Text>
                </View>


                <View style={{ marginBottom: 50 }}>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    data={subscript.slice(1)}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) =>
                    (
                      <Animated.View style={[styles.animatedItem, animatedItemStyle]}>
                        <View style={{ backgroundColor: '#f5e0e1', borderTopRightRadius: 20, padding: 10 }}>
                          <Text style={styles.planName}>{item.name}</Text>
                        </View>
                        <View style={styles.planContainer}>

                          <View style={styles.priceContainer}>
                            <Image source={require('../images/rupee.png')} style={styles.rupeeIcon} />
                            <Text style={styles.price}>{item.price}</Text>


                            {item.id === 6 ? (
                              <Text style={styles.priceLabel}>/Yearly</Text>
                            ) : (item.id === 1 ? (
                              <Text style={styles.priceLabel}>/LifeTime</Text>
                            ) : (item.id === 2 ? (
                              <Text style={styles.priceLabel}>/Lifetime</Text>
                            ) : (item.id === 3 ? (
                              <Text style={styles.priceLabel}>/Lifetime</Text>
                            ) : (item.id === 4 ? (
                              <Text style={styles.priceLabel}>/Monthly</Text>
                            ) : (item.id === 5 ? (
                              <Text style={styles.priceLabel}>/Monthly</Text>
                            )
                              : (
                                <Text style={styles.loadingText}>Loading...</Text>
                              ))))))}

                            <Text style={[styles.price, { textAlign: 'center' }]}>  +  </Text>
                            <Image source={require('../images/rupee.png')} style={styles.rupeeIcon} />
                            <Text style={styles.price}>{item.deposit}</Text>
                            <Text style={styles.priceLabel}> Deposite</Text>
                          </View>

                          <Text style={styles.description}>{item.description}</Text>

                          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>

                            <CheckBox
                              tintColors={{ true: '#3498DB', false: 'gray' }}
                              value={checkedBookItems[item.id]}

                              onValueChange={() => {
                                // Update only if it's not a default selected checkbox
                                if (!defaultCheckedBookItems.hasOwnProperty(item.id)) {
                                  setCheckedBookItems((prevCheckedItems) => ({
                                    ...prevCheckedItems,
                                    [item.id]: !prevCheckedItems[item.id],
                                  }));
                                }
                              }}
                              style={{
                                marginLeft: (item.id === 4 || item.id === 5 || item.id === 6 ? -25 : -115),
                              }}
                            />
                            {item.id === 4 || item.id === 5 || item.id === 6 ?
                              (<View style={{ marginTop: 10 }}><Text style={{
                                alignSelf: 'center', fontSize: 12,
                                fontFamily: 'Poppins-Regular', marginLeft: -75,
                              }}>Access of Books</Text>
                                <Text style={{
                                  alignSelf: 'center', fontSize: 12,
                                  fontFamily: 'Poppins-Regular',
                                }}>(₹ 120 / Yearly + ₹ 250 Deposit)</Text></View>) : (<Text style={{
                                  alignSelf: 'center', fontSize: 12,
                                  fontFamily: 'Poppins-Regular',
                                }}>Access of Books</Text>)}
                          </View>

                          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                            <CheckBox
                              tintColors={{ true: '#3498DB', false: 'gray' }}
                              value={checkedLibraryItems[item.id]}
                              onValueChange={() => {
                                // Update only if it's not a default selected checkbox
                                if (!defaultCheckedLibraryItems.hasOwnProperty(item.id)) {
                                  setCheckedLibraryItems((prevCheckedItems) => ({
                                    ...prevCheckedItems,
                                    [item.id]: !prevCheckedItems[item.id],
                                  }));
                                }
                              }}
                              style={{
                                marginLeft: item.id === 2 || item.id === 3 || item.id === 5 || item.id === 6 ? -5 : -110
                              }}
                            />
                            {item.id === 2 || item.id === 3 || item.id === 5 || item.id === 6 ?
                              (<Text style={{
                                fontSize: 12,
                                fontFamily: 'Poppins-Regular',
                              }}>Access of Library(₹ 300 / Monthly)</Text>)
                              :
                              (<Text style={{

                                fontSize: 12,
                                fontFamily: 'Poppins-Regular',

                              }}>Access of Library</Text>)}
                          </View>

                          <View style={{
                            flexDirection: 'row', alignItems: 'center',
                            justifyContent: 'center', marginBottom: 10
                          }}>
                            <CheckBox
                              tintColors={{ true: '#3498DB', false: 'gray' }}
                              value={checkedEbookItems[item.id]}

                              onValueChange={() => {
                                // Update only if it's not a default selected checkbox
                                if (!defaultCheckedEbookItems.hasOwnProperty(item.id)) {
                                  setCheckedEbookItems((prevCheckedItems) => ({
                                    ...prevCheckedItems,
                                    [item.id]: !prevCheckedItems[item.id],
                                  }));
                                }
                              }}

                              style={{
                                marginLeft: item.id === 2 || item.id === 3 || item.id === 4 || item.id === 6 ? -10 : -112
                              }}
                            />
                            {item.id === 2 || item.id === 3 || item.id === 4 || item.id === 6 ?
                              <Text style={{
                                alignSelf: 'center',
                                fontSize: 12,
                                fontFamily: 'Poppins-Regular',
                              }}>Access of Ebook(₹ 500 / Monthly)</Text>
                              :
                              <Text style={{
                                fontSize: 12,
                                fontFamily: 'Poppins-Regular',
                              }}>Access of Ebook</Text>
                            }
                          </View>

                        </View>
                        <TouchableOpacity
                          disabled={isPlanActivated}
                          onPress={() => {
                            console.log('Selected item:', item);
                            if (item.id === 2) {
                              // Open modal containing three text inputs
                              setModalVisible(true);
                              setSelectedPlan(item);
                              // setSelectedCheckbox({checkedBookItems,checkedEbookItems,checkedLibraryItems});
                              // console.log("itemsub",item)
                            } else {
                              handlepayment(item);
                            }
                          }}
                          style={styles.subscribeButton}
                        >
                          <Text style={styles.buttonText}>Subscribe</Text>
                        </TouchableOpacity>
                      </Animated.View>
                    )
                    }
                  />
                </View>

              </View>

              {/* ====================Bpl card holder=========================== */}

              <Animated.View style={[styles.animatedItem, animatedItemStyle]}>
                <View style={{
                  marginLeft: 20,
                  marginRight: 20,
                  padding: 10,
                  borderTopRightRadius: 20,
                  backgroundColor: '#f5e0e1',
                  marginTop: -90,
                }}>
                  <Text style={styles.planName}>{subscript[0]?.name}</Text>
                </View>
                <View style={{
                  borderBottomLeftRadius: 15,
                  marginLeft: 20,
                  marginRight: 20,
                  padding: 10,
                  marginBottom: 40,
                  backgroundColor: '#f5e0e1'
                }}>
                  {image ? (
                    <View>
                      <Image
                        source={{ uri: image }}
                        style={{
                          width: 140,
                          height: 140,
                          alignSelf: 'center',
                        }}
                        resizeMode="cover"
                      />
                    </View>
                  ) : null}


                  <View style={{ flex: 0.5 }}>
                    <TouchableOpacity style={{
                      marginTop: 10,
                      borderColor: "grey",
                      borderWidth: 1,
                      paddingBottom: 8,
                      paddingTop: 8,
                      width: 130,
                      alignSelf: 'center',
                      marginBottom: 22,
                      backgroundColor: '#efefef'
                    }}
                      onPress={() => {
                        setVisible(true);
                      }}>
                      <Text style={{
                        textAlign: 'center',
                        fontFamily: 'Poppins-Regular',
                        fontSize: 13,
                        color: "#000",
                      }}>Choose Image</Text>
                    </TouchableOpacity>
                  </View>

                </View>
                <TouchableOpacity
                  disabled={isPlanActivated}
                  onPress={() => {
                    handleBplSubscription();
                  }}
                  style={{
                    marginTop: -60,
                    backgroundColor: '#c27b7f',
                    borderRadius: 20,
                    paddingBottom: 8,
                    paddingTop: 8,
                    alignItems: 'center',
                    width: 100,
                    alignSelf: 'center',
                    marginBottom: 25
                  }}
                >
                  <Text style={styles.buttonText}>Subscribe</Text>
                </TouchableOpacity>
              </Animated.View>


            </ScrollView>

          </View>
        );

      }}
    </Theme>
  );
};

export default MembershipPlan;

