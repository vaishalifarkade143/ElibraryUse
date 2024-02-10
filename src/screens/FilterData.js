//============================changes according to filter=================

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, StatusBar, ScrollView } from 'react-native';
import getStyles from '../Style/logNRegStyle';
import Theme from './Theme';
import Header from '../common/Header';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

const FilterData = ({ route, navigation }) => {
  const [filterBybooks, setFilterByBooks] = useState([]);

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

  const [filteredBooks, setFilteredBooks] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    let filteredData;

    if (route.params.recentBooks) {
      filteredData = route.params.recentBooks;
      setFilterByBooks(filteredData);
    }

    if (route.params.seeAllTredbooks) {
      filteredData = route.params.seeAllTredbooks;
      setFilterByBooks(filteredData);
    }

    if (route.params.featureBooks) {
      filteredData = route.params.featureBooks;
      setFilterByBooks(filteredData);
    }

    if (route.params.featureEBooks) {
      filteredData = route.params.featureEBooks;
      setFilterByBooks(filteredData);
    }

    if (route.params.artBooks) {
      filteredData = route.params.artBooks;
      setFilterByBooks(filteredData);
    }
    if (route.params.busSucMoti) {
      filteredData = route.params.busSucMoti;
      setFilterByBooks(filteredData);
    }

    if (route.params.combinedBooks) {
      filteredData = route.params.combinedBooks;
      setFilterByBooks(filteredData);
    }

    if (route.params.comicBooks) {
      filteredData = route.params.comicBooks;
      setFilterByBooks(filteredData);
    }

    if (route.params.filteredGenre) {
      filteredData = route.params.filteredGenre;
      setFilterByBooks(filteredData);
    }

    if (route.params.filteredAuthor) {
      filteredData = route.params.filteredAuthor;
      setFilterByBooks(filteredData);
    }

    if (route.params.filteredPublisher) {
      filteredData = route.params.filteredPublisher;
      setFilterByBooks(filteredData);
    }

    if (route.params.filteredLanguage) {
      filteredData = route.params.filteredLanguage;
      setFilterByBooks(filteredData);
    }

    if (route.params.filteredFormat) {
      filteredData = route.params.filteredFormat;
      setFilterByBooks(filteredData);
    }

    if (route.params.filteredLibrary) {
      filteredData = route.params.filteredLibrary;
      setFilterByBooks(filteredData);
    }

  }, []);

  console.log('filterdata ::', filterBybooks[0]?.genres[0].name);//[0]?.authors

  if (!filterBybooks) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

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
    fetch('https://dindayalupadhyay.smartcitylibrary.com/api/v1/genres?order_by=name&direction=asc&search=&limit=')
      .then(response => response.json())
      .then(data =>{
         console.log('Genres Data:', data);
         setGenr(["Genre", ...data.data.map(genres => genres.name)])
      })
      .catch(error => console.error('Error fetching genres:', error));
  }, []);

  useEffect(() => {
    fetch('https://dindayalupadhyay.smartcitylibrary.com/api/v1/authors?search=&limit=&order_by=first_name&direction=asc')
      .then(response => response.json())
      .then(data => setAuthr(["Author", ...data.data.map(authors => authors.first_name + "" + authors.last_name)])) // Assuming the API response has a "data" field with an array of genres
      .catch(error => console.error('Error fetching authors:', error));
  }, []);

  useEffect(() => {
    fetch('https://dindayalupadhyay.smartcitylibrary.com/api/v1/publishers?order_by=name&direction=asc')
      .then(response => response.json())
      .then(data => setPublishr(["Publisher", ...data.data.map(publisher => publisher.name)])) // Assuming the API response has a "data" field with an array of genres
      .catch(error => console.error('Error fetching publisher:', error));
  }, []);

  useEffect(() => {
    fetch('https://dindayalupadhyay.smartcitylibrary.com/api/b1/book-languages?order_by=language_name&direction=asc')
      .then(response => response.json())
      .then(data => setLanguage(["Languages", ...data.data.map(language => language.language_name)])) // Assuming the API response has a "data" field with an array of genres
      .catch(error => console.error('Error fetching publisher:', error));
  }, []);


  // ==========================working code for Filter genre ==========================
  const handleSearch = (text) => {
    console.log('Search Query:', text);
    setIsLoading(true);
    const filteredResults = genr.filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    console.log('Filtered Results:', filteredResults);
    setSearchResults(filteredResults);
    setIsLoading(false);
  };

  const handleGenreSelection = (itemValue) => {
    setSelectedGenre(itemValue);
    setSearchQuery(itemValue); // Update search query when genre is selected
    handleSearch(itemValue); // Trigger search based on the selected genre
   
  };

  // const handleSearch = (text, criterion) => {
  //   setIsLoading(true);

  //   let filteredResults;

  //   switch (criterion) {
  //     case 'Genre':
  //       filteredResults = genr.filter((item) =>
  //         item.toLowerCase().includes(text.toLowerCase())
  //       );
  //       break;

  //     case 'Author':
  //       // ... (Similar logic for other criteria)
  //       break;

  //     case 'Publisher':
  //       // ... (Similar logic for other criteria)
  //       break;

  //     case 'Language':
  //       // ... (Similar logic for other criteria)
  //       break;

  //     // Add cases for other criteria as needed

  //     default:
  //       filteredResults = [];
  //   }

  //   setSearchResults(filteredResults);
  //   setIsLoading(false);
  // };


  const renderItem = ({ item }) => (
    <View style={{}}>
      <TouchableOpacity 
      onPress={() => 
        handleGenreSelection(item)
      
      }>
      <Text style={{fontSize:15,textAlign:'center'}}>{item}</Text>
      </TouchableOpacity>
    </View>
  );


  const handleClearAll = () => {
    setSearchQuery("");  // Reset search query
    setSearchResults([]);
    setSelectedAuthor("Author");
    setSelectedFormat("Format");
    setSelectedGenre("Genre");
    setSelectedLanguage("Language");
    setSelectedLibrary("Library");
    setSelectedPublisher("Publisher");
    // setFilteredBooks(filterBybooks);  // Reset filtered data to original data
  };

  // ============================== working code for Filter  ==========================
  useEffect(() => {
    const handleDataFilters = () => {

      let filteredBooksCopy = [...filterBybooks];
      console.log('filterdata ::------------', filteredBooksCopy);
      // console.log("route data:",route.params?.recentBooks);

      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        filteredBooksCopy = filterBybooks.filter((book) => {
          const hasMatchingBookName = book.name.toLowerCase().includes(query);
          // ... (Similar logic for other criteria)
  
          return hasMatchingBookName;
        });
      }
  

      if (selectedGenre !== "Genre") {
        filteredBooksCopy = filterBybooks.filter((book) => {
          const hasMatchingGenre = book.genres.some((genre) => {
            // console.log("Selected Genre:", selectedGenre);
            // console.log("Book Genres:", book.genres);
            // console.log("Checking Genre:", genre.name);
            return genre.name === selectedGenre;
          });

          return hasMatchingGenre;
        });
      }

      if (selectedAuthor !== "Author") {
        filteredBooksCopy = filterBybooks.filter((book) => {
          const hasMatchingAuthor = book.authors.some((authr) => {
            return authr.first_name + "" + authr.last_name === selectedAuthor;
          });

          return hasMatchingAuthor;
        });
      }

      if (selectedPublisher !== "Publisher") {
        filteredBooksCopy = filterBybooks.filter((book) => {
          const hasMatchingPublisher = Array.isArray(book.items) && book.items.some((item) => {
            return item.publisher.name === selectedPublisher;
          });

          return hasMatchingPublisher;
        });
      }


      if (selectedLanguage !== "Languages") {
        filteredBooksCopy = filterBybooks.filter((book) => {
          const hasMatchingLanguage = Array.isArray(book.items) && book.items.some((item) => {
            return item.language.language_name === selectedLanguage;
          });

          return hasMatchingLanguage;
        });
      }

      if (selectedFormat !== "Format") {
        filteredBooksCopy = filterBybooks.filter((book) => {
          const hasMatchingFormat = Array.isArray(book.items) && book.items.some((item) => {
            return item.format === selectedFormat;
          });
          return hasMatchingFormat;
        });
      }

      if (selectedLibrary !== "Library") {
        filteredBooksCopy = filterBybooks.filter((book) => {
          const hasMatchingLibrary = book.genres.some((library) => {
            return library.library_id === selectedLibrary;
          });
          return hasMatchingLibrary;
        });
      }

      setFilteredBooks(filteredBooksCopy);

    }
    handleDataFilters();
  }, [selectedGenre, selectedAuthor, selectedPublisher, selectedLanguage, selectedFormat, selectedLibrary]);

  return (
    <Theme>
      {({ theme }) => {
        const styles = getStyles(theme);
        return (
          <View style={styles.container}>
            <Header
              leftIcon={require('../images/back.png')}
              onClickLeftIcon={() => {
                navigation.navigate('Home');
              }}
              rightIcon={require('../images/search.png')}

              onClickRightIcon={() => {
                navigation.navigate('searchbar');
              }}
            />

            <View>
              <ScrollView
                horizontal={true} contentContainerStyle={{ columnGap: -10 }}
                showsHorizontalScrollIndicator={false}
              >
                <View style={{
                  flexDirection: 'row',
                  marginLeft: 20,
                  marginRight: 20
                }}>


                  <View>
                    <View style={{
                      marginTop: 5,
                      borderWidth: 1.5,
                      borderRadius: 20,
                      borderColor: '#efefef',
                      height: 35,
                      marginRight: 5,
                      backgroundColor: '#fff',
                      flexDirection: 'row'
                    }}>
                      <Feather name="search" color={"gray"} size={15} style={{ marginLeft: 12, marginTop: 9, marginRight: 5 }} />
                      <TextInput style={{ marginBottom: -5, fontSize: 15, marginRight: 15 }}
                        placeholder='Genre..'
                        value={searchQuery}
                        onChangeText={(text) => {
                          setSearchQuery(text);
                          handleSearch(text);
                        }}
                      />
                    </View>
                    <FlatList
                      style={{borderColor:'#efefef',borderWidth:0.5}}
                      data={searchResults}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={renderItem}
                    />
                  </View>

                  <View style={{
                    marginTop: 5,
                    borderWidth: 1.5,
                    borderRadius: 20,
                    borderColor: '#efefef',
                    width: 120,
                    height: 35,
                    backgroundColor: '#fff',
                  }}>
                    <Picker style={{ marginTop: -10, marginStart: 5, color: '#5D6D7E', }}
                      selectedValue={selectedGenre}
                      onValueChange={(itemValue) => setSelectedGenre(itemValue)}
                    >

                      {genr.map((genres, index) => (
                        <Picker.Item key={index} label={genres} value={genres}
                          style={{
                            fontSize: 15,
                          }} />

                      ))}

                    </Picker>
                  </View>

                  <View style={{
                    marginLeft: 8,
                    marginTop: 5,
                    borderWidth: 1.5,
                    borderRadius: 20,
                    borderColor: '#efefef',
                    width: 140,
                    height: 35,
                    backgroundColor: '#fff',
                  }}>
                    <Picker style={{ marginTop: -10, marginStart: 10, color: '#5D6D7E', }}
                      selectedValue={selectedPublisher}
                      onValueChange={(itemValue) => setSelectedPublisher(itemValue)}
                    >
                      {publishr.map((publishers, index) => (
                        <Picker.Item key={index} label={publishers} value={publishers} style={{
                          fontSize: 15,
                        }} />
                      ))}
                    </Picker>
                  </View>

                  <View style={{
                    marginLeft: 8,
                    marginTop: 5,
                    borderWidth: 1.5,
                    borderRadius: 20,
                    borderColor: '#efefef',
                    width: 125,
                    height: 35,
                    backgroundColor: '#fff',
                  }}>
                    <Picker style={{ marginTop: -10, marginStart: 10, color: '#5D6D7E', }}
                      selectedValue={selectedAuthor}
                      onValueChange={(itemValue) => setSelectedAuthor(itemValue)}
                    >
                      {authr.map((author, index) => (
                        <Picker.Item key={index} label={author} value={author} style={{
                          fontSize: 15,
                        }} />
                      ))}
                    </Picker>
                  </View>

                  <View style={{
                    marginLeft: 8,
                    marginTop: 5,
                    borderWidth: 1.5,
                    borderRadius: 20,
                    borderColor: '#efefef',
                    width: 150,
                    height: 35,
                    backgroundColor: '#fff',
                  }}>

                    <Picker style={{ marginTop: -10, marginStart: 10, color: '#5D6D7E', }}
                      selectedValue={selectedLanguage}
                      onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
                    >

                      {language.map((language, index) => (
                        <Picker.Item key={index} label={language} value={language} style={{
                          fontSize: 15,
                        }} />
                      ))}
                    </Picker>
                  </View>

                  <View style={{
                    marginLeft: 8,
                    marginTop: 5,
                    borderWidth: 1.5,
                    borderRadius: 20,
                    borderColor: '#efefef',
                    width: 130,
                    height: 35,
                    backgroundColor: '#fff',
                  }}>
                    <Picker style={{ marginTop: -10, marginStart: 10, color: '#5D6D7E', }}
                      selectedValue={selectedFormat}
                      onValueChange={(itemValue) => setSelectedFormat(itemValue)}
                    >
                      {formats.map((format, index) => (
                        <Picker.Item key={index} label={format.name} value={format.id} style={{
                          fontSize: 15,
                        }} />
                      ))}
                    </Picker>
                  </View>

                  <View style={{
                    marginLeft: 8,
                    marginTop: 5,
                    borderWidth: 1.5,
                    borderRadius: 20,
                    borderColor: '#efefef',
                    width: 130,
                    height: 35,
                    backgroundColor: '#fff',
                  }}>
                    <Picker style={{ marginTop: -10, marginStart: 10, color: '#5D6D7E', }}
                      selectedValue={selectedLibrary}
                      onValueChange={(itemValue) => setSelectedLibrary(itemValue)}
                    >
                      {libraries.map((library, index) => (
                        <Picker.Item key={library.id} label={library.name} value={library.id}
                          style={{
                            fontSize: 15,
                          }} />
                      ))}
                    </Picker>
                  </View>

                  <View>
                    <TouchableOpacity
                    onPress={() => {
                      handleClearAll();
                      setFilteredBooks(filterBybooks);
                    }}
                     >
                      <Text style={{
                        fontSize: 14,
                        marginTop: 13,
                        marginLeft: 10,
                        fontWeight: '500',
                        color: '#2980B9'
                      }}>Clear all</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>



            <View style={{
              marginTop: 30,
              marginStart: 20,
              paddingBottom:90
            }}>
              {filteredBooks.length > 0 ? (
              <FlatList
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                data={filteredBooks}
                // extraData={filteredBooks}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('BooksDetailPage', { data: item })}>
                    <View style={{
                      width: 150,
                      height: 310,
                      marginEnd: 20,
                      
                    }}>
                      <View style={{
                        borderRadius: 5,
                        color: '#000'
                      }}>
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
                          <Text style={[styles.bookPageLibText, {
                            marginLeft: -10,
                          }]}>Dindayal Upadhyay Library</Text>
                        ) : item.library_id === 222 ? (
                          <Text style={[styles.bookPageLibText, {
                            marginLeft: -12,
                          }]}>Kundanlal Gupta Library</Text>
                        ) : (
                          <Text style={[styles.bookPageLibText, {
                            marginLeft: -8,
                          }]}>Rashtramata Kasturba Library</Text>
                        )}

                        {item.items?.[0]?.format === 3 ? (
                          <Image source={require('../images/ebook.png')} style={styles.bookicon} />
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
                  <Text style={{ fontSize: 15, color: '#5D6D7E', fontWeight: '500', textAlign: 'center' }}>Not Available </Text>
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

