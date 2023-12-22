// import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'
// import React, { useEffect, useRef, useState } from 'react';


// const Search = ({ route,navigation }) => {
//   const { genreList, authorList, publisherList, languageList, formatList, libraryList } = route.params;
//   const [selectedGenre, setSelectedGenre] = useState("Genre");
//   const [selectedPublisher, setSelectedPublisher] = useState("Publisher");
//   const [publishr, setPublishr] = useState([]);
//   const [selectedAuthor, setSelectedAuthor] = useState("Author");
//   const [authr, setAuthr] = useState([]);
//   const [selectedLanguage, setSelectedLanguage] = useState("Language");
//   const [language, setLanguage] = useState([]);
//   const [selectedFormat, setSelectedFormat] = useState("Format");
//   const [selectedLibrary, setSelectedLibrary] = useState("Library");

//   const [books, setBooks] = useState([]);

//   // Add state variables for genre filtering
//   const [genreData, setGenreData] = useState('');
//   const [genreClicked, setGenreClicked] = useState(false);
//   const [genreSearch, setGenreSearch] = useState('');

//   // Add state variables for author filtering
//   const [authorData, setAuthorData] = useState('');
//   const [authorClicked, setAuthorClicked] = useState(false);
//   const [authorSearch, setAuthorSearch] = useState('');

//   // Add state variables for genre filtering
//   const [publisherData, setPublisherData] = useState('');
//   const [publisherClicked, setPublisherClicked] = useState(false);
//   const [publisherSearch, setPublisherSearch] = useState('');

//   // Add state variables for genre filtering
//   const [languageData, setLanguageData] = useState('');
//   const [languageClicked, setLanguageClicked] = useState(false);
//   const [languageSearch, setLanguageSearch] = useState('');

//   // Add state variables for genre filtering
//   const [formatData, setFormatData] = useState([]);
//   const [formatClicked, setFormatClicked] = useState(false);
//   const [formatSearch, setFormatSearch] = useState('');

//   // Add state variables for genre filtering
//   const [libData, setLibData] = useState([]);
//   const [libClicked, setLibClicked] = useState(false);
//   const [libSearch, setLibSearch] = useState('');


  

//   // ===================to get list===============
//   useEffect(() => {
//     const receivedGenreList = route.params?.genreList || [];
//     setGenreData(
//       receivedGenreList.map((genre) => ({ id: genre, name: genre }))
//     );
//   }, [route.params?.genreList]);

//   useEffect(() => {
//     const receivedAuthorList = route.params?.authorList || [];
//     setAuthorData(
//       receivedAuthorList.map((author) => ({ id: author, name: author }))
//     );
//   }, [route.params?.authorList]);

//   useEffect(() => {
//     const receivedPublisherList = route.params?.publisherList || [];
//     setPublisherData(
//       receivedPublisherList.map((publisher) => ({ id: publisher, name: publisher }))
//     );
//   }, [route.params?.publisherList]);

//   useEffect(() => {
//     const receivedLanguageList = route.params?.languageList || [];
//     setLanguageData(
//       receivedLanguageList.map((language) => ({ id: language, name: language }))
//     );
//   }, [route.params?.languageList]);

//   useEffect(() => {
//     const receivedFormatList = route.params?.formatList || [];
//     setFormatData(
//       receivedFormatList.map((format) => ({ id: format.id, name: format.name }))
//     );
//   }, [route.params?.formatList]);

//   useEffect(() => {
//     const receivedLibraryList = route.params?.libraryList || [];
//     setLibData(
//       receivedLibraryList.map((library) => ({ id: library.id, name: library.name }))
//     );
//   }, [route.params?.libraryList]);


