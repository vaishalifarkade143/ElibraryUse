// import React, { useEffect, useState, useContext } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, Modal, FlatList, Dimensions } from 'react-native';
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

// const Resources = () => {
//   const navigation = useNavigation();
//   const [genr, setGenr] = useState([]);
//   const [AllOption, setAllOption] = useState(null);
//   const [selectedGenre, setSelectedGenre] = useState("Search By Genre");
//   const { userToken } = useContext(AuthContext);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [pdfModalVisible, setPdfModalVisible] = useState(false);
//   const [videoModalVisible, setVideoModalVisible] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState('');
//   const pdfUrl = `https://dindayalupadhyay.smartcitylibrary.com/public/uploads/Resources/sample.pdf`;
//   const videoUrl = `https://dindayalupadhyay.smartcitylibrary.com/public/uploads/Resources/file_example_MP4_480_1_5MG.mp4`

//   //===============================================================================



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


//   const state = {
//     tableHead: ['Title', 'Category', 'URL', 'Description', 'Action'],
//     widthArr: [150, 100, 150, 200, 100],
//   };

//   //==================to get categories in dropdown==========================

//   useEffect(() => {
//     // Fetch the list of genres from your API
//     fetch('https://dindayalupadhyay.smartcitylibrary.com/api/resources-category')
//       .then(response => response.json())
//       .then(data => setGenr(["Search By Genre", ...data.data.map(genres => genres.name)]))
//       // Assuming the API response has a "data" field with an array of genres
//       .catch(error => console.error('Error fetching genres:', error));
//   }, []);


//   // =================================get data in table=================================================

//   useEffect(() => {
//     const apiUrl = 'https://dindayalupadhyay.smartcitylibrary.com/api/resources';

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
//         // Filter the data based on the selected genre

//         let filteredData = data.data;
//         console.log("data is :", data.data);

//         const selectedGenreInt = mapCategoryToInt(selectedGenre);
//         console.log("selected  selectedGenreInt:", typeof selectedGenreInt);

//         if (selectedGenre !== "Search By Genre") {
//           filteredData = data.data.filter((item) =>
//             item.category_id === selectedGenreInt
//           );
//         }

//         console.log("selected genre type:", typeof selectedGenre);
//         console.log("selected genre:", selectedGenre);
//         console.log("Filtered Data:", filteredData);

//         setAllOption(filteredData);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, [userToken, selectedGenre]);



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
//               setPdfModalVisible(true); // Open the PDF modal
//             }}>
//             <Text style={styles.categoryText}>Read</Text></TouchableOpacity>
//         );
//       case 3:
//         return (
//           <MaterialIcons name="audiotrack" color={"#fff"} size={20} style={styles.searchIcon} />

//         );
//       case 4:
//         return (
//           <Text style={styles.categoryText}>Downloads</Text>
//         );
//       default:
//         return (
//           <Text style={styles.categoryText}>null</Text>
//         );
//     }
//   }

//   const updatedTableData = AllOption ? AllOption
//     .filter((item) => {
//       // Step 4: Filter the data based on the search query
//       const title = item.title.toLowerCase();
//       const query = searchQuery.toLowerCase();
//       return title.includes(query);
//     })
//     .map((item) => [
//       item.title,
//       item.category_id,
//       item.url === null ? (<Text style={{ textAlign: 'center' }}>N/A</Text>) : (<Text>null</Text>),
//       item.note,
//       getCategoryText(item.category_id),

//     ]) : [];

//   const resetGenre = () => {
//     setSelectedGenre("Search By Genre");
//   };


//   //============================read book=====================================


//   return (
//     <View style={{ flex: 1 }}>
//       <Header
//         rightIcon={require('../images/Logoelibrary.png')}
//         leftIcon={require('../images/menu.png')}
//         onClickLeftIcon={() => {
//           navigation.openDrawer();
//         }}
//       />
//       {/* ====================pdf modal======================= */}

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




//       {/* =================video modal=================== */}

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={videoModalVisible}
//         onRequestClose={() => {
//           setVideoModalVisible(false);

//         }}>

//         <View style={styles.modalContainer}>
//           <Video
//             // source={{ uri: 'https://player.vimeo.com/external/403131658.sd.mp4' }}
//             source={{ uri: videoUrl }}
//             style={styles.videoPlayer}
//             // Make sure controls are enabled
//             resizeMode={'cover'}
//             controls={true}
//           />

//         </View>
//       </Modal>


//       <ScrollView>
//         <Text style={{
//           fontFamily: 'Philosopher-Bold',
//           fontSize: 27,
//           fontWeight: '600',
//           color: '#000',
//           textAlign: 'center',
//           marginTop: 20
//         }}>Resources</Text>
//         <View style={{
//           marginTop: 0,
//           width: 110,
//           height: 2,
//           backgroundColor: '#c27b7f',
//           alignItems: 'center',
//           marginLeft: 125,
//         }}></View>

