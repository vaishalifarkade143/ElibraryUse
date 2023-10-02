// import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native'
// import React, { useEffect, useState ,useContext} from 'react'
// import { useDispatch ,useSelector} from 'react-redux';
// import { viewBooks } from '../redux/slice/BooksDetailSlice';
// import { useRoute } from '@react-navigation/native';
// import { Picker } from '@react-native-picker/picker';
// import Header from '../common/Header';
// import { AuthContext } from '../context/AuthContext';




// const BooksDetail = ({ navigation }) => {
//   const [books, setBooks] = useState([]);
//   const [isLoaded, setisLoaded] = useState(true);
//   const route = useRoute();
//   const dispatch = useDispatch();
//   const [tredbooks, setTredBooks] = useState([]);
//   // const [isLoggedIn, setIsLoggedIn] = useState(false); // You should set this based on the user's login status
//   const { userToken } = useContext(AuthContext);

//   const subscribedBooks = useSelector((state) => state.bookHistory.subscribedBooks);

// //   const [selectedlibraryOptions, setSelectedLibraryOptions] = useState('search by libraryOptions')

// // ;
// //   const libraryOptions=['Dindayal Upadhyay Library','Kundanlal Gupta Library','Rashtramata Kasturba Library']



// // const isSubscribed = subscribedBooks.data.includes(route.params.data.isbn);


// // const handleSubscribe = (book) => {
// //   // Check if the book is already subscribed
// //   const isSubscribed = subscribedBooks.some((isbn) => isbn === book.isbn);
// //   if (!isSubscribed) {
// //     // If not subscribed, subscribe to the book
// //     dispatch(subscribedBooks(book));
// //   } else {
// //     // If already subscribed, unsubscribe from the book
// //     dispatch(unsubscribeFromBook(book));
// //   }
// // };

//   const libraries = [

//     { id: 111, name: "Dindayal Upadhyay Library" },
//     { id: 222, name: "Kundanlal Gupta Library" },
//     { id: 333, name: "Rashtramata Kasturba Library" }
//   ];
//   // =================single book get================================


//   useEffect(() => {
//     const getbooks = () => {
//       fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books")

//         .then(res => res.json())
//         //  .then(responce => console.log(responce));
//         .then(responce => {
//           // console.log(JSON.stringify(items) + ' ' +items.data.length);
//           //console.log(responce.data);
//           // console.log('Image : ' + responce.data.image);
//           setBooks(responce.data);
//           setisLoaded(false);
//           dispatch(viewBooks(responce));

//         });
//     };
//     getbooks();
//   }, []);


//   // ===========================Trending button=======================
//   useEffect(() => {
//     const tredingbooks = () => {
//       fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books")
//         .then(res => res.json())
//         //  .then(responce => console.log(responce));
//         .then(responce => {
//           // console.log(JSON.stringify(items) + ' ' +items.data.length);
//           //console.log(responce.data);
//           // console.log('Image : ' + responce.data.image);
//           setTredBooks(responce.data.splice(-4));
//           setisLoaded(false);
//           //dispatch(viewBooks(responce));

//         });
//     };
//     tredingbooks();
//   }, []);


//   // =================single book get================================
//   return (

//     <View style={{ flex: 1, backgroundColor: '#fff', flexDirection: 'column' }}>
//        <Header
//                 rightIcon={require('../images/Logoelibrary.png')}
//                 leftIcon={require('../images/back.png')}
//                 onClickLeftIcon={() => {
//                     navigation.navigate('Book', { screen: 'Home' });

//                 }}
//             />
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
//               //uri: "https://cdn.pixabay.com/photo/2016/11/25/07/00/diamond-1857736_1280.png" 
//             }}