//   const searchRef = useRef();
//   const onSearch = (search, type) => {
//     if (search !== "") {
//       if (type === "genre") {
//         let tempData = genreList.filter(
//           (item) => item.toLowerCase().indexOf(search.toLowerCase()) > -1
//         );
//         setGenreData(tempData.map((genre) => ({ id: genre, name: genre })));
//       }
//       else if (type === 'author') {
//         let tempauthor = authorList.filter(
//           (item) => item.toLowerCase().indexOf(search.toLowerCase()) > -1
//         );
//         setAuthorData(tempauthor.map(author => ({ id: author, name: author })));
//       }
//       else if (type === 'publisher') {
//         let temppublish = publisherList.filter(
//           (item) => item.toLowerCase().indexOf(search.toLowerCase()) > -1
//           );
//         setPublisherData(temppublish.map(publisher => ({ id: publisher, name: publisher })));
//       }
//       else if (type === 'language') {
//         let templang = languageList.filter(
//           (item) => item.toLowerCase().indexOf(search.toLowerCase()) > -1
//         );
//         setLanguageData(templang.map(language => ({ id: language, name: language })));
//       } 
//       else if (type === 'format') {
//         let tempformat = formatList.filter(
//         (item)=> item.toLowerCase().indexOf(search.toLowerCase()) > -1
//         );
//         setFormatData(tempformat.map(format => ({ id: format, name: format })));
//       }
//       else if (type === 'library') {
//         let templib = libraryList.filter(
//           (item) => item.toLowerCase().indexOf(search.toLowerCase()) > -1
//           );
//         setLibData(templib.map(library => ({ id: library, name: library })));
//       }

//     }
//   };


//   // =======================filter books==========================

//   useEffect(() => {
//       const getbooks = () => {
//           fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books")
//               .then(res => res.json())
//               .then(responce => {
//                   setBooks(responce.data);
//               });
//       };
//       getbooks();
//   }, [books]);
//   console.log("Selected books :", books);

//   // useEffect(() => {
//   //   let filteredBooksCopy = [...books];
//   //   if (selectedGenre !== "Genre") { // Make sure a genre is selected
//   //     filteredBooksCopy = books.filter((book) =>
//   //       book.genres.some((genr) => genr.name === selectedGenre)
//   //     );
//   //     console.log("single selected dropdown  by genre")
//   //   }
//   //   if (selectedAuthor !== "Author") { // Make sure a genre is selected
//   //     filteredBooksCopy = books.filter((book) =>
//   //       book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor)
//   //     );
//   //   }

//   //   if (selectedPublisher !== "Publisher") { // Make sure a genre is selected
//   //     filteredBooksCopy = books.filter((book) =>
//   //       Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher)
//   //     );
//   //   }
//   //   if (selectedLanguage !== "Language") {
//   //     filteredBooksCopy = books.filter((book) =>
//   //       Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage)
//   //     );
//   //   }
//   //   if (selectedFormat !== "Format") {
//   //     filteredBooksCopy = books.filter((book) =>
//   //       Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat)
//   //     );
//   //   }
//   //   if (selectedLibrary !== "Library") {
//   //     filteredBooksCopy = books.filter((book) =>
//   //       book.library_id === selectedLibrary
//   //     );
//   //   }


//   //   setTotalBooksCount(filteredBooksCopy.length);

//   //   setFilteredBooks(filteredBooksCopy);
//   // }, [books, selectedGenre, selectedAuthor, selectedPublisher, selectedLanguage, selectedFormat, selectedLibrary]);




//   return (

//     <View style={{ flex: 1 }}>

//       {route.params?.genreList &&
//         (<View>
//           <TextInput
//             placeholder="Search.."
//             value={genreSearch}
//             ref={searchRef}
//             onChangeText={txt => {
//               onSearch(txt, 'genre');
//               setGenreSearch(txt);
//             }}
//             style={{
//               width: '90%',
//               height: 65,
//               alignSelf: 'center',
//               borderWidth: 0.2,
//               borderColor: '#8e8e8e',
//               borderRadius: 7,
//               marginTop: 20,
//               paddingLeft: 20,
//             }}
//           />

