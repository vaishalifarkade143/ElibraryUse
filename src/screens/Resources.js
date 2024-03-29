

// import React, { useEffect, useState, useContext, useRef } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, Modal, FlatList, Dimensions, PermissionsAndroid, Button } from 'react-native';
// import Header from '../common/Header';
// import { Table, Row } from 'react-native-table-component';
// import { Picker } from '@react-native-picker/picker';
// import Feather from 'react-native-vector-icons/Feather';
// import { AuthContext } from '../context/AuthContext';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useNavigation } from '@react-navigation/native';
// import Pdf from 'react-native-pdf';
// import Video from 'react-native-video';
// import Slider from '@react-native-community/slider';
// import Orientation from 'react-native-orientation-locker';
// import RNFetchBlob from 'rn-fetch-blob';
// import getStyles from '../Style/logNRegStyle';
// import Theme from './Theme';

// const Resources = () => {
//   const navigation = useNavigation();
//   const [genr, setGenr] = useState([]);
//   const [AllOption, setAllOption] = useState(null);
//   const [selectedGenre, setSelectedGenre] = useState("Search By Genre");
//   const { userToken } = useContext(AuthContext);
//   const [pdfModalVisible, setPdfModalVisible] = useState(false);
//   const [videoModalVisible, setVideoModalVisible] = useState(false);
//   const [audioModalVisible, setAudioModalVisible] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState('');



//   const pdfUrl = `https://dindayalupadhyay.smartcitylibrary.com/public/uploads/Resources/sample.pdf`;

//   const audioUrl = `https://dindayalupadhyay.smartcitylibrary.com/public/uploads/Resources/file_example_MP3_5MG.mp3`


//   //==============================video=================================================

//   const [videoDuration, setVideoDuration] = useState(0);
//   const videoUrl = `https://dindayalupadhyay.smartcitylibrary.com/public/uploads/Resources/file_example_MP4_480_1_5MG.mp4`
//   const [clicked, setClicked] = useState(false);
//   const [puased, setPaused] = useState(false);
//   const [progress, setProgress] = useState(null);
//   const [fullScreen, setFullScreen] = useState(false)
//   const [data, setData] = useState('');
//   const ref = useRef();
//   const format = seconds => {
//     let mins = parseInt(seconds / 60)
//       .toString()
//       .padStart(2, '0');
//     let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
//     return `${mins}:${secs}`;
//   };


//   //====================================Audio===========================================

//   const xlsxUrl = 'https://dindayalupadhyay.smartcitylibrary.com/uploads/Resources/Popular-Books-By-genre1697019311.xlsx'; //download URL for the XLSX file


//   //=================== download for permition=============================

//   const requestStoragePermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//         {
//           title: 'Storage Permission',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         downloadFile();
//       } else {
//         console.log('Storage permission denied');
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   };


//   const downloadFile = () => {
//     const { config, fs } = RNFetchBlob;
//     const data = new Date();
//     const fileDir = fs.dirs.DownloadDir;//download file Directory where want to store

//     //file download code =================

//     config({
//       // add this option that makes response data to be stored as a file,
//       // this is much more performant.
//       fileCache: true,
//       //=========filedownload manager code===================
//       addAndroidDownloads: {
//         useDownloadManager: true,
//         notification: true,
//         path: fileDir + "/download_" + Math.floor(data.getDate() + data.getSeconds() / 2) + '.xlsx',//mix of date n time to get random no.
//         description: 'file download'
//       }
//       //=======================================
//     })
//       .fetch('GET', xlsxUrl, {
//         //some headers ..
//       })
//       .then((res) => {
//         // the temp file path
//         console.log('The file saved to ', res.path());
//         alert("file downloaded successfully")
//       })
//   }

//   // ====================================================================

//   const mapCategoryToInt = (categoryName) => {
//     switch (categoryName) {
//       case "Video":
//         return 1;
//       case "PDF":
//         return 2;
//       case "Audio":
//         return 3;
//       case "Excel":
//         return 4;
//       default:
//         return 0; // Default to 0 or another appropriate value
//     }
//   };


//   // const state = {
//   //   tableHead: ['Title', 'Category', 'URL', 'Description', 'Action'],
//   //   widthArr: [150, 100, 150, 200, 100],
//   // };

//   //==================to get categories in dropdown==========================

//   // useEffect(() => {
//   //   // Fetch the list of genres from your API
//   //   fetch('https://dindayalupadhyay.smartcitylibrary.com/api/resources-category')
//   //     .then(response => response.json())
//   //     .then(data => setGenr(["Search By Genre", ...data.data.map(genres => genres.name)]))
//   //     // Assuming the API response has a "data" field with an array of genres
//   //     .catch(error => console.error('Error fetching genres:', error));
//   // }, []);

