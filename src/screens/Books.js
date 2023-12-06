import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity, Text, FlatList, Image, ActivityIndicator, VirtualizedList, Dimensions, ImageBackground } from "react-native";
import { Picker } from '@react-native-picker/picker';
import Feather from 'react-native-vector-icons/Feather';
import Header from "../common/Header";
import Pagination from "../components/pagination";
// import { ScrollView } from "react-native-gesture-handler";
// import { useSelector } from "react-redux";
// import { useRoute } from "@react-navigation/native";
const DimensionsWindowWidth = Dimensions.get("window").width;

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

    let filteredBooksCopy = [...books];
 //single selected dropdown  by genre

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

    const filteredResults = books.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults); // Update search results state with filtered data// Update search results state with API response
    setIsLoading(false);

  };
  // ==============================static dropdown===================================



  const formats = [{ id: "", name: "Formats" }, { id: 2, name: "Books" }, { id: 3, name: "ebooks" }];


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


  // -------------------------All books===================
  const AllBooks = () => {
    const scrollViewRef = useRef(null); // Create a ref for ScrollView
    return (

      <View style={{ flex: 1, }}>


        {/* ================horizontal dropdown==================== */}

        <ScrollView ref={scrollViewRef} horizontal={true} contentContainerStyle={{ columnGap: -10 }}>


          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop:10,
            paddingBottom:10
          }}>
            <View style={{
              marginLeft: 10,
              marginTop: 10,
              borderWidth: 1.5,
              borderRadius: 20,
              borderColor:'#c27b7f',
              width: 130,
              height: 40,
              backgroundColor: '#f5ebe6',
//backgroundColor:<ImageBackground  source={require('../images/hero-brownElib.png')}/>
            }}>
              <Picker style={{ marginTop: -10, marginStart: 10, color: '#c27b7f',}}
                selectedValue={selectedGenre}
                onValueChange={(itemValue) => setSelectedGenre(itemValue)}
              >
                {genr.map((genres, index) => (
                  <Picker.Item key={index} label={genres} value={genres} style={{ marginStart: 5,
                     height: 50, fontSize: 19,fontWeight:'bold' }}/>
                ))}
              </Picker>
            </View>

            <View style={{
              marginLeft: 16,
              marginTop: 10,
              borderWidth: 1.5,
              borderRadius: 20,
              borderColor:'#c27b7f',
              width: 160,
              height: 40,
              backgroundColor: '#f5ebe6',
            }}>
              <Picker style={{ marginTop: -10, marginStart: 10, color: '#c27b7f', }}
                selectedValue={selectedPublisher}
                onValueChange={(itemValue) => setSelectedPublisher(itemValue)}
              >
                {publishr.map((publishers, index) => (
                  <Picker.Item key={index} label={publishers} value={publishers} style={{ marginStart: 5,
                    height: 50, fontSize: 19,fontWeight:'bold' }}/>
                ))}
              </Picker>
            </View>
            <View style={{
              marginLeft: 16,
              marginTop: 10,
              borderWidth: 1.5,
              borderRadius: 20,
              borderColor:'#c27b7f',
              width: 140,
              height: 40,
              backgroundColor: '#f5ebe6',
            }}>
              <Picker style={{marginTop: -10, marginStart: 10, color: '#c27b7f',}}
                selectedValue={selectedAuthor}
                onValueChange={(itemValue) => setSelectedAuthor(itemValue)}
              >
                {authr.map((author, index) => (
                  <Picker.Item key={index} label={author} value={author} style={{ marginStart: 5,
                    height: 50, fontSize: 19,fontWeight:'bold' }}/>
                ))}
              </Picker>
            </View>
            <View style={{
              marginLeft: 16,
              marginTop: 10,
              borderWidth: 1.5,
              borderRadius: 20,
              borderColor:'#c27b7f',
              width: 170,
              height: 40,
              backgroundColor: '#f5ebe6',
            }}>

              <Picker style={{ marginTop: -10, marginStart: 10, color: '#c27b7f', }}
                selectedValue={selectedLanguage}
                onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
              >

                {language.map((language, index) => (
                  <Picker.Item key={index} label={language} value={language} style={{ marginStart: 5,
                    height: 50, fontSize: 19,fontWeight:'bold' }}/>
                ))}
              </Picker>
            </View>
            <View style={{
              marginLeft: 16,
              marginTop: 10,
              borderWidth: 1.5,
              borderRadius: 20,
              borderColor:'#c27b7f',
              width: 150,
              height: 40,
              backgroundColor: '#f5ebe6',
            }}>
              <Picker style={{ marginTop: -10, marginStart: 10, color: '#c27b7f',}}
                selectedValue={selectedFormat}
                onValueChange={(itemValue) => setSelectedFormat(itemValue)}
              >
                {formats.map((format, index) => (
                  <Picker.Item key={index} label={format.name} value={format.id} style={{ marginStart: 5,
                    height: 50, fontSize: 19,fontWeight:'bold' }}/>
                ))}
              </Picker>
            </View>

            <View style={{
              marginLeft: 16,
              marginTop: 10,
              borderWidth: 1.5,
              borderRadius: 20,
              borderColor:'#c27b7f',
              width: 140,
              height: 40,
              backgroundColor: '#f5ebe6',
              marginRight: 16
            }}>
              <Picker style={{ marginTop: -10, marginStart: 10, color: '#c27b7f', }}
                selectedValue={selectedLibrary}
                onValueChange={(itemValue) => setSelectedLibrary(itemValue)}
              >
                {libraries.map((library, index) => (
                  <Picker.Item key={library.id} label={library.name} value={library.id} style={{ marginStart: 5,
                    height: 50, fontSize: 19,fontWeight:'bold' }}/>
                ))}
              </Picker>
            </View>
          </View>




        </ScrollView>
        {/* ==================================================== */}


        <ScrollView>
          {/* ================ verticle dropdown===================== */}

          {/* <View style={{ flex: 1, flexDirection: 'row' }}>
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
          </View> */}
          {/* ======================================================= */}


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

          <View style={{ marginTop: 10, marginStart: 10, backgroundColor: '#fff' }}>

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
                          resizeMode: 'cover',
                          borderRadius: 10,

                        }}
                      />
                      {/* ------------------code for book_item_status----------------------------- */}
                      {item.items[0].status === 1 ?
                        (<Text style={{
                          position: 'absolute',
                          textAlign: 'center',
                          right: -10,
                          width: 80,
                          height: 20,
                          color: 'green',
                          marginTop: 5,
                          backgroundColor: '#B6FFC0',
                          fontSize: 13,
                          fontWeight: 'bold',
                          borderRadius: 10,
                          borderWidth: 1.5,
                          borderColor: 'green'
                        }}>
                          Available</Text>) :
                        (<Text style={{
                          position: 'absolute',
                          textAlign: 'center',
                          right: -10,
                          width: 80,
                          height: 20,
                          marginTop: 5,
                          color: '#990000',
                          backgroundColor: 'red',
                          fontSize: 13,
                          fontWeight: 'bold',
                          borderRadius: 10,
                          borderWidth: 1.5,
                          borderColor: '#990000'
                        }}>
                          Unavailable</Text>)}
                      {/* ================================================================================== */}
                    </View>

                    <View style={{ padding: 10, }}>
                      <Text style={{
                        fontSize: 15,
                        marginLeft: -10,
                        fontFamily: 'philosopher-bold',
                      }} numberOfLines={1}>
                        {item.name}
                      </Text>




                      {item.library_id === 111 ?
                        (<Text
                          style={{
                            marginLeft: -10,
                            fontSize: 12
                          }}
                        >
                          Dindayal UpadhyayLibrary</Text>) :
                        (item.library_id === 222 ?
                          (<Text
                            style={{
                              marginLeft: -12,
                              fontSize: 12
                            }}
                          >
                            Kundanlal Gupta Library</Text>) :
                          (<Text
                            style={{
                              marginLeft: -8,
                              fontSize: 12

                            }}
                          >
                            Rashtramata Kasturba Library</Text>))}


                      {item.items[0].format === 3 ?

                        <Image
                          source={require('../images/ebook.png')}
                          style={{ height: 20, width: 20, marginLeft: -8, }}
                        />
                        :

                        <Image
                          source={require('../images/bookfill.png')}
                          style={{ height: 20, width: 20, marginLeft: -8, }}
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

      {isLoaded ? (<ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        size="large" color="#c27b7f" />) :



        (<View style={{ flex: 3 }}>
          <View style={styles.searchcontainer}>
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

        )


      }

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
    backgroundColor: '#f5ebe6'
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
  },

  pickerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

});


export default Books;



