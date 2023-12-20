// ======================sanjeev work===========================

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, StatusBar } from 'react-native';



const FilterData = ({ route, navigation }) => {
  const [filterByGenre, setFilterByGenre] = useState([]);
  const [filterBybooks, setFilterByBooks] = useState([]);
  const [filterByfilterBooks, setFilterByFilterBooks] = useState([]);
  const [filterByfeaturedEBooks, setFilterByFeaturedEBooks] = useState([]);
  // const {book,filteredGenre}=route.params;

// console.log('selectedGenre',item);

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

    if( route.params.filteredGenre)
    {
      filteredData = route.params.filteredGenre;
      setFilterByBooks(filteredData);
    }

    if( route.params.filteredAuthor)
    {
      filteredData = route.params.filteredAuthor;
      setFilterByBooks(filteredData);
    }

    if( route.params.filteredPublisher)
    {
      filteredData = route.params.filteredPublisher;
      setFilterByBooks(filteredData);
    }

    if( route.params.filteredLanguage)
    {
      filteredData = route.params.filteredLanguage;
      setFilterByBooks(filteredData);
    }

    if( route.params.filteredFormat)
    {
      filteredData = route.params.filteredFormat;
      setFilterByBooks(filteredData);
    }

    if( route.params.filteredLibrary)
    {
      filteredData = route.params.filteredLibrary;
      setFilterByBooks(filteredData);
    }
    }, [route.params.books,route.params.filterBooks,route.params.featuredEBooks, route.params.filteredGenre
  , route.params.filteredAuthor,route.params.filteredPublisher,route.params.filteredLanguage,
  route.params.filteredFormat,route.params.filteredLibrary]);

  // useEffect(() => {
  //   let filteredData = route.params.filterBooks;
  //   setFilterByFilterBooks(filteredData);
  // }, [route.params.filterBooks]);

  // useEffect(() => {
  //   let filteredData = route.params.featuredEBooks;
  //   setFilterByFeaturedEBooks(filteredData);
  // }, [route.params.featuredEBooks]);


  console.log('filterdata ::',filterBybooks);


  if (!filterBybooks) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 ,backgroundColor:'#fff'}}>
      <View style={{ marginTop: 10, marginStart: 10, }}>


        {filterBybooks.length > 0 ? (
          <FlatList
            numColumns={2}
            contentContainerStyle={{ columnGap: -25 }}
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
                        resizeMode: 'contain',
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
                      <Text style={{ marginLeft: -10, fontSize: 12 }}>Dindayal Upadhyay Library</Text>
                    ) : item.library_id === 222 ? (
                      <Text style={{ marginLeft: -12, fontSize: 12 }}>Kundanlal Gupta Library</Text>
                    ) : (
                      <Text style={{ marginLeft: -8, fontSize: 12 }}>Rashtramata Kasturba Library</Text>
                    )}

                    {item.items?.[0]?.format === 3 ? (
                      <Image source={require('../images/ebook.png')} style={{ height: 20,
                         width: 20, marginLeft: -8 }} />
                    ) : (
                      <Image source={require('../images/bookfill.png')} style={{ height: 20,
                         width: 20, marginLeft: -8 }} />
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

// const FilterData = ({route, navigation }) =>{
//     const [filterByBooks,setFilterByBooks]=useState([]);
//     const [books, setBooks] = useState([]);
//     const [isLoaded, setisLoaded] = useState(true);
//     const [filteredBooks, setFilteredBooks] = useState([]);
//     const [totalBooksCount, setTotalBooksCount] = useState(0);
//     const {filteredGenResults,filteredAuthResults,filteredPublishResults,filteredLangResults,filteredformResults,filteredLibResults}=route.params;
   
//     // useEffect(() => {
//     //     const getbooks = () => {
//     //         fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books")
//     //             .then(res => res.json())
//     //             .then(responce => {
//     //                 setBooks(responce.data);
//     //                 setFilteredBooks(responce.data);
//     //                 setTotalBooksCount(responce.data.length); // Set the total count
//     //                 setisLoaded(false);
//     //             });
//     //     };
//     //     getbooks();
//     // }, []);

//     useEffect(() => {
//       let filteredData;
  
//       if (filteredGenResults) {
//         filteredData = filteredGenResults;
//         setFilterByBooks(filteredData);
//       }
//     }, [filteredGenResults, /* Other dependencies */]);
  
//  return (
//   <View style={{ flex: 1 }}>
//         <View style={{ marginTop: 10, marginStart: 10, backgroundColor: '#fff',}}>
//         {filterByBooks.length > 0 ? (
//             <FlatList
//                 numColumns={2}
//                 contentContainerStyle={{ columnGap: -10,
//                   marginLeft:20 }}
//                 keyExtractor={(item) => item.id.toString()}
//                 data={filterByBooks}

//                 renderItem={({ item, id }) =>(

//                     <TouchableOpacity onPress={() => {
//                       navigation.navigate('BooksDetailPage', { data: item })
//                       //   navigation.navigate('BooksDetailPage', { data: item })
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
                                
//                             </View>

//                             <View style={{ padding: 10, }}>
//                                 <Text style={{
//                                     fontSize: 15,
//                                     marginLeft: -10,
//                                     fontFamily: 'philosopher-bold',
//                                 }} numberOfLines={1}>
//                                     {item.name}
//                                 </Text>
                               

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
//         )}
//             />): (
//               <View>
//                 <Text>Not Available</Text>
//               </View>
//             )}
//         </View>
//         </View>
//     );
// };



// export default FilterData;


