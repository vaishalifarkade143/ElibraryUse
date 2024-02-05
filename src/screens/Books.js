// import React, { useState, useEffect, useCallback, } from "react";
// import { View, ScrollView, TouchableOpacity, Text, FlatList, Image, ActivityIndicator, } from "react-native";
// import Header from "../common/Header";
// import getStyles from '../Style/logNRegStyle';
// import Theme from './Theme';
// import FastImage from 'react-native-fast-image'



// const Books = ({ navigation }) => {

//   const [selectedGenre, setSelectedGenre] = useState("Genre");
//   const [genr, setGenr] = useState([]);
//   const [selectedPublisher, setSelectedPublisher] = useState("Publisher");
//   const [publishr, setPublishr] = useState([]);
//   const [selectedAuthor, setSelectedAuthor] = useState("Author");
//   const [authr, setAuthr] = useState([]);
//   const [selectedLanguage, setSelectedLanguage] = useState("Language");
//   const [language, setLanguage] = useState([]);
//   const [selectedFormat, setSelectedFormat] = useState("Format");
//   const [selectedLibrary, setSelectedLibrary] = useState("Library");
//   const [books, setBooks] = useState([]);
//   const [isLoaded, setisLoaded] = useState(true);


//   //======================state for search bar=======================
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);


//   const [filteredBooks, setFilteredBooks] = useState([]);


//   //===============according to new api========================
//   const [details, setDetails] = useState([]);
//   const [prevLimit, setPrevLimit] = useState(10);
//   const [prevSkip, setPrevSkip] = useState(0);


//   // ===================dropdown navigation to search screen==================

//   const handleNavigateToSearchGenre = () => {
//     const genreList = [...genr];
//     const book = [...books];
//     navigation.navigate('search', { genreList, book });
//   };
//   const handleNavigateToSearchAuthor = () => {
//     const authorList = [...authr];
//     const book = [...books];
//     navigation.navigate('search', { authorList, book });
//   };
//   const handleNavigateToSearchPublisher = () => {
//     const publisherList = [...publishr];
//     const book = [...books];
//     navigation.navigate('search', { publisherList, book });
//   };
//   const handleNavigateToSearchLanguage = () => {
//     const languageList = [...language];
//     const book = [...books];
//     navigation.navigate('search', { languageList, book });
//   };
//   const handleNavigateToSearchFormat = () => {
//     const formatList = [...formats];
//     const book = [...books];
//     navigation.navigate('search', { formatList, book });

//   };
//   const handleNavigateToSearchLibrary = () => {
//     const libraryList = [...libraries];
//     const book = [...books];
//     navigation.navigate('search', { libraryList, book });
//   };


//   //=========================page is refreshing on every click on book tab===============================


//   // useEffect(() => {
//   //   const unsubscribe = navigation.addListener('focus', () => {
//   //     const getBooks = async () => {
//   //       try {
//   //         const response = await fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books");
//   //         const data = await response.json();
//   //         setBooks(data.data);
//   //         setPrevLimit(10);
//   //         setPrevSkip(0);
//   //         const filteredResponse = await fetch(`https://dindayalupadhyay.smartcitylibrary.com/api/v1/books?order_by=name&direction=asc&limit=${prevLimit}&skip=${prevSkip}&search=&genre=&library_id=0&author=&publisher=&language=0&format=0`);
//   //         const filteredData = await filteredResponse.json();
//   //         setDetails(filteredData.data);

//   //         setisLoaded(false);
//   //       } catch (error) {
//   //         // console.error("Error fetching books:", error);
//   //       }

//   //     };

//   //     getBooks();
//   //   });
//   //   return unsubscribe;
//   // }
//   //   , [navigation]);



//     const getBooks =  useCallback (async () => {
//       try {
//         const response = await fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books");
//         const data = await response.json();
//         setBooks(data.data);
//         setPrevLimit(4);
//         setPrevSkip(0);
//         const filteredResponse = await fetch(`https://dindayalupadhyay.smartcitylibrary.com/api/v1/books?order_by=name&direction=asc&limit=${prevLimit}&skip=${prevSkip}&search=&genre=&library_id=0&author=&publisher=&language=0&format=0`);
//         const filteredData = await filteredResponse.json();
//         setDetails(filteredData.data);

//         setisLoaded(false);
//       } catch (error) {
//         // console.error("Error fetching books:", error);
//       }

//     });

//     useEffect(() => {
//       const unsubscribe = navigation.addListener('focus', () => {
//         getBooks();
//     });
//       return unsubscribe;
//   }, [navigation]);




//   // ================CALLING SEARCH API ==========================

//   useEffect(() => {
//     if (searchQuery !== "") {
//       fetch(
//         `https://dindayalupadhyay.smartcitylibrary.com/api/v1/books-name?search=${searchQuery}&limit=5`
//       )
//         .then((res) => res.json())

//         .then((data) => {


//           setSearchResults(data.data);
//           setFilteredBooks(data.data);
//           setIsLoading(false);

//         })
//         .catch((error) => {
//           // console.error(error);
//         });
//     }


