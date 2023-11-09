// import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, FlatList,Modal,Pressable } from 'react-native'
// import React, { useEffect, useState, useContext } from 'react'
// import { useRoute, useNavigation } from '@react-navigation/native';
// import Header from '../common/Header';
// import { AuthContext } from '../context/AuthContext';
// import Pdf from 'react-native-pdf';

// const BooksDetail = ({ navigation }) => {
//   const [isLoaded, setisLoaded] = useState(true);
//   const route = useRoute();
//   const [tredbooks, setTredBooks] = useState([]);
//   const { userToken, userInfo } = useContext(AuthContext);
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [Ebooks, setEbooks] = useState([]);
//   const [subscribedBooks, setSubscribedBooks] = useState([]);
//   const [subscribe, setSubscribe] = useState([]);

//   const [libraryid,setLibraryId]=useState([]);

//   const currentDate = new Date();
//   const endDate = new Date(currentDate);
//   endDate.setDate(endDate.getDate() + 10);
//   const [modalVisible, setModalVisible] = useState(false);



//   const filename = route.params.data.file_name;
//   // .split(".")[0];
//   const pdfUrl = `https://dindayalupadhyay.smartcitylibrary.com/public_uploads_ebooks/${filename}`;
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pdfModalVisible, setPdfModalVisible] = useState(false);


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
// const formattedDate = `${day}${daySuffix} ${month}, ${year}`;
// return formattedDate;
//   }

//   const startDate = formatDate(currentDate);
//   const endingDate= formatDate(endDate);

// //------------------handle of navigation to book history page---------------------------
// const handleBookHistory=(item)=>{


//   const subscriptionData1={
//               book_item_id:route.params.data.items[0].id,
//               library_id:route.params.data.library_id
//             };

//   console.log('data retrived ', subscriptionData1);



//   const url=`https://dindayalupadhyay.smartcitylibrary.com/api/v1/books/${item.items[0].id}/reserve-book`;

//   fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${userToken}`,
//     },
//     body: JSON.stringify(subscriptionData1),
//    })

//   .then((response) => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     console.log("responce is:", response);
//     return response.json();
//   })
//   .then((responseData) => {
//     console.log('Data stored successfully:', responseData);
//     navigation.navigate('subscribebookHistory');
//  })

//   .catch((error) => {
//     console.error('Error storing data:', error);
//   });

// }

// // ===================================================================================

// const handleSubscribe = (item) => {
//     const member_id = userInfo.data.user.member_id;
//     const id = route.params.data.items[0].id;
//     console.log('data testis::::', item);
//     const subscriptionData = {
//       ebook_id: id,
//       member_id: member_id,
//       item
//     };


//     //console.log("subbb:", subscriptionData);
//     const url = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/ebook-subscription`;
//     fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${userToken}`,
//       },
//       body: JSON.stringify(subscriptionData),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         console.log("responce is:", response);
//         return response.json();
//       })
//       .then((responseData) => {
//        console.log('Data stored successfully:', responseData);

//         setModalVisible(!modalVisible);


//         //console.log('Navigating to myEBook...');

//         navigation.navigate('myEBook');

//       })

//       .catch((error) => {
//         console.error('Error storing data:', error);
//       });
//   };

// // ================================================================

//   useEffect(() => {
//     const tredingbooks = () => {
//       fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books")
//         .then(res => res.json())
//         .then(responce => {
//           setTredBooks(responce.data.splice(-4));
//           setisLoaded(false);
//         });
//     };
//     tredingbooks();
//   }, []);





//   //===================API CALL FOR DIFFERENT LIBRARY WHEATHER THE MEMBER IS REGISTERED OR NOT=======================
//   useEffect(() => {

//     const id= userInfo.data.user.id;
//     console.log(id);
//    const apiUrl = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/is-member-registered/${id}`;

//    fetch(apiUrl, {
//      method: 'GET',
//      headers: {
//        'Authorization': `Bearer ${userToken}`,
//        'Content-Type': 'application/json',
//      },
//    })
//      .then((response) => {
//        if (!response.ok) {
//          throw new Error(`HTTP error! Status: ${response.status}`);
//        }
//        return response.json();
//      })
//      .then((data) => {
//        setLibraryId(data.data);

//      })
//      .catch((error) => {
//        console.error('Error fetching data:', error);
//      });
//  }, [route,tredbooks]);




// console.log(libraryid);

// //===================API CALL FOR register-member-to-library=======================  
// const handleMemberRegistered = (item) => {


//   console.log(item);
//   const url = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/register-member-to-library/${item.library_id}`;
//   fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${userToken}`,
//     },

//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       console.log("responce is:", response);
//       return response.json();
//     })
//     .then((responseData) => {
//       console.log('Data stored successfully:', responseData);

