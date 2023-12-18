import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, StatusBar } from 'react-native';



const FilterData = ({ route, navigation }) => {


  const [filterByGenre, setFilterByGenre] = useState([]);
  const [filterBybooks, setFilterByBooks] = useState([]);
  const [filterByfilterBooks, setFilterByFilterBooks] = useState([]);
  const [filterByfeaturedEBooks, setFilterByFeaturedEBooks] = useState([]);



  // useEffect(() => {
  //   let filteredData = route.params.filteredGenResults;
  //   setFilterByGenre(filteredData);
  // }, [route.params.filteredGenResults]);


  useEffect(() => {
    let filteredData;
    if(route.params.books){
      filteredData = route.params.books;
      setFilterByBooks(filteredData);
    }

    if(route.params.filterBooks){
      filteredData = route.params.filterBooks;
      setFilterByBooks(filteredData);
    }

    if(route.params.featuredEBooks){
      filteredData = route.params.featuredEBooks;
      setFilterByBooks(filteredData);
    }

    if(route.params.filteredGenResults)
    {
      filteredData = route.params.filteredGenResults;
      setFilterByBooks(filteredData);
    }
  



    
  }, [route.params.books,route.params.filterBooks,route.params.featuredEBooks,route.params.filteredGenResults]);

  // useEffect(() => {
  //   let filteredData = route.params.filterBooks;
  //   setFilterByFilterBooks(filteredData);
  // }, [route.params.filterBooks]);

  // useEffect(() => {
  //   let filteredData = route.params.featuredEBooks;
  //   setFilterByFeaturedEBooks(filteredData);
  // }, [route.params.featuredEBooks]);





  if (!filterBybooks) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 10, marginStart: 10, backgroundColor: '#fff' }}>


        {filterBybooks.length > 0 ? (
          <FlatList
            numColumns={2}
            contentContainerStyle={{ columnGap: -10 }}
            keyExtractor={(item) => item.id.toString()}
            data={filterBybooks}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('BooksDetailPage', { data: item })}>
                <View style={{ width: 145, height: 280, marginEnd: 50 }}>
                  <View style={{ elevation: 5, borderRadius: 5, color: '#000' }}>
                    <Image
                      source={{ uri: item.image_path }}
                      style={{
                        aspectRatio: 0.8,
                        resizeMode: 'cover',
                        borderRadius: 10,
                      }}
                    />
                  </View>

                  <View style={{ padding: 10 }}>
                    <Text
                      style={{
                        fontSize: 15,
                        marginLeft: -10,
                        fontFamily: 'philosopher-bold',
                      }}
                      numberOfLines={1}
                    >
                      {item.name}
                    </Text>
                    {item.library_id === 111 ? (
                      <Text style={{ marginLeft: -10, fontSize: 12 }}>Dindayal UpadhyayLibrary</Text>
                    ) : item.library_id === 222 ? (
                      <Text style={{ marginLeft: -12, fontSize: 12 }}>Kundanlal Gupta Library</Text>
                    ) : (
                      <Text style={{ marginLeft: -8, fontSize: 12 }}>Rashtramata Kasturba Library</Text>
                    )}

                    {item.items?.[0]?.format === 3 ? (
                      <Image source={require('../images/ebook.png')} style={{ height: 20, width: 20, marginLeft: -8 }} />
                    ) : (
                      <Image source={require('../images/bookfill.png')} style={{ height: 20, width: 20, marginLeft: -8 }} />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View>
            <Text>Not Available </Text>
          </View>
        )}







        {/* {filterBybooks.length > 0 ? (
          <FlatList
            numColumns={2}
            contentContainerStyle={{ columnGap: -10 }}
            keyExtractor={(item) => item.id.toString()}
            data={filterBybooks}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('BooksDetailPage', { data: item })}>
                <View style={{ width: 145, height: 280, marginEnd: 50 }}>
                  <View style={{ elevation: 5, borderRadius: 5, color: '#000' }}>
                    <Image
                      source={{ uri: item.image_path }}
                      style={{
                        aspectRatio: 0.8,
                        resizeMode: 'cover',
                        borderRadius: 10,
                      }}
                    />
                  </View>

                  <View style={{ padding: 10 }}>
                    <Text
                      style={{
                        fontSize: 15,
                        marginLeft: -10,
                        fontFamily: 'philosopher-bold',
                      }}
                      numberOfLines={1}
                    >
                      {item.name}
                    </Text>
                    {item.library_id === 111 ? (
                      <Text style={{ marginLeft: -10, fontSize: 12 }}>Dindayal UpadhyayLibrary</Text>
                    ) : item.library_id === 222 ? (
                      <Text style={{ marginLeft: -12, fontSize: 12 }}>Kundanlal Gupta Library</Text>
                    ) : (
                      <Text style={{ marginLeft: -8, fontSize: 12 }}>Rashtramata Kasturba Library</Text>
                    )}

                    {item.items?.[0]?.format === 3 ? (
                      <Image source={require('../images/ebook.png')} style={{ height: 20, width: 20, marginLeft: -8 }} />
                    ) : (
                      <Image source={require('../images/bookfill.png')} style={{ height: 20, width: 20, marginLeft: -8 }} />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View>
            <Text>Not Available </Text>
          </View>
        )}
 */}








      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  // container: {
  //     flex: 1,
  //     marginTop: StatusBar.currentHeight || 0,
  // },
  // item: {
  //     backgroundColor: '#f9c2ff',
  //     padding: 20,
  //     marginVertical: 8,
  //     marginHorizontal: 16,
  // },
  // title: {
  //     fontSize: 32,
  // },

});