//   //////////////////////=================get data in flatlist=================================


//   useEffect(() => {
//     const getDummyData = () => {
//       fetch("https://dindayalupadhyay.smartcitylibrary.com/api/resources")
//         .then(res => res.json())

//         .then(responce => {
//           setData(responce.data);
//         });
//     };
//     getDummyData();
//   }, []);

//   // =================================get data in table=================================================

//   // useEffect(() => {
//   //   const apiUrl = 'https://dindayalupadhyay.smartcitylibrary.com/api/resources';

//   //   fetch(apiUrl, {
//   //     method: 'GET',
//   //     headers: {
//   //       'Authorization': `Bearer ${userToken}`,
//   //       'Content-Type': 'application/json',
//   //     },
//   //   })
//   //     .then((response) => {
//   //       if (!response.ok) {
//   //         throw new Error(`HTTP error! Status: ${response.status}`);
//   //       }

//   //       return response.json();
//   //     })
//   //     .then((data) => {
//   //       let filteredData = data.data;

//   //       const selectedGenreInt = mapCategoryToInt(selectedGenre);

//   //       if (selectedGenre !== "Search By Genre") {
//   //         filteredData = data.data.filter((item) =>
//   //           item.category_id === selectedGenreInt
//   //         );
//   //       }
//   //       setAllOption(filteredData);
//   //     })
//   //     .catch((error) => {
//   //       console.error('Error fetching data:', error);
//   //     });
//   // }, [userToken, selectedGenre]);



//   function getCategoryText(category_id) {
//     switch (category_id) {
//       case 1:
//         return (
//           <TouchableOpacity onPress={() => {
//             setVideoModalVisible(true);
//           }} >
//             <MaterialCommunityIcons name="video" color={"#fff"} size={20} style={styles.searchIcon} />
//           </TouchableOpacity>
//         );
//       case 2:
//         return (
//           <TouchableOpacity
//             onPress={() => {
//               setPdfModalVisible(true); // Open the video modal
//             }}>
//             <Text style={styles.categoryText}>Read</Text></TouchableOpacity>
//         );
//       case 3:
//         return (
//           <TouchableOpacity
//             onPress={() => {
//               setAudioModalVisible(true); // Open the audio modal
//             }}>
//             <MaterialIcons name="audiotrack" color={"#fff"} size={20} style={styles.searchIcon} />
//           </TouchableOpacity>
//         );
//       case 4:
//         return (
//           <TouchableOpacity
//             onPress={() => {
//               requestStoragePermission();
//             }}
//           >
//             <Text style={styles.categoryText}>Downloads</Text>
//           </TouchableOpacity>
//         );
//       default:
//         return (
//           <Text style={styles.categoryText}>null</Text>
//         );
//     }
//   }

//   // const updatedTableData = AllOption ? AllOption
//   //   .filter((item) => {
//   //     const title = item.title.toLowerCase();
//   //     const query = searchQuery.toLowerCase();
//   //     return title.includes(query);
//   //   })
//   //   .map((item) => [
//   //     item.title,
//   //     item.category_id,
//   //     item.url === null ? (<Text style={{ textAlign: 'center', color: '#2f4858' }}>N/A</Text>) : (<Text>null</Text>),
//   //     item.note,
//   //     getCategoryText(item.category_id),
//   //   ]) : [];
//   // const resetGenre = () => {
//   //   setSelectedGenre("Search By Genre");
//   // };


//   //============================read book=====================================


//   return (
//     <Theme>
//       {({ theme }) => {
//         const styles = getStyles(theme);
//         return (
//           <View style={styles.container}>
//             {/* <Header
//               rightIcon={require('../images/Logoelibrary.png')}
//               leftIcon={require('../images/menu.png')}
//               onClickLeftIcon={() => {
//                 navigation.openDrawer();
//               }}
//             /> */}
//             {/* ====================pdf modal======================= */}

//             <Modal
//               animationType="slide"
//               transparent={true}
//               visible={pdfModalVisible}
//               onRequestClose={() => {
//                 setPdfModalVisible(false);

//               }}>
//               <View style={styles.centeredView}>
//                 <View style={styles.modalView}>
//                   <Pdf
//                     trustAllCerts={false}
//                     source={{ uri: pdfUrl }}
//                     onLoadComplete={(numberOfPages, filePath) => {
//                       // console.log(`Number of pages: ${numberOfPages}`);
//                     }}
//                     onPageChanged={(page, numberOfPages) => {
//                       setCurrentPage(page);
//                     }}
//                     onError={(error) => {
//                       console.log(error);
//                     }}
//                     onPressLink={(uri) => {
//                       // console.log(`Link pressed: ${uri}`);
//                     }}
//                     style={styles.pdf}
//                   />

