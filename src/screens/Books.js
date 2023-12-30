import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity, Text, FlatList, Image, ActivityIndicator, VirtualizedList, Dimensions, ImageBackground, Modal } from "react-native";
import { Picker } from '@react-native-picker/picker';
import Feather from 'react-native-vector-icons/Feather';
import Header from "../common/Header";
import Pagination from "../components/pagination";
import getStyles from '../Style/logNRegStyle';
import Theme from './Theme';


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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [totalBooksCount, setTotalBooksCount] = useState(0);



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


  useEffect(() => {
    const getbooks = () => {
      fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books")
        .then(res => res.json())
        .then(responce => {
          setBooks(responce.data);
          setFilteredBooks(responce.data);
          setTotalBooksCount(responce.data.length); // Set the total count
          setisLoaded(false);
        });
    };
    getbooks();
  }, []);


  // ==========================working code for Filter books by selected genre ==========================
  useEffect(() => {
    setCurrentPage(1);
    let filteredBooksCopy = [...books];
    if (selectedGenre !== "Genre") { // Make sure a genre is selected
      filteredBooksCopy = books.filter((book) =>
        book.genres.some((genr) => genr.name === selectedGenre)
      );
      console.log("single selected dropdown  by genre")
    }
    if (selectedAuthor !== "Author") { // Make sure a genre is selected
      filteredBooksCopy = books.filter((book) =>
        book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor)
      );
    }

    if (selectedPublisher !== "Publisher") { // Make sure a genre is selected
      filteredBooksCopy = books.filter((book) =>
        Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher)
      );
    }
    if (selectedLanguage !== "Language") {
      filteredBooksCopy = books.filter((book) =>
        Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage)
      );
    }
    if (selectedFormat !== "Format") {
      filteredBooksCopy = books.filter((book) =>
        Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat)
      );
    }
    if (selectedLibrary !== "Library") {
      filteredBooksCopy = books.filter((book) =>
        book.library_id === selectedLibrary
      );
    }

    // double selected dropdown by genre
    // if (selectedGenre !== "Genre" && selectedAuthor !== "Author") { // Make sure a genre is selected
    //   filteredBooksCopy = books.filter((book) =>
    //     book.genres.some((genr) => genr.name === selectedGenre) &&
    //     book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor)
    //   );
    // }
    // if (selectedGenre !== "Genre" && selectedPublisher !== "Publisher") {
    //   filteredBooksCopy = books.filter((book) =>
    //     book.genres.some((genr) => genr.name === selectedGenre) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher)
    //   );
    // }
    // if (selectedGenre !== "Genre" && selectedLanguage !== "Language") {
    //   filteredBooksCopy = books.filter((book) =>
    //     book.genres.some((genr) => genr.name === selectedGenre) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage)
    //   );
    // }
    // if (selectedGenre !== "Genre" && selectedFormat !== "Format") {
    //   filteredBooksCopy = books.filter((book) =>
    //     book.genres.some((genr) => genr.name === selectedGenre) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat)
    //   );
    // }
    // if (selectedGenre !== "Genre" && selectedLibrary !== "Library") {
    //   filteredBooksCopy = books.filter((book) =>
    //     book.genres.some((genr) => genr.name === selectedGenre) &&
    //     book.library_id === selectedLibrary
    //   );
    // }


    // // //three selected dropdown by genre
    // if (selectedGenre !== "Genre" && selectedAuthor !== "Author" && selectedPublisher !== "Publisher") { // Make sure a genre is selected
    //   filteredBooksCopy = books.filter((book) =>
    //     book.genres.some((genr) => genr.name === selectedGenre) &&
    //     book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher)
    //   );
    // }
    // if (selectedGenre !== "Genre" && selectedAuthor !== "Author" && selectedLanguage !== "Language") { // Make sure a genre is selected
    //   filteredBooksCopy = books.filter((book) =>
    //     book.genres.some((genr) => genr.name === selectedGenre) &&
    //     book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage)
    //   );
    // }
    // if (selectedGenre !== "Genre" && selectedAuthor !== "Author" && selectedFormat !== "Format") { // Make sure a genre is selected
    //   filteredBooksCopy = books.filter((book) =>
    //     book.genres.some((genr) => genr.name === selectedGenre) &&
    //     book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat)
    //   );
    // }
    // if (selectedGenre !== "Genre" && selectedAuthor !== "Author" && selectedLibrary !== "Library") { // Make sure a genre is selected
    //   filteredBooksCopy = books.filter((book) =>
    //     book.genres.some((genr) => genr.name === selectedGenre) &&
    //     book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
    //     book.library_id === selectedLibrary
    //   );
    // }

    // if (selectedGenre !== "Genre" && selectedPublisher !== "Publisher" && selectedLanguage !== "Language") { // Make sure a genre is selected
    //   filteredBooksCopy = books.filter((book) =>
    //     book.genres.some((genr) => genr.name === selectedGenre) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage)
    //   );
    // }
    // if (selectedGenre !== "Genre" && selectedPublisher !== "Publisher" && selectedFormat !== "Format") { // Make sure a genre is selected
    //   filteredBooksCopy = books.filter((book) =>
    //     book.genres.some((genr) => genr.name === selectedGenre) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat)
    //   );
    // }
    // if (selectedGenre !== "Genre" && selectedPublisher !== "Publisher" && selectedLibrary !== "Library") { // Make sure a genre is selected
    //   filteredBooksCopy = books.filter((book) =>
    //     book.genres.some((genr) => genr.name === selectedGenre) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
    //     book.library_id === selectedLibrary
    //   );
    // }

    // if (selectedGenre !== "Genre" && selectedLanguage !== "Language" && selectedLibrary !== "Library") { // Make sure a genre is selected
    //   filteredBooksCopy = books.filter((book) =>
    //     book.genres.some((genr) => genr.name === selectedGenre) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
    //     book.library_id === selectedLibrary
    //   );
    // }
    // if (selectedGenre !== "Genre" && selectedLanguage !== "Language" && selectedFormat !== "Format") { // Make sure a genre is selected
    //   filteredBooksCopy = books.filter((book) =>
    //     book.genres.some((genr) => genr.name === selectedGenre) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat)
    //   );
    // }

    // if (selectedGenre !== "Genre" && selectedFormat !== "Format" && selectedLibrary !== "Library") { // Make sure a genre is selected
    //   filteredBooksCopy = books.filter((book) =>
    //     book.genres.some((genr) => genr.name === selectedGenre) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat) &&
    //     book.library_id === selectedLibrary
    //   );
    // }






    // // //four selected dropdown by genre
    // if (selectedGenre !== "Genre" && selectedAuthor !== "Author" && selectedPublisher !== "Publisher" && selectedLanguage !== "Language") { // Make sure a genre is selected
    //   filteredBooksCopy = books.filter((book) =>
    //     book.genres.some((genr) => genr.name === selectedGenre) &&
    //     book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage)
    //   );
    // }
    // if (selectedGenre !== "Genre" && selectedAuthor !== "Author" && selectedPublisher !== "Publisher" && selectedFormat !== "Format") { // Make sure a genre is selected
    //   filteredBooksCopy = books.filter((book) =>
    //     book.genres.some((genr) => genr.name === selectedGenre) &&
    //     book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat)
    //   );
    // }
    // if (selectedGenre !== "Genre" && selectedAuthor !== "Author" && selectedPublisher !== "Publisher" && selectedLibrary !== "Library") { // Make sure a genre is selected
    //   filteredBooksCopy = books.filter((book) =>
    //     book.genres.some((genr) => genr.name === selectedGenre) &&
    //     book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
    //     book.library_id === selectedLibrary
    //   );
    // }
    // // genre author language library
    // if (selectedGenre !== "Genre" && selectedAuthor !== "Author" && selectedLanguage !== "Language" && selectedLibrary !== "Library") { // Make sure a genre is selected
    //   filteredBooksCopy = books.filter((book) =>
    //     book.genres.some((genr) => genr.name === selectedGenre) &&
    //     book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
    //     book.library_id === selectedLibrary
    //   );
    // }
    // // genre author library format
    // if (selectedGenre !== "Genre" && selectedAuthor !== "Author" && selectedFormat !== "Format" && selectedLibrary !== "Library") { // Make sure a genre is selected
    //   filteredBooksCopy = books.filter((book) =>
    //     book.genres.some((genr) => genr.name === selectedGenre) &&
    //     book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat) &&
    //     book.library_id === selectedLibrary
    //   );
    // }

    // // genre author language format
    // if (selectedGenre !== "Genre" && selectedAuthor !== "Author" && selectedLanguage !== "Language" && selectedFormat !== "Format") { // Make sure a genre is selected
    //   filteredBooksCopy = books.filter((book) =>
    //     book.genres.some((genr) => genr.name === selectedGenre) &&
    //     book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat)
    //   );
    // }

    // // genre publisher language library
    // if (selectedGenre !== "Genre" && selectedPublisher !== "Publisher" && selectedLanguage !== "Language" && selectedLibrary !== "Library") { // Make sure a genre is selected
    //   filteredBooksCopy = books.filter((book) =>
    //     book.genres.some((genr) => genr.name === selectedGenre) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
    //     book.library_id === selectedLibrary
    //   );
    // }

    // // genre publisher language format
    // if (selectedGenre !== "Genre" && selectedPublisher !== "Publisher" && selectedLanguage !== "Language" && selectedFormat !== "Format") { // Make sure a genre is selected
    //   filteredBooksCopy = books.filter((book) =>
    //     book.genres.some((genr) => genr.name === selectedGenre) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat)
    //   );
    // }
    // // genre publisher library format
    // if (selectedGenre !== "Genre" && selectedPublisher !== "Publisher" && selectedFormat !== "Format" && selectedLibrary !== "Library") { // Make sure a genre is selected
    //   filteredBooksCopy = books.filter((book) =>
    //     book.genres.some((genr) => genr.name === selectedGenre) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat) &&
    //     book.library_id === selectedLibrary
    //   );
    // }
    // // genre language library format
    // if (selectedGenre !== "Genre" && selectedLanguage !== "Language" && selectedFormat !== "Format" && selectedLibrary !== "Library") { // Make sure a genre is selected
    //   filteredBooksCopy = books.filter((book) =>
    //     book.genres.some((genr) => genr.name === selectedGenre) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat) &&
    //     book.library_id === selectedLibrary
    //   );
    // }







    // // //five selected dropdown by genre
    // if (selectedGenre !== "Genre" && selectedAuthor !== "Author" && selectedPublisher !== "Publisher" && selectedLanguage !== "Language" && selectedFormat !== "Format") { // Make sure a genre is selected
    //   filteredBooksCopy = books.filter((book) =>
    //     book.genres.some((genr) => genr.name === selectedGenre) &&
    //     book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat)
    //   );
    // }
    // if (selectedGenre !== "Genre" && selectedAuthor !== "Author" && selectedPublisher !== "Publisher" && selectedLanguage !== "Language" && selectedLibrary !== "Library") { // Make sure a genre is selected
    //   filteredBooksCopy = books.filter((book) =>
    //     book.genres.some((genr) => genr.name === selectedGenre) &&
    //     book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
    //     book.library_id === selectedLibrary
    //   );
    // }
    // // genre publisher language library format
    // if (selectedGenre !== "Genre" && selectedPublisher !== "Publisher" && selectedLanguage !== "Language" && selectedFormat !== "Format" && selectedLibrary !== "Library") { // Make sure a genre is selected
    //   filteredBooksCopy = books.filter((book) =>
    //     book.genres.some((genr) => genr.name === selectedGenre) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat) &&
    //     book.library_id === selectedLibrary
    //   );
    // }

    // // genre publisher author library format
    // if (selectedGenre !== "Genre" && selectedAuthor !== "Author" && selectedPublisher !== "Publisher" && selectedFormat !== "Format" && selectedLibrary !== "Library") { // Make sure a genre is selected
    //   filteredBooksCopy = books.filter((book) =>
    //     book.genres.some((genr) => genr.name === selectedGenre) &&
    //     book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat) &&
    //     book.library_id === selectedLibrary
    //   );
    // }








    // //six selected dropdown with genre,publisher,author,library,format,language
    // if (selectedGenre !== "Genre" && selectedAuthor !== "Author" && selectedPublisher !== "Publisher" && selectedLanguage !== "Language" && selectedFormat !== "Format" && selectedLibrary !== "Library") { // Make sure a genre is selected
    //   filteredBooksCopy = books.filter((book) =>
    //     book.genres.some((genr) => genr.name === selectedGenre) &&
    //     book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
    //     Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat) &&
    //     book.library_id === selectedLibrary
    //   );
    // }



    //double selected dropdown with author
    //   if (selectedAuthor !== "Author" && selectedPublisher !== "Publisher") { // Make sure a genre is selected
    //     filteredBooksCopy = books.filter((book) =>
    //       book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher)
    //     );
    //   }

    //   if (selectedAuthor !== "Author" && selectedLanguage !== "Language") { // Make sure a genre is selected
    //     filteredBooksCopy = books.filter((book) =>
    //       book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage)
    //     );
    //   }
    //   if (selectedAuthor !== "Author" && selectedFormat !== "Format") { // Make sure a genre is selected
    //     filteredBooksCopy = books.filter((book) =>
    //       book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat)
    //     );
    //   }
    //   if (selectedAuthor !== "Author" && selectedLibrary !== "Library") { // Make sure a genre is selected
    //     filteredBooksCopy = books.filter((book) =>
    //       book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
    //       book.library_id === selectedLibrary
    //     );
    //   }







    //   //three selected dropdown by author
    //   if (selectedAuthor !== "Author" && selectedPublisher !== "Publisher" && selectedLanguage !== "Language") { // Make sure a genre is selected
    //     filteredBooksCopy = books.filter((book) =>
    //       book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage)
    //     );
    //   }
    //   if (selectedAuthor !== "Author" && selectedPublisher !== "Publisher" && selectedFormat !== "Format") { // Make sure a genre is selected
    //     filteredBooksCopy = books.filter((book) =>
    //       book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat)
    //     );
    //   }
    //   // if (selectedAuthor !== "Author" && selectedPublisher !== "Publisher" && selectedLibrary !== "Library") { // Make sure a genre is selected
    //   //   filteredBooksCopy = books.filter((book) =>
    //   //     book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
    //   //     Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
    //   //     book.library_id === selectedLibrary
    //   //   );
    //   // }

    //   // Author Language Format
    //   if (selectedAuthor !== "Author" && selectedLanguage !== "Language" && selectedFormat !== "Format") { // Make sure a genre is selected
    //     filteredBooksCopy = books.filter((book) =>
    //       book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat)
    //     );
    //   }
    //   // Author Language Library
    //   if (selectedAuthor !== "Author" && selectedLanguage !== "Language" && selectedLibrary !== "Library") { // Make sure a genre is selected
    //     filteredBooksCopy = books.filter((book) =>
    //       book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
    //       book.library_id === selectedLibrary
    //     );
    //   }
    //   // Author  Format Library
    //   if (selectedAuthor !== "Author" && selectedFormat !== "Format" && selectedLibrary !== "Library") { // Make sure a genre is selected
    //     filteredBooksCopy = books.filter((book) =>
    //       book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat) &&
    //       book.library_id === selectedLibrary
    //     );
    //   }







    //   //four selected dropdown by author
    //   if (selectedAuthor !== "Author" && selectedPublisher !== "Publisher" && selectedLanguage !== "Language" && selectedFormat !== "Format") { // Make sure a genre is selected
    //     filteredBooksCopy = books.filter((book) =>
    //       book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat)
    //     );
    //   }
    //   if (selectedAuthor !== "Author" && selectedPublisher !== "Publisher" && selectedLanguage !== "Language" && selectedLibrary !== "Library") { // Make sure a genre is selected
    //     filteredBooksCopy = books.filter((book) =>
    //       book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
    //       book.library_id === selectedLibrary
    //     );
    //   }
    //   // Author Language Format Library
    //   if ( selectedAuthor !== "Author" &&  selectedLanguage !== "Language" && selectedFormat !== "Format" && selectedLibrary !== "Library") { // Make sure a genre is selected
    //     filteredBooksCopy = books.filter((book) =>
    //       book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat) &&
    //       book.library_id === selectedLibrary
    //     );
    //   }
    //   // Author Language Format Publisher
    //   if ( selectedAuthor !== "Author" && selectedPublisher !== "Publisher" && selectedLanguage !== "Language" && selectedFormat !== "Format" ) { // Make sure a genre is selected
    //     filteredBooksCopy = books.filter((book) =>
    //       book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat) 
    //     );
    //   }

    //   // Author Format Library Publisher
    //   if (selectedAuthor !== "Author" && selectedPublisher !== "Publisher" && selectedFormat !== "Format" && selectedLibrary !== "Library") { // Make sure a genre is selected
    //     filteredBooksCopy = books.filter((book) =>
    //       book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat) &&
    //       book.library_id === selectedLibrary
    //     );
    //   }






    //   //five selected dropdown by author
    //   if (selectedAuthor !== "Author" && selectedPublisher !== "Publisher" && selectedLanguage !== "Language" && selectedFormat !== "Format" && selectedLibrary !== "Library") { // Make sure a genre is selected
    //     filteredBooksCopy = books.filter((book) =>
    //       book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat) && 
    //       book.library_id === selectedLibrary
    //       );
    //   }



    //  // double selected dropdown by publisher
    //   if (selectedPublisher !== "Publisher" && selectedLanguage !== "Language" ) { // Make sure a genre is selected
    //     filteredBooksCopy = books.filter((book) =>
    //       Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) 
    //       );
    //   }

    //   if (selectedPublisher !== "Publisher"&& selectedFormat !== "Format" ) { // Make sure a genre is selected
    //     filteredBooksCopy = books.filter((book) =>
    //       Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat)
    //       );
    //   }
    //   if (selectedPublisher !== "Publisher" && selectedLibrary !== "Library") { // Make sure a genre is selected
    //     filteredBooksCopy = books.filter((book) =>
    //       Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
    //       book.library_id === selectedLibrary
    //       );
    //   }








    //   // //three selected dropdown by publisher
    //   if ( selectedPublisher !== "Publisher" && selectedLanguage !== "Language" && selectedFormat !== "Format") { // Make sure a genre is selected
    //     filteredBooksCopy = books.filter((book) =>
    //       Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat)
    //       );
    //   }
    //   if (selectedPublisher !== "Publisher" && selectedLanguage !== "Language" && selectedLibrary !== "Library") { // Make sure a genre is selected
    //     filteredBooksCopy = books.filter((book) =>
    //       Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
    //       book.library_id === selectedLibrary
    //       );
    //   }
    //   //Publisher Format Library
    //   if ( selectedPublisher !== "Publisher" && selectedFormat !== "Format" && selectedLibrary !== "Library") { // Make sure a genre is selected
    //     filteredBooksCopy = books.filter((book) =>
    //       Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher)  &&
    //       Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat) &&
    //       book.library_id === selectedLibrary
    //     );
    //   }

    //   if (  selectedPublisher !== "Publisher" &&  selectedLibrary !== "Library" && selectedAuthor !== "Author" ) { // Make sure a genre is selected
    //     filteredBooksCopy = books.filter((book) => 
    //       Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher)  &&
    //       book.library_id === selectedLibrary &&
    //       book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor)
    //     );
    //   }




    //   // //four selected dropdown by publisher
    //   if (selectedPublisher !== "Publisher" && selectedLanguage !== "Language" && selectedFormat !== "Format" && selectedLibrary !== "Library") { // Make sure a genre is selected
    //     filteredBooksCopy = books.filter((book) =>
    //       Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
    //       Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat) && 
    //       book.library_id === selectedLibrary
    //       );
    //   }


    //   // // //double selected dropdown by language
    //   // // if ( selectedLanguage !== "Language" && selectedFormat !== "Format" ) { // Make sure a genre is selected
    //   // //   filteredBooksCopy = books.filter((book) =>
    //   //     Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
    //   //     Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat) 
    //   //     );
    //   // }
    //   if ( selectedLanguage !== "Language" && selectedLibrary !== "Library") { // Make sure a genre is selected
    //     filteredBooksCopy = books.filter((book) =>
    //       Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
    //       book.library_id === selectedLibrary
    //       );
    //   }
    //   // //three selected dropdown by language
    //   // if (selectedLanguage !== "Language" && selectedFormat !== "Format" && selectedLibrary !== "Library") { // Make sure a genre is selected
    //   //   filteredBooksCopy = books.filter((book) =>
    //   //     Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
    //   //     Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat) && 
    //   //     book.library_id === selectedLibrary
    //   //     );
    //   // }

    //   // //double selected dropdown by format
    //   // if ( selectedFormat !== "Format" && selectedLibrary !== "Library") { // Make sure a genre is selected
    //   //   filteredBooksCopy = books.filter((book) =>
    //   //     Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat) && 
    //   //     book.library_id === selectedLibrary
    //   //     );
    //   // }

    setTotalBooksCount(filteredBooksCopy.length);

    setFilteredBooks(filteredBooksCopy);
  }, [books, selectedGenre, selectedAuthor, selectedPublisher, selectedLanguage, selectedFormat, selectedLibrary]);


  // ===========================search ===============================

  const handleSearch = () => {
    setIsLoading(true);

    const filteredResults = books.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults); // Update search results state with filtered data// Update search results state with API response
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
    fetch('https://dindayalupadhyay.smartcitylibrary.com/api/v1/genres')
      .then(response => response.json())
      .then(data => setGenr(["Genre", ...data.data.map(genres => genres.name)]))
      // Assuming the API response has a "data" field with an array of genres
      .catch(error => console.error('Error fetching genres:', error));
  }, []);

  useEffect(() => {
    // Fetch the list of authors from your API
    fetch('https://dindayalupadhyay.smartcitylibrary.com/api/v1/authors')
      .then(response => response.json())
      .then(data => setAuthr(["Author", ...data.data.map(authors => authors.first_name + "" + authors.last_name)])) // Assuming the API response has a "data" field with an array of genres
      .catch(error => console.error('Error fetching authors:', error));
  }, []);
  useEffect(() => {
    // Fetch the list of publishers from your API
    fetch('https://dindayalupadhyay.smartcitylibrary.com/api/v1/publishers')
      .then(response => response.json())
      .then(data => setPublishr(["Publisher", ...data.data.map(publisher => publisher.name)])) // Assuming the API response has a "data" field with an array of genres
      .catch(error => console.error('Error fetching publisher:', error));
  }, []);

  // Fetch the list of languages from your API
  useEffect(() => {
    fetch('https://dindayalupadhyay.smartcitylibrary.com/api/b1/book-languages')
      .then(response => response.json())
      .then(data => setLanguage(["Languages", ...data.data.map(language => language.language_name)])) // Assuming the API response has a "data" field with an array of genres
      .catch(error => console.error('Error fetching publisher:', error));
  }, []);


  // -------------------------All books===================
  const AllBooks = () => {
    const scrollViewRef = useRef(null); // Create a ref for ScrollView
    return (
      <Theme>
        {({ theme }) => {
          const styles = getStyles(theme);
          return (
            <View style={{ flex: 1, backgroundColor: theme === 'DARK' ? '#000' : '#fff' }}>

              {/*========================== dropdown with searchbar========================= */}
              <ScrollView ref={scrollViewRef}
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
                      {/* {clicked ? (
                  <Image
                    style={{ width: 20, height: 20 }}
                  />
                ) : (
                  <Image
                    style={{ width: 20, height: 20 }}
                  />
                )} */}
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
                      {/* {clicked ? (
                  <Image
                    style={{ width: 20, height: 20 }}
                  />
                ) : (
                  <Image
                    style={{ width: 20, height: 20 }}
                  />
                )} */}
                    </TouchableOpacity>
                  </View>


                </View>

              </ScrollView>

              <ScrollView>

                <View style={{ marginBottom: 15 }}>
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
                </View>


                {/* ==========================All books=========================== */}

                <View style={{
                  flexDirection: 'row', marginVertical: 5,
                  justifyContent: 'center', marginLeft: 15, marginRight: 15,
                }}>
                  <Text style={styles.coroselheading}>Our Books Collection</Text>
                </View>
                {totalBooksCount < 10 ? (<Text style={styles.totalBooksCount}>Showing {totalBooksCount} of {totalBooksCount} Books</Text>)
                  :
                  (<Text style={styles.totalBooksCount}>Showing 10 of {totalBooksCount} Books</Text>)}

                <View style={{
                  marginTop: 10,
                  marginStart: 10, backgroundColor: theme === 'DARK' ? '#000' : '#fff',
                }}>

                  <FlatList
                    numColumns={2}
                    contentContainerStyle={{ columnGap: -10 }}
                    keyExtractor={(item) => item.id.toString()}
                    data={filteredBooks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}

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
                            {item.items[0].status === 1 ?
                              (<Text style={[styles.batch,
                              {
                                color: 'green',
                                backgroundColor: '#B6FFC0',
                                borderColor: 'green',
                              }]}>
                                Available</Text>) :
                              (<Text style={[styles.batch,
                              {
                                borderColor: '#990000',
                                color: '#990000',
                                backgroundColor: 'red',
                              }]}>
                                Unavailable</Text>)}
                            {/* ================================================================================== */}
                          </View>

                          <View style={{ padding: 10, }}>
                            <Text style={{
                              fontSize: 15,
                              marginLeft: -10,
                              fontFamily: 'philosopher-bold',
                              color: theme === 'DARK' ? '#fff' : '#000'
                            }} numberOfLines={1}>
                              {item.name}
                            </Text>
                            {item.library_id === 111 ?
                              (<Text
                                style={{
                                  marginLeft: -10,
                                  fontSize: 12,
                                  color: theme === 'DARK' ? '#fff' : '#000'
                                }}
                              >
                                Dindayal UpadhyayLibrary</Text>) :
                              (item.library_id === 222 ?
                                (<Text
                                  style={{
                                    marginLeft: -12,
                                    fontSize: 12,
                                    color: theme === 'DARK' ? '#fff' : '#000'
                                  }}
                                >
                                  Kundanlal Gupta Library</Text>) :
                                (<Text
                                  style={{
                                    marginLeft: -8,
                                    fontSize: 12,
                                    color: theme === 'DARK' ? '#fff' : '#000'

                                  }}
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
                  />

                </View>



                {/* // =====================pagination controls to navigate between pages===================  */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(totalBooksCount / itemsPerPage)}
                  onPageChange={(page) => setCurrentPage(page)}

                />

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



