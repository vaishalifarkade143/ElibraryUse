// import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, FlatList, Modal, Pressable } from 'react-native'
// import React, { useEffect, useState, useContext, useCallback } from 'react'
// import { useRoute, useNavigation } from '@react-navigation/native';
// import Header from '../common/Header';
// import { AuthContext } from '../context/AuthContext';
// import Pdf from 'react-native-pdf';
// import { Alert } from "react-native";
// import { Picker } from '@react-native-picker/picker';
// import getStyles from '../Style/logNRegStyle';
// import Theme from './Theme';
// import Entypo from 'react-native-vector-icons/Entypo';
// import Feather from 'react-native-vector-icons/Feather';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// const BooksDetail = ({ navigation }) => {
//   const [isLoaded, setisLoaded] = useState(true);
//   const route = useRoute();
//   const [tredbooks, setTredBooks] = useState([]);
//   const [seeAllTredbooks, setSeeAllTredBooks] = useState([]);
//   const { userToken, userInfo, userEmail } = useContext(AuthContext);
//   const [subscribedBooks, setSubscribedBooks] = useState([]);
//   const [genre, setGenre] = useState([]);
//   const [membershipPlanModalVisible, setMembershipPlanModalVisible] = useState(false);

//   const [ebook, setebook] = useState([]);

//   const [textShown, setTextShown] = useState(false); //To show ur remaining Text
//   const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
//   const toggleNumberOfLines = () => { //To toggle the show text or hide it
//     setTextShown(!textShown);
//   }

//   const onTextLayout = useCallback(e => {
//     setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
//   }, []);


//   //==========================ADDED=====================================
//   const [bookdetails, setBookDetails] = useState([]);
//   const [selectedLibrary, setSelectedLibrary] = useState(route.params.data.library_id);
//   console.log(selectedLibrary);
//   const [initialDataFetched, setInitialDataFetched] = useState(false);
//   const libraries = [

//     { id: 111, name: "Dindayal Upadhyay Library" },
//     { id: 222, name: "Kundanlal Gupta Library" },
//     { id: 333, name: "Rashtramata Kasturba Library" }
//   ];
//   const [libraryid, setLibraryId] = useState([]);

//   const currentDate = new Date();
//   const endDate = new Date(currentDate);
//   endDate.setDate(endDate.getDate() + 10);
//   const [modalVisible, setModalVisible] = useState(false);


//   const filename = route.params.data.items[0].pdf_preview_file;
//   const pdfBaseUrl =
//     selectedLibrary === 333
//       ? 'https://rashtramatakasturba.smartcitylibrary.com/PDFPreview/'
//       : selectedLibrary === 111
//         ? 'https://dindayalupadhyay.smartcitylibrary.com/PDFPreview/'
//         : 'https://kundanlalgupta.smartcitylibrary.com/PDFPreview/';

//   const pdfUrl = `${pdfBaseUrl}${filename}`;
//   const [pdfModalVisible, setPdfModalVisible] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [singleSubscribedPlan, setSingleSubscribedPlan] = useState(null);

//   useEffect(() => {
//     // When the modal becomes visible, load specific pages (e.g., pages 5-8)
//     if (pdfModalVisible) {
//       loadSpecificPages(5, 8);
//     }
//   }, [pdfModalVisible]);

//   const loadSpecificPages = (startPage, endPage) => {
//     // Set the source with page range
//     const source = { uri: `${pdfUrl}#page=${startPage}-${endPage}` };
//     setTotalPages(endPage - startPage + 1);
//     setCurrentPage(startPage);
//     setPdfModalVisible(true);
//   };

//   //-----------------for convertion of date to personalized style date ----------------------------
//   function formatDate(inputDate) {

//     const inputDateObj = new Date(inputDate);


//     const monthNames = [
//       'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//     ];

//     const day = inputDateObj.getDate();
//     const month = monthNames[inputDateObj.getMonth()];
//     const year = inputDateObj.getFullYear();


//     let daySuffix;
//     if (day >= 11 && day <= 13) {
//       daySuffix = 'th';
//     } else {
//       switch (day % 10) {
//         case 1:
//           daySuffix = 'st';
//           break;
//         case 2:
//           daySuffix = 'nd';
//           break;
//         case 3:
//           daySuffix = 'rd';
//           break;
//         default:
//           daySuffix = 'th';
//       }
//     }
//     const formattedDate = `${day}${daySuffix} ${month}, ${year}`;
//     return formattedDate;
//   }

//   const startDate = formatDate(currentDate);
//   const endingDate = formatDate(endDate);


//   //------------------handle of navigation to book history page for  reserve book---------------------------
//   const image = route.params.data.image_path;

//   const handleBookHistory = (item) => {


//     const subscriptionData1 = {
//       image_path: image,
//       book_item_id: book1[0]?.id,
//       library_id: selectedLibrary
//     };

//     console.log('data retrived butttttl::::', subscriptionData1,item[0]?.id);
//     const url = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/books/${item[0]?.id}/reserve-book`;

//     fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${userToken}`,
//       },
//       body: JSON.stringify(subscriptionData1),
//     })

//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         console.log("responce is:", response);
//         return response.json();
//       })
//       .then((responseData) => {
//         // console.log('Data stored successfully:', responseData);
//         navigation.navigate('subscribebookHistory', { singleSubscribedPlan });
//         console.log("plan not render", singleSubscribedPlan)
//       })

//       .catch((error) => {
//         // console.error('Error storing data:', error);
//       });
//   }




//   // =================  for single data view ============================
//   const fetchSinglePlan = () => {
//     const singleUrl = 'https://dindayalupadhyay.smartcitylibrary.com/api/v1/membership-details';

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
//         // console.log('Single Subscribed Plan Data responce:', res.data);
//         setSingleSubscribedPlan(res.data);
//         // setIsLoading(false); // Data has been loaded
//         // console.log('Single Subscribed Plan Data:', singleSubscribedPlan);
//       })
//       .catch((error) => {
//         // console.error('Error fetching data:', error);


//       });
//   };



//   useEffect(() => {
//     if (userToken !== null) {
//       const unsubscribe = navigation.addListener('focus', () => {
//         fetchSinglePlan();
//       });
//       return unsubscribe;
//     }

//   }, [navigation, userToken]);
//   // console.log('singleSubscribedPlan---------', singleSubscribedPlan);



//   // ====================================== on click of subscribe=============================================

//   const handleSubscribeShowModal = () => {
//     if (userToken !== null && plan_exist[0] !== null) {               //&& Plan_exist !== null
//       const apiUrl = 'https://dindayalupadhyay.smartcitylibrary.com/api/v1/e-books';

//       fetch(apiUrl, {
//         method: 'GET',
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//           }
//           return response.json();
//         })
//         .then((data) => {
//           setebook(data.data);
//           console.log("all ebook name", data.data[0].name);

//         })
//         .catch((error) => {
//           console.error('Error fetching data:', error);
//         });
//     }
//   }
//   // const bookStatus = libraryid[0]?.subscription.book_status;
//   // console.log("Book Status:", bookStatus); // Output: "1"

//   const handleSubscribe = async () => {

//     try {
//       const member_id = userInfo.data.user.id;
//       console.log('member_id:::', member_id);
//       const id = book1[0]?.id;
//       console.log('data id:::', id);


//       const library_id = selectedLibrary;
//       const subscriptionData = {
//         issued_on: startDate,
//         returned_on: endDate,
//         ebook_id: id,
//         member_id: member_id,
//         library_id: library_id,
//         razorpay_payment_id: 'NA',
//         renew: false,
//         amount: 10,
//       };
//       // console.log('subscriptionData===', subscriptionData);

//       const url = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/ebook-subscription`;
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${userToken}`,
//         },
//         body: JSON.stringify(subscriptionData),

//       });


//       if (!response.ok) {
//         throw new Error(`Failed to subscribe. Status: ${response.status}`);
//       }

//       const responseData = await response.json();
//       // console.log('ebook response Data:', responseData);

//       setModalVisible(!modalVisible);
//       navigation.navigate('myEBook', { singleSubscribedPlan });
//       // console.log('singleSubscribedPlan in BookDetails:', singleSubscribedPlan);
//     }
//     catch (error) {
//       console.error('Error handling subscription:', error.message);
//     }
//   };


//   // =================================== treding books =============================

//   useEffect(() => {
//     const tredingbooks = () => {
//       fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books?order_by=created_at&limit=4&library_id=111")
//         .then(res => res.json())
//         .then(responce => {
//           setTredBooks(responce.data);//.splice(8)
//           setGenre(responce.data);
//           setisLoaded(false);
//         });
//     };
//     const unsubscribe = navigation.addListener('focus', () => {
//       tredingbooks();
//     });

//     return unsubscribe;
//   }, []);

//   useEffect(() => {
//     const seeAlltredingbooks = () => {
//       fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books?order_by=created_at&limit=23&library_id=111")
//         .then(res => res.json())
//         .then(responce => {
//           setSeeAllTredBooks(responce.data);
//           setisLoaded(false);
//         });
//     };
//     const unsubscribe = navigation.addListener('focus', () => {
//       seeAlltredingbooks();
//     });

//     return unsubscribe;
//   }, []);

//   // ======================================================================================

//   useEffect(() => {
//     if (userToken !== null) {
//       const id = userInfo.data.user.id;
//       console.log(id);
//       const apiUrl = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/is-member-registered/${id}`;