//   }, [searchQuery]);



//   // ==============================static dropdown===================================

//   const formats = [{ id: "format", name: "Format" },
//   { id: 1, name: "Hardcover" },
//   { id: 2, name: "PaparBack" },
//   { id: 3, name: "E-Book" }];

//   const libraries = [
//     { id: "library", name: "Library" },
//     { id: 111, name: "Dindayal Upadhyay Library" },
//     { id: 222, name: "Kundanlal Gupta Library" },
//     { id: 333, name: "Rashtramata Kasturba Library" }
//   ];

//   // ===================== fetching data for dynamic dropdown ================================================
//   useEffect(() => {

//     fetch('https://dindayalupadhyay.smartcitylibrary.com/api/v1/genres?order_by=name&direction=asc&search=&limit=')

//       .then(response => response.json())
//       .then(data => setGenr(["Genre", ...data.data.map(genres => genres.name)]))

//     // .catch(error => console.error('Error fetching genres:', error));
//   }, []);

//   useEffect(() => {
//     // Fetch the list of authors from your API
//     fetch('https://dindayalupadhyay.smartcitylibrary.com/api/v1/authors?search=s&limit=&order_by=first_name&direction=asc')

//       .then(response => response.json())
//       .then(data => setAuthr(["Author", ...data.data.map(authors => authors.first_name + "" + authors.last_name)]))
//     // .catch(error => console.error('Error fetching authors:', error));
//   }, []);

//   useEffect(() => {
//     // Fetch the list of publishers from your API
//     fetch('https://dindayalupadhyay.smartcitylibrary.com/api/v1/publishers?order_by=name&direction=asc')

//       .then(response => response.json())
//       .then(data => setPublishr(["Publisher", ...data.data.map(publisher => publisher.name)]))
//     // .catch(error => console.error('Error fetching publisher:', error));
//   }, []);

//   // Fetch the list of languages from your API
//   useEffect(() => {
//     fetch('https://dindayalupadhyay.smartcitylibrary.com/api/b1/book-languages?order_by=language_name&direction=asc')
//       .then(response => response.json())
//       .then(data => setLanguage(["Languages", ...data.data.map(language => language.language_name)]))
//     // .catch(error => console.error('Error fetching publisher:', error));
//   }, []);


//   // -------------------------LOADMORE OPTION  ===================
//   // const AllBooks = () => {
//     const AllBooks =React.memo(() => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [loadingMore, setLoadingMore] = useState(false);


//     const loadMore = async () => {
//       setPrevLimit(prevLimit + 4);
//       setPrevSkip(prevSkip + 4);
//       if (loadingMore) {
//         return;
//       }


//       try {
//         setLoadingMore(true);

//         const nextPage = currentPage + 1;
//         const response = await fetch(`https://dindayalupadhyay.smartcitylibrary.com/api/v1/books?order_by=name&direction=asc&limit=${prevLimit}&skip=${prevSkip}&search=&genre=&library_id=0&author=&publisher=&language=0&format=0`);
//         const moreBooks = await response.json();
//         setDetails((oldDetails) => [...oldDetails, ...moreBooks.data]);
//         setCurrentPage(nextPage);
//       } catch (error) {
//         // console.error("Error loading more books:", error);
//       } finally {
//         setLoadingMore(false);
//       }
//     };





//     {/*========================== VIEW LOAD ON LOADMORE CALL ========================= */ }

//     return (
//       <Theme>
//         {({ theme }) => {
//           const styles = getStyles(theme);
//           return (
//             <View style={{ flex: 1, backgroundColor: theme === 'DARK' ? '#000' : '#fff' }}>


//               <ScrollView
//                 horizontal={true} contentContainerStyle={{ columnGap: -10 }}
//                 showsHorizontalScrollIndicator={false}
//               >
//                 <View style={{
//                   flexDirection: 'row',
//                   paddingTop: 10,
//                   paddingBottom: 10
//                 }}>

//                   <View style={styles.categoryView}>
//                     <TouchableOpacity
//                       style={styles.categorytouch}
//                       onPress={handleNavigateToSearchGenre}
//                     >
//                       <Text style={styles.category}>
//                         {selectedGenre == '' ? 'Select Genre' : selectedGenre}
//                       </Text>
//                       <Image
//                         source={require('../images/genres.png')}
//                         style={{ width: 30, height: 30 }}
//                       />
//                     </TouchableOpacity>
//                   </View>

//                   <View style={styles.categoryView}>
//                     <TouchableOpacity
//                       style={styles.categorytouch}
//                       onPress={handleNavigateToSearchAuthor}
//                     >
//                       <Text style={styles.category}>
//                         {selectedAuthor == '' ? 'Select Author' : selectedAuthor}
//                       </Text>
//                       <Image
//                         source={require('../images/author.png')}
//                         style={{ width: 30, height: 30 }}
//                       />
//                     </TouchableOpacity>

//                   </View>