//               style={{
//                 aspectRatio: 0.8,
//                 resizeMode: 'cover'
//               }}
//             />
//           </View>
//         </View>
//         <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
//           <Text style={styles.textHeading}>ISBN No:</Text>
//           <Text style={{ fontSize: 15, marginLeft: 8 }}>{route.params.data.isbn}</Text>
//         </View>
//         <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
//           <Text style={styles.textHeading}>Author:</Text>
//           <Text style={{ fontSize: 15, marginLeft: 8 }}>{route.params.data.authors[0].first_name} {route.params.data.authors[0].last_name}</Text>
//         </View>
//         <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
//           <Text style={styles.textHeading}>Format:</Text>
//           {route.params.data.items[0].format===2?(<Text style={{ fontSize: 15, marginLeft: 8 }}>Book</Text>):
//           (<Text style={{ fontSize: 15, marginLeft: 8 }}>E-Book</Text>)}
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
//           {/* <Picker
//             style={{ height: 50, width: '100%', marginTop: 20, borderWidth: 5, borderColor: 'black' }}
//             prompt="Select Library"
//             selectedValue={selectedlibraryOptions} // Set the initial selected value here
//             onValueChange={(itemValue)=>setSelectedLibraryOptions(itemValue)}
//             // enabled={true} // To disable user interaction with the Picker
//           > */}
//           <View style={{marginRight:5}}>{route.params.data.library_id === 111 ?
//                         (<Text style={{ fontWeight: 'bold',paddingTop:10,height: 50, fontSize:18,textAlign:'center',marginTop: 10,borderWidth: 5}}>
//                           Dindayal UpadhyayLibrary</Text>) :
//                         (route.params.data.library_id === 222 ?
//                           (<Text style={{ fontWeight: 'bold',paddingTop:10,height: 50, fontSize:18,textAlign:'center',marginTop: 10,borderWidth: 5}}>
//                             Kundanlal Gupta Library</Text>) :
//                           (<Text style={{ fontWeight: 'bold',paddingTop:10,height: 50, fontSize:18,textAlign:'center',marginTop: 10,borderWidth: 5}}>
//                             Rashtramata Kasturba Library</Text>))}</View>

//           {/* </Picker> */}
//         </View>




//         <View style={{ flexDirection: 'column', marginTop: 10, marginLeft: 10, }}>
//           <Text style={styles.textHeading}>Description:</Text>
//           <Text style={{ fontSize: 15, marginLeft: 3 }}>{route.params.data.description}</Text>

//         </View>
//         {userToken !== null ?
//         (<TouchableOpacity
//           style={{
//             backgroundColor: '#c27b7f',
//             alignItems: 'center',
//             padding: 10,
//             borderRadius: 5,
//             width: '50%',
//             height: 50,
//             justifyContent: 'center',
//             marginTop: 20,
//             marginLeft: 100,
//             marginBottom: 20
//           }}


//             onPress={()=> {
//               // handleSubscribe(route.params.data)}
//           //     navigation.navigate('subscribe',{screen:'sLogin'});
//           navigation.navigate('reserveEBook', { data: route.params.data.isbn });
//           }}

//           // onPress={() => navigation.navigate('Book', {
//           //   screen: 'Home',
//           //   params: {
//           //     screen: 'Sound',
//           //     params: {
//           //       screen: 'Media',
//           //     },
//           //   },
//           // })}

//         >
//           <Text style={{
//       color: '#fff',
//       fontWeight: '700',
//       fontSize: 18
//     }}>Subscribe</Text> 
//          {/* <Text style={{
//       color: '#fff',
//       fontWeight: '700',
//       fontSize: 18
//     }}>{isSubscribed ? 'Unsubscribe' : 'Subscribe'}</Text> */}
//         </TouchableOpacity>):

//       (
//           <TouchableOpacity
//           style={{
//             backgroundColor: '#c27b7f',
//             alignItems: 'center',
//             padding: 10,
//             borderRadius: 5,
//             width: '50%',
//             height: 50,
//             justifyContent: 'center',
//             marginTop: 20,
//             marginLeft: 100,
//             marginBottom: 20
//           }}
//           onPress={() => {
//             // Navigate to the login page since the user is not logged in
//             navigation.navigate('sLogin');

//           }}

//         >

//           <Text style={{
//             color: '#fff',
//             fontWeight: '700',
//             fontSize: 18
//           }}>Subscribe</Text>
//         </TouchableOpacity>
//       )}
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
//                 // {data:item}
//               }}>
//                 <View style={{
//                   width: 182,
//                   height: 260,
//                   marginEnd: 22,
//                   borderRadius: 10,
//                   // backgroundColor: '#fff'
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
//                       }}