//       fetch(apiUrl, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${userToken}`,
//           'Content-Type': 'application/json',
//         },
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//           }
//           return response.json();
//         })
//         .then((data) => {
//           setLibraryId(data.data);

//         })
//         .catch((error) => {
//           // console.error('Error fetching data:', error);
//         });
//     }

//   }, [])


//   const itemsValue1 = subscribedBooks.filter((item, i) =>

//     item.ebook_id === route.params.data.items[0].id &&
//     item.library_id === selectedLibrary &&
//     item.email === userEmail)
//     ;
//   const itemsValue = itemsValue1.length;


//   useEffect(() => {
//     const id = route.params.data.id;
//     const apiUrl = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/search-books?id=${id}&search_by_book=true&library_id=${selectedLibrary}`;

//     fetch(apiUrl, {
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
//       .then((data) => {
//         setBookDetails(data.data);
//         setInitialDataFetched(true);

//       })
//       .catch((error) => {
//         // console.error('Error fetching data:', error);
//       });
//   }, [route, tredbooks])


//   //===================API CALL FOR DIFFERENT LIBRARY WHEATHER THE MEMBER IS REGISTERED OR NOT=======================


//   const handle_member = () => {

//     const id = userInfo.data.user.id;
//     const apiUrl = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/is-member-registered/${id}`;

//     fetch(apiUrl, {
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
//       .then((data) => {
//         setLibraryId(data.data);

//       })
//       .catch((error) => {
//         // console.error('Error fetching data:', error);
//       });
//   }


//   useEffect(() => {
//     if (userToken !== null) { handle_member(); }
//   }, [route, tredbooks])




//   const membership_exist = libraryid.map((item) => [
//     item.membership_plan_name,
//   ]);
//   console.log("mlan:", membership_exist);
//   const plan_exist = membership_exist.flat();
//   console.log("olan:", plan_exist[0]);

//   //===================API CALL FOR register-member-to-library=======================  

//   const handleMemberRegistered = (item) => {
//     const url = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/register-member-to-library/${item}`;
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
//         return response.json();
//       })
//       .then((responseData) => {
//         setModalVisible(!modalVisible);
//         Alert.alert(
//           'Success!',
//           'You are successfully registered with same email and password'
//         )
//       })
//       .catch((error) => {
//         // console.error('Error storing data:', error);
//       });
//   };


//   const userLibraryId = libraryid.map((item) => [
//     item.user_library_id,
//   ]);
//   const LibraryId = userLibraryId.flat();


//   const book1 = bookdetails.filter((item) =>
//     item.book.library_id === route.params.data.library_id)


//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [status1, setStatus1] = useState(false);
//   // if library is chnage then status become true
//   const libraryOnChange = (item) => {
//     const selectedLibraryId = item;
//     setSelectedLibrary(item);
//     setStatus1(true);
//     const filteredDetails = bookdetails.filter(
//       (item) => item.book.library_id === selectedLibraryId
//     );
//     setFilteredUsers(filteredDetails);

//   };
//   console.log("user", filteredUsers[0]);


//   return (
//     <Theme>
//       {({ theme }) => {
//         const styles = getStyles(theme);
//         return (

//           <View style={styles.container}>

//             <Header
//               leftIcon={require('../images/back.png')}
//               onClickLeftIcon={() => {
//                 // navigation.navigate('Book', { screen: 'Home' });
//                 navigation.goBack();
//               }}

//             />
//             <ScrollView showsVerticalScrollIndicator={false}  >
//               <Modal
//                 animationType="slide"
//                 transparent={true}
//                 visible={modalVisible}
//                 onRequestClose={() => {
//                   setModalVisible(!modalVisible);
//                 }}>

//                 <View style={styles.centeredView}>
//                   {LibraryId.includes(selectedLibrary) ?
//                     (<View style={styles.modalView}>

//                       <Text style={styles.subscribeText}>The Book Will be Subscribed from</Text>
//                       <View style={{ flexDirection: 'row', marginBottom: 15, }}>
//                         <Text style={styles.subscribeDate}>{startDate}</Text>
//                         <Text style={styles.subscribeText}>  to  </Text>
//                         <Text style={styles.subscribeDate}>{endingDate}</Text>
//                       </View>
//                       <Pressable
//                         style={styles.button}
//                         onPress={() => {
//                           if(libraryid[0]?.subscription.ebook_status !== null){
//                           handleSubscribe(),
//                           handle_member()
//                           }
//                           else{
//                             navigation.navigate('membershipscreen')
//                           }
//                         }}>
//                         <Text style={styles.textStyle}>Subscribe</Text>
//                       </Pressable>

//                     </View>) :
//                     (<View style={styles.modalView}>

//                       <Text style={styles.modalText}>Book Reservation/Subscription</Text>
//                       <View style={{ marginBottom: 15, }}>

//                         <View style={{ flexDirection: 'row' }}>
//                           <Text>These books belong to </Text>
//                           <Text style={styles.libraryName}>
//                             {selectedLibrary === 111 ? 'Dindayal Upadhyay Library' :
//                               selectedLibrary === 222 ? 'Kundanlal Gupta Library' :
//                                 'Rashtramata Kasturba Library'}
//                           </Text>
//                           <Text>. </Text>
//                         </View>


//                         <Text>You are not a member yet. Do you want to register </Text>
//                         <View style={{ flexDirection: 'row' }}>
//                           <Text>for </Text>
//                           <Text style={styles.libraryName}>
//                             {selectedLibrary === 111 ? 'Dindayal Upadhyay Library' :
//                               selectedLibrary === 222 ? 'Kundanlal Gupta Library' :
//                                 'Rashtramata Kasturba Library'}
//                           </Text>
//                           <Text> and continue?</Text>
//                         </View>

//                       </View>

//                       <View style={{ flexDirection: 'row', gap: 10 }}>
//                         <Pressable
//                           style={styles.button}
//                           onPress={() => {
//                             // handleMemberRegistered(selectedLibrary),
//                             //   handle_member()


//                             // on change of library from picker
//                             navigation.navigate('Membershipplan')
//                             handleMemberRegistered(selectedLibrary),
//                             handle_member()


//                           }}>
//                           <Text style={styles.textStyle}>Yes</Text>
//                         </Pressable>

//                         <Pressable
//                           style={styles.button}
//                           onPress={() => setModalVisible(!modalVisible)}>
//                           <Text style={styles.textStyle}>No</Text>
//                         </Pressable>
//                       </View>


//                     </View>)}
//                 </View>
//               </Modal>
//               {/* ======================================Membership Plan Modal============================================================ */}
//               <Modal
//                 animationType="slide"
//                 transparent={true}
//                 visible={membershipPlanModalVisible}
//                 onRequestClose={() => {
//                   setMembershipPlanModalVisible(!membershipPlanModalVisible);
//                 }}>
//                 <View style={styles.centeredView}>
//                   <View style={styles.modalView}>
//                     <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', paddingBottom: 10 }}>You don't have any Membership Plan.Please choose any Plan.</Text>

//                     <View style={{ flexDirection: 'row', gap: 10 }}>
//                       <Pressable
//                         style={styles.button}
//                         onPress={() => {
//                           navigation.navigate('Membershipplan')
//                         }}>
//                         <Text style={styles.textStyle}>Yes</Text>
//                       </Pressable>

//                       <Pressable
//                         style={styles.button}
//                         onPress={() => setMembershipPlanModalVisible(!membershipPlanModalVisible)}>
//                         <Text style={styles.textStyle}>No</Text>
//                       </Pressable>
//                     </View>
//                   </View>
//                 </View>
//               </Modal>


//               {/* ===============================Pdf Modal============================================== */}

//               <Modal
//                 animationType="slide"
//                 transparent={true}
//                 visible={pdfModalVisible}
//                 onRequestClose={() => {
//                   setPdfModalVisible(false);
//                 }}>
//                 <View style={styles.centeredView}>
//                   <View style={styles.modalView}>
//                     <Pdf
//                       trustAllCerts={false}
//                       source={{ uri: pdfUrl }}
//                       onLoadComplete={(numberOfPages, filePath) => {
//                         setTotalPages(numberOfPages);
//                       }}
//                       onPageChanged={(page, numberOfPages) => {
//                         setCurrentPage(page);
//                       }}
//                       onError={(error) => {
//                       }}
//                       onPressLink={(uri) => {
//                       }}
//                       scale={totalPages > 8 ? 8 / totalPages : 1}
//                       style={styles.pdf}
//                     />
//                     <View style={styles.pageButton}>
//                       <Text style={styles.pageButtonText}> {currentPage}</Text>
//                     </View>
//                   </View>
//                 </View>
//               </Modal>


//               {status1 ?
//                 (<View style={{
//                   marginTop: -30,
//                 }}>
//                   <View style={{
//                     flexDirection: 'row',
//                   }}>
//                     <View style={{
//                       width: 110,
//                       marginTop: 14 / 2,
//                       overflow: 'visible',
//                       marginLeft: 20,
//                       marginTop: 40,
//                     }}>
//                       <Image source={{
//                         uri: filteredUsers[0]?.book?.image_path
//                       }}
//                         style={{
//                           aspectRatio: 0.7,
//                           resizeMode: 'contain',
//                           borderRadius: 5,
//                           marginRight: 10,
//                         }}
//                       />
//                     </View>
//                     <View>

//                       <View >
//                         <Text onTextLayout={onTextLayout}
//                           style={styles.nameofBook}
//                         >{filteredUsers[0]?.book?.name}</Text>