//                   <View style={styles.categoryView}>
//                     <TouchableOpacity
//                       style={styles.categorytouch}
//                       onPress={handleNavigateToSearchPublisher}
//                     >
//                       <Text style={styles.category}>
//                         {selectedPublisher == '' ? 'Select Publisher' : selectedPublisher}
//                       </Text>
//                       <Image
//                         source={require('../images/publisher.png')}
//                         style={{ width: 30, height: 30 }}
//                       />
//                     </TouchableOpacity>
//                   </View>

//                   <View style={styles.categoryView}>
//                     <TouchableOpacity
//                       style={styles.categorytouch}
//                       onPress={handleNavigateToSearchLanguage}
//                     >
//                       <Text style={styles.category}>
//                         {selectedLanguage == '' ? 'Select Language' : selectedLanguage}
//                       </Text>
//                       <Image
//                         source={require('../images/languages.png')}
//                         style={{ width: 30, height: 30 }}
//                       />
//                     </TouchableOpacity>
//                   </View>

//                   <View style={styles.categoryView}>
//                     <TouchableOpacity
//                       style={styles.categorytouch}
//                       onPress={handleNavigateToSearchFormat}
//                     >
//                       <Text style={styles.category}>
//                         {selectedFormat == '' ? 'Select Format' : selectedFormat}
//                       </Text>
//                       <Image
//                         source={require('../images/library.png')}
//                         style={{ width: 30, height: 30 }}
//                       />
//                     </TouchableOpacity>
//                   </View>

//                   <View style={styles.categoryView}>
//                     <TouchableOpacity
//                       style={styles.categorytouch}
//                       onPress={handleNavigateToSearchLibrary}
//                     >
//                       <Text style={styles.category}>
//                         {selectedLibrary == '' ? 'Select Library' : selectedLibrary}
//                       </Text>

//                       <Image
//                         source={require('../images/library.png')}
//                         style={{ width: 30, height: 30 }}
//                       />

//                     </TouchableOpacity>
//                   </View>


//                 </View>

//               </ScrollView>

//               <ScrollView
//               >


//                 {/* ======================================  All books =============================== */}

//                 <View style={{
//                   flexDirection: 'row', marginVertical: 5,
//                   justifyContent: 'center', marginLeft: 15, marginRight: 15,
//                 }}>
//                   <Text style={styles.coroselheading}>Our Books Collection</Text>
//                 </View>



//                 <View style={{
//                   marginTop: 10,
//                   marginStart: 10, backgroundColor: theme === 'DARK' ? '#000' : '#fff',
//                 }}>

//                   <FlatList

//                   // initialNumToRender={4}
//                   // refreshing={loading}
//                     numColumns={2}
//                     contentContainerStyle={{ columnGap: -10 }}
//                     keyExtractor={(item, index) => index.toString()}
//                     data={details}

//                     renderItem={({ item, id }) =>

//                       <TouchableOpacity onPress={() => {
//                         navigation.navigate('BooksDetailPage', { data: item })
//                       }}>

//                         <View style={{
//                           width: 145,
//                           height: 280,
//                           marginEnd: 50,
//                         }}>
//                           <View style={{
//                             elevation: 5,
//                             borderRadius: 5,
//                             color: '#000'
//                           }}>
//                             <Image
//                               source={{ uri: item.image_path }}
//                               // source={{  uri:`https://dindayalupadhyay.smartcitylibrary.com/uploads/books/thumbnail/${item.image}`}}
//                               style={{
//                                 aspectRatio: 0.75,
//                                 resizeMode: 'contain',
//                                 borderRadius: 10,

//                               }}
//                             />

//                             {/* <FastImage 
//                              source={{ uri: item.image_path,
//                               // uri:`https://dindayalupadhyay.smartcitylibrary.com/uploads/books/thumbnail/${item.image}`,
//                             priority: FastImage.priority.high, 
//                             cache: FastImage.cacheControl.web,
//                           } }


//                             resizeMode={FastImage.resizeMode.cover}

//                               style={{
//                                 aspectRatio: 0.75,
//                                 borderRadius: 10,

//                               }}
//                             /> */}
//                             {/* ------------------code for book_item_status----------------------------- */}
//                             {item.items[0].status === 1 ?
//                               (<Text style={[styles.batch,
//                               {
//                                 color: 'green',
//                                 backgroundColor: '#B6FFC0',
//                                 borderColor: 'green',
//                                 fontFamily: 'Poppins-Regular',
//                                 fontSize: 12
//                               }]}>
//                                 Available</Text>) :
//                               (<Text style={[styles.batch,
//                               {
//                                 borderColor: '#990000',
//                                 color: '#990000',
//                                 backgroundColor: '#CD6155',
//                                 fontFamily: 'Poppins-Regular',
//                                 fontSize: 12
//                               }]}>
//                                 Unavailable</Text>)}
//                             {/* ================================================================================== */}
//                           </View>

//                           <View style={{ padding: 10, }}>
//                             {item.items[0].format === 3 ?

//                               <Image
//                                 source={require('../images/ebook.png')}
//                                 style={styles.bookicon}
//                               />
//                               :