//           <FlatList
//             data={genreData}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item, index }) => {
//               return (
//                 <TouchableOpacity
//                   style={{
//                     width: '85%',
//                     alignSelf: 'center',
//                     height: 50,
//                     justifyContent: 'center',
//                     borderBottomWidth: 0.5,
//                     borderColor: '#8e8e8e',
//                   }}
//                   onPress={() => { 
//                     console.log("Selected Genre (before update):", selectedGenre);
//                   // Update the selectedGenre state with the new value
//                   setSelectedGenre(item.name);
//                   const filteredGenResults = item.name !== 'Genre' ? books.filter((book) =>
//   book.genres.some((genr) => genr.name === item.name)
// ) : [];
//                   // Log the updated selectedGenre
//                     console.log("Selected Genre (updated):", item.name);
//                     console.log("Selected books :", books);
//                   console.log("Genre Results:", filteredGenResults);
//                     // setSelectedGenre(item.name);
//                     setGenreClicked(!genreClicked);
//                     onSearch('', 'genre');
//                     setGenreSearch('');
//                     navigation.navigate('filterData',{ filteredGenResults });
//                   }}
//                 >
//                   <Text style={{ fontWeight: "600" }}>{item.name}</Text>
//                 </TouchableOpacity>
//               );
//             }}
//           />
//         </View>)}

//       {route.params?.authorList &&
//         (<View>
//           <TextInput
//             placeholder="Search.."
//             value={authorSearch}
//             ref={searchRef}
//             onChangeText={txt => {
//               onSearch(txt, 'author');
//               setAuthorSearch(txt);
//             }}
//             style={{
//               width: '90%',
//               height: 65,
//               alignSelf: 'center',
//               borderWidth: 0.2,
//               borderColor: '#8e8e8e',
//               borderRadius: 7,
//               marginTop: 20,
//               paddingLeft: 20,
//             }}
//           />

//           <FlatList
//             data={authorData}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item, index }) => {
//               return (
//                 <TouchableOpacity
//                   style={{
//                     width: '85%',
//                     alignSelf: 'center',
//                     height: 50,
//                     justifyContent: 'center',
//                     borderBottomWidth: 0.5,
//                     borderColor: '#8e8e8e',
//                   }}
//                   onPress={() => {
//                     setSelectedAuthor(item.name);
//                     setAuthorClicked(!authorClicked);
//                     onSearch('', 'author');
//                     setAuthorSearch('');
//                   }}
//                 >
//                   <Text style={{ fontWeight: "600" }}>{item.name}</Text>
//                 </TouchableOpacity>
//               );
//             }}
//           />
//         </View>
//         )}

//       {route.params?.publisherList &&
//         (<View>
//           <TextInput
//             placeholder="Search.."
//             value={publisherSearch}
//             ref={searchRef}
//             onChangeText={txt => {
//               onSearch(txt, 'publisher');
//               setPublisherSearch(txt);
//             }}
//             style={{
//               width: '90%',
//               height: 65,
//               alignSelf: 'center',
//               borderWidth: 0.2,
//               borderColor: '#8e8e8e',
//               borderRadius: 7,
//               marginTop: 20,
//               paddingLeft: 20,
//             }}
//           />

//           <FlatList
//             data={publisherData}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item, index }) => {
//               return (
//                 <TouchableOpacity
//                   style={{
//                     width: '85%',
//                     alignSelf: 'center',
//                     height: 50,
//                     justifyContent: 'center',
//                     borderBottomWidth: 0.5,
//                     borderColor: '#8e8e8e',
//                   }}
//                   onPress={() => {
//                     setSelectedPublisher(item.name);
//                     setPublisherClicked(!publisherClicked);
//                     onSearch('', 'publisher');
//                     setPublisherSearch('');
//                   }}
//                 >
//                   <Text style={{ fontWeight: '600' }}>{item.name}</Text>
//                 </TouchableOpacity>
//               );
//             }}
//           />
//         </View>
//         )}