//                       </View>


//                       <View style={styles.author}>
//                         <Text >{filteredUsers[0]?.book?.authors[0].first_name}{' '}
//                           {filteredUsers[0]?.book?.authors[0].last_name}</Text>
//                       </View>

//                       <View style={styles.publisher}>
//                         <Text >{filteredUsers[0]?.publisher?.name}</Text>
//                       </View>
//                     </View>

//                   </View>

//                   <View style={{
//                     flexDirection: 'row',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginTop: 25,
//                     marginBottom: 20,
//                   }}>

//                     <View style={{
//                       borderRightColor: '#2826268a',
//                       borderRightWidth: 1,
//                       justifyContent: 'center',
//                       alignItems: 'center'
//                     }}>
//                       <AntDesign name="book" color={"gray"} size={25}
//                         style={{
//                           marginLeft: 45,
//                           marginRight: 45,
//                         }}
//                       />
//                       {filteredUsers[0]?.format === 3 ?
//                         (<Text
//                           style={styles.textHeadingOutput}
//                         >E-Book</Text>)
//                         : filteredUsers[0]?.format === 1 ?
//                           (<Text
//                             style={styles.textHeadingOutput}
//                           >hardcover</Text>) :
//                           (<Text
//                             style={styles.textHeadingOutput}
//                           >Book</Text>)}


//                     </View>

//                     <View style={{
//                       borderRightColor: '#2826268a', justifyContent: 'center',
//                       alignItems: 'center', borderRightWidth: 1
//                     }}>
//                       <Entypo name="bookmarks" color={"gray"} size={15}
//                         style={{
//                           marginLeft: 30,
//                           marginRight: 45,
//                         }} />
//                       <Text style={styles.textHeadingOutput}>{filteredUsers[0]?.book?.genres[0].name}</Text>

//                     </View>
//                     <View style={{ justifyContent: 'center', alignItems: 'center' }}>
//                       <Feather name="edit" color={"gray"} size={15}
//                         style={{
//                           marginLeft: 25,
//                           marginRight: 25,
//                         }} />
//                       <Text style={styles.textHeadingOutput}>{filteredUsers[0]?.edition}</Text>
//                     </View>
//                   </View>

//                 </View>
//                 )
//                 :
//                 (<View style={{
//                   marginTop: -30,
//                 }}>
//                   <View style={{
//                     flexDirection: 'row',
//                   }}>
//                     <View style={{
//                       width: 110,
//                       marginTop: 14 / 2,
//                       overflow: 'visible',
//                       marginLeft: 20,
//                       marginTop: 40,
//                     }}>
//                       <Image source={{
//                         uri: book1[0]?.book?.image_path
//                       }}
//                         style={{
//                           aspectRatio: 0.7,
//                           resizeMode: 'contain',
//                           borderRadius: 5,
//                           marginRight: 10,
//                         }}
//                       />
//                     </View>
//                     <View>

//                       <Text onTextLayout={onTextLayout}
//                         style={styles.nameofBook}
//                       >{book1[0]?.book?.name}</Text>
//                       <Text style={styles.author}>{book1[0]?.book?.authors[0].first_name}{' '}
//                         {book1[0]?.book?.authors[0].last_name}</Text>
//                       <Text
//                         style={styles.publisher}>{book1[0]?.publisher?.name}</Text>

//                     </View>

//                   </View>

//                   <View style={{
//                     flexDirection: 'row',
//                     justifyContent: 'space-evenly',
//                     marginTop: 25,
//                     marginBottom: 20,
//                   }}>

//                     <View style={{
//                       borderRightColor: '#2826268a',
//                       borderRightWidth: 1,
//                       justifyContent: 'center',
//                       alignItems: 'center'
//                     }}>
//                       <AntDesign name="book" color={"gray"} size={25}
//                         style={{
//                           marginLeft: 45,
//                           marginRight: 45,
//                         }}
//                       />
//                       {book1[0]?.format === 3 ?
//                         (<Text style={styles.textHeadingOutput}>E-Book</Text>)
//                         : book1[0]?.format === 1 ?
//                           (<Text style={styles.textHeadingOutput}>hardcover</Text>) :
//                           (<Text style={styles.textHeadingOutput}>Book</Text>)}

//                     </View >


//                     <View style={{
//                       borderRightColor: '#2826268a',
//                       borderRightWidth: 1,
//                       justifyContent: 'center',
//                       alignItems: 'center'
//                     }}>
//                       <Entypo name="bookmarks"
//                         color={"gray"} size={25}
//                         style={{
//                           marginLeft: 30,
//                           marginRight: 45,
//                         }}
//                       />
//                       <Text style={[styles.textHeadingOutput, { marginLeft: -10 }]}>
//                         {book1[0]?.book?.genres[0].name}</Text>
//                     </View>

//                     <View style={{ justifyContent: 'center', alignItems: 'center' }}>
//                       <Feather name="edit" color={"gray"} size={25}
//                         style={{
//                           marginLeft: 25,
//                           marginRight: 25,
//                         }}
//                       />
//                       <Text style={styles.textHeadingOutput}>{book1[0]?.edition}</Text>
//                     </View>
//                   </View>
//                 </View>
//                 )
//               }

//               <View style={{
//                 width: 330,
//                 height: .3,
//                 backgroundColor: '#000',
//                 alignSelf: 'center'
//               }}>
//               </View>


//               <Text style={[styles.textHeading, {
//                 marginLeft: 20,
//                 marginTop: 10,
//                 marginBottom: 5
//               }]}>Belongs To:</Text>

//               <View style={{
//                 flexDirection: 'column',
//                 marginLeft: 20,
//                 marginRight: 20,
//                 borderColor: 'grey',
//                 borderWidth: 1.5,
//                 borderRadius: 5
//               }}>
//                 <Picker
//                   selectedValue={selectedLibrary}
//                   onValueChange={(itemValue) => libraryOnChange(itemValue)}
//                   style={{
//                     height: 40,
//                     marginTop: -14,
//                     textAlign: 'center',
//                     fontFamily: 'Poppins-Regular',
//                     borderWidth: 0.2,
//                     borderColor: '#efefef'
//                   }}

//                   itemStyle={{}}
//                 >
//                   {libraries.map((library) => (
//                     <Picker.Item
//                       key={library.id}
//                       label={library.name}
//                       value={library.id}
//                       enabled={bookdetails.some((book) => 
//                         book.book.library_id === library.id)}
//                     />
//                   ))}
//                 </Picker>
//               </View>


//               <View style={styles.textHeadingView}>
//                 <Text style={styles.textHeading}>Description:</Text>
//               </View>

//               {status1 ?
//                 (<View>
//                   <Text onTextLayout={onTextLayout}
//                     numberOfLines={textShown ? undefined : 3}
//                     style={{
//                       fontSize: 13,
//                       color: theme === 'LIGHT' ? '#000' : '#fff',
//                       fontFamily: 'OpenSans-Regular',
//                       marginLeft: 20,
//                       marginRight: 20
//                     }}
//                   >{filteredUsers[0]?.book?.description}</Text>
//                   {
//                     lengthMore ?
//                       <Text
//                         onPress={toggleNumberOfLines}
//                         style={{
//                           marginLeft: 20,
//                           fontFamily: 'OpenSans-Regular',
//                         }}>
//                         {textShown ? 'Read less...' : 'Read more...'}
//                       </Text>
//                       : null
//                   }
//                 </View>
//                 ) :
//                 (<View>
//                   <Text onTextLayout={onTextLayout}
//                     numberOfLines={textShown ? undefined : 3}
//                     style={{
//                       fontSize: 13,
//                       color: theme === 'LIGHT' ? '#000' : '#fff',
//                       fontFamily: 'OpenSans-Regular',
//                       marginLeft: 20,
//                       marginRight: 20
//                     }}
//                   >{book1[0]?.book?.description}</Text>

//                   {
//                     lengthMore ?
//                       <Text
//                         onPress={toggleNumberOfLines}
//                         style={{
//                           marginLeft: 20,
//                           fontFamily: 'OpenSans-Regular',
//                         }}>
//                         {textShown ? 'Read less...' : 'Read more...'}
//                       </Text>
//                       : null
//                   }
//                 </View>
//                 )
//               }

//               <Text style={[styles.textHeading, {
//                 marginLeft: 20,
//                 marginTop: 10,
//                 marginBottom: 5
//               }]}>Availability: </Text>