//                               <Image
//                                 source={require('../images/bookfill.png')}
//                                 style={styles.bookicon}
//                               />
//                             }
//                             <Text style={{
//                               fontSize: 14,
//                               marginLeft: -10,
//                               fontFamily: 'Poppins-Regular',
//                               color: theme === 'DARK' ? '#fff' : '#424949'
//                             }} numberOfLines={1}>
//                               {item.name}
//                             </Text>
//                             {item.library_id === 111 ?
//                               (<Text
//                                 style={[styles.bookPageLibText, {
//                                   marginLeft: -10,

//                                 }]}
//                               >
//                                 Dindayal Upadhyay Library</Text>) :
//                               (item.library_id === 222 ?
//                                 (<Text
//                                   style={[styles.bookPageLibText, {
//                                     marginLeft: -12,
//                                   }]}
//                                 >
//                                   Kundanlal Gupta Library</Text>) :
//                                 (<Text
//                                   style={[styles.bookPageLibText, {
//                                     marginLeft: -8,
//                                   }]}
//                                 >
//                                   Rashtramata Kasturba Library</Text>))}
//                           </View>
//                         </View>
//                       </TouchableOpacity>

//                     }
//                     onEndReached={loadMore}
//                     onEndReachedThreshold={10}
//                   />
//                 </View>

//               </ScrollView>
//             </View>
//           );
//         }}
//       </Theme>
//     );

//       });
//   // };


//   // ============================================================================================


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
//               rightIcon={require('../images/search.png')}
//               onClickRightIcon={() => {
//                 navigation.navigate('searchbar');
//               }}
//             />


//             {isLoaded ? (
//               <ActivityIndicator
//                 style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
//                 size="large" color="#c27b7f"
//               />
//             ) : (
//               <View style={{ flex: 1, paddingTop: 10 }}>



//                 {/*===================== all books flatlist=============== */}

//                 <FlatList
//                   style={{ marginBottom: 10 }}
//                   keyExtractor={(item, index) => index.toString()}
//                   data={searchQuery !== '' ? (searchResults) : ('')}
//                   ListFooterComponent={<AllBooks />}
//                   renderItem={({ item }) => (
//                     // Render each search result item here
//                     <TouchableOpacity onPress={() => navigation.navigate('BooksDetailPage', { data: item })}>
//                       <View style={{ padding: 5, marginLeft: 10, flexDirection: 'row' }}>
//                         <Image source={require('../images/bookfill.png')} style={styles.image} />
//                         <Text style={{
//                           fontSize: 15, fontWeight: 'bold',
//                           color: theme === 'LIGHT' ? '#000' : '#fff',
//                           marginBottom: 10, marginLeft: 5
//                         }} >
//                           {item.name}
//                         </Text>
//                       </View>
//                     </TouchableOpacity>
//                   )}
//                   numColumns={1}
//                   contentContainerStyle={{ columnGap: 10 }}
//                 />
//               </View>
//             )}


//           </View>

//         );
//       }}
//     </Theme>
//   );

// };



// export default Books;




// // import React, { useState, useEffect, useCallback } from "react";
// // import {
// //   View,
// //   Text,
// //   FlatList,
// //   TouchableOpacity,
// //   Image,
// //   ActivityIndicator,
// // } from "react-native";
// // import axios from "axios";
// // import FastImage from "react-native-fast-image";

// // const BookItem = React.memo(({ item, onPress }) => {
// //   return (
// //     <TouchableOpacity onPress={onPress}>
// //       <View style={{ padding: 5, marginLeft: 10, flexDirection: "row" }}>
// //         <Image source={{ uri: item.image_path }} style={{ width: 50, height: 50 }} />
// //         <Text
// //           style={{
// //             fontSize: 15,
// //             fontWeight: "bold",
// //             marginBottom: 10,
// //             marginLeft: 5,
// //           }}
// //         >
// //           {item.name}
// //         </Text>
// //       </View>
// //     </TouchableOpacity>
// //   );
// // }, (prevProps, nextProps) => {
// //   return prevProps.item === nextProps.item;
// // });

// // const Books = ({ navigation }) => {
// //   const [books, setBooks] = useState([]);
// //   const [isLoaded, setisLoaded] = useState(true);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [searchResults, setSearchResults] = useState([]);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [details, setDetails] = useState([]);
// //   const [prevLimit, setPrevLimit] = useState(10);
// //   const [prevSkip, setPrevSkip] = useState(0);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [loadingMore, setLoadingMore] = useState(false);

// //   const fetchBooks = useCallback(async () => {
// //     try {
// //       const response = await axios.get(
// //         "https://dindayalupadhyay.smartcitylibrary.com/api/v1/books"
// //       );
// //       setBooks(response.data.data);
// //       setPrevLimit(10);
// //       setPrevSkip(0);

