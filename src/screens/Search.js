

import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import getStyles from '../Style/logNRegStyle';
import Theme from './Theme';

const Search = ({ route, navigation }) => {
  const { genreList, book, authorList, publisherList, languageList, formatList, libraryList } = route.params;
  const [selectedGenre, setSelectedGenre] = useState("Genre");
  const [selectedPublisher, setSelectedPublisher] = useState("Publisher");
  const [selectedAuthor, setSelectedAuthor] = useState("Author");
  const [selectedLanguage, setSelectedLanguage] = useState("Language");
  const [selectedFormat, setSelectedFormat] = useState("Format");
  const [selectedLibrary, setSelectedLibrary] = useState("Library");

  // Add state variables for genre filtering
  const [genreData, setGenreData] = useState('');
  const [genreClicked, setGenreClicked] = useState(false);
  const [genreSearch, setGenreSearch] = useState('');
  const [genSearchResults, setGenSearchResults] = useState('');


  // Add state variables for author filtering
  const [authorData, setAuthorData] = useState('');
  const [authorClicked, setAuthorClicked] = useState(false);
  const [authorSearch, setAuthorSearch] = useState('');

  // Add state variables for genre filtering
  const [publisherData, setPublisherData] = useState('');
  const [publisherClicked, setPublisherClicked] = useState(false);
  const [publisherSearch, setPublisherSearch] = useState('');

  // Add state variables for genre filtering
  const [languageData, setLanguageData] = useState('');
  const [languageClicked, setLanguageClicked] = useState(false);
  const [languageSearch, setLanguageSearch] = useState('');
  const [languageSearchResults, setLanguageSearchResults] = useState('');


  // Add state variables for genre filtering
  const [formatData, setFormatData] = useState([]);
  const [formatClicked, setFormatClicked] = useState(false);
  const [formatSearch, setFormatSearch] = useState('');
  const [formatSearchResults, setFormatSearchResults] = useState('');

  // Add state variables for genre filtering
  const [libData, setLibData] = useState([]);
  const [libClicked, setLibClicked] = useState(false);
  const [libSearch, setLibSearch] = useState('');
  const [libSearchResults, setLibSearchResults] = useState('');

  const [books, setBooks] = useState([]);
  const [isLoaded, setisLoaded] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState([]);



  useEffect(() => {
    // const unsubscribe = navigation.addListener('focus', () => {
    const getBooks = async () => {
      try {
        const response = await fetch(`https://dindayalupadhyay.smartcitylibrary.com/api/v1/books?order_by=created_at&limit=&search=&genre=&library_id=111&author=&publisher=&language=&format=`);
        const data = await response.json();
        setBooks(data.data);
        setisLoaded(true);
      }
      catch (error) {
        console.error("Error fetching books:", error);
      }


    };

    getBooks();
    // });
    // return unsubscribe;
  }
    , []);
  // console.log(books);



  const filteredGenResults = (item) => {
    console.log('genre', item);
    let filteredGenre = item !== 'Genre' ? (books.filter((book) =>
      book.genres.some((genr) => genr.name === item)
    )) : [];
    navigation.navigate('filterData', { filteredGenre, books });
  }


  const filteredAuthResults = (item) => {
    let filteredAuthor = item !== 'Author' ? (books.filter((book) =>
      book.authors.some((authr) => authr.first_name + "" + authr.last_name === item)
    )) : [];
    navigation.navigate('filterData', { filteredAuthor, books });
  }


  const filteredPublishResults = (item) => {
    console.log(item);
    let filteredPublisher = item !== 'Publisher' ? (books.filter((book) =>
      Array.isArray(book.items) &&
      book.items.some((item1) => item1.publisher && item1.publisher.name === item)
    )) : [];
    navigation.navigate('filterData', { filteredPublisher, books });
  }



  const filteredLangResults = (item) => {
    let filteredLanguage = item !== 'Languages' ? (books.filter((book) =>
      Array.isArray(book.items) && book.items.some((item1) => item1.language.language_name === item)
    )) : [];
    navigation.navigate('filterData', { filteredLanguage, books });
  }



  const filteredformResults = (item) => {
    console.log(item);

    let filteredFormat = item !== 'Format' ? (books.filter((book) =>
      Array.isArray(book.items) && book.items.some((item1) => item1.format === item)
    )) : [];
    navigation.navigate('filterData', { filteredFormat, books });
  }

  const filteredLibResults = (item) => {
    let filteredLibrary = item !== 'Library' ? (books.filter((book) =>
      book.library_id === item
    )) : [];
    navigation.navigate('filterData', { filteredLibrary, books });
  }




  // ===================to get list OF category===============
  useEffect(() => {
    const receivedGenreList = route.params?.genreList || [];
    setGenreData(
      receivedGenreList.map((genre) => ({ id: genre, name: genre }))
    );
  }, [route.params?.genreList]);

  useEffect(() => {
    const receivedAuthorList = route.params?.authorList || [];
    setAuthorData(
      receivedAuthorList.map((author) => ({ id: author, name: author }))
    );
  }, [route.params?.authorList]);

  useEffect(() => {
    const receivedPublisherList = route.params?.publisherList || [];
    setPublisherData(
      receivedPublisherList.map((publisher) => ({ id: publisher, name: publisher }))
    );
  }, [route.params?.publisherList]);

  useEffect(() => {
    const receivedLanguageList = route.params?.languageList || [];
    setLanguageData(
      receivedLanguageList.map((language) => ({ id: language, name: language }))
    );
  }, [route.params?.languageList]);

  useEffect(() => {
    const receivedFormatList = route.params?.formatList || [];
    setFormatData(
      receivedFormatList.map((format) => ({ id: format.id, name: format.name }))
    );
  }, [route.params?.formatList]);

  useEffect(() => {
    const receivedLibraryList = route.params?.libraryList || [];
    setLibData(
      receivedLibraryList.map((library) => ({ id: library.id, name: library.name }))
    );
  }, [route.params?.libraryList]);








  // ================================search result===================================
  const searchRef = useRef();
  const onSearch = (search, type) => {
    if (search !== "") {
      if (type === "genre") {
        let tempData = genreList.filter(
          (item) => item.toLowerCase().indexOf(search.toLowerCase()) > -1
        );
        setGenSearchResults(tempData.map((genre) => ({ id: genre, name: genre })));
      }
      else if (type === 'author') {
        let tempauthor = authorList.filter(
          (item) => item.toLowerCase().indexOf(search.toLowerCase()) > -1
        );
        setAuthorData(tempauthor.map(author => ({ id: author, name: author })));
      }
      else if (type === 'publisher') {
        let temppublish = publisherList.filter(
          (item) => item.toLowerCase().indexOf(search.toLowerCase()) > -1
        );
        setPublisherData(temppublish.map(publisher => ({ id: publisher, name: publisher })));
      }
      else if (type === 'language') {
        let templang = languageList.filter(
          (item) => item.toLowerCase().indexOf(search.toLowerCase()) > -1
        );
        setLanguageSearchResults(templang.map(language => ({ id: language, name: language })));
      }
      else if (type === 'format') {
        let tempformat = formatList.filter(
          (item) => item.name.toLowerCase().indexOf(search.toLowerCase()) > -1
        );
        setFormatSearchResults(tempformat.map(format => ({ id: format.id, name: format.name })));
      }
      else if (type === 'library') {
        let templib = libraryList.filter(
          (item) => item.name.toLowerCase().indexOf(search.toLowerCase()) > -1
        );
        setLibSearchResults(templib.map(library => ({ id: library.id, name: library.name })));
      }

    }
  };




  return (
    <Theme>
      {({ theme }) => {
        const styles = getStyles(theme);
        return (
          <View style={styles.container}>

            {route.params?.genreList &&
              (<View style={{ flex: 1 }}>
                <TextInput
                  placeholder="Search.."
                  value={genreSearch}
                  ref={searchRef}
                  onChangeText={txt => {
                    onSearch(txt, 'genre');
                    setGenreSearch(txt);
                  }}
                  style={{
                    width: '90%',
                    height: 65,
                    alignSelf: 'center',
                    borderWidth: 0.2,
                    borderColor: '#8e8e8e',
                    borderRadius: 7,
                    marginTop: 20,
                    paddingLeft: 20,
                  }}
                />
                {isLoaded ?

                  (<FlatList
                    data={genreSearch == '' ? genreData : genSearchResults}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => {
                      return (


                        <TouchableOpacity
                          style={{
                            width: '85%',
                            alignSelf: 'center',
                            height: 50,
                            justifyContent: 'center',
                            borderBottomWidth: 0.5,
                            borderColor: '#8e8e8e',
                          }}
                          onPress={() => {

                            setSelectedGenre(item.name);
                            onSearch('', 'genre');
                            setGenreSearch('');
                            filteredGenResults(item.name);
                          }}
                        >

                          <Text style={{ fontWeight: "600" }}>{item.name}</Text>
                        </TouchableOpacity>

                      );
                    }}
                  />) : (<ActivityIndicator
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    size="large" color="#c27b7f"
                  />)}
              </View>)
            }



            {route.params?.authorList &&
              (<View style={{ flex: 1 }}>
                <TextInput
                  placeholder="Search.."
                  value={authorSearch}
                  ref={searchRef}
                  onChangeText={txt => {
                    onSearch(txt, 'author');
                    setAuthorSearch(txt);
                  }}
                  style={{
                    width: '90%',
                    height: 65,
                    alignSelf: 'center',
                    borderWidth: 0.2,
                    borderColor: '#8e8e8e',
                    borderRadius: 7,
                    marginTop: 20,
                    paddingLeft: 20,
                  }}
                />
                {isLoaded ?

                  (<FlatList
                    data={authorData}
                    keyExtractor={(item, index) => item.id + index}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          style={{
                            width: '85%',
                            alignSelf: 'center',
                            height: 50,
                            justifyContent: 'center',
                            borderBottomWidth: 0.5,
                            borderColor: '#8e8e8e',
                          }}
                          onPress={() => {
                            setSelectedAuthor(item.name);
                            setAuthorClicked(!authorClicked);
                            onSearch('', 'author');
                            setAuthorSearch('');
                            filteredAuthResults(item.name);
                          }}
                        >
                          <Text style={{ fontWeight: "600" }}>{item.name}</Text>
                        </TouchableOpacity>
                      );
                    }}
                  />) : (<ActivityIndicator
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    size="large" color="#c27b7f"
                  />)}
              </View>
              )}





            {route.params?.publisherList &&
              (<View style={{ flex: 1 }}>
                <TextInput
                  placeholder="Search.."
                  value={publisherSearch}
                  ref={searchRef}
                  onChangeText={txt => {
                    onSearch(txt, 'publisher');
                    setPublisherSearch(txt);
                  }}
                  style={{
                    width: '90%',
                    height: 65,
                    alignSelf: 'center',
                    borderWidth: 0.2,
                    borderColor: '#8e8e8e',
                    borderRadius: 7,
                    marginTop: 20,
                    paddingLeft: 20,
                  }}
                />
                {isLoaded ?

                  (<FlatList
                    data={publisherData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          style={{
                            width: '85%',
                            alignSelf: 'center',
                            height: 50,
                            justifyContent: 'center',
                            borderBottomWidth: 0.5,
                            borderColor: '#8e8e8e',
                          }}
                          onPress={() => {
                            setSelectedPublisher(item.name);
                            setPublisherClicked(!publisherClicked);
                            onSearch('', 'publisher');
                            setPublisherSearch('');
                            filteredPublishResults(item.name);
                          }}
                        >
                          <Text style={{ fontWeight: '600' }}>{item.name}</Text>
                        </TouchableOpacity>
                      );
                    }}
                  />) : (<ActivityIndicator
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    size="large" color="#c27b7f"
                  />)}
              </View>
              )}

            {route.params?.languageList &&
              (<View style={{ flex: 1 }}>
                <TextInput
                  placeholder="Search.."
                  value={languageSearch}
                  ref={searchRef}
                  onChangeText={txt => {
                    onSearch(txt, 'language');
                    setLanguageSearch(txt);
                  }}
                  style={{
                    width: '90%',
                    height: 65,
                    alignSelf: 'center',
                    borderWidth: 0.2,
                    borderColor: '#8e8e8e',
                    borderRadius: 7,
                    marginTop: 20,
                    paddingLeft: 20,
                  }}
                />
                {isLoaded ?
                  (<FlatList
                    data={languageSearch == '' ? languageData : languageSearchResults}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          style={{
                            width: '85%',
                            alignSelf: 'center',
                            height: 50,
                            justifyContent: 'center',
                            borderBottomWidth: 0.5,
                            borderColor: '#8e8e8e',
                          }}
                          onPress={() => {
                            setSelectedLanguage(item.name);
                            setLanguageClicked(!languageClicked);
                            onSearch('', 'language');
                            setLanguageSearch('');
                            filteredLangResults(item.name);
                          }}
                        >
                          <Text style={{ fontWeight: '600' }}>{item.name}</Text>
                        </TouchableOpacity>
                      );
                    }}
                  />) : (<ActivityIndicator
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    size="large" color="#c27b7f"
                  />)}
              </View>
              )}

            {route.params?.formatList &&
              (<View style={{ flex: 1 }}>
                <TextInput
                  placeholder="Search.."
                  value={formatSearch}
                  ref={searchRef}
                  onChangeText={txt => {
                    onSearch(txt, 'format');
                    setFormatSearch(txt);
                  }}
                  style={{
                    width: '90%',
                    height: 65,
                    alignSelf: 'center',
                    borderWidth: 0.2,
                    borderColor: '#8e8e8e',
                    borderRadius: 7,
                    marginTop: 20,
                    paddingLeft: 20,
                  }}
                />
                {isLoaded ?

                  (<FlatList
                    data={formatSearch == '' ? formatData : formatSearchResults}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          style={{
                            width: '85%',
                            alignSelf: 'center',
                            height: 50,
                            justifyContent: 'center',
                            borderBottomWidth: 0.5,
                            borderColor: '#8e8e8e',
                          }}
                          onPress={() => {
                            setSelectedFormat(item.name);
                            setFormatClicked(!formatClicked);
                            onSearch('', 'format');
                            setFormatSearch('');
                            filteredformResults(item.id);
                          }}
                        >
                          <Text style={{ fontWeight: '600' }}>{item.name}</Text>
                        </TouchableOpacity>
                      );
                    }}
                  />) : (<ActivityIndicator
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    size="large" color="#c27b7f"
                  />)}
              </View>
              )}





            {route.params?.libraryList &&
              (<View style={{ flex: 1 }}>
                <TextInput
                  placeholder="Search.."
                  value={libSearch}
                  ref={searchRef}
                  onChangeText={txt => {
                    onSearch(txt, 'library');
                    setLibSearch(txt);
                  }}
                  style={{
                    width: '90%',
                    height: 65,
                    alignSelf: 'center',
                    borderWidth: 0.2,
                    borderColor: '#8e8e8e',
                    borderRadius: 7,
                    marginTop: 20,
                    paddingLeft: 20,
                  }}
                />
                {isLoaded ?
                  (<FlatList
                    data={libSearch == '' ? libData : libSearchResults}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          style={{
                            width: '85%',
                            alignSelf: 'center',
                            height: 50,
                            justifyContent: 'center',
                            borderBottomWidth: 0.5,
                            borderColor: '#8e8e8e',
                          }}
                          onPress={() => {
                            setSelectedLibrary(item.name);
                            setLibClicked(!libClicked);
                            onSearch('', 'library');
                            setLibClicked('');
                            filteredLibResults(item.id);
                          }}
                        >
                          <Text style={{ fontWeight: '600' }}>{item.name}</Text>
                        </TouchableOpacity>
                      );
                    }}
                  />) : (<ActivityIndicator
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    size="large" color="#c27b7f"
                  />)}
              </View>
              )}

          </View>
        );
      }}
    </Theme>
  );
};




export default Search;