//               <View>
//                 {status1 ?
//                   (<View style={{ flexDirection: 'row' }}>
//                     <Text style={[styles.batch1, {
//                       marginLeft: 20,
//                       backgroundColor: filteredUsers[0]?.format === 2 && book1[0]?.status === 1 ? '#B6FFC0' : '#efefef',
//                       borderColor: filteredUsers[0]?.format === 2 && book1[0]?.status === 1 ? '#B6FFC0' : '#efefef',
//                       color: filteredUsers[0]?.format === 2 && book1[0]?.status === 1 ? 'green' : 'grey',
//                     }]}>
//                       {filteredUsers[0]?.format === 2 && filteredUsers[0]?.status === 1
//                         ? 'Paperback(1)'
//                         : 'Paperback(0)'
//                       }
//                     </Text>
//                     <Text style={[styles.batch1, {
//                       marginLeft: 7,
//                       backgroundColor: filteredUsers[0]?.format === 1 && book1[0]?.status === 1 ? '#B6FFC0' : '#efefef',
//                       borderColor: filteredUsers[0]?.format === 1 && book1[0]?.status === 1 ? '#B6FFC0' : '#efefef',
//                       color: filteredUsers[0]?.format === 1 && book1[0]?.status === 1 ? 'green' : 'grey',
//                     }]}>
//                       {filteredUsers[0]?.format === 1 && filteredUsers[0]?.status === 1
//                         ? 'Hardcover(1)'
//                         : 'Hardcover(0)'
//                       }
//                     </Text>
//                     <Text style={[styles.batch1, {
//                       marginLeft: 7,
//                       backgroundColor: filteredUsers[0]?.format === 3 && book1[0]?.status === 1 ? '#B6FFC0' : '#efefef',
//                       borderColor: filteredUsers[0]?.format === 3 && book1[0]?.status === 1 ? '#B6FFC0' : '#efefef',
//                       color: filteredUsers[0]?.format === 3 && book1[0]?.status === 1 ? 'green' : 'grey',
//                     }]} >
//                       Ebook(
//                       {filteredUsers ? 20 - filteredUsers[0]?.ebooksubscriptions.length : 0}
//                       )
//                     </Text>
//                   </View>) 
//                   : 
//                   (<View style={{ flexDirection: 'row', }}>
//                     <Text style={[styles.batch1, {
//                       marginLeft: 20,
//                       backgroundColor: book1[0]?.format === 2 && book1[0]?.status === 1 ? '#B6FFC0' : '#efefef',
//                       borderColor: book1[0]?.format === 2 && book1[0]?.status === 1 ? '#B6FFC0' : '#efefef',
//                       color: book1[0]?.format === 2 && book1[0]?.status === 1 ? 'green' : 'grey',
//                     }]}>
//                       {book1[0]?.format === 2 && book1[0]?.status === 1
//                         ? 'Paperback(1)'
//                         : 'Paperback(0)'
//                       }
//                     </Text>
//                     <Text
//                       style={[styles.batch1, {
//                         marginLeft: 7,
//                         backgroundColor: book1[0]?.format === 1 && book1[0]?.status === 1 ? '#B6FFC0' : '#efefef',
//                         borderColor: book1[0]?.format === 1 && book1[0]?.status === 1 ? '#B6FFC0' : '#efefef',
//                         color: book1[0]?.format === 1 && book1[0]?.status === 1 ? 'green' : 'grey',
//                       }]}
//                     >
//                       {book1[0]?.format === 1 && book1[0]?.status === 1
//                         ? 'Hardcover(1)'
//                         : 'Hardcover(0)'
//                       }
//                     </Text>
//                     <Text style={[styles.batch1, {
//                       marginLeft: 7,
//                       backgroundColor: book1[0]?.format === 3 && book1[0]?.status === 1 ? '#B6FFC0' : '#efefef',
//                       borderColor: book1[0]?.format === 3 && book1[0]?.status === 1 ? '#B6FFC0' : '#efefef',
//                       color: book1[0]?.format === 3 && book1[0]?.status === 1 ? 'green' : 'grey',
//                     }]}
//                     >
//                       Ebook(
//                       {book1
//                         ? 20 - book1[0]?.ebooksubscriptions.length
//                         : 0}
//                       )
//                     </Text>
//                   </View>)
//                 }
//               </View>



//               {status1 ?
//                 (<View style={{ flexDirection: 'column' }}>
//                   {userToken !== null &&
//                     itemsValue ? (<Text style={{
//                       backgroundColor: 'grey',
//                       padding: 10,
//                       borderRadius: 5,
//                       width: 170,
//                       height: 40,
//                       marginTop: 20,
//                       marginLeft: 20,
//                       marginBottom: 20,
//                       color: 'black',
//                       textAlign: 'center',
//                       fontSize: 15,
//                       fontWeight: 'bold',
//                       opacity: 0.4
//                     }}>Ebook is Subscribed</Text>) :
//                     (<View style={{ flexDirection: 'row' }}>
//                       <TouchableOpacity
//                         style={{
//                           backgroundColor: '#c27b7f',
//                           padding: 5,
//                           borderRadius: 10,
//                           width: 100,
//                           height: 35,
//                           marginTop: 20,
//                           marginLeft: 13,
//                           marginBottom: 20,

//                         }}
//                         onPress={() => {
//                           if (userToken !== null &&
//                             plan_exist[0] === null) {
//                             setMembershipPlanModalVisible(!membershipPlanModalVisible);
//                           }
//                           else {
//                             if (userToken !== null) {

//                               if (filteredUsers[0]?.format === 3) {
//                                 handleSubscribeShowModal();
//                                 handle_member();
//                                 setModalVisible(!modalVisible);
//                               } else {
//                                 if (LibraryId.includes(selectedLibrary)) {
//                                   handleBookHistory(book1);
//                                 } else {
//                                   handleSubscribeShowModal();

//                                   handle_member();
//                                   setModalVisible(!modalVisible);
//                                 }
//                               }
//                             }
//                             else {
//                               navigation.navigate('sLogin');
//                             }
//                           }
//                         }}
//                       >
//                         <Text style={{
//                           color: '#fff',
//                           fontFamily: 'OpenSans-Regular',
//                           fontSize: 15,
//                           textAlign: 'center',
//                         }}> 
//                         {filteredUsers[0]?.format === 3 ? 'Subscribe' : 'Reserved'}</Text>
//                       </TouchableOpacity>


//                       {userToken !== null &&
//                         filteredUsers[0]?.format === 3 &&
//                         filteredUsers[0]?.pdf_preview_file !== null ?
//                         (<TouchableOpacity
//                           style={{
//                             backgroundColor: '#c27b7f',
//                             padding: 5,
//                             borderRadius: 10,
//                             width: 100,
//                             height: 35,
//                             marginTop: 20,
//                             marginLeft: 20,
//                             marginBottom: 20,
//                           }}
//                           onPress={() => {
//                             setPdfModalVisible(true);
//                           }}
//                         >
//                           <Text style={{
//                             color: '#fff',
//                             fontFamily: 'OpenSans-Regular',
//                             fontSize: 15,
//                             textAlign: 'center',
//                           }}>Preview</Text>
//                         </TouchableOpacity>) : null
//                       }

//                     </View>)
//                   }
//                 </View>)
//                 :
//                 (<View style={{ flexDirection: 'column' }}>
//                   {userToken !== null &&
//                     itemsValue ? (<Text style={{
//                       backgroundColor: 'grey',
//                       padding: 10,
//                       borderRadius: 5,
//                       width: 170,
//                       height: 40,
//                       marginTop: 20,
//                       marginLeft: 20,
//                       marginBottom: 20,
//                       color: 'black',
//                       textAlign: 'center',
//                       fontSize: 15,
//                       fontWeight: 'bold',
//                       opacity: 0.4
//                     }}>Ebook is Subscribed</Text>) :

//                     //now done
//                     (book1[0]?.format === 1 && book1[0]?.status === 1 || book1[0]?.format === 3 ?

//                       (<View style={{ flexDirection: 'row' }}>
//                         <TouchableOpacity
//                           style={{
//                             backgroundColor: '#c27b7f',
//                             padding: 5,
//                             borderRadius: 10,
//                             width: 100,
//                             height: 35,
//                             marginTop: 20,
//                             marginLeft: 13,
//                             marginBottom: 20,
//                           }}
//                           onPress={() => {
//                             if (userToken !== null &&
//                               plan_exist[0] === null) {
//                               setMembershipPlanModalVisible(!membershipPlanModalVisible);
//                             }
//                             else {
//                               if (userToken !== null) {

//                                 if (book1[0]?.format === 3) {
//                                   handleSubscribeShowModal();

//                                   handle_member();
//                                   setModalVisible(!modalVisible);
//                                 } else {
//                                   if (LibraryId.includes(selectedLibrary)) {
//                                     handleBookHistory(book1);
//                                   } else {
//                                     handleSubscribeShowModal();
//                                     handle_member();
//                                     setModalVisible(!modalVisible);
//                                   }
//                                 }
//                               }
//                               else {
//                                 navigation.navigate('sLogin');
//                               }
//                             }
//                           }}
//                         >
//                           <Text style={{
//                             color: '#fff',
//                             fontFamily: 'OpenSans-Regular',
//                             fontSize: 15,
//                             textAlign: 'center',
//                           }}>
//                             {book1[0]?.format === 3 ? 'Subscribe' : 'Reserved'}

//                           </Text>
//                         </TouchableOpacity>


//                         {userToken !== null &&
//                           book1[0]?.format === 3 &&
//                           book1[0]?.pdf_preview_file !== null ?
//                           (<TouchableOpacity
//                             style={{
//                               backgroundColor: '#c27b7f',
//                               padding: 5,
//                               borderRadius: 10,
//                               width: 100,
//                               height: 35,
//                               marginTop: 20,
//                               marginLeft: 20,
//                               marginBottom: 20,
//                             }}
//                             onPress={() => {
//                               setPdfModalVisible(true);
//                             }}
//                           >
//                             <Text style={{
//                               color: '#fff',
//                               fontFamily: 'OpenSans-Regular',
//                               fontSize: 15,
//                               textAlign: 'center',
//                             }}>Preview</Text>
//                           </TouchableOpacity>) : null}
//                       </View>


//                       ) : []

//                     )}
//                 </View>
//                 )
//               }










//               {/* =================================Trending books==================================== */}

