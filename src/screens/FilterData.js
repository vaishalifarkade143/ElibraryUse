
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, StatusBar } from 'react-native';
import getStyles from '../Style/logNRegStyle';
import Theme from './Theme';

const FilterData = ({ route, navigation }) => {
  const [filterBybooks, setFilterByBooks] = useState([]);

console.log('selectedGenre', route.params.filteredPublisher,);


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

    if(route.params.artBooks){
      filteredData = route.params.artBooks;
      setFilterByBooks(filteredData);
    }
    if(route.params.busSucMoti){
      filteredData = route.params.busSucMoti;
      setFilterByBooks(filteredData);
    }

    if(route.params.combinedBooks){
      filteredData = route.params.combinedBooks;
      setFilterByBooks(filteredData);
    }

    if(route.params.comicBooks){
      filteredData = route.params.comicBooks;
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



    }, [route.params.books,route.params.filterBooks,route.params.featuredEBooks,route.params.artBooks,route.params.combinedBooks,route.params.comicBooks, route.params.filteredGenre
  , route.params.filteredAuthor,route.params.filteredPublisher,route.params.filteredLanguage,
  route.params.filteredFormat,route.params.filteredLibrary,route.params.busSucMoti]);


  console.log('filterdata ::',filterBybooks);


  if (!filterBybooks) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Theme>
    {({ theme }) => {
      const styles = getStyles(theme);
      return (
    <View style={styles.container}>
      <View style={{ marginTop: 10,
         marginStart: 15, }}>


        {filterBybooks.length > 0 ? (
          <FlatList
            numColumns={2}
            keyExtractor={(item,index) => index.toString()}
            data={filterBybooks}
            renderItem={({ item }) => (
              <TouchableOpacity 
              onPress={() => navigation.navigate('BooksDetailPage', { data: item })}>
                <View style={{ width: 155, 
                  height: 310,
                   marginEnd: 20 }}>
                  <View style={{ elevation: 5, 
                    borderRadius: 5,
                     color: '#000' }}>
                    <Image
                      source={{ uri: item.image_path }}
                      style={styles.bookImage}
                    />
                  </View>

                  <View style={{ padding: 10 }}>
                    <Text
                      style={styles.bookNameText}
                      numberOfLines={1}
                    >
                      {item.name}
                    </Text>
                    {item.library_id === 111 ? (
                      <Text style={[styles.bookPageLibText,{ marginLeft: -10,
                        }]}>Dindayal Upadhyay Library</Text>
                    ) : item.library_id === 222 ? (
                      <Text style={[styles.bookPageLibText,{ marginLeft: -12,
                          }]}>Kundanlal Gupta Library</Text>
                    ) : (
                      <Text style={[styles.bookPageLibText,{ marginLeft: -8,
                         }]}>Rashtramata Kasturba Library</Text>
                    )}

                    {item.items?.[0]?.format === 3 ? (
                      <Image source={require('../images/ebook.png')}  style={styles.bookicon} />
                    ) : (
                      <Image source={require('../images/bookfill.png')} style={styles.bookicon} />
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



      </View>
    </View>
     );
    }}
  </Theme>
  );
};



export default FilterData;