//       setModalVisible(!modalVisible);


//       console.log('Navigating to myEBook...');

//       navigation.navigate('myEBook');

//     })

//     .catch((error) => {
//       console.error('Error storing data:', error);
//     });
// };


// const userLibraryId = libraryid.map((item) => [
//   item.user_library_id,
// ]) ;
// const LibraryId= userLibraryId.flat();

// console.log(LibraryId);
// console.log(LibraryId.includes(route.params.data.library_id) );




//   return (
//     <View style={{ flex: 1, backgroundColor: '#fff', flexDirection: 'column' }}>
//       <Header
//         rightIcon={require('../images/Logoelibrary.png')}
//         leftIcon={require('../images/back.png')}
//         onClickLeftIcon={() => {
//           navigation.navigate('Book', { screen: 'Home' });
//         }}
//       />

//      <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {

//           setModalVisible(!modalVisible);
//         }}>
//         <View style={styles.centeredView}>



// {LibraryId.includes(route.params.data.library_id) ?
//           (<View style={styles.modalView}>

//             <Text style={styles.modalText}>The Book Will be Subscribed from</Text>
//             <View style={{flexDirection:'row', marginBottom: 15,}}>
//             <Text style={{color:'blue',fontSize:15,fontWeight:'bold', }}>{startDate}</Text> 
//             <Text style={{fontSize:15,fontWeight:'bold', }}>  to  </Text>
//             <Text style={{color:'blue',fontSize:15,fontWeight:'bold',}}>{endingDate }</Text> 
//             </View>
//             <Pressable
//               style={styles.button}
//               onPress={() => handleSubscribe(route.params.data)}>
//               <Text style={styles.textStyle}>Subscribe</Text>
//             </Pressable>

//           </View>):
//           (<View style={styles.modalView}>

//             <Text style={styles.modalText}>Book Reservation/Subscription</Text>
//             <View style={{flexDirection:'row', marginBottom: 15,}}>
//             {/* <Text style={{color:'blue',fontSize:15,fontWeight:'bold', }}></Text> */}

//              <Text>These book belongs to</Text>

//               {route.params.data.library_id === 111 ?
//             (<Text style={{ fontWeight: 'bold', paddingTop: 10, height: 50, 
//             fontSize: 18, textAlign: 'center', marginTop: 10, borderWidth: 5 }}>
//               Dindayal UpadhyayLibrary</Text>) :

//             (route.params.data.library_id === 222 ?
//               (<Text style={{ fontWeight: 'bold', paddingTop: 10, height: 50, fontSize: 18, textAlign: 'center', 
//               marginTop: 10, borderWidth: 5 }}>
//                 Kundanlal Gupta Library</Text>) :

//               (<Text style={{ fontWeight: 'bold', paddingTop: 10, height: 50, fontSize: 18, textAlign: 'center',
//                marginTop: 10, borderWidth: 5 }}>
//                 Rashtramata Kasturba Library</Text>))}

//                 <Text>. And Your are not the Member either.Do you want to Register for </Text>

//              {route.params.data.library_id === 111 ?
//             (<Text style={{ fontWeight: 'bold', paddingTop: 10, height: 50, fontSize: 18, textAlign: 'center', 
//             marginTop: 10, borderWidth: 5 }}>
//               Dindayal UpadhyayLibrary</Text>) :

//             (route.params.data.library_id === 222 ?
//               (<Text style={{ fontWeight: 'bold', paddingTop: 10, height: 50, fontSize: 18, 
//               textAlign: 'center', marginTop: 10, borderWidth: 5 }}>
//                 Kundanlal Gupta Library</Text>) :

//               (<Text style={{ fontWeight: 'bold', paddingTop: 10, height: 50, fontSize: 18, textAlign: 'center',
//                marginTop: 10, borderWidth: 5 }}>
//                 Rashtramata Kasturba Library</Text>))} 

//                 <Text>and Continue ?</Text>

//             </View>



//             <View style={{ flexDirection: 'row', gap: 10 }}>
//               <Pressable
//                 style={styles.button}
//                 // onPress={() => handleMemberRegistered(selectedLibraryId)}>
//                 onPress={() => handleMemberRegistered(route.params.data)}>
//                 <Text style={styles.textStyle}>Yes</Text>
//               </Pressable>

//               <Pressable
//                 style={styles.button}
//                 onPress={() => setModalVisible(!modalVisible)}>
//                 <Text style={styles.textStyle}>No</Text>
//               </Pressable>
//             </View>


//           </View>)}
//         </View>
//       </Modal>

//       {/* ===============================Pdf Modal============================================== */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={pdfModalVisible}
//         onRequestClose={() => {
//           setPdfModalVisible(false);