// //       const filteredResponse = await axios.get(
// //         `https://dindayalupadhyay.smartcitylibrary.com/api/v1/books?order_by=name&direction=asc&limit=${prevLimit}&skip=${prevSkip}&search=&genre=&library_id=0&author=&publisher=&language=0&format=0`
// //       );
// //       setDetails(filteredResponse.data.data);
// //       setisLoaded(false);
// //     } catch (error) {
// //       console.error("Error fetching books:", error);
// //     }
// //   }, [prevLimit, prevSkip]);

// //   const fetchSearchResults = useCallback(async () => {
// //     if (searchQuery !== "") {
// //       try {
// //         const response = await axios.get(
// //           `https://dindayalupadhyay.smartcitylibrary.com/api/v1/books-name?search=${searchQuery}&limit=5`
// //         );
// //         setSearchResults(response.data.data);
// //       } catch (error) {
// //         console.error(error);
// //       }
// //     }
// //   }, [searchQuery]);

// //   const handleSearch = (text) => {
// //     setSearchQuery(text);
// //   };

// //   const loadMore = async () => {
// //     setPrevLimit(prevLimit + 10);
// //     setPrevSkip(prevSkip + 10);

// //     if (loadingMore) {
// //       return;
// //     }

// //     try {
// //       setLoadingMore(true);
// //       const response = await axios.get(
// //         `https://dindayalupadhyay.smartcitylibrary.com/api/v1/books?order_by=name&direction=asc&limit=${prevLimit}&skip=${prevSkip}&search=&genre=&library_id=0&author=&publisher=&language=0&format=0`
// //       );
// //       setDetails((oldDetails) => [...oldDetails, ...response.data.data]);
// //       setCurrentPage((prevPage) => prevPage + 1);
// //     } catch (error) {
// //       console.error("Error loading more books:", error);
// //     } finally {
// //       setLoadingMore(false);
// //     }
// //   };

// //   useEffect(() => {
// //     const unsubscribe = navigation.addListener("focus", () => {
// //       fetchBooks();
// //     });

// //     return unsubscribe;
// //   }, [navigation, fetchBooks]);

// //   useEffect(() => {
// //     fetchSearchResults();
// //   }, [searchQuery, fetchSearchResults]);

// //   return (
// //     <View style={{ flex: 1 }}>
// //       {isLoaded ? (
// //         <ActivityIndicator
// //           style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
// //           size="large"
// //           color="#c27b7f"
// //         />
// //       ) : (
// //         <View style={{ flex: 1, paddingTop: 10 }}>
// //           <FlatList
// //             keyExtractor={(item, index) => index.toString()}
// //             data={searchQuery !== "" ? searchResults : []}
// //             renderItem={({ item }) => (
// //               <BookItem
// //                 item={item}
// //                 onPress={() => navigation.navigate("BooksDetailPage", { data: item })}
// //               />
// //             )}
// //             numColumns={1}
// //             contentContainerStyle={{ columnGap: 10 }}
// //             ListFooterComponent={
// //               <FlatList
// //                 numColumns={2}
// //                 keyExtractor={(item, index) => index.toString()}
// //                 data={details}
// //                 renderItem={({ item }) => (
// //                   <BookItem
// //                     item={item}
// //                     onPress={() => navigation.navigate("BooksDetailPage", { data: item })}
// //                   />
// //                 )}
// //                 onEndReached={loadMore}
// //                 onEndReachedThreshold={1.0}
// //               />
// //             }
// //           />
// //         </View>
// //       )}
// //     </View>
// //   );
// // };

// // export default Books;









import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity, Text, FlatList, Image, ActivityIndicator, VirtualizedList, Dimensions, ImageBackground, Modal } from "react-native";
import { Picker } from '@react-native-picker/picker';
import Feather from 'react-native-vector-icons/Feather';
import Header from "../common/Header";
import Pagination from "../components/pagination";
import getStyles from '../Style/logNRegStyle';
import Theme from './Theme';
import { useScrollToTop } from "@react-navigation/native";
import axios from "axios";
import { PanGesture } from "react-native-gesture-handler/lib/typescript/handlers/gestures/panGesture";



