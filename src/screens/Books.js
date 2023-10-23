import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity, Text, FlatList, Image, ActivityIndicator, VirtualizedList } from "react-native";
import { Picker } from '@react-native-picker/picker';
import Feather from 'react-native-vector-icons/Feather';
import Header from "../common/Header";
import Pagination from "../components/pagination";
// import { ScrollView } from "react-native-gesture-handler";
// import { useSelector } from "react-redux";
// import { useRoute } from "@react-navigation/native";

const Books = ({ navigation }) => {
  // const scrollViewRef = useRef(null); // Create a reference to ScrollView
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





  // // Scroll to the top
  // const onPageChange = (page) => {
  //   setCurrentPage(page);

  //   // Scroll to the top
  //   if (scrollViewRef.current) {
  //     scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
  //   }
  // };

  // ==========================all books=========================


  useEffect(() => {
    const getbooks = () => {
      fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books")
        .then(res => res.json())
        //  .then(responce => console.log(responce));
        .then(responce => {
          // console.log(JSON.stringify(items) + ' ' +items.data.length);
          //console.log(responce.data);
          // console.log('Image : ' + responce.data.image);
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
    // Reset the current page to 1 whenever a dropdown is clicked
    setCurrentPage(1);

    // if (scrollViewRef.current) {
    //   scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    // }

    // console.log(selectedGenre);
    let filteredBooksCopy = [...books];


    //single selected dropdown  by genre

    if (selectedGenre !== "Genre") { // Make sure a genre is selected
      filteredBooksCopy = books.filter((book) =>
        book.genres.some((genr) => genr.name === selectedGenre)
        

      );
      console.log("single selected dropdown  by genre")
      // setFilteredBooks(filteredByGenre);
      // console.log("Filtered Books:", filteredByGenre);

    }
    if (selectedAuthor !== "Author") { // Make sure a genre is selected
      filteredBooksCopy = books.filter((book) =>
        book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor)
      );
      // console.log("selectedAuthor:", selectedAuthor);
      // console.log("Filtered Books:", filteredBooksCopy);
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
    if (selectedGenre !== "Genre" && selectedAuthor !== "Author") { // Make sure a genre is selected
      filteredBooksCopy = books.filter((book) =>
        book.genres.some((genr) => genr.name === selectedGenre) &&
        book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor)
      );
    }
    if (selectedGenre !== "Genre" && selectedPublisher !== "Publisher") {
      filteredBooksCopy = books.filter((book) =>
        book.genres.some((genr) => genr.name === selectedGenre) &&
        Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher)
      );
    }
    if (selectedGenre !== "Genre" && selectedLanguage !== "Language") {
      filteredBooksCopy = books.filter((book) =>
        book.genres.some((genr) => genr.name === selectedGenre) &&
        Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage)
      );
    }
    if (selectedGenre !== "Genre" && selectedFormat !== "Format") {
      filteredBooksCopy = books.filter((book) =>
        book.genres.some((genr) => genr.name === selectedGenre) &&
        Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat)
      );
    }
    if (selectedGenre !== "Genre" && selectedLibrary !== "Library") {
      filteredBooksCopy = books.filter((book) =>
        book.genres.some((genr) => genr.name === selectedGenre) &&
        book.library_id === selectedLibrary
      );
    }


    // //three selected dropdown by genre
    if (selectedGenre !== "Genre" && selectedAuthor !== "Author" && selectedPublisher !== "Publisher") { // Make sure a genre is selected
      filteredBooksCopy = books.filter((book) =>
        book.genres.some((genr) => genr.name === selectedGenre) &&
        book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
        Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher)
      );
    }
    if (selectedGenre !== "Genre" && selectedAuthor !== "Author" && selectedLanguage !== "Language") { // Make sure a genre is selected
      filteredBooksCopy = books.filter((book) =>
        book.genres.some((genr) => genr.name === selectedGenre) &&
        book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
        Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage)
      );
    }
    if (selectedGenre !== "Genre" && selectedAuthor !== "Author" && selectedFormat !== "Format") { // Make sure a genre is selected
      filteredBooksCopy = books.filter((book) =>
        book.genres.some((genr) => genr.name === selectedGenre) &&
        book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
        Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat)
      );
    }
    if (selectedGenre !== "Genre" && selectedAuthor !== "Author" && selectedLibrary !== "Library") { // Make sure a genre is selected
      filteredBooksCopy = books.filter((book) =>
        book.genres.some((genr) => genr.name === selectedGenre) &&
        book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
        book.library_id === selectedLibrary
      );
    }

    if (selectedGenre !== "Genre" && selectedPublisher !== "Publisher" && selectedLanguage !== "Language") { // Make sure a genre is selected
      filteredBooksCopy = books.filter((book) =>
        book.genres.some((genr) => genr.name === selectedGenre) &&
        Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
        Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage)
      );
    }
    if (selectedGenre !== "Genre" && selectedPublisher !== "Publisher" && selectedFormat !== "Format") { // Make sure a genre is selected
      filteredBooksCopy = books.filter((book) =>
        book.genres.some((genr) => genr.name === selectedGenre) &&
        Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
        Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat)
      );
    }
    if (selectedGenre !== "Genre" && selectedPublisher !== "Publisher" && selectedLibrary !== "Library") { // Make sure a genre is selected
      filteredBooksCopy = books.filter((book) =>
        book.genres.some((genr) => genr.name === selectedGenre) &&
        Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
        book.library_id === selectedLibrary
      );
    }

    if (selectedGenre !== "Genre" && selectedLanguage !== "Language" && selectedLibrary !== "Library") { // Make sure a genre is selected
      filteredBooksCopy = books.filter((book) =>
        book.genres.some((genr) => genr.name === selectedGenre) &&
        Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
        book.library_id === selectedLibrary
      );
    }
    if (selectedGenre !== "Genre" && selectedLanguage !== "Language" && selectedFormat !== "Format") { // Make sure a genre is selected
      filteredBooksCopy = books.filter((book) =>
        book.genres.some((genr) => genr.name === selectedGenre) &&
        Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
        Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat)
      );
    }

    if (selectedGenre !== "Genre" && selectedFormat !== "Format" && selectedLibrary !== "Library") { // Make sure a genre is selected
      filteredBooksCopy = books.filter((book) =>
        book.genres.some((genr) => genr.name === selectedGenre) &&
        Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat) &&
        book.library_id === selectedLibrary
      );
    }






    // //four selected dropdown by genre
    if (selectedGenre !== "Genre" && selectedAuthor !== "Author" && selectedPublisher !== "Publisher" && selectedLanguage !== "Language") { // Make sure a genre is selected
      filteredBooksCopy = books.filter((book) =>
        book.genres.some((genr) => genr.name === selectedGenre) &&
        book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
        Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
        Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage)
      );
    }
    if (selectedGenre !== "Genre" && selectedAuthor !== "Author" && selectedPublisher !== "Publisher" && selectedFormat !== "Format") { // Make sure a genre is selected
      filteredBooksCopy = books.filter((book) =>
        book.genres.some((genr) => genr.name === selectedGenre) &&
        book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
        Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
        Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat)
      );
    }
    if (selectedGenre !== "Genre" && selectedAuthor !== "Author" && selectedPublisher !== "Publisher" && selectedLibrary !== "Library") { // Make sure a genre is selected
      filteredBooksCopy = books.filter((book) =>
        book.genres.some((genr) => genr.name === selectedGenre) &&
        book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
        Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
        book.library_id === selectedLibrary
      );
    }
    // genre author language library
    if (selectedGenre !== "Genre" && selectedAuthor !== "Author" && selectedLanguage !== "Language" && selectedLibrary !== "Library") { // Make sure a genre is selected
      filteredBooksCopy = books.filter((book) =>
        book.genres.some((genr) => genr.name === selectedGenre) &&
        book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
        Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
        book.library_id === selectedLibrary
      );
    }
    // genre author library format
    if (selectedGenre !== "Genre" && selectedAuthor !== "Author" && selectedFormat !== "Format" && selectedLibrary !== "Library") { // Make sure a genre is selected
      filteredBooksCopy = books.filter((book) =>
        book.genres.some((genr) => genr.name === selectedGenre) &&
        book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
        Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat) &&
        book.library_id === selectedLibrary
      );
    }

    // genre author language format
    if (selectedGenre !== "Genre" && selectedAuthor !== "Author" && selectedLanguage !== "Language" && selectedFormat !== "Format") { // Make sure a genre is selected
      filteredBooksCopy = books.filter((book) =>
        book.genres.some((genr) => genr.name === selectedGenre) &&
        book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
        Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
        Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat)
      );
    }

    // genre publisher language library
    if (selectedGenre !== "Genre" && selectedPublisher !== "Publisher" && selectedLanguage !== "Language" && selectedLibrary !== "Library") { // Make sure a genre is selected
      filteredBooksCopy = books.filter((book) =>
        book.genres.some((genr) => genr.name === selectedGenre) &&
        Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
        Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
        book.library_id === selectedLibrary
      );
    }

    // genre publisher language format
    if (selectedGenre !== "Genre" && selectedPublisher !== "Publisher" && selectedLanguage !== "Language" && selectedFormat !== "Format") { // Make sure a genre is selected
      filteredBooksCopy = books.filter((book) =>
        book.genres.some((genr) => genr.name === selectedGenre) &&
        Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
        Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
        Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat)
      );
    }
    // genre publisher library format
    if (selectedGenre !== "Genre" && selectedPublisher !== "Publisher" && selectedFormat !== "Format" && selectedLibrary !== "Library") { // Make sure a genre is selected
      filteredBooksCopy = books.filter((book) =>
        book.genres.some((genr) => genr.name === selectedGenre) &&
        Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
        Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat) &&
        book.library_id === selectedLibrary
      );
    }
    // genre language library format
    if (selectedGenre !== "Genre" && selectedLanguage !== "Language" && selectedFormat !== "Format" && selectedLibrary !== "Library") { // Make sure a genre is selected
      filteredBooksCopy = books.filter((book) =>
        book.genres.some((genr) => genr.name === selectedGenre) &&
        Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
        Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat) &&
        book.library_id === selectedLibrary
      );
    }




   
   
   
    // //five selected dropdown by genre
    if (selectedGenre !== "Genre" && selectedAuthor !== "Author" && selectedPublisher !== "Publisher" && selectedLanguage !== "Language" && selectedFormat !== "Format") { // Make sure a genre is selected
      filteredBooksCopy = books.filter((book) =>
        book.genres.some((genr) => genr.name === selectedGenre) &&
        book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
        Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
        Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
        Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat)
      );
    }
    if (selectedGenre !== "Genre" && selectedAuthor !== "Author" && selectedPublisher !== "Publisher" && selectedLanguage !== "Language" && selectedLibrary !== "Library") { // Make sure a genre is selected
      filteredBooksCopy = books.filter((book) =>
        book.genres.some((genr) => genr.name === selectedGenre) &&
        book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
        Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
        Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
        book.library_id === selectedLibrary
      );
    }
    // genre publisher language library format
    if (selectedGenre !== "Genre" && selectedPublisher !== "Publisher" && selectedLanguage !== "Language" && selectedFormat !== "Format" && selectedLibrary !== "Library") { // Make sure a genre is selected
      filteredBooksCopy = books.filter((book) =>
        book.genres.some((genr) => genr.name === selectedGenre) &&
        Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
        Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
        Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat) &&
        book.library_id === selectedLibrary
      );
    }

    // genre publisher author library format
    if (selectedGenre !== "Genre" && selectedAuthor !== "Author" && selectedPublisher !== "Publisher" && selectedFormat !== "Format" && selectedLibrary !== "Library") { // Make sure a genre is selected
      filteredBooksCopy = books.filter((book) =>
        book.genres.some((genr) => genr.name === selectedGenre) &&
        book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
        Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
        Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat) &&
        book.library_id === selectedLibrary
      );
    }



    
    
    
    
    
    //six selected dropdown with genre,publisher,author,library,format,language
    if (selectedGenre !== "Genre" && selectedAuthor !== "Author" && selectedPublisher !== "Publisher" && selectedLanguage !== "Language" && selectedFormat !== "Format" && selectedLibrary !== "Library") { // Make sure a genre is selected
      filteredBooksCopy = books.filter((book) =>
        book.genres.some((genr) => genr.name === selectedGenre) &&
        book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor) &&
        Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher) &&
        Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage) &&
        Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat) &&
        book.library_id === selectedLibrary
      );
    }

    
    
    
    
    
    
    
    
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
    // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint for searching books
    fetch(`https://dindayalupadhyay.smartcitylibrary.com/api/v1/books?query=${searchQuery}`)
      .then((res) => res.json())
      .then((response) => {
        // Filter the results based on the search query
        const filteredResults = response.data.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredResults); // Update search results state with filtered data// Update search results state with API response
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error searching for books:", error);
        setIsLoading(false);
      });
    //search logic here 
    // console.log('Searching for:', searchQuery);
  };
  // ==============================static dropdown===================================

 
 
  const formats = [{ id: "", name: "Formats" },{ id: 2, name: "Books" }, { id: 3, name: "ebooks" }];


  const libraries = [
    { id: "", name: "Library" },
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

  //   // Fetch the list of format from your API
  // useEffect(() => {
  //   fetch('https://dindayalupadhyay.smartcitylibrary.com/api/b1/books-items-format')
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(`Network response was not ok (status: ${response.status})`);
  //       }
  //       return response.json();
  //     }
  //       // response.json()
  //       )
  //     .then(data =>{
  //     //   const formatData = data.data.map(format => format.format);
  //     //   setformt(['Format', ...formatData]); 
  //     console.log('API Response:', data);
  //      })
  //      .catch(error => console.error('Error fetching format:', error));
  // }, []);


  // -------------------------All books===================
  const AllBooks = () => {
    const scrollViewRef = useRef(null); // Create a ref for ScrollView
    return (

      <View>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContainer}
        >
          {/* ================dropdown===================== */}
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{
              marginLeft: 16,
              marginTop: 10,
              borderColor: '#000',
              borderWidth: 0.5,
              borderRadius: 8,
              width: '43%',
              height: 30
            }}>
              <Picker style={{ marginTop: -14, marginStart: 5 }}
                selectedValue={selectedGenre}
                onValueChange={(itemValue) => setSelectedGenre(itemValue)}
              >
                {genr.map((genres, index) => (
                  <Picker.Item key={index} label={genres} value={genres} />
                ))}
              </Picker>
            </View>
            <View style={{
              margin: 16,
              marginTop: 10,
              borderColor: '#000',
              borderWidth: 0.5,
              borderRadius: 8,
              width: '43%',
              height: 30
            }}>
              <Picker style={{ marginTop: -14, marginStart: 5 }}
                selectedValue={selectedPublisher}
                onValueChange={(itemValue) => setSelectedPublisher(itemValue)}
              >
                {publishr.map((publishers, index) => (
                  <Picker.Item key={index} label={publishers} value={publishers} />
                ))}
              </Picker>
            </View>
          </View>


          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{
              marginLeft: 16,
              borderColor: '#000',
              borderWidth: 0.5,
              borderRadius: 8,
              width: '43%',
              height: 30
            }}>
              <Picker style={{ marginTop: -14, marginStart: 5 }}
                selectedValue={selectedAuthor}
                onValueChange={(itemValue) => setSelectedAuthor(itemValue)}
              >
                {authr.map((author, index) => (
                  <Picker.Item key={index} label={author} value={author} />
                ))}
              </Picker>
            </View>
            <View style={{
              marginLeft: 16,
              borderColor: '#000',
              borderWidth: 0.5,
              borderRadius: 8,
              width: '43%',
              height: 30
            }}>
              <Picker style={{ marginTop: -14, marginStart: 5 }}
                selectedValue={selectedLanguage}
                onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
              >
                {language.map((language, index) => (
                  <Picker.Item key={index} label={language} value={language} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{
              marginLeft: 16,
              marginTop: 16,
              borderColor: '#000',
              borderWidth: 0.5,
              borderRadius: 8,
              width: '43%',
              height: 30
            }}>
              <Picker style={{ marginTop: -14, marginStart: 5 }}
                selectedValue={selectedFormat}
                onValueChange={(itemValue) => setSelectedFormat(itemValue)}
              >
                {formats.map((format, index) => (
                  <Picker.Item key={index} label={format.name} value={format.id} />
                ))}
              </Picker>
            </View>

            <View style={{
              marginLeft: 16,
              marginTop: 16,
              borderColor: '#000',
              borderWidth: 0.5,
              borderRadius: 8,
              width: '43%',
              height: 30
            }}>
              <Picker style={{ marginTop: -14, marginStart: 5, }}
                selectedValue={selectedLibrary}
                onValueChange={(itemValue) => setSelectedLibrary(itemValue)}
              >
                {libraries.map((library, index) => (
                  <Picker.Item key={library.id} label={library.name} value={library.id} />
                ))}
              </Picker>
            </View>
          </View>

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
          <View style={{ flexDirection: 'row', marginVertical: 5, justifyContent: 'center', marginLeft: 15, marginRight: 15, }}>
            <Text style={styles.coroselheading}>Our Books Collection</Text>
          </View>
          {totalBooksCount < 10 ? (<Text style={styles.totalBooksCount}>Showing {totalBooksCount} of {totalBooksCount} Books</Text>) : (<Text style={styles.totalBooksCount}>Showing 10 of {totalBooksCount} Books</Text>)}

          <View style={{ marginTop: 10, marginStart: 10, backgroundColor: '#fff' }}>

            <FlatList
              keyExtractor={(item) => item.id.toString()}
              // data={books}
              data={filteredBooks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
              // getItemCount={() => books.length}
              // getItem={(books, index) => books[index]}
              renderItem={({ item, id }) =>

                <TouchableOpacity onPress={() => {
                  navigation.navigate('BooksDetailPage', { data: item })
                  // {data:item}
                }}>
                  <View style={{
                    width: 182,
                    height: 296,
                    marginBottom: 22,
                    borderRadius: 10,
                    backgroundColor: '#yellow'

                  }}>
                    <View style={{
                      flex: 1,
                      width: 100,
                      marginLeft: 60 / 2,
                      marginTop: 10 / 2,
                      borderRadius: 5,
                      overflow: 'visible',


                    }}>
                      <Image source={{ uri: item.image_path }}
                        style={{
                          aspectRatio: 0.8,
                          resizeMode: 'cover'
                        }}


                      />


          {/* ------------------code for book_item_status----------------------------- */}
          {item.items[0].book_item_status===4?(<Text style={{position: 'absolute',
            textAlign:'center',
            right: -30,
            width: 80, 
            height: 20,color:'black',marginTop:10,backgroundColor:'yellow',fontWeight:'bold'}}>Available</Text>):(<Text style={{position: 'absolute',
            textAlign:'center',
            right: -20,
            width: 80, 
            height: 20,marginTop:10,color:'black',backgroundColor:'red',fontWeight:'bold'}}>Unavailable</Text>)}

                    


                  </View>
                    <View style={{ padding: 10, }}>
                      <Text style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#000'
                      }} numberOfLines={2}>
                        {item.name}
                      </Text>

                     

                      {item.items[0].format === 3 ? (<Text style={{
                        backgroundColor: '#a3a3c2',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#fff',
                        marginLeft: 40,
                        marginRight: 40,
                        paddingTop: 5,
                        height: 30,
                        marginTop: 5,
                        borderRadius: 5,
                      }}>E-Book</Text>
                      ) : (<Text style={{
                        backgroundColor: '#a3a3c2',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#fff',
                        marginLeft: 40,
                        marginRight: 40,
                        paddingTop: 5,
                        height: 30,
                        marginTop: 5,
                        borderRadius: 5,
                      }}>Book</Text>)}



                      {item.library_id === 111 ?
                        (<Text style={{ fontWeight: 'bold', marginLeft: 10 }}>
                          Dindayal UpadhyayLibrary</Text>) :
                        (item.library_id === 222 ?
                          (<Text style={{ fontWeight: 'bold', marginLeft: 10 }}>
                            Kundanlal Gupta Library</Text>) :
                          (<Text style={{ fontWeight: 'bold', marginLeft: 10 }}>
                            Rashtramata Kasturba Library</Text>))}


                      <Text style={{
                        backgroundColor: '#c27b7f',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#fff',
                        marginLeft: 30,
                        marginRight: 40,
                        paddingTop: 10,
                        width: 100,
                        height: 40,
                        marginTop: 5,
                        borderRadius: 5,
                      }}>Read More</Text>
                    </View>

                  </View>

                </TouchableOpacity>

              }
              numColumns={2}
              contentContainerStyle={{ columnGap: 10 }}
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
  };
  // ============================================================================================



  return (
    <View style={styles.container}>
      <Header
        rightIcon={require('../images/Logoelibrary.png')}
        leftIcon={require('../images/menu.png')}
        onClickLeftIcon={() => {
          navigation.openDrawer();
         
        }}

      />

    {isLoaded  ? (<ActivityIndicator style={{flex:1,justifyContent:'center',alignItems:'center'}} size="large" color="#c27b7f" />):


    
      (<View><View style={styles.searchcontainer}>
        <View style={styles.searchBar}>

          <Feather name="search" color={"gray"} size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.input}
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
              <Feather name="x" color={"gray"} size={20} style={styles.searchIcon} />
            </TouchableOpacity>)}

        </View>
      </View>
      {/* Display search results */}



      {isLoading ?
        // (<ActivityIndicator size="large" color="#c27b7f" />,
        (<Text style={styles.noBooksFound}>No books found</Text>) :

        (<FlatList
          style={{ marginBottom: 10 }}
          keyExtractor={(item) => item.id.toString()}
          data={searchResults}
          ListFooterComponent={<AllBooks />}
          renderItem={({ item }) => (

            // Render each search result item here
            <TouchableOpacity onPress={() => navigation.navigate('BooksDetailPage', { data: item })}>
              <View style={{ padding: 5, marginLeft: 10, flexDirection: 'row' }}>
                <Image source={require('../images/bookfill.png')} style={styles.image} />

                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#000', marginBottom: 10, marginLeft: 5 }} >
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
        )}</View>
     
      )}

    </View>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchcontainer: {
    padding: 5,
    width: '100%',
    height: 50,
    backgroundColor: '#fff3cd'
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 12,

  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  coroselheading: {
    fontFamily: 'Philosopher-Bold',
    fontSize: 25,
    fontWeight: '600',
    color: '#000',
    // marginLeft:50
  },
  image: {
    width: 20,
    height: 20,
    borderRadius: 25
  },


  //styles for pagination
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  paginationButton: {
    backgroundColor: '#c27b7f',
    padding: 10,
    borderRadius: 5,
  },
  paginationText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noBooksFound: {
    fontWeight: '900',
    marginLeft: 140
  },
  totalBooksCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10,
    marginBottom: 10,
    textAlign: 'center'
  },
  scrollContainer: {
    flexGrow: 1,
  }


});


export default Books;