//         }}>
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Pdf
//               trustAllCerts={false}
//               source={{ uri: pdfUrl }}
//               onLoadComplete={(numberOfPages, filePath) => {
//                 console.log(`Number of pages: ${numberOfPages}`);
//               }}
//               onPageChanged={(page, numberOfPages) => {
//                 setCurrentPage(page);
//               }}
//               onError={(error) => {
//                 console.log(error);
//               }}
//               onPressLink={(uri) => {
//                 console.log(`Link pressed: ${uri}`);
//               }}
//               style={styles.pdf}
//             />

//             <View style={styles.pageButton}>
//               <Text style={styles.pageButtonText}> {currentPage}</Text>
//             </View>

//           </View>
//         </View>
//       </Modal>


//       <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 15, }}>
//         <View style={{
//           marginLeft: 80,
//           width: Dimensions.get('window').width,
//           height: 200,
//           marginEnd: 22,
//           borderRadius: 10,
//         }}>
//           <View style={{
//             width: 150,
//             marginLeft: 60 / 2,
//             marginTop: 10 / 2,
//             overflow: 'visible',
//           }}>
//             <Image source={{
//               uri: route.params.data.image_path
//             }}
//               style={{
//                 aspectRatio: 0.8,
//                 resizeMode: 'cover'
//               }}
//             />
//           </View>
//         </View>
//         <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
//           <Text style={styles.textHeading}>ISBN No:</Text><Text style={{ fontSize: 15, marginLeft: 8 }}>{route.params.data.isbn}</Text>
//         </View>
//         <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
//           <Text style={styles.textHeading}>Author:</Text>
//           <Text style={{ fontSize: 15, marginLeft: 8 }}>{route.params.data.authors[0].first_name} {route.params.data.authors[0].last_name}</Text>
//         </View>
//         <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
//           <Text style={styles.textHeading}>Format:</Text>
//           {route.params.data.items[0].format === 3 ?
//             (<Text style={{ fontSize: 15, marginLeft: 8 }}>E-Book</Text>)
//             : route.params.data.items[0].format === 1 ?
//               (<Text style={{ fontSize: 15, marginLeft: 8 }}>hardcover</Text>) :
//               (<Text style={{ fontSize: 15, marginLeft: 8 }}>Book</Text>)}
//         </View>
//         <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
//           <Text style={styles.textHeading}>Edition</Text>
//           <Text style={{ fontSize: 15, marginLeft: 8 }}>{route.params.data.items[0].edition}</Text>
//         </View>
//         <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
//           <Text style={styles.textHeading}>Genre:</Text>
//           <Text style={{ fontSize: 15, marginLeft: 8 }}>{route.params.data.genres[0].name}</Text>
//         </View>
//         <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
//           <Text style={styles.textHeading}>Publisher:</Text>
//           <Text style={{ fontSize: 15, marginLeft: 8 }}>{route.params.data.items[0].publisher.name}</Text>
//         </View>

//         <View style={{ flexDirection: 'column', marginTop: 10, marginLeft: 10, }}>
//           <Text style={styles.textHeading}>Belongs To:</Text>
//           <View style={{ marginRight: 5 }}>{route.params.data.library_id === 111 ?
//             (<Text style={{ fontWeight: 'bold', paddingTop: 10, height: 50, fontSize: 18, textAlign: 'center', marginTop: 10, borderWidth: 5 }}>
//               Dindayal UpadhyayLibrary</Text>) :
//             (route.params.data.library_id === 222 ?
//               (<Text style={{ fontWeight: 'bold', paddingTop: 10, height: 50, fontSize: 18, textAlign: 'center', marginTop: 10, borderWidth: 5 }}>
//                 Kundanlal Gupta Library</Text>) :
//               (<Text style={{ fontWeight: 'bold', paddingTop: 10, height: 50, fontSize: 18, textAlign: 'center', marginTop: 10, borderWidth: 5 }}>
//                 Rashtramata Kasturba Library</Text>))}</View></View>

//         <View style={{ flexDirection: 'column', marginTop: 10, marginLeft: 10, }}>
//           <Text style={styles.textHeading}>Description:</Text>
//           <Text style={{ fontSize: 15, marginLeft: 3 }}>{route.params.data.description}</Text>
//         </View>




// {route.params.data.items[0].status===1?
// (<View style={{ flexDirection: 'column', }}>
// {route.params.data.items[0].format !== 3 ?
// ( <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:10,}}>
//   <Text style={{textAlign:'center',fontSize:17,fontWeight:700,color: '#c27b7f'}}>Available </Text>
//   <Text style={{backgroundColor:'#c27b7f',color:'white',padding:5,borderRadius:15}}>1</Text></View>)
//   :(null)}

//   {userToken !== null ?