//       {route.params?.languageList &&
//         (<View>
//           <TextInput
//             placeholder="Search.."
//             value={languageSearch}
//             ref={searchRef}
//             onChangeText={txt => {
//               onSearch(txt, 'language');
//               setLanguageSearch(txt);
//             }}
//             style={{
//               width: '90%',
//               height: 65,
//               alignSelf: 'center',
//               borderWidth: 0.2,
//               borderColor: '#8e8e8e',
//               borderRadius: 7,
//               marginTop: 20,
//               paddingLeft: 20,
//             }}
//           />

//           <FlatList
//             data={languageData}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item, index }) => {
//               return (
//                 <TouchableOpacity
//                   style={{
//                     width: '85%',
//                     alignSelf: 'center',
//                     height: 50,
//                     justifyContent: 'center',
//                     borderBottomWidth: 0.5,
//                     borderColor: '#8e8e8e',
//                   }}
//                   onPress={() => {
//                     setSelectedLanguage(item.name);
//                     setLanguageClicked(!languageClicked);
//                     onSearch('', 'language');
//                     setLanguageSearch('');
//                   }}
//                 >
//                   <Text style={{ fontWeight: '600' }}>{item.name}</Text>
//                 </TouchableOpacity>
//               );
//             }}
//           />
//         </View>
//         )}

//       {route.params?.formatList &&
//         (<View>
//           <TextInput
//             placeholder="Search.."
//             value={formatSearch}
//             ref={searchRef}
//             onChangeText={txt => {
//               onSearch(txt, 'formats');
//               setFormatSearch(txt);
//             }}
//             style={{
//               width: '90%',
//               height: 65,
//               alignSelf: 'center',
//               borderWidth: 0.2,
//               borderColor: '#8e8e8e',
//               borderRadius: 7,
//               marginTop: 20,
//               paddingLeft: 20,
//             }}
//           />

//           <FlatList
//             data={formatData}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item, index }) => {
//               return (
//                 <TouchableOpacity
//                   style={{
//                     width: '85%',
//                     alignSelf: 'center',
//                     height: 50,
//                     justifyContent: 'center',
//                     borderBottomWidth: 0.5,
//                     borderColor: '#8e8e8e',
//                   }}
//                   onPress={() => {
//                     setSelectedFormat(item.name);
//                     setFormatClicked(!formatClicked);
//                     onSearch('', 'formats');
//                     setFormatSearch('');
//                   }}
//                 >
//                   <Text style={{ fontWeight: '600' }}>{item.name}</Text>
//                 </TouchableOpacity>
//               );
//             }}
//           />
//         </View>
//         )}

//       {route.params?.libraryList &&
//         (<View>
//           <TextInput
//             placeholder="Search.."
//             value={libSearch}
//             ref={searchRef}
//             onChangeText={txt => {
//               onSearch(txt, 'library');
//               setLibSearch(txt);
//             }}
//             style={{
//               width: '90%',
//               height: 65,
//               alignSelf: 'center',
//               borderWidth: 0.2,
//               borderColor: '#8e8e8e',
//               borderRadius: 7,
//               marginTop: 20,
//               paddingLeft: 20,
//             }}
//           />

//           <FlatList
//             data={libData}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item, index }) => {
//               return (
//                 <TouchableOpacity
//                   style={{
//                     width: '85%',
//                     alignSelf: 'center',
//                     height: 50,
//                     justifyContent: 'center',
//                     borderBottomWidth: 0.5,
//                     borderColor: '#8e8e8e',
//                   }}
//                   onPress={() => {
//                     setSelectedLibrary(item.name);
//                     setLibClicked(!libClicked);
//                     onSearch('', 'library');
//                     setLibClicked('');
//                   }}
//                 >
//                   <Text style={{ fontWeight: '600' }}>{item.name}</Text>
//                 </TouchableOpacity>
//               );
//             }}
//           />
//         </View>
//         )}
//     </View>
//   );
// };