//               <View style={{
//                 flexDirection: 'row',
//                 marginVertical: 5,
//                 justifyContent: 'space-between',
//                 marginLeft: 20,
//                 marginRight: 20,
//               }}>
//                 <Text style={styles.coroselheading}>Trending Books</Text>

//                 <TouchableOpacity onPress={() => {
//                   navigation.navigate('filterData', { seeAllTredbooks })
//                 }}>
//                   <Image
//                     source={require('../images/arrow-right.png')}
//                     style={styles.categoryIcon}
//                   />
//                 </TouchableOpacity>
//               </View>
//               <View style={{
//                 marginTop: 10,
//                 marginStart: 20,
//                 backgroundColor: theme === 'light' ? '#000' : '#fff'
//               }}>
//                 <FlatList
//                   horizontal={true}
//                   snapToInterval={200} // Adjust the interval based on your design
//                   decelerationRate="fast"
//                   contentContainerStyle={{
//                     gap: -10,
//                     paddingHorizontal: 12,
//                   }}
//                   showsHorizontalScrollIndicator={false}
//                   keyExtractor={(item) => item.id}
//                   data={tredbooks}
//                   renderItem={({ item }) =>
//                     <TouchableOpacity
//                       style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         flexDirection: 'row',
//                         width: 180,
//                         height: 300
//                       }}
//                       onPress={() => {
//                         navigation.navigate('BooksDetailPage', { data: item })
//                       }}>
//                       <View style={{
//                         width: 155,
//                         height: 300,
//                         marginEnd: 50,
//                       }}>
//                         <View style={{
//                           elevation: 5,
//                           borderRadius: 5,
//                           color: '#000'
//                         }}>
//                           <Image source={{ uri: item.image_path }}
//                             style={{
//                               aspectRatio: 0.7,
//                               resizeMode: 'contain',
//                               borderRadius: 10,
//                             }} />
//                         </View>
//                         <Text style={{
//                           marginTop: 10,
//                           fontSize: 15,
//                           fontFamily: 'Poppins-Regular',
//                           color: theme === 'LIGHT' ? '#34495E' : '#fff',
//                           flexDirection: 'column'
//                         }} numberOfLines={1}>
//                           {item.name}
//                         </Text>
//                         <Text style={styles.bookName1} numberOfLines={1}>
//                           {item.authors[0].first_name}{' '}{item.authors[0].last_name}
//                         </Text>
//                       </View>
//                     </TouchableOpacity>
//                   }
//                 />
//               </View>


//             </ScrollView>
//           </View >
//         );
//       }}
//     </Theme >
//   );
// };

// export default BooksDetail;

//===========================================

//Note: 'filteredUsers' load when we primarily render to book details
//'book1' load when we change library

import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, FlatList, Modal, Pressable } from 'react-native'
import React, { useEffect, useState, useContext, useCallback } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native';
import Header from '../common/Header';
import { AuthContext } from '../context/AuthContext';
import Pdf from 'react-native-pdf';
import { Alert } from "react-native";
import { Picker } from '@react-native-picker/picker';
import getStyles from '../Style/logNRegStyle';
import Theme from './Theme';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