//           <TouchableOpacity
//             style={{
//               backgroundColor: '#c27b7f',
//               //alignItems: 'center',
//               padding: 10,
//               borderRadius: 5,
//               width: '35%',
//               height: 50,
//              // justifyContent: 'center',
//               marginTop: 20,
//               marginLeft: 20,
//               marginBottom: 20,

//             }}
//             onPress={() => {
//               {route.params.data.items[0].format === 3 ?
//              (setModalVisible(!modalVisible))
//              :(handleBookHistory(route.params.data))}
//             }}
//           >
//           {route.params.data.items[0].format === 3 ? 
//               (<View style={{flexDirection:'row'}}>


//                 <Text style={{
//                 color: '#fff',
//                 fontWeight: '700',
//                 fontSize: 18,
//                 textAlign:'center',
//                 paddingLeft:10,
//               }}>subscribe</Text>


//               <TouchableOpacity
//             style={{
//               backgroundColor: '#c27b7f',
//               padding: 10,
//               borderRadius: 5,
//               width: '100%',
//               height: 50,
//               marginTop: -10,
//               marginLeft: 40,
//             }}
//             onPress={() => {
//               setPdfModalVisible(true);
//              }}>
//               <Text style={{
//                 color: '#fff',
//                 fontWeight: '700',
//                 fontSize: 18,
//                 textAlign:'center'
//               }}>preview</Text>
//               </TouchableOpacity>




//               </View>)
//               :
//                (<Text style={{
//                 color: '#fff',
//                 fontWeight: '700',
//                 fontSize: 18,
//                 textAlign:'center'
//               }}>Reserved</Text>
//               )}
//           </TouchableOpacity>


//           :

//           (<TouchableOpacity
//             style={{
//               backgroundColor: '#c27b7f',
//               alignItems: 'center',
//               padding: 10,
//               borderRadius: 5,
//               width: '50%',
//               height: 50,
//               justifyContent: 'center',
//               marginTop: 20,
//               marginLeft: 100,
//               marginBottom: 20
//             }} onPress={() => {
//               navigation.navigate('sLogin');
//             }}>
//               (<Text style={{
//               color: '#fff',
//               fontWeight: '700',
//               fontSize: 18
//             }}>Subscribe</Text>):(<Text style={{
//               color: '#fff',
//               fontWeight: '700',
//               fontSize: 18
//             }}>Reserved</Text>)

//           </TouchableOpacity>)}


//     </View>):(<Text style={{textAlign:'center',color:'red',
//     fontSize:18,fontWeight:'bold',marginBottom:10}}>Unavailable</Text>)}


//         {/* =================================Trending books==================================== */}

//         <View style={{ flexDirection: 'row', marginVertical: 5, justifyContent: 'space-between', marginLeft: 15, marginRight: 15, }}>
//           <Text style={styles.coroselheading}>Trending Books</Text>
//         </View>

//         <View style={{ marginTop: 10, marginStart: 10, backgroundColor: '#fff' }}>
//           <FlatList
//             keyExtractor={(item) => item.id}
//             data={tredbooks}

//             renderItem={({ item }) =>
//               <TouchableOpacity onPress={() => {
//                 navigation.navigate('BooksDetailPage', { data: item })
//               }}>
//                 <View style={{
//                   width: 182,
//                   height: 260,
//                   marginEnd: 22,
//                   borderRadius: 10,
//                 }}>
//                   <View style={{
//                     flex: 1,
//                     width: 100,
//                     marginLeft: 60 / 2,
//                     marginTop: 10 / 2,
//                     borderRadius: 5,
//                     overflow: 'visible',
//                   }}>
//                     <Image source={{ uri: item.image_path }}
//                       style={{
//                         aspectRatio: 0.8,
//                         resizeMode: 'cover'
//                       }} /></View>
//                   <View style={{ padding: 10, }}>
//                     <Text style={{
//                       fontSize: 15,
//                       fontWeight: 'bold',
//                       color: '#000'
//                     }} numberOfLines={2}>{item.name}</Text><Text style={{
//                       backgroundColor: '#a3a3c2',
//                       textAlign: 'center',
//                       fontWeight: 'bold',
//                       color: '#fff',
//                       marginLeft: 40,
//                       marginRight: 40,
//                       paddingTop: 5,
//                       height: 30,
//                       marginTop: 5,
//                       borderRadius: 5,
//                     }}>Book</Text>
//                     <Text style={{
//                       backgroundColor: '#c27b7f',
//                       textAlign: 'center',
//                       fontWeight: 'bold',
//                       color: '#fff',
//                       marginLeft: 30,
//                       marginRight: 40,
//                       paddingTop: 10,
//                       width: 100,
//                       height: 40,
//                       marginTop: 5,
//                       borderRadius: 5,
//                     }}>Read More</Text>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             }
//             horizontal={true}
//             contentContainerStyle={{ columnGap: 10 }}
//           />
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default BooksDetail;
// const styles = StyleSheet.create({
//   textHeading: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: '#000'
//   }, coroselheading: {
//     fontFamily: 'Philosopher-Bold',
//     fontSize: 25,
//     fontWeight: '600',
//     color: '#000',
//     textAlign: 'center'
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,

