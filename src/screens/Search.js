import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useRoute } from '@react-navigation/native';


const Search = ({ route,navigation }) => {
  const { genreList, authorList, publisherList, languageList, formatList, libraryList } = route.params;
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


  // ===================to get list===============
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
        (item)=> item.toLowerCase().indexOf(search.toLowerCase()) > -1
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
        (<View>
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
                    setGenreClicked(!genreClicked);
                    onSearch('', 'genre');
                    setGenreSearch('');
                    navigation.navigate('filterData');
                  }}
                >
                  <Text style={{ fontWeight: "600" }}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>)}

      {route.params?.authorList &&
        (<View>
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
        (<View>
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
        (<View>
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
        (<View>
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
        (<View>
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