//         <View style={{
//           backgroundColor: '#fff3cd',
//           marginTop: 20,
//           flexDirection: 'column',
//           marginBottom: 50,
//           paddingBottom: 20,
//         }}>

//           <View style={{
//             marginTop: 20,
//             marginLeft: 15,
//             marginRight: 10,
//             flexDirection: 'row'
//           }}>

//             <View style={{
//               borderColor: '#000',
//               borderWidth: 0.5,
//               borderRadius: 8,
//               width: '60%',
//               height: 40, backgroundColor: "#fff"
//             }}>

//               <Picker style={{ marginTop: -5 }}
//                 selectedValue={selectedGenre}
//                 onValueChange={(itemValue) => setSelectedGenre(itemValue)}
//               >

//                 {genr.map((genres, index) => (
//                   <Picker.Item key={index} label={genres} value={genres} />
//                 ))}
//               </Picker>


//             </View>


//             <TouchableOpacity
//               style={{
//                 backgroundColor: '#c27b7f',
//                 alignItems: 'center',
//                 padding: 5,
//                 borderRadius: 5,
//                 width: '30%',
//                 height: 40,
//                 marginLeft: 15,

//               }}
//               onPress={resetGenre}
//             >
//               <Text style={{
//                 color: '#fff',
//                 fontWeight: '700',
//                 fontSize: 18
//               }}>Reset</Text>

//             </TouchableOpacity>
//           </View>


//           <View style={{ flex: 1, backgroundColor: '#fff3cd', marginTop: 10 }}>

//             {/* ==================search======================= */}
//             <View style={styles.searchcontainer}>
//               <View style={styles.searchBar}>
//                 <Feather name="search" color={"gray"} size={20} style={styles.searchIcon1} />
//                 <TextInput
//                   style={styles.searchInput}
//                   placeholder="Search by Title"
//                   value={searchQuery}
//                   onChangeText={setSearchQuery}
//                 />

//                 {searchQuery !== '' && (
//                   <TouchableOpacity onPress={() => {
//                     setSearchQuery('');

//                   }}>
//                     <Feather name="x" color={"gray"} size={20} style={styles.searchIcon1} />
//                   </TouchableOpacity>)}
//               </View>
//             </View>
//             {/* ===================================================================== */}

//             {/* table */}
//             <View style={{ flex: 1, backgroundColor: '#fff3cd', marginTop: 15 }}>
//               <ScrollView horizontal={true} contentContainerStyle={{ columnGap: 50 }}>
//                 <View style={{ backgroundColor: '#fff', marginTop: 15, marginLeft: 15, marginRight: 15 }}>
//                   <Table borderStyle={{ borderWidth: 1, borderColor: '#fff' }}>
//                     <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={{ textAlign: 'center', fontWeight: 'bold', color: '#000' }} />
//                   </Table>
//                   <ScrollView style={styles.dataWrapper}>
//                     <Table borderStyle={{ borderWidth: 1, borderColor: '#fff', }}>

//                       {updatedTableData.map((item, index) => (
//                         <Row
//                           key={index}
//                           data={item}
//                           widthArr={state.widthArr}
//                           style={[styles.row, index % 2 && { backgroundColor: '#fff' }]}
//                           textStyle={styles.text}
//                         />
//                       ))}

//                     </Table>
//                   </ScrollView>
//                 </View>
//               </ScrollView>
//             </View>
//           </View>

//         </View>
//       </ScrollView>

//     </View>

//   );
// };


// export default Resources;


// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 17, paddingTop: 30, backgroundColor: '#fff' },
//   header: { height: 50, backgroundColor: '#fff', fontWeight: 'bold' },
//   text: { textAlign: 'center', fontWeight: '400', fontSize: 15 },
//   dataWrapper: { marginTop: -1 },
//   row: { height: 40, backgroundColor: '#fff', marginRight: 20, },
//   loadingText: {
//     fontSize: 20,
//     textAlign: 'center',
//   },
//   categoryText: {
//     textAlign: 'center',
//     color: '#fff',
//     fontWeight: 'bold',
//     backgroundColor: '#c27b7f',
//     marginLeft: 15,
//     padding: 8,
//     borderRadius: 5,
//   },
//   searchIcon: {
//     marginRight: 8,
//     backgroundColor: '#c27b7f',
//     borderRadius: 5,
//     marginLeft: 25,
//     paddingBottom: 5,
//     paddingTop: 5,
//     textAlign: 'center',
//   },
//   pdf: {
//     flex: 1,
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
//   pageButton: {
//     position: 'absolute',
//     bottom: 210,
//     right: 0,
//     backgroundColor: 'black',
//     borderRadius: 10,
//     padding: 10,
//   },
//   pageButtonText: {
//     color: 'white',
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 20,
//     paddingLeft: 40,
//     paddingRight: 40,
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