//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   button: {
//     borderRadius: 5,
//     padding: 10,
//     elevation: 2,
//     backgroundColor: '#c27b7f',
//   },
//   buttonOpen: {
//     backgroundColor: '#F194FF',
//   },
//   buttonClose: {
//     backgroundColor: '#2196F3',
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',

//   },
//   modalText: {
//     marginBottom: 5,
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   pdf: {
//     flex: 1,
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
// },
// pageButton: {
//     position: 'absolute',
//     bottom: 210,
//     right: 0,
//     backgroundColor: 'black',
//     borderRadius: 10,
//     padding: 10,
// },
// pageButtonText: {
//     color: 'white',
// },
// });








































// ============================================== to git commit==================================


import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, FlatList, Modal, Pressable } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native';
import Header from '../common/Header';
import { AuthContext } from '../context/AuthContext';
import Pdf from 'react-native-pdf';
import { Alert } from "react-native";


const BooksDetail = ({ navigation }) => {
  const [isLoaded, setisLoaded] = useState(true);
  const route = useRoute();
  const [tredbooks, setTredBooks] = useState([]);
  const { userToken, userInfo } = useContext(AuthContext);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [Ebooks, setEbooks] = useState([]);
  const [subscribedBooks, setSubscribedBooks] = useState([]);
  const [subscribe, setSubscribe] = useState([]);


  const [libraryid, setLibraryId] = useState([]);

  const currentDate = new Date();
  const endDate = new Date(currentDate);
  endDate.setDate(endDate.getDate() + 10);
  const [modalVisible, setModalVisible] = useState(false);

  const status = (userToken !== null ? (true) : (false));

  const filename = route.params.data.file_name;
  // .split(".")[0];
  const pdfUrl = `https://dindayalupadhyay.smartcitylibrary.com/public_uploads_ebooks/${filename}`;
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfModalVisible, setPdfModalVisible] = useState(false);


  const [subscribeCount, setSubscribeCount] = useState(0);


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

  //------------------handle of navigation to book history page---------------------------
  const handleBookHistory = (item) => {


    const subscriptionData1 = {
      book_item_id: route.params.data.items[0].id,
      library_id: route.params.data.library_id
    };

    console.log('data retrived butttttl::::;', subscriptionData1);



    const url = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/books/${item.items[0].id}/reserve-book`;

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
        console.log('Data stored successfully:', responseData);
        navigation.navigate('subscribebookHistory');
      })

      .catch((error) => {
        console.error('Error storing data:', error);
      });

  }

  // ===================================================================================

  const handleSubscribe = (item) => {
    const member_id = userInfo.data.user.member_id;
    const id = route.params.data.items[0].id;
    console.log('data testis::::', item);
    const subscriptionData = {
      ebook_id: id,
      member_id: member_id,
      item
    };


    //console.log("subbb:", subscriptionData);
    const url = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/ebook-subscription`;
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
        console.log("responce is:", response);
        return response.json();
      })
      .then((responseData) => {
        console.log('Data stored successfully:', responseData);

        setModalVisible(!modalVisible);
        setSubscribeCount(subscribeCount + 1);
        navigation.navigate('myEBook');
      })

      .catch((error) => {
        console.error('Error storing data:', error);
      });
  };

  // ================================================================

  useEffect(() => {
    const tredingbooks = () => {
      fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books")
        .then(res => res.json())
        .then(responce => {
          setTredBooks(responce.data.splice(-4));
          setisLoaded(false);
        });
    };
    tredingbooks();
  }, []);





  //===================API CALL FOR DIFFERENT LIBRARY WHEATHER THE MEMBER IS REGISTERED OR NOT=======================


  const handle_member = () => {

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
        console.error('Error fetching data:', error);
      });
  }




  console.log(libraryid);


  //===================API CALL FOR register-member-to-library=======================  

  const handleMemberRegistered = (item) => {


    console.log(item);
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
        console.log("responce is:", response);
        return response.json();
      })
      .then((responseData) => {
        console.log('Data stored successfully:', responseData);

        setModalVisible(!modalVisible);

        Alert.alert(
          'Success!',
          'You are successfully registered with same email and password'
        )
      })

      .catch((error) => {
        console.error('Error storing data:', error);
      });
  };


  const userLibraryId = libraryid.map((item) => [
    item.user_library_id,
  ]);
  const LibraryId = userLibraryId.flat();

  console.log(LibraryId);
  console.log(LibraryId.includes(route.params.data.library_id));




  return (
    <View style={{ flex: 1, backgroundColor: '#fff', flexDirection: 'column' }}>
      <Header
        rightIcon={require('../images/Logoelibrary.png')}
        leftIcon={require('../images/back.png')}
        onClickLeftIcon={() => {
          navigation.navigate('Book', { screen: 'Home' });
        }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {

          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>



          {LibraryId.includes(route.params.data.library_id) ?
            (<View style={styles.modalView}>

              <Text style={styles.modalText}>The Book Will be Subscribed from</Text>
              <View style={{ flexDirection: 'row', marginBottom: 15, }}>
                <Text style={{ color: 'blue', fontSize: 15, fontWeight: 'bold', }}>{startDate}</Text>
                <Text style={{ fontSize: 15, fontWeight: 'bold', }}>  to  </Text>
                <Text style={{ color: 'blue', fontSize: 15, fontWeight: 'bold', }}>{endingDate}</Text>
              </View>
              <Pressable
                style={styles.button}
                onPress={() => { handleSubscribe(route.params.data), handle_member() }}>
                <Text style={styles.textStyle}>Subscribe</Text>
              </Pressable>

            </View>) :
            (<View style={styles.modalView}>

              <Text style={styles.modalText}>Book Reservation/Subscription</Text>
              <View style={{ flexDirection: 'row', marginBottom: 15, }}>

                <Text style={{
                  textAlign: 'center', marginBottom: 5,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>These book belongs to</Text>

                {route.params.data.library_id === 111 ?
                  (<Text style={{
                    fontWeight: 'bold', paddingTop: 10, height: 50,
                    fontSize: 18, textAlign: 'center', marginTop: 10, borderWidth: 5
                  }}>
                    Dindayal UpadhyayLibrary</Text>) :

                  (route.params.data.library_id === 222 ?
                    (<Text style={{
                      fontWeight: 'bold', fontSize: 18, textAlign: 'center',
                      marginTop: 10
                    }}>
                      Kundanlal Gupta Library</Text>) :

                    (<Text style={{
                      fontWeight: 'bold', paddingTop: 10, height: 50, fontSize: 18, textAlign: 'center',
                      marginTop: 10, borderWidth: 5
                    }}>
                      Rashtramata Kasturba Library</Text>))}

                <Text>. And Your are not the Member either.Do you want to Register for </Text>

                {route.params.data.library_id === 111 ?
                  (<Text style={{
                    fontWeight: 'bold', paddingTop: 10, height: 50, fontSize: 18, textAlign: 'center',
                    marginTop: 10, borderWidth: 5
                  }}>
                    Dindayal UpadhyayLibrary</Text>) :

                  (route.params.data.library_id === 222 ?
                    (<Text style={{
                      fontWeight: 'bold', paddingTop: 10, height: 50, fontSize: 18,
                      textAlign: 'center', marginTop: 10, borderWidth: 5
                    }}>
                      Kundanlal Gupta Library</Text>) :

                    (<Text style={{
                      fontWeight: 'bold', paddingTop: 10, height: 50, fontSize: 18, textAlign: 'center',
                      marginTop: 10, borderWidth: 5
                    }}>
                      Rashtramata Kasturba Library</Text>))}

                <Text>and Continue ?</Text>

              </View>



              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Pressable
                  style={styles.button}
                  // onPress={() => handleMemberRegistered(selectedLibraryId)}>
                  onPress={() => { handleMemberRegistered(route.params.data.library_id), handle_member() }}>
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
                console.log(`Number of pages: ${numberOfPages}`);
              }}
              onPageChanged={(page, numberOfPages) => {
                setCurrentPage(page);
              }}
              onError={(error) => {
                console.log(error);
              }}
              onPressLink={(uri) => {
                console.log(`Link pressed: ${uri}`);
              }}
              style={styles.pdf}
            />

            <View style={styles.pageButton}>
              <Text style={styles.pageButtonText}> {currentPage}</Text>
            </View>

          </View>
        </View>
      </Modal>


      <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 15, }}>
        <View style={{
          marginLeft: 80,
          width: Dimensions.get('window').width,
          height: 200,
          marginEnd: 22,
          borderRadius: 10,
        }}>
          <View style={{
            width: 150,
            marginLeft: 60 / 2,
            marginTop: 10 / 2,
            overflow: 'visible',
          }}>
            <Image source={{
              uri: route.params.data.image_path
            }}
              style={{
                aspectRatio: 0.8,
                resizeMode: 'cover'
              }}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
          <Text style={styles.textHeading}>ISBN No:</Text><Text style={{ fontSize: 15, marginLeft: 8 }}>{route.params.data.isbn}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
          <Text style={styles.textHeading}>Author:</Text>
          <Text style={{ fontSize: 15, marginLeft: 8 }}>{route.params.data.authors[0].first_name} {route.params.data.authors[0].last_name}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
          <Text style={styles.textHeading}>Format:</Text>
          {route.params.data.items[0].format === 3 ?
            (<Text style={{ fontSize: 15, marginLeft: 8 }}>E-Book</Text>)
            : route.params.data.items[0].format === 1 ?
              (<Text style={{ fontSize: 15, marginLeft: 8 }}>hardcover</Text>) :
              (<Text style={{ fontSize: 15, marginLeft: 8 }}>Book</Text>)}
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
          <Text style={styles.textHeading}>Edition</Text>
          <Text style={{ fontSize: 15, marginLeft: 8 }}>{route.params.data.items[0].edition}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
          <Text style={styles.textHeading}>Genre:</Text>
          <Text style={{ fontSize: 15, marginLeft: 8 }}>{route.params.data.genres[0].name}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
          <Text style={styles.textHeading}>Publisher:</Text>
          <Text style={{ fontSize: 15, marginLeft: 8 }}>{route.params.data.items[0].publisher.name}</Text>
        </View>

        <View style={{ flexDirection: 'column', marginTop: 10, marginLeft: 10, }}>
          <Text style={styles.textHeading}>Belongs To:</Text>
          <View style={{ marginRight: 5 }}>{route.params.data.library_id === 111 ?
            (<Text style={{ fontWeight: 'bold', paddingTop: 10, height: 50, fontSize: 18, textAlign: 'center', marginTop: 10, borderWidth: 5 }}>
              Dindayal UpadhyayLibrary</Text>) :
            (route.params.data.library_id === 222 ?
              (<Text style={{ fontWeight: 'bold', paddingTop: 10, height: 50, fontSize: 18, textAlign: 'center', marginTop: 10, borderWidth: 5 }}>
                Kundanlal Gupta Library</Text>) :
              (<Text style={{ fontWeight: 'bold', paddingTop: 10, height: 50, fontSize: 18, textAlign: 'center', marginTop: 10, borderWidth: 5 }}>
                Rashtramata Kasturba Library</Text>))}</View></View>

        <View style={{ flexDirection: 'column', marginTop: 10, marginLeft: 10, }}>
          <Text style={styles.textHeading}>Description:</Text>
          <Text style={{ fontSize: 15, marginLeft: 3 }}>{route.params.data.description}</Text>
        </View>



        {/* ========================working with preview================ */}


        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#c27b7f',
              padding: 10,
              borderRadius: 5,
              width: '35%',
              height: 50,
              marginTop: 20,
              marginLeft: 20,
              marginBottom: 20,

            }}
            onPress={() => {

              if (userToken !== null) {
                if (route.params.data.items[0].format === 3) {
                  setModalVisible(true);
                } else {
                  handleBookHistory(route.params.data);
                  
                }
              } else {
                navigation.navigate('sLogin');
              }
            }}
          >
            <Text style={{
              color: '#fff',
              fontWeight: '700',
              fontSize: 18,
              textAlign: 'center',
            }}> {route.params.data.items[0].format === 3 ? 'Subscribe' : 'Reserved'}</Text>
          </TouchableOpacity>


          {userToken !== null && route.params.data.items[0].format === 3 ?
            (<TouchableOpacity
              style={{
                backgroundColor: '#c27b7f',
                padding: 10,
                borderRadius: 5,
                width: '35%',
                height: 50,
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
                fontWeight: '700',
                fontSize: 18,
                textAlign: 'center',
                //paddingLeft:10,
              }}>Preview</Text>

            </TouchableOpacity>) : null}


        </View>

        {route.params.data.items[0].status === 1 ?
          (<View style={{ flexDirection: 'column', }}>

            {route.params.data.items[0].format !== 3 ?
              (<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, }}>
                <Text style={{ textAlign: 'center', fontSize: 17, fontWeight: 700, color: '#c27b7f' }}>Available </Text>
                <Text style={{ backgroundColor: '#c27b7f', color: 'white', padding: 5, borderRadius: 15 }}>1</Text></View>)
              :
              (null)}
          </View>) :
          (<Text style={{
            textAlign: 'center', color: 'red',
            fontSize: 18, fontWeight: 'bold', marginBottom: 10
          }}>Unavailable</Text>)

        }

        {/* =====================================without preview================================== */}



        {/* {route.params.data.items[0].status===1?
(<View style={{ flexDirection: 'column', }}>

{route.params.data.items[0].format !== 3 ?
( <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:10,}}>
  <Text style={{textAlign:'center',fontSize:17,fontWeight:700,color: '#c27b7f'}}>Available </Text>
  <Text style={{backgroundColor:'#c27b7f',color:'white',padding:5,borderRadius:15}}>1</Text></View>)
  :
  (null)}



  {userToken !== null ?

          (<TouchableOpacity
            style={{
              backgroundColor: '#c27b7f',
              padding: 10,
              borderRadius: 5,
              width: '35%',
              height: 50,
              marginTop: 20,
              marginLeft: 20,
              marginBottom: 20,
              
            }}
            onPress={() => {
              {route.params.data.items[0].format === 3 ?
             (setModalVisible(!modalVisible))
             :(handleBookHistory(route.params.data))}
            }}
          >
          {route.params.data.items[0].format === 3 ? 
              (
              <View style={{flexDirection:'row'}}>
                <Text style={{
                color: '#fff',
                fontWeight: '700',
                fontSize: 18,
                textAlign:'center',
                paddingLeft:10,
              }}>subscribe</Text>

            
             

             </View>
             )
              :
               (<Text style={{
                color: '#fff',
                fontWeight: '700',
                fontSize: 18,
                textAlign:'center'
              }}>Reserved</Text>
              )}
          </TouchableOpacity>)
          :
          (<TouchableOpacity
            style={{
              backgroundColor: '#c27b7f',
              alignItems: 'center',
              padding: 10,
              borderRadius: 5,
              width: '50%',
              height: 50,
              justifyContent: 'center',
              marginTop: 20,
              marginLeft: 100,
              marginBottom: 20
            }} onPress={() => {
              navigation.navigate('sLogin');
            }}>
               {route.params.data.items[0].format === 3 ? 
              (
              <View style={{flexDirection:'row'}}>
                <Text style={{
                color: '#fff',
                fontWeight: '700',
                fontSize: 18,
                textAlign:'center',
                paddingLeft:10,
              }}>subscribe</Text>

            
             

             </View>
             )
              :
               (<Text style={{
                color: '#fff',
                fontWeight: '700',
                fontSize: 18,
                textAlign:'center'
              }}>Reserved</Text>
              )}
           
          </TouchableOpacity>)
    }  
    
    </View>):
    (<Text style={{textAlign:'center',color:'red',
    fontSize:18,fontWeight:'bold',marginBottom:10}}>Unavailable</Text>)
    
    }  */}




        {/* =================================Trending books==================================== */}

        <View style={{ flexDirection: 'row', marginVertical: 5, justifyContent: 'space-between', marginLeft: 15, marginRight: 15, }}>
          <Text style={styles.coroselheading}>Trending Books</Text>
        </View>

        <View style={{ marginTop: 10, marginStart: 10, backgroundColor: '#fff' }}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={tredbooks}

            renderItem={({ item }) =>
              <TouchableOpacity onPress={() => {
                navigation.navigate('BooksDetailPage', { data: item })
              }}>
                <View style={{
                  width: 182,
                  height: 260,
                  marginEnd: 22,
                  borderRadius: 10,
                }}>
                  <View style={{
                    flex: 1,
                    width: 100,
                    marginLeft: 60 / 2,
                    marginTop: 10 / 2,
                    borderRadius: 5,
                    overflow: 'visible',
                  }}>
                    <Image source={{ uri: item.image_path }}
                      style={{
                        aspectRatio: 0.8,
                        resizeMode: 'cover'
                      }} /></View>
                  <View style={{ padding: 10, }}>
                    <Text style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: '#000'
                    }} numberOfLines={2}>{item.name}</Text><Text style={{
                      backgroundColor: '#a3a3c2',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: '#fff',
                      marginLeft: 40,
                      marginRight: 40,
                      paddingTop: 5,
                      height: 30,
                      marginTop: 5,
                      borderRadius: 5,
                    }}>Book</Text>
                    <Text style={{
                      backgroundColor: '#c27b7f',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: '#fff',
                      marginLeft: 30,
                      marginRight: 40,
                      paddingTop: 10,
                      width: 100,
                      height: 40,
                      marginTop: 5,
                      borderRadius: 5,
                    }}>Read More</Text>
                  </View>
                </View>
              </TouchableOpacity>
            }
            horizontal={true}
            contentContainerStyle={{ columnGap: 10 }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default BooksDetail;
const styles = StyleSheet.create({
  textHeading: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000'
  }, coroselheading: {
    fontFamily: 'Philosopher-Bold',
    fontSize: 25,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,

  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    backgroundColor: '#c27b7f',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',

  },
  modalText: {
    marginBottom: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  pageButton: {
    position: 'absolute',
    bottom: 210,
    right: 0,
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 10,
  },
  pageButtonText: {
    color: 'white',
  },
});