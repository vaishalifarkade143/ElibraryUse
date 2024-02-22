import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ScrollView, } from 'react-native';
import getStyles from '../Style/logNRegStyle';
import Theme from './Theme';
import Header from '../common/Header';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

const FilterDataBooks = ({ navigation }) => {
    const [filterBybooks, setFilterByBooks] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(0);
    const [genr, setGenr] = useState([]);
    const [selectedPublisher, setSelectedPublisher] = useState(0);
    const [publishr, setPublishr] = useState([]);
    const [selectedAuthor, setSelectedAuthor] = useState(0);
    const [authr, setAuthr] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState(0);
    const [language, setLanguage] = useState([]);
    const [selectedFormat, setSelectedFormat] = useState(0);
    const [selectedLibrary, setSelectedLibrary] = useState(111);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState(0);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQueryauthor, setSearchQueryauthor] = useState(0);
    const [searchResultsauthor, setSearchResultsauthor] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
  
  
    useEffect(() => {
     
      /* &author=${searchQueryauthor}&publisher=${selectedPublisher}&language=${selectedLanguage} */
  
      fetch(
        `https://dindayalupadhyay.smartcitylibrary.com/api/v1/books?order_by=created_at&genre=${searchQuery}
        &author=${searchQueryauthor}&library_id=${selectedLibrary}&format=${selectedFormat}&for_featured_books=true&limit=20`,
      )
        .then(res => res.json())
        .then(respo => {
          setFilterByBooks(respo.data);
          setIsLoading(false);
        });
    }, [
      searchQuery,
      searchQueryauthor,
      selectedPublisher,
      selectedLanguage,
      selectedFormat,
      selectedLibrary,
      isLoading,
    ]);
  
    // ==============================static dropdown===================================
    const formats = [
      { id: 'format', name: 'Format' },
      { id: 1, name: 'Hardcover' },
      { id: 2, name: 'PaparBack' },
      { id: 3, name: 'E-Book' },
    ];
    const libraries = [
      { id: 'library', name: 'Library' },
      { id: 111, name: 'Dindayal Upadhyay Library' },
      { id: 222, name: 'Kundanlal Gupta Library' },
      { id: 333, name: 'Rashtramata Kasturba Library' },
    ];
  
    // ===================== fetching data for dynamic dropdown ================================================
    useEffect(() => {
      fetch(
        'https://dindayalupadhyay.smartcitylibrary.com/api/v1/genres?order_by=name&direction=asc&search=&limit=',
      )
        .then(response => response.json())
        .then(data => {
          setGenr(['Genre', ...data.data.map(genres => genres.name)]);
        })
        .catch(error => console.error('Error fetching genres:', error));
    }, []);
  
    useEffect(() => {
      fetch(
        'https://dindayalupadhyay.smartcitylibrary.com/api/v1/authors?search=&limit=&order_by=first_name&direction=asc',
      )
        .then(response => response.json())
        .then(data =>
          setAuthr([
            'Author',
            ...data.data.map(
              authors => authors.first_name + ' ' + authors.last_name,
            ),
          ]),
        ) 
        .catch(error => console.error('Error fetching authors:', error));
    }, []);
  
    useEffect(() => {
      fetch(
        'https://dindayalupadhyay.smartcitylibrary.com/api/v1/publishers?order_by=name&direction=asc',
        
      )
        .then(response => response.json())
        .then(data =>
          setPublishr([
            'Publisher',
            ...data.data.map(publisher => publisher.name),
          ]),
        ) // Assuming the API response has a "data" field with an array of genres
        .catch(error => console.error('Error fetching publisher:', error));
    }, []);
    
    useEffect(() => {
      fetch(
        'https://dindayalupadhyay.smartcitylibrary.com/api/b1/book-languages?order_by=created_at&direction=asc',
      )
        .then(response => response.json())
        .then(data =>
          setLanguage([
            'Languages',
            ...data.data.map(language => language.language_name),
          ]),
        )
        .catch(error => console.error('Error fetching publisher:', error));
    }, []);
  
  
    const handleSearch = text => {
      setIsLoading(true);
      const filteredResults = genr.filter(item =>
        item.toLowerCase().includes(text.toLowerCase()),
      );
      setSearchResults(filteredResults);
      setIsLoading(false);
    };
  
    const handleGenreSelection = itemValue => {
      setSearchQuery(itemValue); 
      handleSearch(itemValue); 
    };
  
  
    const handleSearchAuthor = text => {
      setIsLoading(true);
      const filteredAuthorResults = authr.filter(item =>
        item.toLowerCase().includes(text.toLowerCase()),
      );
     
      setSearchResultsauthor(filteredAuthorResults);
      console.log('Filtered Author Results:', filteredAuthorResults);
      setIsLoading(false);
    };
    console.log('Filtered Author searchQueryauthor:', searchResultsauthor);
  
    const handleAuthorSelection = itemValue => {
      setSearchQueryauthor(itemValue); 
      handleSearchAuthor(itemValue);
    };
  
  
  
    const renderItem = ({ item }) => (
      <View style={{ elevation: 0.5 }}>
        <TouchableOpacity
          onPress={() => {
            handleGenreSelection(item);
            setSearchResults([]);
          }}>
          <Text style={{ fontSize: 15, textAlign: 'center' }}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  
    const renderItemAuthor = ({ item }) => (
      <View style={{ elevation: 0.5 }}>
        <TouchableOpacity
          onPress={() => {
            handleAuthorSelection(item);
            setSearchResultsauthor([]);
          }}>
          <Text style={{ fontSize: 15, textAlign: 'center' }}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  
    const handleClearAll = () => {
      setSearchQuery(0); // Reset search query
      setSearchResults([]);
      setSearchQueryauthor(0); // Reset search query
      setSearchResultsauthor([]);
      setSelectedAuthor(0);
      setSelectedFormat(0);
      setSelectedGenre(0);
      setSelectedLanguage(0);
      setSelectedLibrary(111);
      setSelectedPublisher(0);
      setIsLoading(true);
    };
    // ============================== working code for Filter  ==========================
  
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
                  horizontal={true}
                  contentContainerStyle={{ columnGap: -10 }}
                  showsHorizontalScrollIndicator={false}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 20,
                      marginRight: 20,
                    }}>
  
                    {/* =====================search================================= */}
  
                    <View>
                      <View
                        style={{
                          marginTop: 5,
                          borderWidth: 1.5,
                          borderRadius: 20,
                          borderColor: '#efefef',
                          height: 35,
                          marginRight: 5,
                          backgroundColor: '#fff',
                          flexDirection: 'row',
                        }}>
                        <Feather
                          name="search"
                          color={'gray'}
                          size={15}
                          style={{ marginLeft: 12, marginTop: 9, marginRight: 5 }}
                        />
                        <TextInput
                          style={{
                            marginBottom: -5,
                            fontSize: 15,
                            marginRight: 15,
                          }}
                          placeholder="Genre.."
                          value={searchQuery}
                          onChangeText={text => {
                            setSearchQuery(text);
                            handleSearch(text);
                          }}
                        />
                      </View>
                      <FlatList
                        style={{ borderColor: '#efefef', borderWidth: 0.5 }}
                        data={searchResults}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItem}
                      />
                    </View>
  
                    <View>
                      <View
                        style={{
                          marginTop: 5,
                          borderWidth: 1.5,
                          borderRadius: 20,
                          borderColor: '#efefef',
                          height: 35,
                          marginRight: 5,
                          backgroundColor: '#fff',
                          flexDirection: 'row',
                        }}>
                        <Feather
                          name="search"
                          color={'gray'}
                          size={15}
                          style={{ marginLeft: 12, marginTop: 9, marginRight: 5 }}
                        />
                        <TextInput
                          style={{
                            marginBottom: -5,
                            fontSize: 15,
                            marginRight: 15,
                          }}
                          placeholder="Author.."
                          value={searchQueryauthor}
                          onChangeText={text => {
                            setSearchQueryauthor(text);
                            handleSearchAuthor(text);
                          }}
                        />
                      </View>
                      <FlatList
                        style={{ borderColor: '#efefef', borderWidth: 0.5 }}
                        data={searchResultsauthor}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItemAuthor}
                      />
                    </View>
  
                    {/* ===========================pickers=========================== */}
                    <View
                      style={{
                        marginLeft: 8,
                        marginTop: 5,
                        borderWidth: 1.5,
                        borderRadius: 20,
                        borderColor: '#efefef',
                        width: 140,
                        height: 35,
                        backgroundColor: '#fff',
                      }}>
                      <Picker
                        style={{
                          marginTop: -10,
                          marginStart: 10,
                          color: '#5D6D7E',
                        }}
                        selectedValue={selectedPublisher}
                        onValueChange={itemValue =>
                          setSelectedPublisher(itemValue)
                        }>
                        {publishr.map((publishers, index) => (
                          <Picker.Item
                            key={index}
                            label={publishers}
                            value={publishers}
                            style={{
                              fontSize: 15,
                            }}
                          />
                        ))}
                      </Picker>
                    </View>
  
                    <View
                      style={{
                        marginLeft: 8,
                        marginTop: 5,
                        borderWidth: 1.5,
                        borderRadius: 20,
                        borderColor: '#efefef',
                        width: 150,
                        height: 35,
                        backgroundColor: '#fff',
                      }}>
                      <Picker
                        style={{
                          marginTop: -10,
                          marginStart: 10,
                          color: '#5D6D7E',
                        }}
                        selectedValue={selectedLanguage}
                        onValueChange={itemValue =>
                          setSelectedLanguage(itemValue)
                        }>
                        {language.map((language, index) => (
                          <Picker.Item
                            key={index}
                            label={language}
                            value={language}
                            style={{
                              fontSize: 15,
                            }}
                          />
                        ))}
                      </Picker>
                    </View>
  
                    <View
                      style={{
                        marginLeft: 8,
                        marginTop: 5,
                        borderWidth: 1.5,
                        borderRadius: 20,
                        borderColor: '#efefef',
                        width: 130,
                        height: 35,
                        backgroundColor: '#fff',
                      }}>
                      <Picker
                        style={{
                          marginTop: -10,
                          marginStart: 10,
                          color: '#5D6D7E',
                        }}
                        selectedValue={selectedFormat}
                        onValueChange={itemValue => setSelectedFormat(itemValue)}>
                        {formats.map((format, index) => (
                          <Picker.Item
                            key={index}
                            label={format.name}
                            value={format.id}
                            style={{
                              fontSize: 15,
                            }}
                          />
                        ))}
                      </Picker>
                    </View>
  
                    <View
                      style={{
                        marginLeft: 8,
                        marginTop: 5,
                        borderWidth: 1.5,
                        borderRadius: 20,
                        borderColor: '#efefef',
                        width: 130,
                        height: 35,
                        backgroundColor: '#fff',
                      }}>
                      <Picker
                        style={{
                          marginTop: -10,
                          marginStart: 10,
                          color: '#5D6D7E',
                        }}
                        selectedValue={selectedLibrary}
                        onValueChange={itemValue =>
                          setSelectedLibrary(itemValue)
                        }>
                        {libraries.map((library, index) => (
                          <Picker.Item
                            key={library.id}
                            label={library.name}
                            value={library.id}
                            style={{
                              fontSize: 15,
                            }}
                          />
                        ))}
                      </Picker>
                    </View>
  
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          handleClearAll();
                          setFilterByBooks([]);
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            marginTop: 13,
                            marginLeft: 10,
                            fontWeight: '500',
                            color: '#2980B9',
                          }}>
                          Clear all
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>
              </View>
  
              <View
                style={{
                  marginTop: 30,
                  marginStart: 20,
                  paddingBottom: 90,
                }}>
                {filterBybooks ? (
                  <FlatList
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    data={filterBybooks}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('BooksDetailPage', { data: item })
                        }>
                        <View
                          style={{
                            width: 150,
                            height: 310,
                            marginEnd: 20,
                          }}>
                          <View
                            style={{
                              borderRadius: 5,
                              color: '#000',
                            }}>
                            <Image
                              source={{ uri: item.image_path }}
                              style={styles.bookImage}
                            />
                          </View>
  
                          <View style={{ padding: 10 }}>
                            <Text style={styles.bookNameText} numberOfLines={1}>
                              {item.name}
                            </Text>
                            {item.library_id === 111 ? (
                              <Text
                                style={[
                                  styles.bookPageLibText,
                                  {
                                    marginLeft: -10,
                                  },
                                ]}>
                                Dindayal Upadhyay Library
                              </Text>
                            ) : item.library_id === 222 ? (
                              <Text
                                style={[
                                  styles.bookPageLibText,
                                  {
                                    marginLeft: -12,
                                  },
                                ]}>
                                Kundanlal Gupta Library
                              </Text>
                            ) : (
                              <Text
                                style={[
                                  styles.bookPageLibText,
                                  {
                                    marginLeft: -8,
                                  },
                                ]}>
                                Rashtramata Kasturba Library
                              </Text>
                            )}
  
                            {item.items?.[0]?.format === 3 ? (
                              <Image
                                source={require('../images/ebook.png')}
                                style={styles.bookicon}
                              />
                            ) : (
                              <Image
                                source={require('../images/bookfill.png')}
                                style={styles.bookicon}
                              />
                            )}
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                ) : (
                  <FlatList
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    data={filteredBooks}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('BooksDetailPage', { data: item })
                        }>
                        <View
                          style={{
                            width: 150,
                            height: 310,
                            marginEnd: 20,
                          }}>
                          <View
                            style={{
                              borderRadius: 5,
                              color: '#000',
                            }}>
                            <Image
                              source={{ uri: item.image_path }}
                              style={styles.bookImage}
                            />
                          </View>
  
                          <View style={{ padding: 10 }}>
                            <Text style={styles.bookNameText} numberOfLines={1}>
                              {item.name}
                            </Text>
                            {item.library_id === 111 ? (
                              <Text
                                style={[
                                  styles.bookPageLibText,
                                  {
                                    marginLeft: -10,
                                  },
                                ]}>
                                Dindayal Upadhyay Library
                              </Text>
                            ) : item.library_id === 222 ? (
                              <Text
                                style={[
                                  styles.bookPageLibText,
                                  {
                                    marginLeft: -12,
                                  },
                                ]}>
                                Kundanlal Gupta Library
                              </Text>
                            ) : (
                              <Text
                                style={[
                                  styles.bookPageLibText,
                                  {
                                    marginLeft: -8,
                                  },
                                ]}>
                                Rashtramata Kasturba Library
                              </Text>
                            )}
  
                            {item.items?.[0]?.format === 3 ? (
                              <Image
                                source={require('../images/ebook.png')}
                                style={styles.bookicon}
                              />
                            ) : (
                              <Image
                                source={require('../images/bookfill.png')}
                                style={styles.bookicon}
                              />
                            )}
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                )}
              </View>
            </View>
          );
        }}
      </Theme>
    );
  };

export default FilterDataBooks