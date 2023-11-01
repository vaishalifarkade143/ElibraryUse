
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, FlatList } from 'react-native';
import Header from '../common/Header';
import { Table, Row } from 'react-native-table-component';
import { Picker } from '@react-native-picker/picker';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../context/AuthContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Resources = () => {
  
  const [genr, setGenr] = useState([]);
  const [AllOption, setAllOption] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("Search By Genre");
  const { userToken } = useContext(AuthContext);
    
  const mapCategoryToInt = (categoryName) => {
    switch (categoryName) {
      case "Video":
        return 1;
      case "PDF":
        return 2;
      case "Audio":
        return 3;
      case "Excel":
        return 4;
      default:
        return 0; // Default to 0 or another appropriate value
    }
  };  


    const state = {
        tableHead: ['Title', 'Category', 'URL' ,'Description', 'Action'],
        widthArr: [150, 100, 150, 200, 100],
      };

      //==================to get categories in dropdown==========================

      useEffect(() => {
        // Fetch the list of genres from your API
         fetch('https://dindayalupadhyay.smartcitylibrary.com/api/resources-category')
           .then(response => response.json())
           .then(data => setGenr(["Search By Genre", ...data.data.map(genres => genres.name)]))
           // Assuming the API response has a "data" field with an array of genres
           .catch(error => console.error('Error fetching genres:', error));
       }, []);


// =================================get data in table=================================================

useEffect(() => {
  const apiUrl = 'https://dindayalupadhyay.smartcitylibrary.com/api/resources';

  fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${userToken}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return response.json();
    })
    .then((data) => {
      // Filter the data based on the selected genre
      
      let filteredData = data.data;
      console.log("data is :",data.data);
      

      // if (selectedGenre !== "Search By Genre") {
      //   filteredData = data.data.filter((item) => 
      //   item.category_id === parseInt(selectedGenre));
      // }


      const selectedGenreInt = mapCategoryToInt(selectedGenre);
      console.log("selected  selectedGenreInt:", typeof selectedGenreInt); 
      
      if (selectedGenre !== "Search By Genre") {
        filteredData = data.data.filter((item) =>
          item.category_id === selectedGenreInt
        );
      }

      console.log("selected genre type:", typeof selectedGenre); 
      console.log("selected genre:", selectedGenre);
      console.log("Filtered Data:", filteredData);

      setAllOption(filteredData);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}, [userToken, selectedGenre]);



  function getCategoryText(category_id) {
    switch (category_id) {
      case 1:
        return (
          <MaterialCommunityIcons name="video" color={"#fff"} size={20} style={styles.searchIcon} />
          // <Text style={styles.categoryText}>Video</Text>
        );
      case 2:
        return (
          <Text style={styles.categoryText}>Read</Text>
        );
      case 3:
        return (
          <MaterialIcons name="audiotrack" color={"#fff"} size={20} style={styles.searchIcon} />
          // <Text style={styles.categoryText}>Audio</Text>
        );
        case 4:
          return (
            <Text style={styles.categoryText}>Downloads</Text>
          );
      default:
        return (
          <Text style={styles.categoryText}>null</Text>
        );
    }
  }

  const updatedTableData = AllOption ? AllOption.map((item) => [
    item.title,
    item.category_id,
    item.url === null?(<Text style={{textAlign:'center'}}>N/A</Text>):(<Text>null</Text>),
    item.note,
    getCategoryText(item.category_id),
  
  ]) : [];

  const resetGenre = () => {
    setSelectedGenre("Search By Genre");
  };

  return (
    <View style={{ flex: 1 }}>
    <Header
      rightIcon={require('../images/Logoelibrary.png')}
      leftIcon={require('../images/menu.png')}
      onClickLeftIcon={() => {
        navigation.openDrawer();
      }}
    />
    <ScrollView>
      <Text style={{
        fontFamily: 'Philosopher-Bold',
        fontSize: 27,
        fontWeight: '600',
        color: '#000',
        textAlign: 'center',
        marginTop: 20
      }}>Resources</Text>
      <View style={{
        marginTop: 0,
        width: 110,
        height: 2,
        backgroundColor: '#c27b7f',
        alignItems: 'center',
        marginLeft: 125,
      }}></View>

      <View style={{
        backgroundColor: '#fff3cd',
        marginTop: 20,
        flexDirection: 'column',
        marginBottom: 50,
        paddingBottom: 20,
      }}>

        <View style={{ 
        marginTop:20,
        marginLeft:15,
        marginRight:10,
        flexDirection:'row'}}>
           
            <View style={{
              borderColor: '#000',
              borderWidth: 0.5,
              borderRadius: 8,
              width: '60%',
              height: 40,backgroundColor:"#fff"
            }}>
             
            <Picker style={{ marginTop: -5 }}
                      selectedValue={selectedGenre}
                      onValueChange={(itemValue) => setSelectedGenre(itemValue)}
             >
              
                {genr.map((genres, index) => (
                  <Picker.Item key={index} label={genres} value={genres} />
                ))}
              </Picker>


            </View> 
            

            <TouchableOpacity
              style={{
                backgroundColor: '#c27b7f',
                alignItems: 'center',
                padding: 5,
                borderRadius: 5,
                width: '30%',
                height: 40,
                marginLeft: 15,
               
              }}
              onPress={resetGenre} 
            >
              <Text style={{
                color: '#fff',
                fontWeight: '700',
                fontSize: 18
              }}>Reset</Text>

            </TouchableOpacity>
        </View>

        

        {/* =================search============= */}
        <View style={{
          padding: 5,
          width: '70%',
          height: 50,
          backgroundColor: '#fff3cd',
          marginTop: 20,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: 'gray',
            paddingHorizontal: 12,
            marginLeft: 10,

          }}>

            <Feather name="search" color={"gray"} size={20} style={{ marginRight: 8, }} />
            <TextInput
              style={{
                flex: 1,
                fontSize: 16,
              }}
              placeholder="Search a Book"
              spellCheck={false}
              //value={searchQuery}
              onChangeText={(Text) => {
                // setSearchQuery(Text);
                // handleSearch();

              }}
            />

            {/* {searchQuery !== '' && ( */}
            <TouchableOpacity onPress={() => {
              // setSearchQuery('');
              // setSearchResults('');

            }}>
              <Feather name="x" color={"gray"} size={20} style={{ marginRight: 8, }} />
            </TouchableOpacity>
            {/* )} */}

          </View>
        </View>
        {/* Display search results */}

        {/* table */}
        <View style={{ flex: 1, backgroundColor: '#fff3cd', marginTop: 15 }}>
          <ScrollView horizontal={true} contentContainerStyle={{ columnGap: 50 }}>
            <View style={{ backgroundColor: '#fff', marginTop: 15, marginLeft: 15, marginRight: 15 }}>
              <Table borderStyle={{ borderWidth: 1, borderColor: '#fff' }}>
                <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={{ textAlign: 'center', fontWeight: 'bold', color: '#000' }} />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{ borderWidth: 1, borderColor: '#fff',}}>
                
                    {updatedTableData.map((item, index) => (
                      <Row
                        key={index}
                        data={item}
                        widthArr={state.widthArr}
                        style={[styles.row, index % 2 && { backgroundColor: '#fff' }]}
                        textStyle={styles.text}
                      />
                    ))}

                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        </View>


      </View>
    </ScrollView>

  </View>

);
};
  

export default Resources;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 17, paddingTop: 30, backgroundColor: '#fff' },
    header: { height: 50, backgroundColor: '#fff', fontWeight: 'bold' },
    text: { textAlign: 'center', fontWeight: '400', fontSize: 15 },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#fff',marginRight:20,},
    loadingText: {
      fontSize: 20,
      textAlign: 'center',
    },
    categoryText: {
      textAlign: 'center',
      color:'#fff',
      fontWeight:'bold',
      backgroundColor: '#c27b7f',
      marginLeft: 15,
      padding: 8,
      borderRadius: 5,
    },
    searchIcon: {
      marginRight: 8,
      backgroundColor:'#c27b7f',
      borderRadius: 5,
      marginLeft: 25,
      paddingBottom:5,
      paddingTop:5,
      textAlign: 'center',
    },
  }); 
  












  