//                     />
//                   </View>
//                   <View style={{ padding: 10, }}>
//                     <Text style={{
//                       fontSize: 15,
//                       fontWeight: 'bold',
//                       color: '#000'
//                     }} numberOfLines={2}>
//                       {item.name}
//                     </Text>

//                     <Text style={{
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

//   )
// }

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

// });         


import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { viewBooks, subscribeToBook, unsubscribeFromBook } from '../redux/slice/BooksDetailSlice';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import Header from '../common/Header';
import { AuthContext } from '../context/AuthContext';




const BooksDetail = ({ navigation }) => {

  const [books, setBooks] = useState([]);
  const [isLoaded, setisLoaded] = useState(true);
  const route = useRoute();
  const dispatch = useDispatch();
  const [tredbooks, setTredBooks] = useState([]);
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // You should set this based on the user's login status
  const { userToken } = useContext(AuthContext);

  // Use the useNavigation hook to get the navigation object
  const appNavigation = useNavigation();

  const subscribedBooks = useSelector((state) => state.book.subscribedBooks);

  const [isSubscribed, setIsSubscribed] = useState(false);




  //   const [selectedlibraryOptions, setSelectedLibraryOptions] = useState('search by libraryOptions')

  // ;
  //   const libraryOptions=['Dindayal Upadhyay Library','Kundanlal Gupta Library','Rashtramata Kasturba Library']



  // const isSubscribed = subscribedBooks.data.includes(route.params.data.isbn);


  // const handleSubscribe = (book) => {
  //   // Check if the book is already subscribed
  //   const isSubscribed = subscribedBooks.some((isbn) => isbn === book.isbn);
  //   if (!isSubscribed) {
  //     // If not subscribed, subscribe to the book
  //     dispatch(subscribedBooks(book));
  //   } else {
  //     // If already subscribed, unsubscribe from the book
  //     dispatch(unsubscribeFromBook(book));
  //   }
  // };

  const libraries = [

    { id: 111, name: "Dindayal Upadhyay Library" },
    { id: 222, name: "Kundanlal Gupta Library" },
    { id: 333, name: "Rashtramata Kasturba Library" }
  ];




  // Check if the book is already subscribed
  useEffect(() => {
    setIsSubscribed(subscribedBooks.includes(route.params.data.isbn));
  }, [subscribedBooks, route.params.data.isbn]);



  const handleSubscribe = (item) => {
    if (isSubscribed) {
      // If already subscribed, unsubscribe from the book
      dispatch(unsubscribeFromBook(route.params.data.isbn));
    } else {
      // If not subscribed, subscribe to the book
      // dispatch(subscribeToBook(route.params.data.isbn));
      dispatch(subscribeToBook(route.params.data));

      // Navigate to the MyEbooks page
      appNavigation.navigate('reserveEBook',{data:item});
    }
  };










  // =================single book get================================
  useEffect(() => {
    const getbooks = () => {
      fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books")

        .then(res => res.json())
        //  .then(responce => console.log(responce));
        .then(responce => {
          // console.log(JSON.stringify(items) + ' ' +items.data.length);
          // console.log(responce.data);
          // console.log('Image : ' + responce.data.image);
          setBooks(responce.data);
          setisLoaded(false);
          dispatch(viewBooks(responce));

        });
    };
    getbooks();
  }, []);


  // ===========================Trending button=======================
  useEffect(() => {
    const tredingbooks = () => {
      fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books")
        .then(res => res.json())
        //  .then(responce => console.log(responce));
        .then(responce => {
          // console.log(JSON.stringify(items) + ' ' +items.data.length);
          //console.log(responce.data);
          // console.log('Image : ' + responce.data.image);
          setTredBooks(responce.data.splice(-4));
          setisLoaded(false);
          //dispatch(viewBooks(responce));

        });
    };
    tredingbooks();
  }, []);


  // =================single book get================================
  return (

    <View style={{ flex: 1, backgroundColor: '#fff', flexDirection: 'column' }}>
      <Header
        rightIcon={require('../images/Logoelibrary.png')}
        leftIcon={require('../images/back.png')}
        onClickLeftIcon={() => {
          navigation.navigate('Book', { screen: 'Home' });

        }}
      />
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
              //uri: "https://cdn.pixabay.com/photo/2016/11/25/07/00/diamond-1857736_1280.png" 
            }}

              style={{
                aspectRatio: 0.8,
                resizeMode: 'cover'
              }}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
          <Text style={styles.textHeading}>ISBN No:</Text>
          <Text style={{ fontSize: 15, marginLeft: 8 }}>{route.params.data.isbn}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
          <Text style={styles.textHeading}>Author:</Text>
          <Text style={{ fontSize: 15, marginLeft: 8 }}>{route.params.data.authors[0].first_name} {route.params.data.authors[0].last_name}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
          <Text style={styles.textHeading}>Format:</Text>
          {route.params.data.items[0].format === 2 ? (<Text style={{ fontSize: 15, marginLeft: 8 }}>Book</Text>) :
            (<Text style={{ fontSize: 15, marginLeft: 8 }}>E-Book</Text>)}
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
          {/* <Picker
            style={{ height: 50, width: '100%', marginTop: 20, borderWidth: 5, borderColor: 'black' }}
            prompt="Select Library"
            selectedValue={selectedlibraryOptions} // Set the initial selected value here
            onValueChange={(itemValue)=>setSelectedLibraryOptions(itemValue)}
            // enabled={true} // To disable user interaction with the Picker
          > */}
          <View style={{ marginRight: 5 }}>{route.params.data.library_id === 111 ?
            (<Text style={{ fontWeight: 'bold', paddingTop: 10, height: 50, fontSize: 18, textAlign: 'center', marginTop: 10, borderWidth: 5 }}>
              Dindayal UpadhyayLibrary</Text>) :
            (route.params.data.library_id === 222 ?
              (<Text style={{ fontWeight: 'bold', paddingTop: 10, height: 50, fontSize: 18, textAlign: 'center', marginTop: 10, borderWidth: 5 }}>
                Kundanlal Gupta Library</Text>) :
              (<Text style={{ fontWeight: 'bold', paddingTop: 10, height: 50, fontSize: 18, textAlign: 'center', marginTop: 10, borderWidth: 5 }}>
                Rashtramata Kasturba Library</Text>))}</View>

          {/* </Picker> */}
        </View>




        <View style={{ flexDirection: 'column', marginTop: 10, marginLeft: 10, }}>
          <Text style={styles.textHeading}>Description:</Text>
          <Text style={{ fontSize: 15, marginLeft: 3 }}>{route.params.data.description}</Text>

        </View>
        {userToken !== null ?
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
            }}


            onPress={() => {
              handleSubscribe(route.params.data);
              // handleSubscribe(route.params.data)}
              //     navigation.navigate('subscribe',{screen:'sLogin'});
              // navigation.navigate('reserveEBook', { data: route.params.data.isbn });
            }}

          // onPress={() => navigation.navigate('Book', {
          //   screen: 'Home',
          //   params: {
          //     screen: 'Sound',
          //     params: {
          //       screen: 'Media',
          //     },
          //   },
          // })}

          >
            <Text style={{
              color: '#fff',
              fontWeight: '700',
              fontSize: 18
            }}>{isSubscribed ? 'Unsubscribe' : 'Subscribe'}</Text>
            {/* <Text style={{
      color: '#fff',
      fontWeight: '700',
      fontSize: 18
    }}>{isSubscribed ? 'Unsubscribe' : 'Subscribe'}</Text> */}
          </TouchableOpacity>) :

          (
            <TouchableOpacity
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
              }}
              onPress={() => {
                // Navigate to the login page since the user is not logged in
                navigation.navigate('sLogin');

              }}

            >

              <Text style={{
                color: '#fff',
                fontWeight: '700',
                fontSize: 18
              }}>Subscribe</Text>
            </TouchableOpacity>
          )}
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
                // {data:item}
              }}>
                <View style={{
                  width: 182,
                  height: 260,
                  marginEnd: 22,
                  borderRadius: 10,
                  // backgroundColor: '#fff'
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
                      }}


                    />
                  </View>
                  <View style={{ padding: 10, }}>
                    <Text style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: '#000'
                    }} numberOfLines={2}>
                      {item.name}
                    </Text>

                    <Text style={{
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

  )
}

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

});