export default FilterData;








































// import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, StatusBar, SafeAreaView } from 'react-native'
// import React, { useEffect, useState } from 'react'

// const FilterData = ({route, navigation }) => {
//     const [books, setBooks] = useState([]);
//     const [isLoaded, setisLoaded] = useState(true);
//     const [filteredBooks, setFilteredBooks] = useState([]);
//     const [totalBooksCount, setTotalBooksCount] = useState(0);
//     const {filteredGenResults,filteredAuthResults,filteredPublishResults,filteredLangResults,filteredformResults,filteredLibResults}=route.params
//     useEffect(() => {
//         const getbooks = () => {
//             fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books")
//                 .then(res => res.json())
//                 .then(responce => {
//                     setBooks(responce.data);
//                     setFilteredBooks(responce.data);
//                     setTotalBooksCount(responce.data.length); // Set the total count
//                     setisLoaded(false);
//                 });
//         };
//         getbooks();
//     }, []);
//  return (
//         <View style={{ marginTop: 10, marginStart: 10, backgroundColor: '#fff', flex:1}}>
//             <FlatList
//                 numColumns={2}
//                 contentContainerStyle={{ columnGap: -10,marginLeft:20 }}
//                 keyExtractor={(item) => item.id.toString()}
//                 data={books}

//                 renderItem={({ item, id }) =>

//                     <TouchableOpacity onPress={() => {
//                         //   navigation.navigate('BooksDetailPage', { data: item })
//                     }}>

//                         <View style={{
//                             width: 145,
//                             height: 280,
//                             marginEnd: 50,
//                         }}>
//                             <View style={{
//                                 elevation: 5,
//                                 borderRadius: 5,
//                                 color: '#000'
//                             }}>
//                                 <Image source={{ uri: item.image_path }}
//                                     style={{
//                                         aspectRatio: 0.8,
//                                         resizeMode: 'cover',
//                                         borderRadius: 10,

//                                     }}
//                                 />
//                                 {/* ------------------code for book_item_status----------------------------- */}
//                                 {/* {item.items[0].status === 1 ?
//                         (<Text style={{
//                           position: 'absolute',
//                           textAlign: 'center',
//                           right: -10,
//                           width: 80,
//                           height: 20,
//                           color: 'green',
//                           marginTop: 5,
//                           backgroundColor: '#B6FFC0',
//                           fontSize: 13,
//                           fontWeight: 'bold',
//                           borderRadius: 10,
//                           borderWidth: 1.5,
//                           borderColor: 'green'
//                         }}>
//                           Available</Text>) :
//                         (<Text style={{
//                           position: 'absolute',
//                           textAlign: 'center',
//                           right: -10,
//                           width: 80,
//                           height: 20,
//                           marginTop: 5,
//                           color: '#990000',
//                           backgroundColor: 'red',
//                           fontSize: 13,
//                           fontWeight: 'bold',
//                           borderRadius: 10,
//                           borderWidth: 1.5,
//                           borderColor: '#990000'
//                         }}>
//                           Unavailable</Text>)} */}
//                                 {/* ================================================================================== */}
//                             </View>

//                             <View style={{ padding: 10, }}>
//                                 <Text style={{
//                                     fontSize: 15,
//                                     marginLeft: -10,
//                                     fontFamily: 'philosopher-bold',
//                                 }} numberOfLines={1}>
//                                     {item.name}
//                                 </Text>
//                                 {/* {item.library_id === 111 ?
//                         (<Text
//                           style={{
//                             marginLeft: -10,
//                             fontSize: 12
//                           }}
//                         >
//                           Dindayal UpadhyayLibrary</Text>) :
//                         (item.library_id === 222 ?
//                           (<Text
//                             style={{
//                               marginLeft: -12,
//                               fontSize: 12
//                             }}
//                           >
//                             Kundanlal Gupta Library</Text>) :
//                           (<Text
//                             style={{
//                               marginLeft: -8,
//                               fontSize: 12

//                             }}
//                           >
//                             Rashtramata Kasturba Library</Text>))} */}


//                                 {item.items[0].format === 3 ?
//                                     <Image
//                                         source={require('../images/ebook.png')}
//                                         style={{ height: 20, width: 20, marginLeft: -8, }}
//                                     />
//                                     :
//                                     <Image
//                                         source={require('../images/bookfill.png')}
//                                         style={{ height: 20, width: 20, marginLeft: -8, }}
//                                     />
//                                 }
//                             </View>
//                         </View>
//                     </TouchableOpacity>
//                 }
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     // container: {
//     //     flex: 1,
//     //     marginTop: StatusBar.currentHeight || 0,
//     // },
//     // item: {
//     //     backgroundColor: '#f9c2ff',
//     //     padding: 20,
//     //     marginVertical: 8,
//     //     marginHorizontal: 16,
//     // },
//     // title: {
//     //     fontSize: 32,
//     // },

// });


// export default FilterData;