//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   modalText: {
//     marginBottom: 5,
//     textAlign: 'center',
//   },
//   videoPlayer: {
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').width * (9 / 16),
//     backgroundColor: 'black',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//   },
//   searchIcon1: {
//     marginRight: 5,
//   },
//   searchInput: {
//     fontSize: 15,
//   },
//   searchcontainer: {
//     marginTop: 5,
//     marginLeft: 10,
//     padding: 5,
//     width: '90%',
//     height: 50,
//     backgroundColor: '#fff3cd'
//   },
//   searchBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     borderRadius: 8,
//     borderColor: 'gray',
//     paddingHorizontal: 12,

//   },

// });
// ====================================================================================




import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, Modal, FlatList, Dimensions } from 'react-native';
import Header from '../common/Header';
import { Table, Row } from 'react-native-table-component';
import { Picker } from '@react-native-picker/picker';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../context/AuthContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import Pdf from 'react-native-pdf';
import Video from 'react-native-video';

const Resources = () => {
  const navigation = useNavigation();
  const [genr, setGenr] = useState([]);
  const [AllOption, setAllOption] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("Search By Genre");
  const { userToken } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [pdfModalVisible, setPdfModalVisible] = useState(false);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const pdfUrl = `https://dindayalupadhyay.smartcitylibrary.com/public/uploads/Resources/sample.pdf`;
  const videoUrl = `https://dindayalupadhyay.smartcitylibrary.com/public/uploads/Resources/file_example_MP4_480_1_5MG.mp4`

  //===============================================================================



  const mapCategoryToInt = (categoryName) => {
    switch (categoryName) {
      case "Video":
        return 1;
      case "PDF":
        return 2;
      case "Audio":
        return 3;
      case "Excel":
        return 4;
      default:
        return 0; // Default to 0 or another appropriate value
    }
  };


  const state = {
    tableHead: ['Title', 'Category', 'URL', 'Description', 'Action'],
    widthArr: [150, 100, 150, 200, 100],
  };

  //==================to get categories in dropdown==========================

  useEffect(() => {
    // Fetch the list of genres from your API
    fetch('https://dindayalupadhyay.smartcitylibrary.com/api/resources-category')
      .then(response => response.json())
      .then(data => setGenr(["Search By Genre", ...data.data.map(genres => genres.name)]))
      // Assuming the API response has a "data" field with an array of genres
      .catch(error => console.error('Error fetching genres:', error));
  }, []);


  // =================================get data in table=================================================

  useEffect(() => {
    const apiUrl = 'https://dindayalupadhyay.smartcitylibrary.com/api/resources';

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
        // Filter the data based on the selected genre

        let filteredData = data.data;
        console.log("data is :", data.data);

        const selectedGenreInt = mapCategoryToInt(selectedGenre);
        console.log("selected  selectedGenreInt:", typeof selectedGenreInt);

        if (selectedGenre !== "Search By Genre") {
          filteredData = data.data.filter((item) =>
            item.category_id === selectedGenreInt
          );
        }

        console.log("selected genre type:", typeof selectedGenre);
        console.log("selected genre:", selectedGenre);
        console.log("Filtered Data:", filteredData);

        setAllOption(filteredData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [userToken, selectedGenre]);



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
              setPdfModalVisible(true); // Open the PDF modal
            }}>
            <Text style={styles.categoryText}>Read</Text></TouchableOpacity>
        );
      case 3:
        return (
          <MaterialIcons name="audiotrack" color={"#fff"} size={20} style={styles.searchIcon} />

        );
      case 4:
        return (
          <Text style={styles.categoryText}>Downloads</Text>
        );
      default:
        return (
          <Text style={styles.categoryText}>null</Text>
        );
    }
  }

  const updatedTableData = AllOption ? AllOption
    .filter((item) => {
      // Step 4: Filter the data based on the search query
      const title = item.title.toLowerCase();
      const query = searchQuery.toLowerCase();
      return title.includes(query);
    })
    .map((item) => [
      item.title,
      item.category_id,
      item.url === null ? (<Text style={{ textAlign: 'center' }}>N/A</Text>) : (<Text>null</Text>),
      item.note,
      getCategoryText(item.category_id),

    ]) : [];

  const resetGenre = () => {
    setSelectedGenre("Search By Genre");
  };


  //============================read book=====================================


  return (
    <View style={{ flex: 1 }}>
      <Header
        rightIcon={require('../images/Logoelibrary.png')}
        leftIcon={require('../images/menu.png')}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
      />
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




      {/* =================video modal=================== */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={videoModalVisible}
        onRequestClose={() => {
          setVideoModalVisible(false);

        }}>

        <View style={styles.modalContainer}>
          <Video
            // source={{ uri: 'https://player.vimeo.com/external/403131658.sd.mp4' }}
            source={{ uri: videoUrl }}
            style={styles.videoPlayer}
            // Make sure controls are enabled
            resizeMode={'cover'}
            controls={true}
          />

        </View>
      </Modal>


      <ScrollView>
        <Text style={{
          fontFamily: 'Philosopher-Bold',
          fontSize: 27,
          fontWeight: '600',
          color: '#000',
          textAlign: 'center',
          marginTop: 20
        }}>Resources</Text>
        <View style={{
          marginTop: 0,
          width: 110,
          height: 2,
          backgroundColor: '#c27b7f',
          alignItems: 'center',
          marginLeft: 125,
        }}></View>

        <View style={{
          backgroundColor: '#fff3cd',
          marginTop: 20,
          flexDirection: 'column',
          marginBottom: 50,
          paddingBottom: 20,
        }}>

          <View style={{
            marginTop: 20,
            marginLeft: 15,
            marginRight: 10,
            flexDirection: 'row'
          }}>

            <View style={{
              borderColor: '#000',
              borderWidth: 0.5,
              borderRadius: 8,
              width: '60%',
              height: 40, backgroundColor: "#fff"
            }}>

              <Picker style={{ marginTop: -5 }}
                selectedValue={selectedGenre}
                onValueChange={(itemValue) => setSelectedGenre(itemValue)}
              >

                {genr.map((genres, index) => (
                  <Picker.Item key={index} label={genres} value={genres} />
                ))}
              </Picker>


            </View>


            <TouchableOpacity
              style={{
                backgroundColor: '#c27b7f',
                alignItems: 'center',
                padding: 5,
                borderRadius: 5,
                width: '30%',
                height: 40,
                marginLeft: 15,

              }}
              onPress={resetGenre}
            >
              <Text style={{
                color: '#fff',
                fontWeight: '700',
                fontSize: 18
              }}>Reset</Text>

            </TouchableOpacity>
          </View>


          <View style={{ flex: 1, backgroundColor: '#fff3cd', marginTop: 10 }}>

            {/* ==================search======================= */}
            <View style={styles.searchcontainer}>
              <View style={styles.searchBar}>
                <Feather name="search" color={"gray"} size={20} style={styles.searchIcon1} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search by Title"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />

                {searchQuery !== '' && (
                  <TouchableOpacity onPress={() => {
                    setSearchQuery('');

                  }}>
                    <Feather name="x" color={"gray"} size={20} style={styles.searchIcon1} />
                  </TouchableOpacity>)}
              </View>
            </View>
            {/* ===================================================================== */}

            {/* table */}
            <View style={{ flex: 1, backgroundColor: '#fff3cd', marginTop: 15 }}>
              <ScrollView horizontal={true} contentContainerStyle={{ columnGap: 50 }}>
                <View style={{ backgroundColor: '#fff', marginTop: 15, marginLeft: 15, marginRight: 15 }}>
                  <Table borderStyle={{ borderWidth: 1, borderColor: '#fff' }}>
                    <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={{ textAlign: 'center', fontWeight: 'bold', color: '#000' }} />
                  </Table>
                  <ScrollView style={styles.dataWrapper}>
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#fff', }}>

                      {updatedTableData.map((item, index) => (
                        <Row
                          key={index}
                          data={item}
                          widthArr={state.widthArr}
                          style={[styles.row, index % 2 && { backgroundColor: '#fff' }]}
                          textStyle={styles.text}
                        />
                      ))}

                    </Table>
                  </ScrollView>
                </View>
              </ScrollView>
            </View>
          </View>

        </View>
      </ScrollView>

    </View>

  );
};


export default Resources;


const styles = StyleSheet.create({
  container: { flex: 1, padding: 17, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#fff', fontWeight: 'bold' },
  text: { textAlign: 'center', fontWeight: '400', fontSize: 15 },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#fff', marginRight: 20, },
  loadingText: {
    fontSize: 20,
    textAlign: 'center',
  },
  categoryText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: '#c27b7f',
    marginLeft: 15,
    padding: 8,
    borderRadius: 5,
  },
  searchIcon: {
    marginRight: 8,
    backgroundColor: '#c27b7f',
    borderRadius: 5,
    marginLeft: 25,
    paddingBottom: 5,
    paddingTop: 5,
    textAlign: 'center',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40,
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

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 5,
    textAlign: 'center',
  },
  videoPlayer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * (9 / 16),
    backgroundColor: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  searchIcon1: {
    marginRight: 5,
  },
  searchInput: {
    fontSize: 15,
  },
  searchcontainer: {
    marginTop: 5,
    marginLeft: 10,
    padding: 5,
    width: '90%',
    height: 50,
    backgroundColor: '#fff3cd'
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: 'gray',
    paddingHorizontal: 12,

  },

});
