// import { View, Text } from 'react-native'
// import React from 'react'

// const Books = () => {
//   return (
//     <View>
//       <Text>Books</Text>
//     </View>
//   )
// }

// export default Books;

// 







import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Picker } from '@react-native-picker/picker';
import Feather from 'react-native-vector-icons/Feather';
import Header from "../common/Header";
import { ScrollView } from "react-native-gesture-handler";

const Books = ({ navigation }) => {
  const [selectedGenre, setSelectedGenre] = useState("Search By Genre");
  const [selectedPublisher, setSelectedPublisher] = useState(
    "Search By Publisher"
  );
  const [selectedAuthor, setSelectedAuthor] = useState("Search By Author");
  const [selectedLanguage, setSelectedLanguage] = useState(
    "Search By Language"
  );
  const [selectedFormat, setSelectedFormat] = useState("Search By Format");
  const [selectedLibrary, setSelectedLibrary] = useState("Search By Library");
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = () => {
    // search logic here 
    console.log('Searching for:', searchQuery);
  };

  const genres = [
    "Search By Genre",
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
    "Search By Publisher",
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
    "Search By Author",
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
    "Search By Language",
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
  const formats = ["Search By Format", "Book", "E-Book"];
  const libraries = [
    "Search By Library",
    "Dindayal Upadhyay Library",
    "Kundanlal Gupta Library",
    "Rashtramata Kasturba Library"
  ];

  return (
    <View style={styles.container}>
      <Header
        rightIcon={require('../images/Logoelibrary.png')}
        leftIcon={require('../images/back.png')}
        onClickLeftIcon={() => {

          navigation.goBack();
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 20 }}>

        <View style={{
          margin: 16,
          borderColor: '#000',
          borderWidth: 0.5,
          borderRadius: 8,
        }}>
          <Picker
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
          marginTop: 1,
          borderColor: '#000',
          borderWidth: 0.5,
          borderRadius: 8,
        }}>
          <Picker
            selectedValue={selectedPublisher}
            onValueChange={(itemValue) => setSelectedPublisher(itemValue)}
          >
            {publishers.map((publisher, index) => (
              <Picker.Item key={index} label={publisher} value={publisher} />
            ))}
          </Picker>
        </View>

        <View style={{ 
           margin: 16,
           marginTop: 1,
           borderColor: '#000',
           borderWidth: 0.5,
           borderRadius: 8,
         }}>
          <Picker
            selectedValue={selectedAuthor}
            onValueChange={(itemValue) => setSelectedAuthor(itemValue)}
          >
            {authors.map((author, index) => (
              <Picker.Item key={index} label={author} value={author} />
            ))}
          </Picker>
        </View>
        <View style={{
          margin: 16,
          marginTop: 1,
          borderColor: '#000',
          borderWidth: 0.5,
          borderRadius: 8,
        }}>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
          >
            {languages.map((language, index) => (
              <Picker.Item key={index} label={language} value={language} />
            ))}
          </Picker>
        </View>
        <View style={{
          margin: 16,
          marginTop: 1,
          borderColor: '#000',
          borderWidth: 0.5,
          borderRadius: 8,
        }}>
          <Picker
            selectedValue={selectedFormat}
            onValueChange={(itemValue) => setSelectedFormat(itemValue)}
          >
            {formats.map((format, index) => (
              <Picker.Item key={index} label={format} value={format} />
            ))}
          </Picker>
        </View>

        <View style={{
          margin: 16,
          marginTop: 1,
          borderColor: '#000',
          borderWidth: 0.5,
          borderRadius: 8,
        }}>
          <Picker
            selectedValue={selectedLibrary}
            onValueChange={(itemValue) => setSelectedLibrary(itemValue)}
          >
            {libraries.map((library, index) => (
              <Picker.Item key={index} label={library} value={library} />
            ))}
          </Picker>
        </View>
        <View style={styles.searchcontainer}>
          <View style={styles.searchBar}>

            <Feather name="search" color={"gray"} size={20} style={styles.searchIcon} />

            <TextInput
              style={styles.input}
              placeholder="Search a Book"
              spellCheck={false}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
          </View>
        </View>
        {/* <View style={{ alignItems: 'center' }}>
          <View style={{ marginVertical: 10, }}>
            <Button
              title="Reset"
              color="#c27b7f"
              onPress={() => {
                // Add your reset logic here
              }}
            />
          </View>
        </View> */}
        <TouchableOpacity
          style={{
            backgroundColor: '#c27b7f',
            alignItems: 'center',
            padding: 5,
            borderRadius: 5,
            width: '30%',
            height: 50,
            justifyContent: 'center',
            marginLeft: 150
          }}
          onPress={() => {

          }}
        >
          <Text style={{
            color: '#fff',
            fontWeight: '700',
            fontSize: 18
          }}>Reset</Text>

        </TouchableOpacity>


      </ScrollView>
    </View>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchcontainer: {
    padding: 15
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
});


export default Books;