// export default Search;





// ================sanjeev work======================================


import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useRoute } from '@react-navigation/native';


const Search = ({ route, navigation }) => {
  const { genreList, book,authorList, publisherList, languageList, formatList, libraryList } = route.params;
  const [selectedGenre, setSelectedGenre] = useState("Genre");
  const [selectedPublisher, setSelectedPublisher] = useState("Publisher");
  const [publishr, setPublishr] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("Author");
  const [authr, setAuthr] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("Language");
  const [language, setLanguage] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState("Format");
  const [selectedLibrary, setSelectedLibrary] = useState("Library");

  // Add state variables for genre filtering
  const [genreData, setGenreData] = useState('');
  const [genreClicked, setGenreClicked] = useState(false);
  const [genreSearch, setGenreSearch] = useState('');

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

  // Add state variables for genre filtering
  const [formatData, setFormatData] = useState([]);
  const [formatClicked, setFormatClicked] = useState(false);
  const [formatSearch, setFormatSearch] = useState('');

  // Add state variables for genre filtering
  const [libData, setLibData] = useState([]);
  const [libClicked, setLibClicked] = useState(false);
  const [libSearch, setLibSearch] = useState('');


  const [books, setBooks] = useState([]);
  const [isLoaded, setisLoaded] = useState(true);
  const [filteredBooks, setFilteredBooks] = useState([]);

  
  
  const filteredGenResults=(item)=>{
    let filteredGenre = item !== 'Genre' ? (book.filter((book) =>
    book.genres.some((genr) => genr.name === item)
  )) : [];
    navigation.navigate('filterData',{filteredGenre,book});
    
  }


  const filteredAuthResults=(item)=>{
    let filteredAuthor = item !== 'Author' ? (book.filter((book) =>
    book.authors.some((authr) => authr.first_name + "" + authr.last_name === item)
  )) : [];
    navigation.navigate('filterData',{ filteredAuthor,book});
    
  }


  const filteredPublishResults=(item)=>{
    console.log(item);
    let filteredPublisher = item !== 'Publisher' ? (book.filter((book) =>
    Array.isArray(book.items) &&
    book.items.some((item1) => item1.publisher && item1.publisher.name === item)

  )) : [];
    navigation.navigate('filterData',{ filteredPublisher,book});
    
  }



  const filteredLangResults=(item)=>{
    let filteredLanguage = item !== 'Languages' ? (book.filter((book) =>
    Array.isArray(book.items) && book.items.some((item1) => item1.language.language_name === item)
  )) : [];
    navigation.navigate('filterData',{ filteredLanguage,book});
    
  }



  const filteredformResults=(item)=>{
    console.log(item);
    
    let filteredFormat = item !== 'Format' ? (book.filter((book) =>
    Array.isArray(book.items) && book.items.some((item1) => item1.format === item)
  )) : [];
    navigation.navigate('filterData',{ filteredFormat,book});
   // console.log(filteredFormat);
  }

  const filteredLibResults=(item)=>{
    let filteredLibrary = item !== 'Library' ? (book.filter((book) =>
    book.library_id ===  item
  )) : [];
    navigation.navigate('filterData',{ filteredLibrary,book});
    
  }

  // const filteredGenResults=(item)=>{
  //   let filteredGenre = item !== 'Genre' ? (book.filter((book) =>
  //   book.genres.some((genr) => genr.name === item)
  // )) : [];
  //   navigation.navigate('filterData',{filteredGenre,book});
    
  // }



// if (selectedAuthor ) { 
  // let filteredAuthResults = books.filter((book) =>
  //   book.authors.some((authr) => authr.first_name + "" + authr.last_name === selectedAuthor)
  // );
  //   setFilteredBooks(filteredAuthResults);
  // }


  // if (selectedPublisher !== "Publisher") { 
  // let filteredPublishResults = books.filter((book) =>
  //   Array.isArray(book.items) && book.items.some((item) => item.publisher.name === selectedPublisher)
  // );
  // let filteredPublishResults = books.filter((book) =>
  //   Array.isArray(book.items) &&
  //   book.items.some((item) => item.publisher && item.publisher.name === selectedPublisher)
  // );

  // }
  // if (selectedLanguage !== "Language") {
  // let filteredLangResults = books.filter((book) =>
  //   Array.isArray(book.items) && book.items.some((item) => item.language.language_name === selectedLanguage)
  // );
  // }
  // if (selectedFormat !== "Format") {
  // let filteredformResults = books.filter((book) =>
  //   Array.isArray(book.items) && book.items.some((item) => item.format === selectedFormat)
  // );
  // }
  // if (selectedLibrary !== "Library") {
  // let filteredLibResults = books.filter((book) =>
  //   book.library_id === selectedLibrary
  // );
  // }
  // }
  // console.log(filteredBooks);





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
        setGenreData(tempData.map((genre) => ({ id: genre, name: genre })));
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
        setLanguageData(templang.map(language => ({ id: language, name: language })));
      }
      else if (type === 'format') {
        let tempformat = formatList.filter(
          (item) => item.toLowerCase().indexOf(search.toLowerCase()) > -1
        );
        setFormatData(tempformat.map(format => ({ id: format, name: format })));
      }
      else if (type === 'library') {
        let templib = libraryList.filter(
          (item) => item.toLowerCase().indexOf(search.toLowerCase()) > -1
        );
        setLibData(templib.map(library => ({ id: library, name: library })));
      }

    }
  };




  return (

    <View style={{ flex: 1 }}>

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

          <FlatList
            data={genreData}
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
                    // setGenreClicked(!genreClicked);
                    onSearch('', 'genre');
                    setGenreSearch('');
                    
                    // navigation.navigate('filterData', {selectedGenre,book});
                    filteredGenResults(item.name);
                  }}
                >
                 
                  <Text style={{ fontWeight: "600" }}>{item.name}</Text>
                </TouchableOpacity>


               
              

             
             
              );
            }}
          />
        </View>)}

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

          <FlatList
            data={authorData}
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
                    setSelectedAuthor(item.name);
                    setAuthorClicked(!authorClicked);
                    onSearch('', 'author');
                    setAuthorSearch('');
                    // navigation.navigate('filterData', { filteredAuthResults });
                    filteredAuthResults(item.name);
                  }}
                >
                  <Text style={{ fontWeight: "600" }}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
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

          <FlatList
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
                    // navigation.navigate('filterData', { filteredPublishResults });
                    filteredPublishResults(item.name);
                  }}
                >
                  <Text style={{ fontWeight: '600' }}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
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

          <FlatList
            data={languageData}
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
                    // navigation.navigate('filterData', { filteredLangResults });
                    filteredLangResults(item.name);
                  }}
                >
                  <Text style={{ fontWeight: '600' }}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        )}

      {route.params?.formatList &&
        (<View style={{ flex: 1 }}>
          <TextInput
            placeholder="Search.."
            value={formatSearch}
            ref={searchRef}
            onChangeText={txt => {
              onSearch(txt, 'formats');
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

          <FlatList
            data={formatData}
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
                    onSearch('', 'formats');
                    setFormatSearch('');
                    // navigation.navigate('filterData', { filteredformResults });
                    filteredformResults(item.id);
                  }}
                >
                  <Text style={{ fontWeight: '600' }}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
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

          <FlatList
            data={libData}
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
                    // navigation.navigate('filterData', { filteredLibResults });
                    filteredLibResults(item.id);
                  }}
                >
                  <Text style={{ fontWeight: '600' }}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        )}



    </View>
  );
};




export default Search;