const Books = ({ navigation }) => {

  const [selectedGenre, setSelectedGenre] = useState("Genre");
  const [genr, setGenr] = useState([]);
  const [selectedPublisher, setSelectedPublisher] = useState("Publisher");
  const [publishr, setPublishr] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("Author");
  const [authr, setAuthr] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("Language");
  const [language, setLanguage] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState("Format");
  const [selectedLibrary, setSelectedLibrary] = useState("Library");
  const [books, setBooks] = useState([]);
  const [isLoaded, setisLoaded] = useState(true);


  //======================state for search bar=======================
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const [filteredBooks, setFilteredBooks] = useState([]);


  //===============according to new api========================
  const [details, setDetails] = useState([]);
  const [prevLimit, setPrevLimit] = useState(10);
  const [prevSkip, setPrevSkip] = useState(0);




  // ===================dropdown navigation to search screen==================
  const handleNavigateToSearchGenre = () => {
    const genreList = [...genr];
    // const book = [...books];
    navigation.navigate('search', { genreList });
  };
  const handleNavigateToSearchAuthor = () => {
    const authorList = [...authr];
    const book = [...books];
    navigation.navigate('search', { authorList, book });
  };
  const handleNavigateToSearchPublisher = () => {
    const publisherList = [...publishr];
    const book = [...books];
    navigation.navigate('search', { publisherList, book });
  };
  const handleNavigateToSearchLanguage = () => {
    const languageList = [...language];
    const book = [...books];
    navigation.navigate('search', { languageList, book });
  };
  const handleNavigateToSearchFormat = () => {
    const formatList = [...formats];
    const book = [...books];
    navigation.navigate('search', { formatList, book });

  };
  const handleNavigateToSearchLibrary = () => {
    const libraryList = [...libraries];
    const book = [...books];
    navigation.navigate('search', { libraryList, book });
  };


  //=========================page is refreshing on every click on book tab===============================
  useEffect(() => {
    const getBooks = async () => {
      try {



        const filteredResponse = await fetch(`https://dindayalupadhyay.smartcitylibrary.com/api/v1/books?order_by=name&limit=10&skip=0&search=&genre=&library_id=111&author=&publisher=&language=0&format=0`);

        const filteredData = await filteredResponse.json();
        setDetails(filteredData.data);

        setisLoaded(false);
      } catch (error) {
        console.error("Error fetching books:", error);
      }


    };

    getBooks();
  }
    , [navigation]);




  useEffect(() => {
    if (searchQuery !== "") {
      fetch(
        `https://dindayalupadhyay.smartcitylibrary.com/api/v1/books-name?search=${searchQuery}&limit=5`
      )
        .then((res) => res.json())

        .then((data) => {


          setSearchResults(data.data);
          setFilteredBooks(data.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }


  }, [searchQuery]);



  // ==============================static dropdown===================================

  const formats = [{ id: "format", name: "Format" },
  { id: 1, name: "Hardcover" },
  { id: 2, name: "PaparBack" },
  { id: 3, name: "E-Book" }];

  const libraries = [
    { id: "library", name: "Library" },
    { id: 111, name: "Dindayal Upadhyay Library" },
    { id: 222, name: "Kundanlal Gupta Library" },
    { id: 333, name: "Rashtramata Kasturba Library" }
  ];

  // ===================== fetching data for dynamic dropdown ================================================
  useEffect(() => {

    fetch('https://dindayalupadhyay.smartcitylibrary.com/api/v1/genres?order_by=name&direction=asc&search=&limit')
      .then(response => response.json())
      .then(data => setGenr(["Genre", ...data.data.map(genres => genres.name)]))

      .catch(error => console.error('Error fetching genres:', error));
  }, []);

  useEffect(() => {
    // Fetch the list of authors from your API
    fetch('https://dindayalupadhyay.smartcitylibrary.com/api/v1/authors?search=&limit=&order_by=first_name&direction=asc')
      .then(response => response.json())
      .then(data => setAuthr(["Author", ...data.data.map(authors => authors.first_name + "" + authors.last_name)]))
      .catch(error => console.error('Error fetching authors:', error));
  }, []);

  useEffect(() => {
    // Fetch the list of publishers from your API
    fetch('https://dindayalupadhyay.smartcitylibrary.com/api/v1/publishers?order_by=name&direction=asc')
      .then(response => response.json())
      .then(data => setPublishr(["Publisher", ...data.data.map(publisher => publisher.name)]))
      .catch(error => console.error('Error fetching publisher:', error));
  }, []);

  // Fetch the list of languages from your API
  useEffect(() => {
    fetch('https://dindayalupadhyay.smartcitylibrary.com/api/b1/book-languages?order_by=language_name&direction=asc')
      .then(response => response.json())
      .then(data => setLanguage(["Languages", ...data.data.map(language => language.language_name)]))
      .catch(error => console.error('Error fetching publisher:', error));
  }, []);






  // -------------------------All books dropdown===================
  const AllBooks = () => {
    // const  [page,setPage]=useState(1);

    const [currentPage, setCurrentPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);


    const loadMore = async () => {
      if (loadingMore) {
        return;
      }


      try {
        setLoadingMore(true);

        const response = await fetch(`https://dindayalupadhyay.smartcitylibrary.com/api/v1/books?order_by=name&direction=asc&limit=10&skip=${prevSkip}&search=&genre=&library_id=111&author=&publisher=&language=0&format=0`);
        const moreBooks = await response.json();
        setDetails((oldDetails) => [...oldDetails, ...moreBooks.data]);

        setPrevLimit(prevLimit + 10);
        setPrevSkip(prevSkip + 10);
        setCurrentPage(currentPage + 1);
        // setCurrentPage((prevPage) => prevPage++);
      } catch (error) {
        console.error("Error loading more books:", error);
      } finally {
        setLoadingMore(false);
      }
    };


    return (
      <Theme>
        {({ theme }) => {
          const styles = getStyles(theme);
          return (
            <View style={{ flex: 1, backgroundColor: theme === 'DARK' ? '#000' : '#fff' }}>

              {/*========================== dropdown with searchbar========================= */}
              <ScrollView
                horizontal={true} contentContainerStyle={{ columnGap: -10 }}
                showsHorizontalScrollIndicator={false}
              >
                <View style={{
                  flexDirection: 'row',
                  paddingTop: 10,
                  paddingBottom: 10
                }}>

                  <View style={styles.categoryView}>
                    <TouchableOpacity
                      style={styles.categorytouch}
                      onPress={handleNavigateToSearchGenre}
                    >
                      <Text style={styles.category}>
                        {selectedGenre == '' ? 'Select Genre' : selectedGenre}
                      </Text>
                      <Image
                        source={require('../images/genres.png')}
                        style={{ width: 30, height: 30 }}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.categoryView}>
                    <TouchableOpacity
                      style={styles.categorytouch}
                      onPress={handleNavigateToSearchAuthor}
                    >
                      <Text style={styles.category}>
                        {selectedAuthor == '' ? 'Select Author' : selectedAuthor}
                      </Text>
                      <Image
                        source={require('../images/author.png')}
                        style={{ width: 30, height: 30 }}
                      />
                    </TouchableOpacity>

                  </View>

                  <View style={styles.categoryView}>
                    <TouchableOpacity
                      style={styles.categorytouch}
                      onPress={handleNavigateToSearchPublisher}
                    >
                      <Text style={styles.category}>
                        {selectedPublisher == '' ? 'Select Publisher' : selectedPublisher}
                      </Text>
                      <Image
                        source={require('../images/publisher.png')}
                        style={{ width: 30, height: 30 }}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.categoryView}>
                    <TouchableOpacity
                      style={styles.categorytouch}
                      onPress={handleNavigateToSearchLanguage}
                    >
                      <Text style={styles.category}>
                        {selectedLanguage == '' ? 'Select Language' : selectedLanguage}
                      </Text>
                      <Image
                        source={require('../images/languages.png')}
                        style={{ width: 30, height: 30 }}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.categoryView}>
                    <TouchableOpacity
                      style={styles.categorytouch}
                      onPress={handleNavigateToSearchFormat}
                    >
                      <Text style={styles.category}>
                        {selectedFormat == '' ? 'Select Format' : selectedFormat}
                      </Text>
                      <Image
                        source={require('../images/library.png')}
                        style={{ width: 30, height: 30 }}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.categoryView}>
                    <TouchableOpacity
                      style={styles.categorytouch}
                      onPress={handleNavigateToSearchLibrary}
                    >
                      <Text style={styles.category}>
                        {selectedLibrary == '' ? 'Select Library' : selectedLibrary}
                      </Text>

                      <Image
                        source={require('../images/library.png')}
                        style={{ width: 30, height: 30 }}
                      />

                    </TouchableOpacity>
                  </View>


                </View>

              </ScrollView>

              <ScrollView
              >

                {/* <View style={{ marginBottom: 15 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#c27b7f',
                      alignItems: 'center',
                      padding: 5,
                      borderRadius: 5,
                      width: '30%',
                      height: 50,
                      justifyContent: 'center',
                      marginLeft: 130,
                      marginTop: 15
                    }}
                    onPress={() => {

                      setFilteredBooks(books);
                      setSelectedAuthor("Author");
                      setSelectedFormat("Format");
                      setSelectedGenre("Genre");
                      setSelectedLanguage("Language");
                      setSelectedLibrary("Library");
                      setSelectedPublisher("Publisher");

                    }}
                  >
                    <Text style={{
                      color: '#fff',
                      fontWeight: '700',
                      fontSize: 18
                    }}>Reset</Text>

                  </TouchableOpacity>
                </View> */}


                {/* ======================================  All books =============================== */}

                <View style={{
                  flexDirection: 'row', marginVertical: 5,
                  justifyContent: 'center', marginLeft: 15, marginRight: 15,
                }}>
                  <Text style={styles.coroselheading}>Our Books Collection</Text>
                </View>

                {/* {totalBooksCount < 10 ? (<Text style={styles.totalBooksCount}>Showing {totalBooksCount} of {totalBooksCount} Books</Text>)
                  :
                  (<Text style={styles.totalBooksCount}>Showing 10 of {totalBooksCount} Books</Text>)} */}





                <View style={{
                  marginTop: 10,
                  marginStart: 10, backgroundColor: theme === 'DARK' ? '#000' : '#fff',
                }}>

                  <FlatList
                    numColumns={2}
                    contentContainerStyle={{ columnGap: -10 }}
                    keyExtractor={(item, index) => index.toString()}
                    data={details}

                    renderItem={({ item, id }) =>

                      <TouchableOpacity onPress={() => {
                        navigation.navigate('BooksDetailPage', { data: item })
                      }}>

                        <View style={{
                          width: 145,
                          height: 280,
                          marginEnd: 50,
                        }}>
                          <View style={{
                            elevation: 5,
                            borderRadius: 5,
                            color: '#000'
                          }}>
                            <Image source={{ uri: item.image_path }}
                              style={{
                                aspectRatio: 0.8,
                                resizeMode: 'contain',
                                borderRadius: 10,

                              }}
                            />
                            {/* ------------------code for book_item_status----------------------------- */}
                            {/* {item.items[0].status === 1 ?
                              (<Text style={[styles.batch,
                              {
                                color: 'green',
                                backgroundColor: '#B6FFC0',
                                borderColor: 'green',
                                fontFamily: 'Poppins-Regular',
                                fontSize: 12
                              }]}>
                                Available</Text>) :
                              (<Text style={[styles.batch,
                              {
                                borderColor: '#990000',
                                color: '#990000',
                                backgroundColor: '#CD6155',
                                fontFamily: 'Poppins-Regular',
                                fontSize: 12
                              }]}>
                                Unavailable</Text>)} */}
                            {/* ================================================================================== */}
                          </View>

                          <View style={{ padding: 10, }}>
                            {item.items[0].format === 3 ?

                              <Image
                                source={require('../images/ebook.png')}
                                style={styles.bookicon}
                              />
                              :

                              <Image
                                source={require('../images/bookfill.png')}
                                style={styles.bookicon}
                              />
                            }
                            <Text style={{
                              fontSize: 14,
                              marginLeft: -10,
                              fontFamily: 'Poppins-Regular',
                              color: theme === 'DARK' ? '#fff' : '#424949'
                            }} numberOfLines={1}>
                              {item.name}
                            </Text>
                            {item.library_id === 111 ?
                              (<Text
                                style={[styles.bookPageLibText, {
                                  marginLeft: -10,

                                }]}
                              >
                                Dindayal Upadhyay Library</Text>) :
                              (item.library_id === 222 ?
                                (<Text
                                  style={[styles.bookPageLibText, {
                                    marginLeft: -12,
                                  }]}
                                >
                                  Kundanlal Gupta Library</Text>) :
                                (<Text
                                  style={[styles.bookPageLibText, {
                                    marginLeft: -8,
                                  }]}
                                >
                                  Rashtramata Kasturba Library</Text>))}



                          </View>



                        </View>

                      </TouchableOpacity>

                    }
                    onEndReached={loadMore}
                    onEndReachedThreshold={1.0}
                  />
                  {/* {loadingMore && (
                  <ActivityIndicator size="large" color={theme === 'DARK' ? '#fff' : '#000'} />
                )} */}
                </View>








                {/* // =====================pagination controls to navigate between pages===================  */}
                {/* <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(totalBooksCount / itemsPerPage)}
                  onPageChange={(page) => setCurrentPage(page)}
                // onPageChange={handlePageChange}
                /> */}

              </ScrollView>
            </View>
          );
        }}
      </Theme>

    );
  };













  // ============================================================================================


  return (
    <Theme>
      {({ theme }) => {
        const styles = getStyles(theme);
        return (
          <View style={styles.container}>

            <Header
              middleIcon={require('../images/Logoelibrary.png')}
              // rightIcon={require('../images/Logoelibrary.png')}
              leftIcon={require('../images/menu.png')}
              onClickLeftIcon={() => {
                navigation.openDrawer();
              }}
              rightIcon={require('../images/search.png')}
              onClickRightIcon={() => {
                navigation.navigate('searchbar');
              }}
            />


            {isLoaded ? (
              <ActivityIndicator
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                size="large" color="#c27b7f"
              />
            ) : (
              <View style={{ flex: 1, paddingTop: 10 }}>

                {/* <View style={styles.searchBar}>

                  <Feather name="search" color={"gray"} size={20} style={styles.searchIcon} />
                  <TextInput
                    placeholderTextColor='#000'
                    placeholder="Search a Book by Name"
                    spellCheck={false}
                    value={searchQuery}
                    onChangeText={(Text) => handleSearch(Text)}
                  />

                  {searchQuery !== '' && (
                    <TouchableOpacity onPress={() => {
                      setSearchQuery('');
                      setSearchResults('');
                    }}>
                      <Feather name="x" color={"gray"} size={20} style={[styles.searchIcon, { justifyContent: 'flex-end', }]} />
                    </TouchableOpacity>)}

                </View> */}

                {/*===================== all books flatlist=============== */}

                <FlatList
                  style={{ marginBottom: 10 }}
                  keyExtractor={(item, index) => index.toString()}
                  data={searchQuery !== '' ? (searchResults) : ('')}
                  ListFooterComponent={<AllBooks />}
                  renderItem={({ item }) => (
                    // Render each search result item here
                    <TouchableOpacity onPress={() => navigation.navigate('BooksDetailPage', { data: item })}>
                      <View style={{ padding: 5, marginLeft: 10, flexDirection: 'row' }}>
                        <Image source={require('../images/bookfill.png')} style={styles.image} />
                        <Text style={{
                          fontSize: 15, fontWeight: 'bold',
                          color: theme === 'LIGHT' ? '#000' : '#fff',
                          marginBottom: 10, marginLeft: 5
                        }} >
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  numColumns={1}
                  contentContainerStyle={{ columnGap: 10 }}
                />
              </View>
            )}


          </View>

        );
      }}
    </Theme>
  );

};



export default Books;
