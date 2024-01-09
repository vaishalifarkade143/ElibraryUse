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
    const book = [...books];
    navigation.navigate('search', { genreList, book });
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








  // ==========================all books=========================

//=========================page wasn't refreshing on every click on book tab===============================
  // useEffect(() => {
  //   const getbooks = () => {
  //     fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books")
  //       .then(res => res.json())
  //       .then(responce => {
  //         setBooks(responce.data);
  //         // setFilteredBooks(responce.data);
  //         // setTotalBooksCount(responce.data.length); // Set the total count
  //         setisLoaded(false);
  //       });
  //   };


  //   const getbooks1 = () => {
  //     setPrevLimit(10);
  //     setPrevSkip(0);

  //     fetch(`https://dindayalupadhyay.smartcitylibrary.com/api/v1/books?order_by=name&direction=asc&limit=${prevLimit}&skip=${prevSkip}&search=&genre=&library_id=0&author=&publisher=&language=0&format=0`)
  //       .then(res => res.json())
  //       .then(responce => {
  //         setDetails(responce.data);
  //         setisLoaded(false);
  //       });
  //   };
  //   getbooks();
  //   getbooks1();
  // }, []);





//=========================page is refreshing on every click on book tab===============================
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const getBooks = async () => {
        try {
          setisLoaded(true);
          const response = await fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books");
          const data = await response.json();
          setBooks(data.data);
          setPrevLimit(10);
          setPrevSkip(0);
          const filteredResponse = await fetch(`https://dindayalupadhyay.smartcitylibrary.com/api/v1/books?order_by=name&direction=asc&limit=${prevLimit}&skip=${prevSkip}&search=&genre=&library_id=0&author=&publisher=&language=0&format=0`);
          const filteredData = await filteredResponse.json();
          setDetails(filteredData.data);

          setisLoaded(false);
        } catch (error) {
          console.error("Error fetching books:", error);
        }


      };

      getBooks();
    });
    return unsubscribe;
  }
    , [navigation]);



  // const loadMore = async() => {
  //   setPrevLimit(prevLimit + 10);
  //   setPrevSkip(prevSkip + 10);
  //   const resources = await axios.get(
  //     `https://dindayalupadhyay.smartcitylibrary.com/api/v1/books?order_by=name&direction=asc&limit=10&skip=10&search=&genre=0&library_id=0&author=0&publisher=0&language=0&format=0`
  //   );


  // fetch(
  //   "https://dindayalupadhyay.smartcitylibrary.com/api/v1/books?order_by=name&direction=asc&limit=10&skip=10&search=&genre=0&library_id=0&author=0&publisher=0&language=0&format=0")
  //   .then(res => res.json())
  //   .then(responce => {
  //     setDetails((oldDetails) => [...oldDetails, ...responce.data]);


  //   });
  //   setDetails((oldDetails) => [...oldDetails, ...resources.data.data]);
  // };





  // console.log(totalBooksCount);






  // ==========================working code for Filter books by selected genre ==========================
  // useEffect(() => {
  //   setCurrentPage(1);
  //   let filteredBooksCopy = [...books];
  //   if (selectedGenre !== "Genre") { // Make sure a genre is selected
  //     filteredBooksCopy = books.filter((book) =>
  //       book.genres.some((genr) => genr.name === selectedGenre)
  //     );
  //     console.log("single selected dropdown  by genre")
  //   }
  //   if (selectedAuthor !== "Author") { // Make sure a genre is selected
  //     filteredBooksCopy = books.filter((book) =>
  //       book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor)
  //     );
  //   }

  //   if (selectedPublisher !== "Publisher") { // Make sure a genre is selected
  //     filteredBooksCopy = books.filter((book) =>
  //       Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher)
  //     );
  //   }
  //   if (selectedLanguage !== "Language") {
  //     filteredBooksCopy = books.filter((book) =>
  //       Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage)
  //     );
  //   }
  //   if (selectedFormat !== "Format") {
  //     filteredBooksCopy = books.filter((book) =>
  //       Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat)
  //     );
  //   }
  //   if (selectedLibrary !== "Library") {
  //     filteredBooksCopy = books.filter((book) =>
  //       book.library_id === selectedLibrary
  //     );
  //   }


  //   setTotalBooksCount(filteredBooksCopy.length);

  //   setFilteredBooks(filteredBooksCopy);
  // }, [books, selectedGenre, selectedAuthor, selectedPublisher, selectedLanguage, selectedFormat, selectedLibrary]);


  // ===========================search ===============================

  const handleSearch = () => {
    setIsLoading(true);

    const filteredResults = books.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
    setIsLoading(false);

  };
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
    // Fetch the list of genres from your API
    fetch('https://dindayalupadhyay.smartcitylibrary.com/api/v1/genres?order_by=name&direction=asc')
      .then(response => response.json())
      .then(data => setGenr(["Genre", ...data.data.map(genres => genres.name)]))
      // Assuming the API response has a "data" field with an array of genres
      .catch(error => console.error('Error fetching genres:', error));
  }, []);

  useEffect(() => {
    // Fetch the list of authors from your API
    fetch('https://dindayalupadhyay.smartcitylibrary.com/api/v1/authors?order_by=first_name&direction=asc')
      .then(response => response.json())
      .then(data => setAuthr(["Author", ...data.data.map(authors => authors.first_name + "" + authors.last_name)])) // Assuming the API response has a "data" field with an array of genres
      .catch(error => console.error('Error fetching authors:', error));
  }, []);

  useEffect(() => {
    // Fetch the list of publishers from your API
    fetch('https://dindayalupadhyay.smartcitylibrary.com/api/v1/publishers?order_by=name&direction=asc')
      .then(response => response.json())
      .then(data => setPublishr(["Publisher", ...data.data.map(publisher => publisher.name)])) // Assuming the API response has a "data" field with an array of genres
      .catch(error => console.error('Error fetching publisher:', error));
  }, []);

  // Fetch the list of languages from your API
  useEffect(() => {
    fetch('https://dindayalupadhyay.smartcitylibrary.com/api/b1/book-languages?order_by=language_name&direction=asc')
      .then(response => response.json())
      .then(data => setLanguage(["Languages", ...data.data.map(language => language.language_name)])) // Assuming the API response has a "data" field with an array of genres
      .catch(error => console.error('Error fetching publisher:', error));
  }, []);




  // -------------------------All books dropdown===================
  const AllBooks = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);


    const loadMore = async () => {
      setPrevLimit(prevLimit + 10);
      setPrevSkip(prevSkip + 10);
      if (loadingMore) {
        return;
      }

      try {
        setLoadingMore(true);
        const nextPage = currentPage + 1;
        const response = await fetch(`https://dindayalupadhyay.smartcitylibrary.com/api/v1/books?order_by=name&direction=asc&limit=${prevLimit}&skip=${prevSkip}&search=&genre=&library_id=0&author=&publisher=&language=0&format=0`);
        const moreBooks = await response.json();
        setDetails((oldDetails) => [...oldDetails, ...moreBooks.data]);
        setCurrentPage(nextPage);
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
            <View style={{ flex: 1, 
            backgroundColor: theme === 'DARK' ? '#000' : '#fff' }}>

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
                        style={styles.categoryIcon}
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
                        style={styles.categoryIcon}
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
                        style={styles.categoryIcon}
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
                        style={styles.categoryIcon}
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
                        style={styles.categoryIcon}
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
                        style={styles.categoryIcon}
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
                  marginStart: 15,
                   backgroundColor: theme === 'DARK' ? '#000' : '#fff',
                }}>

                  <FlatList
                    numColumns={2}
                    // contentContainerStyle={{ columnGap: -10 }}
                    keyExtractor={(item, index) => index.toString()}
                    data={details}

                    renderItem={({ item, id }) =>

                      <TouchableOpacity onPress={() => {
                        navigation.navigate('BooksDetailPage', { data: item })
                      }}>

                        <View style={{
                          width: 155,
                          height: 290,
                          marginEnd: 20,
                        }}>
                          <View style={{
                            elevation: 5,
                            borderRadius: 5,
                            color: '#000'
                          }}>
                            <Image source={{ uri: item.image_path }}
                              style={styles.bookImage}
                            />
                            {/* ------------------code for book_item_status----------------------------- */}
                            {item.items[0].status === 1 ?
                              (<Text style={[styles.batch,
                              {
                                color: 'green',
                                backgroundColor: '#B6FFC0',
                                 borderColor: '#B6FFC0',
                              }]}>
                                Available</Text>) :
                              (<Text style={[styles.batch,
                              {
                                borderColor: '#CD6155',//#990000
                                color: '#990000',
                                backgroundColor: '#CD6155',
                              }]}>
                                Unavailable</Text>)}
                            {/* ================================================================================== */}
                          </View>

                          <View style={{ padding: 10, }}>
                            <Text style={styles.bookNameText} numberOfLines={1}>
                              {item.name}
                            </Text>
                            {item.library_id === 111 ?
                              (<Text
                                style={[styles.bookPageLibText, {
                                  marginLeft: -10,

                                }]}
                              >
                                Dindayal UpadhyayLibrary</Text>) :
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
                          </View>

                        </View>

                      </TouchableOpacity>

                    }
                    onEndReached={loadMore}
                    onEndReachedThreshold={1.0}
                  />
                  {/* <Button
                    title="Load More!"
                    onPress={() => loadMore()}
                  /> */}
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
              rightIcon={require('../images/Logoelibrary.png')}
              leftIcon={require('../images/menu.png')}
              onClickLeftIcon={() => {
                navigation.openDrawer();
              }}
            />

            {isLoaded ? (<ActivityIndicator
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
              size="large" color="#c27b7f" />) :
              (<View style={{ flex: 3 }}>
                <View style={styles.booksearchcontainer}>
                  <View style={styles.searchBar}>

                    <Feather name="search" color={"gray"} size={20} style={styles.searchIcon} />
                    <TextInput
                      style={styles.bookinput}
                      placeholderTextColor='#000'
                      placeholder="Search a Book"
                      spellCheck={false}
                      value={searchQuery}
                      onChangeText={(Text) => {
                        setSearchQuery(Text);
                        handleSearch();

                      }}
                    />

                    {searchQuery !== '' && (
                      <TouchableOpacity onPress={() => {
                        setSearchQuery('');
                        setSearchResults('');

                      }}>
                        <Feather name="x" color={"gray"} size={20} style={[styles.searchIcon, { marginLeft: 70 }]} />
                      </TouchableOpacity>)}

                  </View>
                </View>


                {/* Display search results */}
                {isLoading ?
                  (<Text style={styles.noBooksFound}>No books found</Text>) :

                  (<FlatList
                    style={{ marginBottom: 10, }}
                    keyExtractor={(item) => item.id.toString()}
                    data={searchResults}
                    ListFooterComponent={<AllBooks />}
                    renderItem={({ item }) => (

                      // Render each search result item here
                      <TouchableOpacity onPress={() =>
                        navigation.navigate('BooksDetailPage', { data: item })}>
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
                    ListEmptyComponent={
                      searchQuery !== '' ? (
                        <Text style={styles.noBooksFound}>No book found</Text>
                      ) : null
                    }
                  />
                  )}
              </View>
              )
            }
          </View>
        );
      }}
    </Theme>
  );
};



export default Books;