const BooksDetail = ({ navigation }) => {
  const [isLoaded, setisLoaded] = useState(true);
  const route = useRoute();
  const [tredbooks, setTredBooks] = useState([]);
  const [seeAllTredbooks, setSeeAllTredBooks] = useState([]);
  const { userToken, userInfo, userEmail } = useContext(AuthContext);
  const [subscribedBooks, setSubscribedBooks] = useState([]);
  const [genre, setGenre] = useState([]);
  const [membershipPlanModalVisible, setMembershipPlanModalVisible] = useState(false);

  const [ebook, setebook] = useState([]);

  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => { //To toggle the show text or hide it
    setTextShown(!textShown);
  }

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
  }, []);


  //==========================ADDED=====================================
  const [bookdetails, setBookDetails] = useState([]);
  const [selectedLibrary, setSelectedLibrary] = useState(route.params.data.library_id);
  console.log(selectedLibrary);
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const libraries = [

    { id: 111, name: "Dindayal Upadhyay Library" },
    { id: 222, name: "Kundanlal Gupta Library" },
    { id: 333, name: "Rashtramata Kasturba Library" }
  ];
  const [libraryid, setLibraryId] = useState([]);

  const currentDate = new Date();
  const endDate = new Date(currentDate);
  endDate.setDate(endDate.getDate() + 10);
  const [modalVisible, setModalVisible] = useState(false);


  const filename = route.params.data.items[0].pdf_preview_file;
  const pdfBaseUrl =
    selectedLibrary === 333
      ? 'https://rashtramatakasturba.smartcitylibrary.com/PDFPreview/'
      : selectedLibrary === 111
        ? 'https://dindayalupadhyay.smartcitylibrary.com/PDFPreview/'
        : 'https://kundanlalgupta.smartcitylibrary.com/PDFPreview/';

  const pdfUrl = `${pdfBaseUrl}${filename}`;
  const [pdfModalVisible, setPdfModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [singleSubscribedPlan, setSingleSubscribedPlan] = useState(null);

  useEffect(() => {
    // When the modal becomes visible, load specific pages (e.g., pages 5-8)
    if (pdfModalVisible) {
      loadSpecificPages(5, 8);
    }
  }, [pdfModalVisible]);

  const loadSpecificPages = (startPage, endPage) => {
    // Set the source with page range
    const source = { uri: `${pdfUrl}#page=${startPage}-${endPage}` };
    setTotalPages(endPage - startPage + 1);
    setCurrentPage(startPage);
    setPdfModalVisible(true);
  };

  //-----------------for convertion of date to personalized style date ----------------------------
  function formatDate(inputDate) {

    const inputDateObj = new Date(inputDate);


    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const day = inputDateObj.getDate();
    const month = monthNames[inputDateObj.getMonth()];
    const year = inputDateObj.getFullYear();


    let daySuffix;
    if (day >= 11 && day <= 13) {
      daySuffix = 'th';
    } else {
      switch (day % 10) {
        case 1:
          daySuffix = 'st';
          break;
        case 2:
          daySuffix = 'nd';
          break;
        case 3:
          daySuffix = 'rd';
          break;
        default:
          daySuffix = 'th';
      }
    }
    const formattedDate = `${day}${daySuffix} ${month}, ${year}`;
    return formattedDate;
  }

  const startDate = formatDate(currentDate);
  const endingDate = formatDate(endDate);


  //------------------handle of navigation to book history page for  reserve book---------------------------
  const image = route.params.data.image_path;

  const handleBookHistory = (item) => {


    const subscriptionData1 = {
      image_path: image,
      book_item_id: book1[0]?.id,
      library_id: selectedLibrary
    };

    console.log('data retrived butttttl::::', subscriptionData1, item[0]?.id);
    const url = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/books/${item[0]?.id}/reserve-book`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(subscriptionData1),
    })

      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log("responce is:", response);
        return response.json();
      })
      .then((responseData) => {
        // console.log('Data stored successfully:', responseData);
        navigation.navigate('subscribebookHistory', { singleSubscribedPlan });
        console.log("plan not render", singleSubscribedPlan)
      })

      .catch((error) => {
        // console.error('Error storing data:', error);
      });
  }




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
        // console.log('Single Subscribed Plan Data responce:', res.data);
        setSingleSubscribedPlan(res.data);
        // setIsLoading(false); // Data has been loaded
        // console.log('Single Subscribed Plan Data:', singleSubscribedPlan);
      })
      .catch((error) => {
        // console.error('Error fetching data:', error);


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
  // console.log('singleSubscribedPlan---------', singleSubscribedPlan);



  // ====================================== on click of subscribe=============================================

  const handleSubscribeShowModal = () => {
    if (userToken !== null && plan_exist[0] !== null) {               //&& Plan_exist !== null
      const apiUrl = 'https://dindayalupadhyay.smartcitylibrary.com/api/v1/e-books';

      fetch(apiUrl, {
        method: 'GET',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setebook(data.data);
          console.log("all ebook name", data.data[0].name);

        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }
  // const bookStatus = libraryid[0]?.subscription.book_status;
  // console.log("Book Status:", bookStatus); // Output: "1"

  const handleSubscribe = async () => {

    try {
      const member_id = userInfo.data.user.id;
      console.log('member_id:::', member_id);
      const id = book1[0]?.id;
      console.log('data id:::', id);


      const library_id = selectedLibrary;
      const subscriptionData = {
        issued_on: startDate,
        returned_on: endDate,
        ebook_id: id,
        member_id: member_id,
        library_id: library_id,
        razorpay_payment_id: 'NA',
        renew: false,
        amount: 10,
      };
      // console.log('subscriptionData===', subscriptionData);

      const url = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/ebook-subscription`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(subscriptionData),

      });


      if (!response.ok) {
        throw new Error(`Failed to subscribe. Status: ${response.status}`);
      }

      const responseData = await response.json();
      // console.log('ebook response Data:', responseData);

      setModalVisible(!modalVisible);
      navigation.navigate('myEBook', { singleSubscribedPlan });
      // console.log('singleSubscribedPlan in BookDetails:', singleSubscribedPlan);
    }
    catch (error) {
      console.error('Error handling subscription:', error.message);
    }
  };


  // =================================== treding books =============================

  useEffect(() => {
    const tredingbooks = () => {
      fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books?order_by=created_at&limit=4&library_id=111")
        .then(res => res.json())
        .then(responce => {
          setTredBooks(responce.data);//.splice(8)
          setGenre(responce.data);
          setisLoaded(false);
        });
    };
    const unsubscribe = navigation.addListener('focus', () => {
      tredingbooks();
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const seeAlltredingbooks = () => {
      fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books?order_by=created_at&limit=23&library_id=111")
        .then(res => res.json())
        .then(responce => {
          setSeeAllTredBooks(responce.data);
          setisLoaded(false);
        });
    };
    const unsubscribe = navigation.addListener('focus', () => {
      seeAlltredingbooks();
    });

    return unsubscribe;
  }, []);

  // ======================================================================================

  useEffect(() => {
    if (userToken !== null) {
      const id = userInfo.data.user.id;
      console.log(id);
      const apiUrl = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/is-member-registered/${id}`;

      fetch(apiUrl, {
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
        .then((data) => {
          setLibraryId(data.data);

        })
        .catch((error) => {
          // console.error('Error fetching data:', error);
        });
    }

  }, [])


  const itemsValue1 = subscribedBooks.filter((item, i) =>

    item.ebook_id === route.params.data.items[0].id &&
    item.library_id === selectedLibrary &&
    item.email === userEmail)
    ;
  const itemsValue = itemsValue1.length;


  useEffect(() => {
    const id = route.params.data.id;
    const apiUrl = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/search-books?id=${id}&search_by_book=true&library_id=${selectedLibrary}`;

    fetch(apiUrl, {
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
      .then((data) => {
        setBookDetails(data.data);
        setInitialDataFetched(true);

      })
      .catch((error) => {
        // console.error('Error fetching data:', error);
      });
  }, [route, tredbooks])


  //===================API CALL FOR DIFFERENT LIBRARY WHEATHER THE MEMBER IS REGISTERED OR NOT=======================


  const handle_member = () => {

    const id = userInfo.data.user.id;
    const apiUrl = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/is-member-registered/${id}`;

    fetch(apiUrl, {
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
      .then((data) => {
        setLibraryId(data.data);

      })
      .catch((error) => {
        // console.error('Error fetching data:', error);
      });
  }


  useEffect(() => {
    if (userToken !== null) { handle_member(); }
  }, [route, tredbooks])




  const membership_exist = libraryid.map((item) => [
    item.membership_plan_name,
  ]);
  console.log("mlan:", membership_exist);
  const plan_exist = membership_exist.flat();
  console.log("olan:", plan_exist[0]);

  //===================API CALL FOR register-member-to-library=======================  

  const handleMemberRegistered = (item) => {
    const url = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/register-member-to-library/${item}`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        setModalVisible(!modalVisible);
        Alert.alert(
          'Success!',
          'You are successfully registered with same email and password'
        )
      })
      .catch((error) => {
        // console.error('Error storing data:', error);
      });
  };


  const userLibraryId = libraryid.map((item) => [
    item.user_library_id,
  ]);
  const LibraryId = userLibraryId.flat();


  const book1 = bookdetails.filter((item) =>
    item.book.library_id === route.params.data.library_id)


  const [filteredUsers, setFilteredUsers] = useState([]);
  const [status1, setStatus1] = useState(false);
  // if library is chnage then status become true
  const libraryOnChange = (item) => {
    const selectedLibraryId = item;
    setSelectedLibrary(item);
    setStatus1(true);
    const filteredDetails = bookdetails.filter(
      (item) => item.book.library_id === selectedLibraryId
    );
    setFilteredUsers(filteredDetails);

  };
  console.log("user", filteredUsers[0]);


  return (
    <Theme>
      {({ theme }) => {
        const styles = getStyles(theme);
        return (

          <View style={styles.container}>

            <Header
              leftIcon={require('../images/back.png')}
              onClickLeftIcon={() => {
                // navigation.navigate('Book', { screen: 'Home' });
                navigation.goBack();
              }}

            />
            <ScrollView showsVerticalScrollIndicator={false}  >
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}>

                <View style={styles.centeredView}>
                  {LibraryId.includes(selectedLibrary) ?

                    // this will execute if ebook status ===  1 then ebook will subscribe else go to  membershipscreen to update plan
                    (<View style={styles.modalView}>

                      <Text style={styles.subscribeText}>The Book Will be Subscribed from</Text>
                      <View style={{ flexDirection: 'row', marginBottom: 15, }}>
                        <Text style={styles.subscribeDate}>{startDate}</Text>
                        <Text style={styles.subscribeText}>  to  </Text>
                        <Text style={styles.subscribeDate}>{endingDate}</Text>
                      </View>
                      <Pressable
                        style={styles.button}
                        onPress={() => {
                          if (libraryid[0]?.subscription.ebook_status !== null) {
                            handleSubscribe(),
                              handle_member()
                          }
                          else {
                            navigation.navigate('membershipscreen')
                          }
                        }}>
                        <Text style={styles.textStyle}>Subscribe</Text>
                      </Pressable>

                    </View>) :

                    //=============for library change this will exicute for both subscribe n reserve
                    (<View style={styles.modalView}>

                      <Text style={styles.modalText}>Book Reservation/Subscription</Text>
                      <View style={{ marginBottom: 15, }}>

                        <View style={{ flexDirection: 'row' }}>
                          <Text>These books belong to </Text>
                          <Text style={styles.libraryName}>
                            {selectedLibrary === 111 ? 'Dindayal Upadhyay Library' :
                              selectedLibrary === 222 ? 'Kundanlal Gupta Library' :
                                'Rashtramata Kasturba Library'}
                          </Text>
                          <Text>. </Text>
                        </View>


                        <Text>You are not a member yet. Do you want to register </Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Text>for </Text>
                          <Text style={styles.libraryName}>
                            {selectedLibrary === 111 ? 'Dindayal Upadhyay Library' :
                              selectedLibrary === 222 ? 'Kundanlal Gupta Library' :
                                'Rashtramata Kasturba Library'}
                          </Text>
                          <Text> and continue?</Text>
                        </View>

                      </View>

                      <View style={{ flexDirection: 'row', gap: 10 }}>
                        <Pressable
                          style={styles.button}
                          onPress={() => {

                            // on change of library from picker
                            navigation.navigate('Membershipplan')
                            handleMemberRegistered(selectedLibrary),
                              handle_member()


                          }}>
                          <Text style={styles.textStyle}>Yes</Text>
                        </Pressable>

                        <Pressable
                          style={styles.button}
                          onPress={() => setModalVisible(!modalVisible)}>
                          <Text style={styles.textStyle}>No</Text>
                        </Pressable>
                      </View>


                    </View>)}
                </View>
              </Modal>
              {/* ===================Membership Plan Modal if we dont have any membership n
               we try to subscribe then this modal open=========== */}
              <Modal
                animationType="slide"
                transparent={true}
                visible={membershipPlanModalVisible}
                onRequestClose={() => {
                  setMembershipPlanModalVisible(!membershipPlanModalVisible);
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={{
                      fontSize: 15, fontFamily: 'Poppins-Regular',
                      paddingBottom: 10
                    }}>
                      You don't have any Membership Plan.Please choose any Plan.
                    </Text>

                    <View style={{ flexDirection: 'row', gap: 10 }}>
                      <Pressable
                        style={styles.button}
                        onPress={() => {
                          navigation.navigate('Membershipplan')

                          setMembershipPlanModalVisible(!membershipPlanModalVisible);
                        }}>
                        <Text style={styles.textStyle}>Yes</Text>
                      </Pressable>

                      <Pressable
                        style={styles.button}
                        onPress={() => setMembershipPlanModalVisible(!membershipPlanModalVisible)}>
                        <Text style={styles.textStyle}>No</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Modal>


              {/* ===============================Pdf Modal============================================== */}

              <Modal
                animationType="slide"
                transparent={true}
                visible={pdfModalVisible}
                onRequestClose={() => {
                  setPdfModalVisible(false);
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Pdf
                      trustAllCerts={false}
                      source={{ uri: pdfUrl }}
                      onLoadComplete={(numberOfPages, filePath) => {
                        setTotalPages(numberOfPages);
                      }}
                      onPageChanged={(page, numberOfPages) => {
                        setCurrentPage(page);
                      }}
                      onError={(error) => {
                      }}
                      onPressLink={(uri) => {
                      }}
                      scale={totalPages > 8 ? 8 / totalPages : 1}
                      style={styles.pdf}
                    />
                    <View style={styles.pageButton}>
                      <Text style={styles.pageButtonText}> {currentPage}</Text>
                    </View>
                  </View>
                </View>
              </Modal>


              {status1 ?
                (<View style={{
                  marginTop: -30,
                }}>
                  <View style={{
                    flexDirection: 'row',
                  }}>
                    <View style={{
                      width: 110,
                      marginTop: 14 / 2,
                      overflow: 'visible',
                      marginLeft: 20,
                      marginTop: 40,
                    }}>
                      <Image source={{
                        uri: filteredUsers[0]?.book?.image_path
                      }}
                        style={{
                          aspectRatio: 0.7,
                          resizeMode: 'contain',
                          borderRadius: 5,
                          marginRight: 10,
                        }}
                      />
                    </View>
                    <View>

                      <View >
                        <Text onTextLayout={onTextLayout}
                          style={styles.nameofBook}
                        >{filteredUsers[0]?.book?.name}</Text>

                      </View>


                      <View style={styles.author}>
                        <Text >{filteredUsers[0]?.book?.authors[0].first_name}{' '}
                          {filteredUsers[0]?.book?.authors[0].last_name}</Text>
                      </View>

                      <View style={styles.publisher}>
                        <Text >{filteredUsers[0]?.publisher?.name}</Text>
                      </View>
                    </View>

                  </View>

                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 25,
                    marginBottom: 20,
                  }}>

                    <View style={{
                      borderRightColor: '#2826268a',
                      borderRightWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <AntDesign name="book" color={"gray"} size={25}
                        style={{
                          marginLeft: 45,
                          marginRight: 45,
                        }}
                      />
                      {filteredUsers[0]?.format === 3 ?
                        (<Text
                          style={styles.textHeadingOutput}
                        >E-Book</Text>)
                        : filteredUsers[0]?.format === 1 ?
                          (<Text
                            style={styles.textHeadingOutput}
                          >hardcover</Text>) :
                          (<Text
                            style={styles.textHeadingOutput}
                          >Book</Text>)}


                    </View>

                    <View style={{
                      borderRightColor: '#2826268a', justifyContent: 'center',
                      alignItems: 'center', borderRightWidth: 1
                    }}>
                      <Entypo name="bookmarks" color={"gray"} size={15}
                        style={{
                          marginLeft: 30,
                          marginRight: 45,
                        }} />
                      <Text style={styles.textHeadingOutput}>{filteredUsers[0]?.book?.genres[0].name}</Text>

                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Feather name="edit" color={"gray"} size={15}
                        style={{
                          marginLeft: 25,
                          marginRight: 25,
                        }} />
                      <Text style={styles.textHeadingOutput}>{filteredUsers[0]?.edition}</Text>
                    </View>
                  </View>

                </View>
                )
                :
                (<View style={{
                  marginTop: -30,
                }}>
                  <View style={{
                    flexDirection: 'row',
                  }}>
                    <View style={{
                      width: 110,
                      marginTop: 14 / 2,
                      overflow: 'visible',
                      marginLeft: 20,
                      marginTop: 40,
                    }}>
                      <Image source={{
                        uri: book1[0]?.book?.image_path
                      }}
                        style={{
                          aspectRatio: 0.7,
                          resizeMode: 'contain',
                          borderRadius: 5,
                          marginRight: 10,
                        }}
                      />
                    </View>
                    <View>

                      <Text onTextLayout={onTextLayout}
                        style={styles.nameofBook}
                      >{book1[0]?.book?.name}</Text>
                      <Text style={styles.author}>{book1[0]?.book?.authors[0].first_name}{' '}
                        {book1[0]?.book?.authors[0].last_name}</Text>
                      <Text
                        style={styles.publisher}>{book1[0]?.publisher?.name}</Text>

                    </View>

                  </View>

                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginTop: 25,
                    marginBottom: 20,
                  }}>

                    <View style={{
                      borderRightColor: '#2826268a',
                      borderRightWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <AntDesign name="book" color={"gray"} size={25}
                        style={{
                          marginLeft: 45,
                          marginRight: 45,
                        }}
                      />
                      {book1[0]?.format === 3 ?
                        (<Text style={styles.textHeadingOutput}>E-Book</Text>)
                        : book1[0]?.format === 1 ?
                          (<Text style={styles.textHeadingOutput}>hardcover</Text>) :
                          (<Text style={styles.textHeadingOutput}>Book</Text>)}

                    </View >


                    <View style={{
                      borderRightColor: '#2826268a',
                      borderRightWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <Entypo name="bookmarks"
                        color={"gray"} size={25}
                        style={{
                          marginLeft: 30,
                          marginRight: 45,
                        }}
                      />
                      <Text style={[styles.textHeadingOutput, { marginLeft: -10 }]}>
                        {book1[0]?.book?.genres[0].name}</Text>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Feather name="edit" color={"gray"} size={25}
                        style={{
                          marginLeft: 25,
                          marginRight: 25,
                        }}
                      />
                      <Text style={styles.textHeadingOutput}>{book1[0]?.edition}</Text>
                    </View>
                  </View>
                </View>
                )
              }

              <View style={{
                width: 330,
                height: .3,
                backgroundColor: '#000',
                alignSelf: 'center'
              }}>
              </View>


              <Text style={[styles.textHeading, {
                marginLeft: 20,
                marginTop: 10,
                marginBottom: 5
              }]}>Belongs To:</Text>

              <View style={{
                flexDirection: 'column',
                marginLeft: 20,
                marginRight: 20,
                borderColor: 'grey',
                borderWidth: 1.5,
                borderRadius: 5
              }}>
                <Picker
                  selectedValue={selectedLibrary}
                  onValueChange={(itemValue) => libraryOnChange(itemValue)}
                  style={{
                    height: 40,
                    marginTop: -14,
                    textAlign: 'center',
                    fontFamily: 'Poppins-Regular',
                    borderWidth: 0.2,
                    borderColor: '#efefef'
                  }}

                  itemStyle={{}}
                >
                  {libraries.map((library) => (
                    <Picker.Item
                      key={library.id}
                      label={library.name}
                      value={library.id}
                      enabled={bookdetails.some((book) =>
                        book.book.library_id === library.id)}
                    />
                  ))}
                </Picker>
              </View>


              <View style={styles.textHeadingView}>
                <Text style={styles.textHeading}>Description:</Text>
              </View>

              {status1 ?
                (<View>
                  <Text onTextLayout={onTextLayout}
                    numberOfLines={textShown ? undefined : 3}
                    style={{
                      fontSize: 13,
                      color: theme === 'LIGHT' ? '#000' : '#fff',
                      fontFamily: 'OpenSans-Regular',
                      marginLeft: 20,
                      marginRight: 20
                    }}
                  >{filteredUsers[0]?.book?.description}</Text>
                  {
                    lengthMore ?
                      <Text
                        onPress={toggleNumberOfLines}
                        style={{
                          marginLeft: 20,
                          fontFamily: 'OpenSans-Regular',
                        }}>
                        {textShown ? 'Read less...' : 'Read more...'}
                      </Text>
                      : null
                  }
                </View>
                ) :
                (<View>
                  <Text onTextLayout={onTextLayout}
                    numberOfLines={textShown ? undefined : 3}
                    style={{
                      fontSize: 13,
                      color: theme === 'LIGHT' ? '#000' : '#fff',
                      fontFamily: 'OpenSans-Regular',
                      marginLeft: 20,
                      marginRight: 20
                    }}
                  >{book1[0]?.book?.description}</Text>

                  {
                    lengthMore ?
                      <Text
                        onPress={toggleNumberOfLines}
                        style={{
                          marginLeft: 20,
                          fontFamily: 'OpenSans-Regular',
                        }}>
                        {textShown ? 'Read less...' : 'Read more...'}
                      </Text>
                      : null
                  }
                </View>
                )
              }

              <Text style={[styles.textHeading, {
                marginLeft: 20,
                marginTop: 10,
                marginBottom: 5
              }]}>Availability: </Text>

              <View>
                {status1 ?
                  (<View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.batch1, {
                      marginLeft: 20,
                      backgroundColor: filteredUsers[0]?.format === 2 && book1[0]?.status === 1 ? '#B6FFC0' : '#efefef',
                      borderColor: filteredUsers[0]?.format === 2 && book1[0]?.status === 1 ? '#B6FFC0' : '#efefef',
                      color: filteredUsers[0]?.format === 2 && book1[0]?.status === 1 ? 'green' : 'grey',
                    }]}>
                      {filteredUsers[0]?.format === 2 && filteredUsers[0]?.status === 1
                        ? 'Paperback(1)'
                        : 'Paperback(0)'
                      }
                    </Text>
                    <Text style={[styles.batch1, {
                      marginLeft: 7,
                      backgroundColor: filteredUsers[0]?.format === 1 && book1[0]?.status === 1 ? '#B6FFC0' : '#efefef',
                      borderColor: filteredUsers[0]?.format === 1 && book1[0]?.status === 1 ? '#B6FFC0' : '#efefef',
                      color: filteredUsers[0]?.format === 1 && book1[0]?.status === 1 ? 'green' : 'grey',
                    }]}>
                      {filteredUsers[0]?.format === 1 && filteredUsers[0]?.status === 1
                        ? 'Hardcover(1)'
                        : 'Hardcover(0)'
                      }
                    </Text>
                    <Text style={[styles.batch1, {
                      marginLeft: 7,
                      backgroundColor: filteredUsers[0]?.format === 3 && book1[0]?.status === 1 ? '#B6FFC0' : '#efefef',
                      borderColor: filteredUsers[0]?.format === 3 && book1[0]?.status === 1 ? '#B6FFC0' : '#efefef',
                      color: filteredUsers[0]?.format === 3 && book1[0]?.status === 1 ? 'green' : 'grey',
                    }]} >
                      Ebook(
                      {filteredUsers ? 20 - filteredUsers[0]?.ebooksubscriptions.length : 0}
                      )
                    </Text>
                  </View>)
                  :
                  (<View style={{ flexDirection: 'row', }}>
                    <Text style={[styles.batch1, {
                      marginLeft: 20,
                      backgroundColor: book1[0]?.format === 2 && book1[0]?.status === 1 ? '#B6FFC0' : '#efefef',
                      borderColor: book1[0]?.format === 2 && book1[0]?.status === 1 ? '#B6FFC0' : '#efefef',
                      color: book1[0]?.format === 2 && book1[0]?.status === 1 ? 'green' : 'grey',
                    }]}>
                      {book1[0]?.format === 2 && book1[0]?.status === 1
                        ? 'Paperback(1)'
                        : 'Paperback(0)'
                      }
                    </Text>
                    <Text
                      style={[styles.batch1, {
                        marginLeft: 7,
                        backgroundColor: book1[0]?.format === 1 && book1[0]?.status === 1 ? '#B6FFC0' : '#efefef',
                        borderColor: book1[0]?.format === 1 && book1[0]?.status === 1 ? '#B6FFC0' : '#efefef',
                        color: book1[0]?.format === 1 && book1[0]?.status === 1 ? 'green' : 'grey',
                      }]}
                    >
                      {book1[0]?.format === 1 && book1[0]?.status === 1
                        ? 'Hardcover(1)'
                        : 'Hardcover(0)'
                      }
                    </Text>
                    <Text style={[styles.batch1, {
                      marginLeft: 7,
                      backgroundColor: book1[0]?.format === 3 && book1[0]?.status === 1 ? '#B6FFC0' : '#efefef',
                      borderColor: book1[0]?.format === 3 && book1[0]?.status === 1 ? '#B6FFC0' : '#efefef',
                      color: book1[0]?.format === 3 && book1[0]?.status === 1 ? 'green' : 'grey',
                    }]}
                    >
                      Ebook(
                      {book1
                        ? 20 - book1[0]?.ebooksubscriptions.length
                        : 0}
                      )
                    </Text>
                  </View>)
                }
              </View>



              {status1 ?
                (<View style={{ flexDirection: 'column' }}>
                  {userToken !== null &&
                    itemsValue ? (<Text style={{
                      backgroundColor: 'grey',
                      padding: 10,
                      borderRadius: 5,
                      width: 170,
                      height: 40,
                      marginTop: 20,
                      marginLeft: 20,
                      marginBottom: 20,
                      color: 'black',
                      textAlign: 'center',
                      fontSize: 15,
                      fontWeight: 'bold',
                      opacity: 0.4
                    }}>Ebook is Subscribed</Text>) :
                    (<View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#c27b7f',
                          padding: 5,
                          borderRadius: 10,
                          width: 100,
                          height: 35,
                          marginTop: 20,
                          marginLeft: 13,
                          marginBottom: 20,

                        }}
                        onPress={() => {
                          if (userToken !== null &&
                            plan_exist[0] === null) {
                            setMembershipPlanModalVisible(!membershipPlanModalVisible);
                          }
                          else {
                            if (userToken !== null) {

                              if (filteredUsers[0]?.format === 3) {
                                handleSubscribeShowModal();
                                handle_member();
                                setModalVisible(!modalVisible);
                              } else {
                                if (LibraryId.includes(selectedLibrary)) {
                                  console.log("harry potter")
                                  handleBookHistory(book1);
                                } else {
                                  handleSubscribeShowModal();

                                  handle_member();
                                  setModalVisible(!modalVisible);
                                }
                              }
                            }
                            else {
                              navigation.navigate('sLogin');
                            }
                          }
                        }}
                      >
                        <Text style={{
                          color: '#fff',
                          fontFamily: 'OpenSans-Regular',
                          fontSize: 15,
                          textAlign: 'center',
                        }}>
                          {filteredUsers[0]?.format === 3 ? 'Subscribe' : 'Reserved'}</Text>
                      </TouchableOpacity>


                      {userToken !== null &&
                        filteredUsers[0]?.format === 3 &&
                        filteredUsers[0]?.pdf_preview_file !== null ?
                        (<TouchableOpacity
                          style={{
                            backgroundColor: '#c27b7f',
                            padding: 5,
                            borderRadius: 10,
                            width: 100,
                            height: 35,
                            marginTop: 20,
                            marginLeft: 20,
                            marginBottom: 20,
                          }}
                          onPress={() => {
                            setPdfModalVisible(true);
                          }}
                        >
                          <Text style={{
                            color: '#fff',
                            fontFamily: 'OpenSans-Regular',
                            fontSize: 15,
                            textAlign: 'center',
                          }}>Preview</Text>
                        </TouchableOpacity>) : null
                      }

                    </View>)
                  }
                </View>)
                :
                (<View style={{ flexDirection: 'column' }}>
                  {userToken !== null &&
                    itemsValue ? (<Text style={{
                      backgroundColor: 'grey',
                      padding: 10,
                      borderRadius: 5,
                      width: 170,
                      height: 40,
                      marginTop: 20,
                      marginLeft: 20,
                      marginBottom: 20,
                      color: 'black',
                      textAlign: 'center',
                      fontSize: 15,
                      fontWeight: 'bold',
                      opacity: 0.4
                    }}>Ebook is Subscribed</Text>) :

                    //now done
                    (book1[0]?.format === 1 && book1[0]?.status === 1 || book1[0]?.format === 3 ?

                      (<View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                          style={{
                            backgroundColor: '#c27b7f',
                            padding: 5,
                            borderRadius: 10,
                            width: 100,
                            height: 35,
                            marginTop: 20,
                            marginLeft: 13,
                            marginBottom: 20,
                          }}
                          onPress={() => {
                            if (userToken !== null &&
                              plan_exist[0] === null) {
                              setMembershipPlanModalVisible(!membershipPlanModalVisible);
                            }
                            else {
                              if (userToken !== null) {

                                if (book1[0]?.format === 3) {
                                  handleSubscribeShowModal();
                                  handle_member();
                                  setModalVisible(!modalVisible);
                                } else {
                                  if (libraryid[0]?.subscription.book_status !== null) {
                                    console.log("library changed execute this")
                                    handleBookHistory(book1);
                                  }
                                  else{
                                    navigation.navigate('membershipscreen')
                                  }

                                  // if (LibraryId.includes(selectedLibrary)) {
                                  //   console.log("library changed execute this")
                                  //   handleBookHistory(book1);
                                  // } 
                                  // else {
                                  //   handleSubscribeShowModal();
                                  //   handle_member();
                                  //   setModalVisible(!modalVisible);
                                  // }
                                }
                              }
                              else {
                                navigation.navigate('sLogin');
                              }
                            }
                          }}
                        >
                          <Text style={{
                            color: '#fff',
                            fontFamily: 'OpenSans-Regular',
                            fontSize: 15,
                            textAlign: 'center',
                          }}>
                            {book1[0]?.format === 3 ? 'Subscribe' : 'Reserved'}

                          </Text>
                        </TouchableOpacity>


                        {userToken !== null &&
                          book1[0]?.format === 3 &&
                          book1[0]?.pdf_preview_file !== null ?
                          (<TouchableOpacity
                            style={{
                              backgroundColor: '#c27b7f',
                              padding: 5,
                              borderRadius: 10,
                              width: 100,
                              height: 35,
                              marginTop: 20,
                              marginLeft: 20,
                              marginBottom: 20,
                            }}
                            onPress={() => {
                              setPdfModalVisible(true);
                            }}
                          >
                            <Text style={{
                              color: '#fff',
                              fontFamily: 'OpenSans-Regular',
                              fontSize: 15,
                              textAlign: 'center',
                            }}>Preview</Text>
                          </TouchableOpacity>) : null}
                      </View>


                      ) : []

                    )
                  }
                </View>
                )
              }


              {/* =================================Trending books==================================== */}

              <View style={{
                flexDirection: 'row',
                marginVertical: 5,
                justifyContent: 'space-between',
                marginLeft: 20,
                marginRight: 20,
              }}>
                <Text style={styles.coroselheading}>Trending Books</Text>

                <TouchableOpacity onPress={() => {
                  navigation.navigate('filterData', { seeAllTredbooks })
                }}>
                  <Image
                    source={require('../images/arrow-right.png')}
                    style={styles.categoryIcon}
                  />
                </TouchableOpacity>
              </View>
              <View style={{
                marginTop: 10,
                marginStart: 20,
                backgroundColor: theme === 'light' ? '#000' : '#fff'
              }}>
                <FlatList
                  horizontal={true}
                  snapToInterval={200} // Adjust the interval based on your design
                  decelerationRate="fast"
                  contentContainerStyle={{
                    gap: -10,
                    paddingHorizontal: 12,
                  }}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.id}
                  data={tredbooks}
                  renderItem={({ item }) =>
                    <TouchableOpacity
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        width: 180,
                        height: 300
                      }}
                      onPress={() => {
                        navigation.navigate('BooksDetailPage', { data: item })
                      }}>
                      <View style={{
                        width: 155,
                        height: 300,
                        marginEnd: 50,
                      }}>
                        <View style={{
                          elevation: 5,
                          borderRadius: 5,
                          color: '#000'
                        }}>
                          <Image source={{ uri: item.image_path }}
                            style={{
                              aspectRatio: 0.7,
                              resizeMode: 'contain',
                              borderRadius: 10,
                            }} />
                        </View>
                        <Text style={{
                          marginTop: 10,
                          fontSize: 15,
                          fontFamily: 'Poppins-Regular',
                          color: theme === 'LIGHT' ? '#34495E' : '#fff',
                          flexDirection: 'column'
                        }} numberOfLines={1}>
                          {item.name}
                        </Text>
                        <Text style={styles.bookName1} numberOfLines={1}>
                          {item.authors[0].first_name}{' '}{item.authors[0].last_name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  }
                />
              </View>


            </ScrollView>
          </View >
        );
      }}
    </Theme >
  );
};

export default BooksDetail;