//                   <View style={styles.pageButton}>
//                     <Text style={styles.pageButtonText}> {currentPage}</Text>
//                   </View>

//                 </View>
//               </View>
//             </Modal>

//             {/* =================video modal=================== */}

//             <Modal
//               animationType="slide"
//               transparent={true}
//               visible={videoModalVisible}
//               onRequestClose={() => {
//                 setVideoModalVisible(false);
//               }}>
//               <View style={{ flex: 1 }}>
//                 <TouchableOpacity
//                   style={{ width: '100%', height: fullScreen ? '100%' : 200 }}
//                   onPress={() => {
//                     setClicked(true);
//                   }}>
//                   <Video
//                     paused={puased}
//                     source={{ uri: videoUrl }}
//                     ref={ref}
//                     onProgress={x => {
//                       console.log(x);
//                       setProgress(x);
//                     }}
//                     onLoad={data => {
//                       setVideoDuration(data.duration);
//                     }}
//                     muted
//                     style={{ width: '100%', height: fullScreen ? '100%' : 200 }}
//                     resizeMode="contain"
//                   />
//                   {clicked && (
//                     <TouchableOpacity
//                       style={{
//                         width: '100%',
//                         height: '100%',
//                         position: 'absolute',
//                         backgroundColor: 'rgba(0,0,0,.5)',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                       }}>
//                       <View style={{ flexDirection: 'row' }}>
//                         <TouchableOpacity
//                           onPress={() => {
//                             ref.current.seek(parseInt(progress.currentTime) - 10);
//                           }}>
//                           <Image
//                             source={require('../images/backward.png')}
//                             style={{ width: 30, height: 30, tintColor: 'white' }}
//                           />
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                           onPress={() => {
//                             setPaused(!puased);
//                           }}>
//                           <Image
//                             source={
//                               puased
//                                 ? require('../images/play-button.png')
//                                 : require('../images/pause.png')
//                             }
//                             style={{
//                               width: 30,
//                               height: 30,
//                               tintColor: 'white',
//                               marginLeft: 50,
//                             }}
//                           />
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                           onPress={() => {
//                             ref.current.seek(parseInt(progress.currentTime) + 10);
//                           }}>
//                           <Image
//                             source={require('../images/forward.png')}
//                             style={{
//                               width: 30,
//                               height: 30,
//                               tintColor: 'white',
//                               marginLeft: 50,
//                             }}
//                           />
//                         </TouchableOpacity>
//                       </View>
//                       <View
//                         style={{
//                           width: '100%',
//                           flexDirection: 'row',
//                           justifyContent: 'space-between',
//                           position: 'absolute',
//                           bottom: 0,
//                           paddingLeft: 20,
//                           paddingRight: 20,
//                           alignItems: 'center'
//                         }}>
//                         <Text style={{ color: 'white' }}>
//                           {format(progress.currentTime)}
//                         </Text>
//                         <Slider
//                           style={{ width: '80%', height: 40 }}
//                           minimumValue={0}
//                           maximumValue={videoDuration}
//                           minimumTrackTintColor="#FFFFFF"
//                           maximumTrackTintColor="#fff"
//                           onValueChange={(x) => {
//                             ref.current.seek(x);
//                           }}
//                           value={progress.currentTime}
//                         />

//                         <Text style={{ color: 'white' }}>
//                           {format(progress.seekableDuration)}
//                         </Text>
//                       </View>
//                       <View
//                         style={{
//                           width: '100%',
//                           flexDirection: 'row',
//                           justifyContent: 'space-between',
//                           position: 'absolute',
//                           top: 10,
//                           paddingLeft: 20,
//                           paddingRight: 20,
//                           alignItems: 'center'
//                         }}>
//                         <TouchableOpacity onPress={() => {
//                           if (fullScreen) {
//                             Orientation.lockToPortrait();
//                           } else {
//                             Orientation.lockToLandscape();
//                           }
//                           setFullScreen(!fullScreen)
//                         }}>
//                           <Image source={fullScreen ? require('../images/minimize.png') : require('../images/full-size.png')}
//                             style={{ width: 24, height: 24, tintColor: 'white' }} />
//                         </TouchableOpacity>
//                       </View>
//                     </TouchableOpacity>
//                   )}
//                 </TouchableOpacity>
//               </View>
//             </Modal>

//             {/* ============================audio=============================== */}

//             <Modal
//               animationType="slide"
//               transparent={true}
//               visible={audioModalVisible}
//               onRequestClose={() => {
//                 setAudioModalVisible(false);

//               }}>

//               <View style={{
//                 marginTop: 250,
//                 marginLeft: 10,
//                 marginRight: 10,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backgroundColor: '#fff3cd',
//                 paddingBottom: 30,
//                 paddingTop: 30,
//                 borderRadius: 15,
//               }}>
//                 <Text style={{
//                   marginBottom: 15,
//                   fontSize: 15,
//                   fontWeight: 'bold',
//                   color: '#000',
//                   textAlign: 'center',
//                   fontFamily: 'Philosopher-Bold',
//                 }}>Preview</Text>
//                 <Video
//                   source={{ uri: audioUrl }}
//                   style={{
//                     width: 300,
//                     height: 100,
//                     borderRadius: 15,
//                     paddingLeft: 10,
//                     paddingRight: 10,
//                   }}
//                   controls={true} // Show audio controls (play, pause, etc.)
//                   resizeMode="contain"
//                   onEnd={() => setAudioModalVisible(false)}
//                 />
//               </View>

//             </Modal>

//             {/* <ScrollView> */}
//             <Text style={styles.sectionHeading}>eResources</Text>
//             {/* <View style={[styles.dividerView, { width: 90, }]}></View> */}

//             {/* <View style={{
//                 backgroundColor: '#f5ebe6',
//                 marginTop: 20,
//                 flexDirection: 'column',
//                 marginBottom: 50,
//                 paddingBottom: 20,
//               }}> */}

//             {/* <View style={{
//                   marginTop: 20,
//                   marginLeft: 15,
//                   marginRight: 10,
//                   flexDirection: 'row'
//                 }}>
//                   <View style={{
//                     borderColor: '#000',
//                     borderWidth: 0.5,
//                     borderRadius: 8,
//                     width: '60%',
//                     height: 40,
//                     backgroundColor: "#fff",
//                   }}>
//                     <Picker style={{ marginTop: -5, color: theme === 'LIGHT' ? '#2f4858' : '#000', }}
//                       selectedValue={selectedGenre}
//                       onValueChange={(itemValue) => setSelectedGenre(itemValue)}
//                     >
//                       {genr.map((genres, index) => (
//                         <Picker.Item key={index} label={genres} value={genres} />
//                       ))}
//                     </Picker>
//                   </View>


//                   <TouchableOpacity
//                     style={{
//                       backgroundColor: '#c27b7f',
//                       alignItems: 'center',
//                       padding: 5,
//                       borderRadius: 5,
//                       width: '30%',
//                       height: 40,
//                       marginLeft: 15,

//                     }}
//                     onPress={resetGenre}
//                   >
//                     <Text style={{
//                       color: '#fff',
//                       fontWeight: '700',
//                       fontSize: 18
//                     }}>Reset</Text>

//                   </TouchableOpacity>
//                 </View> */}


//             {/* <View style={{ flex: 1,  marginTop: 10 }}> */}

//             {/* ==================search======================= */}
//             {/* <View style={styles.searchcontainer}>
//                     <View style={styles.searchBar}>
//                       <Feather name="search" color={"gray"} size={20} style={styles.searchIcon} />
//                       <TextInput
//                         style={styles.searchInput}
//                         placeholder="Search by Title"
//                         placeholderTextColor="#000"
//                         value={searchQuery}
//                         onChangeText={setSearchQuery}
//                       />

//                       {searchQuery !== '' && (
//                         <TouchableOpacity onPress={() => {
//                           setSearchQuery('');

//                         }}>
//                           <Feather name="x" color={"gray"} size={20} style={[styles.searchIcon, { marginLeft: 80 }]} />
//                         </TouchableOpacity>)}
//                     </View>
//                   </View> */}

//             {/* ===================================================================== */}

//             <View style={{
//               flex: 1,
//                alignItems: 'center',
//             marginLeft:20,
//             marginRight:20,
//               marginBottom: 30,
//             }}>
//               <FlatList
//                 showsVerticalScrollIndicator={false}
//                 // columnWrapperStyle={{ justifyContent: 'space-between' }}
//                 numColumns={1}
//                 data={data}
//                 keyExtractor={(item) => item.id}
//                 renderItem={({ item }) =>

//                   <View style={{
//                     marginTop: 5,
//                     paddingBottom: 15,
//                     borderRadius: 10,
//                     marginBottom: 15,
//                     alignItems: 'center',
//                     borderWidth:1,
//                     borderColor:'#efefef'
//                   }}>
//                     <Text style={{
//                       color: '#000',
//                       fontFamily: 'Poppins-Regular',
//                       fontSize: 15,
//                       paddingTop:8,
//                     }}
//                     >
//                       {item.title}
//                     </Text>
//                     <Text style={{
//                       color: '#34495E',
//                       fontFamily: 'OpenSans-Regular',
//                       fontSize: 13,
//                       textAlign: 'center',
//                       paddingLeft: 10,
//                       paddingRight: 10
//                     }}
//                     >
//                       {item.note}
//                     </Text>
//                     <View>{getCategoryText(item.category_id)}</View>
//                   </View>

//                 }
//               />


//             </View>

//             {/* table */}
//             {/* <View style={{ flex: 1, backgroundColor: '#f5ebe6', marginTop: 15 }}>
//                     <ScrollView horizontal={true} contentContainerStyle={{ columnGap: 50 }}>
//                       <View style={{ backgroundColor: '#fff', marginTop: 15, marginLeft: 15, marginRight: 15 }}>
//                         <Table borderStyle={{ borderWidth: 1, borderColor: '#fff' }}>
//                           <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} 
//                           textStyle={{ textAlign: 'center', fontWeight: 'bold', color: '#000' }} />
//                         </Table>
//                         <ScrollView style={styles.dataWrapper}>
//                           <Table borderStyle={{ borderWidth: 1, borderColor: '#fff', }}>

//                             {updatedTableData.map((item, index) => (
//                               <Row
//                                 key={index}
//                                 data={item}
//                                 widthArr={state.widthArr}
//                                 style={[styles.row1, index % 2 && { backgroundColor: '#fff' }]}
//                                 textStyle={styles.texttt}
//                               />
//                             ))}

//                           </Table>
//                         </ScrollView>
//                       </View>
//                     </ScrollView>
//                   </View> */}

//             {/* </View> */}

//             {/* </View> */}
//             {/* </ScrollView> */}

//           </View>
//         );
//       }}
//     </Theme>
//   );
// };


// export default Resources;


// const styles = StyleSheet.create({

//   // categoryText: {
//   //   textAlign: 'center',
//   //   color: '#fff',
//   //   fontWeight: 'bold',
//   //   backgroundColor: '#c27b7f',
//   //   marginLeft: 15,
//   //   padding: 8,
//   //   borderRadius: 5,
//   // },
//   // searchIcon: {
//   //   marginRight: 8,
//   //   backgroundColor: '#c27b7f',
//   //   borderRadius: 5,
//   //   marginLeft: 25,
//   //   paddingBottom: 5,
//   //   paddingTop: 5,
//   //   textAlign: 'center',
//   // },

//   searchIcon: {
//     backgroundColor: '#c27b7f',
//     borderRadius: 10,
//     padding: 5,
//     paddingLeft: 20,
//     paddingRight: 20,
//     marginTop: 10,
//     textAlign: 'center',
//   },
//   categoryText: {
//     textAlign: 'center',
//     color: '#fff',
//     fontFamily: 'OpenSans-Regular',
//     // fontWeight: 'bold',
//     backgroundColor: '#c27b7f',
//     borderRadius: 10,
//     padding: 5,
//     paddingLeft: 20,
//     paddingRight: 20,
//     marginTop: 10,
//   },
// });



// =======================================chenged on 26-3-24==============================




import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Modal, FlatList, Dimensions, PermissionsAndroid, Button } from 'react-native';

import { AuthContext } from '../context/AuthContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import Pdf from 'react-native-pdf';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';
import RNFetchBlob from 'rn-fetch-blob';
import getStyles from '../Style/logNRegStyle';
import Theme from './Theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../common/Header';

const Resources = () => {
  const navigation = useNavigation();
  const [genr, setGenr] = useState([]);
  const [AllOption, setAllOption] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("Search By Genre");
  const { userToken } = useContext(AuthContext);
  const [pdfModalVisible, setPdfModalVisible] = useState(false);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [audioModalVisible, setAudioModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchQuery, setSearchQuery] = useState('');
  
  //====================================select========================
  const [selectedCategory, setSelectedCategory] = useState("Documents"); // Initialize with "Documents"
  const [datasSelect, setDataSelect] = useState([]);
  // Function to filter data based on category
  const filterDataByCategory = (category) => {
    setSelectedCategory(category);
  };

  // const filteredData = datasSelect.filter(item => 
  //   selectedCategory === "Documents" ? item.category_id === 1 : selectedCategory === "Multimedia" ?
  //     item.category_id === 2 : item.category_id === 3);


const [filteredData, setFilteredData] = useState([]); // Filtered data

// Function to filter data based on search query and category
const filterData = () => {
  let filtered = datasSelect; // Use the original data here

  // Filter by category
  filtered = filtered.filter(item =>
    selectedCategory === "Documents" ? item.category_id === 1 :
    selectedCategory === "Multimedia" ? item.category_id === 2 :
    item.category_id === 3
  );

  // Filter by search query
  filtered = filtered.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  setFilteredData(filtered);
};

useEffect(() => {
  filterData(); // Call the filter function whenever searchQuery or selectedCategory changes
}, [selectedCategory,datasSelect,searchQuery]);


  // ============================================

  const pdfUrl = `https://dindayalupadhyay.smartcitylibrary.com/public/uploads/Resources/sample.pdf`;

  const audioUrl = `https://dindayalupadhyay.smartcitylibrary.com/public/uploads/Resources/file_example_MP3_5MG.mp3`


  //==============================video=================================================

  const [videoDuration, setVideoDuration] = useState(0);
  const videoUrl = `https://dindayalupadhyay.smartcitylibrary.com/public/uploads/Resources/file_example_MP4_480_1_5MG.mp4`
  const [clicked, setClicked] = useState(false);
  const [puased, setPaused] = useState(false);
  const [progress, setProgress] = useState(null);
  const [fullScreen, setFullScreen] = useState(false)

  const ref = useRef();
  const format = seconds => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2,'0');
    return `${mins}:${secs}`;
  };


  //====================================Audio===========================================

  const xlsxUrl = 'https://dindayalupadhyay.smartcitylibrary.com/uploads/Resources/Popular-Books-By-genre1697019311.xlsx'; //download URL for the XLSX file


  //=================== download for permition=============================

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        downloadFile();
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };


  const downloadFile = () => {
    const { config, fs } = RNFetchBlob;
    const data = new Date();
    const fileDir = fs.dirs.DownloadDir;//download file Directory where want to store

    //file download code =================

    config({
      fileCache: true,
      //=========filedownload manager code===================
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: fileDir + "/download_" + Math.floor(data.getDate() + data.getSeconds() / 2) + '.xlsx',//mix of date n time to get random no.
        description: 'file download'
      }
    })
      .fetch('GET', xlsxUrl, {
      })
      .then((res) => {
        console.log('The file saved to ', res.path());
        alert("file downloaded successfully")
      })
  }

  useEffect(() => {
    const getDummyData = () => {
      fetch("https://dindayalupadhyay.smartcitylibrary.com/api/resources")
        .then(res => res.json())

        .then(responce => {
          // setData(responce.data);
          setDataSelect(responce.data)
        });
    };
    getDummyData();
  }, []);


  function getCategoryText(category_id) {
    switch (category_id) {
      case 1:
        return (
          <TouchableOpacity onPress={() => {
            setVideoModalVisible(true);
          }} >
            <MaterialCommunityIcons name="video" color={"#fff"} size={20} style={styles.searchIcon} />
          </TouchableOpacity>
        );
      case 2:
        return (
          <TouchableOpacity
            onPress={() => {
              setPdfModalVisible(true); // Open the video modal
            }}>
            <Text style={styles.categoryText}>Read</Text></TouchableOpacity>
        );
      case 3:
        return (
          <TouchableOpacity
            onPress={() => {
              setAudioModalVisible(true); // Open the audio modal
            }}>
            <MaterialIcons name="audiotrack" color={"#fff"} size={20} style={styles.searchIcon} />
          </TouchableOpacity>
        );
      case 4:
        return (
          <TouchableOpacity
            onPress={() => {
              requestStoragePermission();
            }}
          >
            <Text style={styles.categoryText}>Downloads</Text>
          </TouchableOpacity>
        );
      default:
        return (
          <Text style={styles.categoryText}>null</Text>
        );
    }
  }


  //============================read book=====================================


  return (
    <Theme>
      {({ theme }) => {
        const styles = getStyles(theme);
        return (
          <View style={styles.container}>

            {/* ====================pdf modal======================= */}

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
                    }}
                    onPageChanged={(page, numberOfPages) => {
                      setCurrentPage(page);
                    }}
                    onError={(error) => {
                      console.log(error);
                    }}
                    onPressLink={(uri) => {
                    }}
                    style={styles.pdf}
                  />

                  <View style={styles.pageButton}>
                    <Text style={styles.pageButtonText}> {currentPage}</Text>
                  </View>

                </View>
              </View>
            </Modal>

            {/* =================video modal=================== */}

            <Modal
              animationType="slide"
              transparent={true}
              visible={videoModalVisible}
              onRequestClose={() => {
                setVideoModalVisible(false);
              }}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  style={{ width: '100%', height: fullScreen ? '100%' : 200 }}
                  onPress={() => {
                    setClicked(true);
                  }}>
                  <Video
                    paused={puased}
                    source={{ uri: videoUrl }}
                    ref={ref}
                    onProgress={x => {
                      console.log(x);
                      setProgress(x);
                    }}
                    onLoad={data => {
                      setVideoDuration(data.duration);
                    }}
                    muted
                    style={{ width: '100%', height: fullScreen ? '100%' : 200 }}
                    resizeMode="contain"
                  />
                  {clicked && (
                    <TouchableOpacity
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        backgroundColor: 'rgba(0,0,0,.5)',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                          onPress={() => {
                            ref.current.seek(parseInt(progress.currentTime) - 10);
                          }}>
                          <Image
                            source={require('../images/backward.png')}
                            style={{ width: 30, height: 30, tintColor: 'white' }}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            setPaused(!puased);
                          }}>
                          <Image
                            source={
                              puased
                                ? require('../images/play-button.png')
                                : require('../images/pause.png')
                            }
                            style={{
                              width: 30,
                              height: 30,
                              tintColor: 'white',
                              marginLeft: 50,
                            }}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            ref.current.seek(parseInt(progress.currentTime) + 10);
                          }}>
                          <Image
                            source={require('../images/forward.png')}
                            style={{
                              width: 30,
                              height: 30,
                              tintColor: 'white',
                              marginLeft: 50,
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          position: 'absolute',
                          bottom: 0,
                          paddingLeft: 20,
                          paddingRight: 20,
                          alignItems: 'center'
                        }}>
                        <Text style={{ color: 'white' }}>
                          {format(progress.currentTime)}
                        </Text>
                        <Slider
                          style={{ width: '80%', height: 40 }}
                          minimumValue={0}
                          maximumValue={videoDuration}
                          minimumTrackTintColor="#FFFFFF"
                          maximumTrackTintColor="#fff"
                          onValueChange={(x) => {
                            ref.current.seek(x);
                          }}
                          value={progress.currentTime}
                        />

                        <Text style={{ color: 'white' }}>
                          {format(progress.seekableDuration)}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          position: 'absolute',
                          top: 10,
                          paddingLeft: 20,
                          paddingRight: 20,
                          alignItems: 'center'
                        }}>
                        <TouchableOpacity onPress={() => {
                          if (fullScreen) {
                            Orientation.lockToPortrait();
                          } else {
                            Orientation.lockToLandscape();
                          }
                          setFullScreen(!fullScreen)
                        }}>
                          <Image source={fullScreen ? require('../images/minimize.png') : require('../images/full-size.png')}
                            style={{ width: 24, height: 24, tintColor: 'white' }} />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  )}
                </TouchableOpacity>
              </View>
            </Modal>

            {/* ============================audio=============================== */}

            <Modal
              animationType="slide"
              transparent={true}
              visible={audioModalVisible}
              onRequestClose={() => {
                setAudioModalVisible(false);

              }}>

              <View style={{
                marginTop: 250,
                marginLeft: 10,
                marginRight: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff3cd',
                paddingBottom: 30,
                paddingTop: 30,
                borderRadius: 15,
              }}>
                <Text style={{
                  marginBottom: 15,
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: '#000',
                  textAlign: 'center',
                  fontFamily: 'Philosopher-Bold',
                }}>Preview</Text>
                <Video
                  source={{ uri: audioUrl }}
                  style={{
                    width: 300,
                    height: 100,
                    borderRadius: 15,
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}
                  controls={true} // Show audio controls (play, pause, etc.)
                  resizeMode="contain"
                  onEnd={() => setAudioModalVisible(false)}
                />
              </View>

            </Modal>


            <Text style={styles.sectionHeading}>eResources</Text>

            {/* ==================search======================= */}
            <View style={{
              alignItems: 'center',
              flexDirection: 'row', marginLeft: 20,
              marginRight: 20,
            }}>
              <View style={{
                flexDirection: 'row',
                marginRight: 10,
                borderRadius: 10,
                borderColor: '#efefef',
                borderWidth: 0.8,
                paddingHorizontal: 10,
                width: 240,
                color: theme === 'LIGHT' ? '#2f4858' : '#000',
              }}>

                <TextInput
                  style={{
                    color: theme === 'LIGHT' ? '#2f4858' : '#000',
                    fontSize: 15,
                    marginTop: -8,
                    marginBottom: -8
                  }}
                  placeholder="Search by Title"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />

              </View>
              <TouchableOpacity onPress={
               () => setSearchQuery('')
              }>
              <Text style={{
                backgroundColor: '#c27b7f',
                padding: 8,
                paddingLeft:16,paddingRight:16,
                 borderRadius: 10,
                fontSize: 13, fontWeight: '700',
                fontFamily: 'Poppins-Regular',
                color:'#fff'
              }}>Reset</Text>
              </TouchableOpacity>
            </View>
            {/* =====================================buttons============================ */}

            <View style={{ flexDirection: 'row', marginTop: 30, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => filterDataByCategory("Documents")}>
                <Text style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 14, color: selectedCategory === "Documents" ? 'blue' : 'grey', fontWeight: '700'
                }}>Documents</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => filterDataByCategory("Multimedia")}>
                <Text style={{
                  marginLeft: 20, fontFamily: 'Poppins-Regular',
                  fontSize: 14, color: selectedCategory === "Multimedia" ? 'blue' : 'grey', fontWeight: '700'
                }}>Multimedia</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => filterDataByCategory("Quick Links")}>
                <Text style={{
                  marginLeft: 20, fontFamily: 'Poppins-Regular',
                  fontSize: 14, color: selectedCategory === "Quick Links" ? 'blue' : 'grey', fontWeight: '700'
                }}>Quick Links</Text>
              </TouchableOpacity>
            </View>
            <View style={{ borderWidth: 0.2, marginTop: 8, borderColor: '#efefef' }}></View>

            {/* ================================data flatlist===================================== */}

            <View style={{
              flex: 1,
              marginLeft: 20,
              marginRight: 20,

            }}>
              <View>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  // columnWrapperStyle={{ justifyContent: 'space-between' }}
                  numColumns={1}
                  data={filteredData}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) =>

                    <View style={{
                      marginTop: 15,
                      padding: 10,
                      paddingBottom: 15,
                      borderRadius: 10,
                      alignItems: 'center',
                      backgroundColor: "#f5e0e1",//#E7E8D1

                    }}>
                      <View>
                        {item.category_id === 1 ?
                          (<Text style={{
                            color: 'grey',
                            fontFamily: 'Poppins-Regular',
                            fontSize: 15,
                            paddingTop: 8,
                            marginLeft: -150
                          }}>Document</Text>) :
                          item.category_id === 2 ?
                            (<Text style={{
                              color: 'grey',
                              fontFamily: 'Poppins-Regular',
                              fontSize: 15,
                              paddingTop: 8,
                              marginLeft: -150
                            }}>Multimedia</Text>) :
                            (<Text style={{
                              color: 'grey',
                              fontFamily: 'Poppins-Regular',
                              fontSize: 15,
                              paddingTop: 8,
                              marginLeft: -150
                            }}>Quick Links</Text>)
                        }
                      </View>
                      <Text style={{
                        color: '#000',
                        fontFamily: 'Poppins-Regular',
                        fontSize: 20,
                        paddingTop: 8,
                        fontWeight: 'bold'
                      }}
                      >
                        {item.title}
                      </Text>
                      <Text style={{
                        color: '#34495E',
                        fontFamily: 'OpenSans-Regular',
                        fontSize: 13,
                        paddingLeft: 10,
                        paddingRight: 10,
                        marginTop: 10,
                      }}
                      >
                        {item.note}
                      </Text>

                      <TouchableOpacity style={{
                        backgroundColor: '#fff',
                        marginTop: 10,
                        paddingLeft: 10,
                        padding: 5,
                        borderRadius: 20,
                      }}>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={{
                            fontSize: 15,
                            fontFamily: 'Poppins-Regular',
                            textAlign: 'left',
                            color: '#000',
                            fontWeight: '700',
                          }}>Visit</Text>
                          <AntDesign name="arrowright" color={"#000"} size={17} style={{ marginTop: 2, marginLeft: 10 }} />
                        </View>
                      </TouchableOpacity>


                      {/* <View>{getCategoryText(item.category_id)}</View> */}
                    </View>

                  }
                />
                {/* )} */}
              </View>


            </View>

          </View>
        );
      }}
    </Theme>
  );
};


export default Resources;


const styles = StyleSheet.create({


  searchIcon: {
    backgroundColor: '#c27b7f',
    borderRadius: 10,
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  categoryText: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'OpenSans-Regular',
    backgroundColor: '#c27b7f',
    borderRadius: 10,
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
  },
});
