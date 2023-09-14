
import React, { useState, useEffect, } from "react";
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, FlatList, Image, ActivityIndicator, VirtualizedList } from "react-native";
import { Picker } from '@react-native-picker/picker';
import Feather from 'react-native-vector-icons/Feather';
import Header from "../common/Header";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

const Books = ({ navigation }) => {
  const [selectedGenre, setSelectedGenre] = useState("Search By Genre");
  const [selectedPublisher, setSelectedPublisher] = useState("Search By Publisher");
  const [selectedAuthor, setSelectedAuthor] = useState("Search By Author");
  const [selectedLanguage, setSelectedLanguage] = useState("Search By Language");
  const [selectedFormat, setSelectedFormat] = useState("Search By Format");
  const [selectedLibrary, setSelectedLibrary] = useState("Search By Library");

  const [books, setBooks] = useState([]);
  const [isLoaded, setisLoaded] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");

  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;



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
          setisLoaded(false);
          //dispatch(viewBooks(responce));

        });
    };
    getbooks();
  }, []);



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
    console.log('Searching for:', searchQuery);
  };
  // =================================================================
  const genres = [
    "Genre",
    "Art",
    "Biography",
    "Business",
    "Comics",
    "Contemporary",
    "Crime",
    "Fantasy",
    "Fiction",
    "Novels",
    "History",
    "Horror",
    "Humor and Comedy",
    "Music",
    "Mystery",
    "Nonfiction",
    "Philosophy",
    "Poetry",
    "Psychology",
    "Religion",
    "Romance",
    "Science",
    "Educational",
    "Civil service",
    "Mathematics",
    "Suspense",
    "Spirituality",
    "Sports",
    "Thriller",
    "Travel",
    "Economics",
    "Politics",
    "Atlas",
    "Banking",
    "Physics",
    "General Knowledge",
    "Story",
    "Polity",
    "Biology",
    "Chemistry",
    "UPSC"
  ];
  const publishers = [
    "Publisher",
    "Penguin Random House",
    "McGraw-Hill Education",
    "HarperCollins",
    "Egmont Books",
    "Shueisha",
    "Kodansha",
    "Pearson Education",
    "Egmont Group",
    "Klett",
    "Jaico Publishing House",
    "Westland Publications",
    "Hachette Livre",
    "Scholastic",
    "Disha Publication",
    "Roli Books",
    "Rupa Publications",
    "Hachette India",
    "Aleph Book Company",
    "Pan Macmillan India",
    "24by7Publishing",
    "Pothi",
    "Cinnamon Teal Publishing",
    "Become Shakespeare",
    "Leadstart Publishing",
    "Fingerprint Publishing",
    "Petals Publishers",
    "Srishti Publishers",
    "APK Publishers",
    "Pustak Mahal",
    "S. Chand Publishing",
    "Arihant Prakashan",
    "Nirali Prakashan",
    "Mir Publishers Moscow",
    "Mehta Publishing House",
    "Maharashtra board",
    "Maharashtra Rajya Sahitya and Sanskrutik Mandal",
    "Study Circle",
    "Sakal Publisher",
    "Ramesh Publishing House",
    "Orient BlackSwan Pvt. Ltd.",
    "Oswaal Books And Learning Private Limited",
    "Spectrum",
    "NCERT",
    "Unique Publishers",
    "Shriram IAS"
  ];
  const authors = [
    "Author",
    "ErnestHemingway",
    "StephenKing",
    "J. K.Rowling",
    "JeffGoins",
    "ArundhatiRoy",
    "ChetanBhagat",
    "DurjoyDatta",
    "Amit MAgrawal",
    "ManoharPandey",
    "DishaExperts",
    "YukioMishima",
    "DanielleSteel",
    "WilliamShakesphere",
    "AmartyaSen",
    "L.JSmith",
    "disha",
    "AndrewAziz",
    "LaurelKing",
    "Dishanull",
    "ArihantExperts",
    "E.A VanderVeer",
    "JamesCLear",
    "Francisscott",
    "AjitKumar",
    "A.B.Savadi",
    "I EIrodov",
    "ShivajiSawant",
    "MehtaPublication",
    "VP",
    "V.S.",
    "V.S.Khandekar",
    "V.P.Kale",
    "Er. VaibhavSingh",
    "SiddharthMittal",
    "MLaxmikanth",
    "Dr.Anand",
    "NihitKishore",
    "RakeshKumar",
    "ChangdevBhavanrao",
    "EknathPatil",
    "SakalEditorial",
    "RPHEditorial",
    "RakeshKumar",
    "AB",
    "PS",
    "vidyadhibhaski",
    "vidyadhibhaski",
    "डॉ.रामचंद्र",
    "NitinSinghania",
    "NeetuGaikwad",
    "DeepikaSingla",
    "VarunBali",
    "VivekSharma",
    "VivekSharma",
    "Shri.Da.",
    "SiddharthMukherji",
    "Dr.Rashmi",
    "RajeshVerma",
    "SatyaPrakash",
    "MajidHusain",
    "BipanChandra",
    "Jaikishan",
    "Premkishan",
    "Dr.PriyaGoyal",
    "MohitSharma",
    "RohitRaj",
    "TusharShukla",
    "OswaalEditorial",
    "VikasJain",
    "DKJha",
    "A.B.Savdi",
    "P.S.kolekar",
    "DBSingh",
    "DBSingh",
    "SanjeevKumar",
    "RavishankarSinha",
    "R.K",
    "RajanRajesh",
    "KafilAhamd",
    "RajeshRajan",
    "JanmejaySahani",
    "AmibhRanjan",
    "VikasKumar",
    "PraveenKumar",
    "RajanSharma",
    "VaibhavAnand",
    "KhushbooSharma",
    "Dr.Bharat",
    "RashiChauhan",
    "Md.Imam",
    "KiranJeswara",
    "KALPANABHARGAV",
    "GOVINDTHAKUR",
    "MOHITKHANNA",
    "DCPandey",
    "AB",
    "Dr.S",
    "Dr.S",
    "Dr.S",
    "AB",
    "Dr. S. K.Goyal",
    "A BSavadi",
    "AmitM.",
    "AmitM.",
    "Amit M.Agarwal",
    "arihaaaauihwiuebwuiey",
    "MrunalPatel",
    "VijayTiwari",
    "ArunSharma",
    "MeenakshiUpadhyay",
    "PrakashPawar",
    "NarayanHari",
    "BhauDharmadhikari",
    "Dr.Muhammad",
    "Dr.Muhammad",
    "Dr.MUhammadAjam",
    "SandyaPurecha",
    "Shree hariVasudev Gonarkar",
    "Dr. MuhammadAjam",
    "D. Y.Deshpande",
    "Shree BalkobaBhave",
    "Dr. VishvasPatil",
    "DKDeshpande",
    "RajivAhir",
    "Dr.Ramesh",
    "RS",
    "Mrunal",
    "Dr.Rajendra",
    "VinayakT.",
    "Dr.RajendraMagar",
    "VinayakT.Patil",
    "ALBasham",
    "NormanLowe",
    "SanjivVerma",
    "Dr.P.V.Khandekar",
    "Dr.PrabhakarKute",
    "वामनरावचोरघडे",
    "पंडितारमाबाई",
    "वामनशास्त्रीबा.भागवत",
    "सुबोधजावडेकर",
    "VisionExpert",
    "ShriramIAS experts"
  ];
  const languages = [
    "Language",
    "English",
    "Gujarati",
    "Marathi",
    "Urdu",
    "Spanish",
    "Portuguese",
    "French",
    "German",
    "Chinese",
    "Italian",
    "Norwegian",
    "Russian",
    "Dutch",
    "Swedish",
    "Arabic",
    "Greek",
    "Japanese",
    "Korean",
    "Hindi"
  ];
  const formats = ["Format", "Book", "E-Book"];
  const libraries = [
    "Library",
    "Dindayal Upadhyay Library",
    "Kundanlal Gupta Library",
    "Rashtramata Kasturba Library"
  ];






  // -------------------------All books===================
  const AllBooks = () => {
    return (
      <View>
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
              {genres.map((genre, index) => (
                <Picker.Item key={index} label={genre} value={genre} />
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
              {publishers.map((publisher, index) => (
                <Picker.Item key={index} label={publisher} value={publisher} />
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
              {authors.map((author, index) => (
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
              {languages.map((language, index) => (
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
                <Picker.Item key={index} label={format} value={format} />
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
                <Picker.Item key={index} label={library} value={library} />
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
              setSelectedAuthor("");
              setSelectedFormat("");
              setSelectedGenre("");
              setSelectedLanguage("");
              setSelectedLibrary("");
              setSelectedPublisher("");
            }}
          >
            <Text style={{
              color: '#fff',
              fontWeight: '700',
              fontSize: 18
            }}>Reset</Text>

          </TouchableOpacity>
        </View>
{/* ===All books=========================== */}
        <View style={{ flexDirection: 'row', marginVertical: 5, justifyContent: 'center', marginLeft: 15, marginRight: 15, }}>
          <Text style={styles.coroselheading}>Our Books Collection</Text>
        </View>

        <View style={{ marginTop: 10, marginStart: 10, backgroundColor: '#fff' }}>

          <FlatList
            keyExtractor={(item) => item.id.toString()}
            // data={books}
            data={books.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
            // getItemCount={() => books.length}
            // getItem={(books, index) => books[index]}
            renderItem={({ item, id }) =>

              <TouchableOpacity onPress={() => {
                navigation.navigate('BooksDetailPage', { data: item, id })
                // {data:item}
              }}>
                <View style={{
                  width: 182,
                  height: 260,
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
                  </View>
                  <View style={{ padding: 10, }}>
                    <Text style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: '#000'
                    }} numberOfLines={2}>
                      {item.name}
                    </Text>

                    <Text style={{
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
                    }}>Book</Text>
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
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            style={styles.paginationButton}
            onPress={() => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
              }
            }}
          >
            <Text style={styles.paginationText}>Previous</Text>
          </TouchableOpacity>
          <Text style={styles.paginationText}>
            Page {currentPage} of {Math.ceil(books.length / itemsPerPage)}
          </Text>
          <TouchableOpacity
            style={styles.paginationButton}
            onPress={() => {
              if (currentPage < Math.ceil(books.length / itemsPerPage)) {
                setCurrentPage(currentPage + 1);
              }
            }}
          >
            <Text style={styles.paginationText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>


    );
  };
  // ------------------------------------------


  return (
    <View style={styles.container}>
      <Header
        rightIcon={require('../images/Logoelibrary.png')}
        leftIcon={require('../images/back.png')}
        onClickLeftIcon={() => {

          navigation.goBack();
        }}

      />
      {/* =================search============= */}
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
        (<ActivityIndicator size="large" color="#c27b7f" />) :

        (<FlatList
          style={{ marginBottom: 10 }}
          keyExtractor={(item) => item.id.toString()}
          data={searchResults}
          ListFooterComponent={<AllBooks />}
          renderItem={({ item }) => (
            // Render each search result item here
            <TouchableOpacity onPress={() => navigation.navigate('BooksDetailPage', { data: item })}>
              <View style={{ padding: 5, marginLeft: 10 }}>

                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#000', marginBottom: 10 }} >
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          numColumns={1}
          contentContainerStyle={{ columnGap: 10 }}
        />
        )}

      {/*================== dropdown====================== */}
      {/* <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 20 }}> */}
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
              {genres.map((genre, index) => (
                <Picker.Item key={index} label={genre} value={genre} />
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
              {publishers.map((publisher, index) => (
                <Picker.Item key={index} label={publisher} value={publisher} />
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
              {authors.map((author, index) => (
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
              {languages.map((language, index) => (
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
                <Picker.Item key={index} label={format} value={format} />
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
                <Picker.Item key={index} label={library} value={library} />
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
              setSelectedAuthor("");
              setSelectedFormat("");
              setSelectedGenre("");
              setSelectedLanguage("");
              setSelectedLibrary("");
              setSelectedPublisher("");
            }}
          >
            <Text style={{
              color: '#fff',
              fontWeight: '700',
              fontSize: 18
            }}>Reset</Text>

          </TouchableOpacity>
        </View> */}


      {/* ================All books=================   */}

      {/* <View style={{ flexDirection: 'row', marginVertical: 5, justifyContent: 'center', marginLeft: 15, marginRight: 15, }}>
          <Text style={styles.coroselheading}>Our Books Collection</Text>
        </View>

        <View style={{ marginTop: 10, marginStart: 10, backgroundColor: '#fff' }}>

        <FlatList
            keyExtractor={(item) => item.id.toString()}
            // data={books}
            data={books.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
            // getItemCount={() => books.length}
            // getItem={(books, index) => books[index]}
            renderItem={({ item,id }) =>
            
              <TouchableOpacity onPress={() => {
                navigation.navigate('BooksDetailPage', { data: item,id })
                // {data:item}
              }}>
                <View style={{
                  width: 182,
                  height: 260,
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
                  </View>
                  <View style={{ padding: 10, }}>
                    <Text style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: '#000'
                    }} numberOfLines={2}>
                      {item.name}
                    </Text>

                    <Text style={{
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
                    }}>Book</Text>
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

        </View> */}




      {/* =====================pagination controls to navigate between pages=================== */}
      {/* <View style={styles.paginationContainer}>
  <TouchableOpacity
    style={styles.paginationButton}
    onPress={() => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }}
  >
    <Text style={styles.paginationText}>Previous</Text>
  </TouchableOpacity>
  <Text style={styles.paginationText}>
    Page {currentPage} of {Math.ceil(books.length / itemsPerPage)}
  </Text>
  <TouchableOpacity
    style={styles.paginationButton}
    onPress={() => {
      if (currentPage < Math.ceil(books.length / itemsPerPage)) {
        setCurrentPage(currentPage + 1);
      }
    }}
  >
    <Text style={styles.paginationText}>Next</Text>
  </TouchableOpacity>
</View> */}



      {/* </ScrollView> */}
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
});


export default Books;