

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity,TextInput } from 'react-native';
import Header from '../common/Header';
import { useRoute } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { Table, Row } from 'react-native-table-component';
import Feather from 'react-native-vector-icons/Feather';


const MyEBook = ({ navigation }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [Ebooks, setEbooks] = useState([]);
  const [AllEbooks, setAllEbooks] = useState([]);
  const route = useRoute();
  const { userToken,  userEmail,} = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const getbooks = () => {
      fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/e-books")
        .then(res => res.json())
        .then(responce => {
          setIsLoaded(false);
          setAllEbooks(responce.data);

        });
    };

    const ebookSubscription = () => {
      fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/ebook-subscription")
        .then(res => res.json())
        .then(responce => {
          setIsLoaded(false);
          setEbooks(responce.data);
          //setSubscriptionData(route.params.data);
          // setSubscribe(route.params.data);

        });
    };

    getbooks();
    ebookSubscription();
  }, []);



  const state = {
    tableHead: ['LIBRARY', 'ISBN', 'Book Name', 'Author', 'Language', 'Action'],
    widthArr: [130, 130, 300, 130, 130, 130],
  };


   const itemsValue =
    AllEbooks.length && Ebooks.length
      ? AllEbooks
        .filter((item, i) =>

          Ebooks.find(
            (esub) =>
              item.id === esub.ebook_id &&
              item.library_id === esub.library_id &&
              esub.email === userEmail
          )
        )
        
      : [];

  const updatedTableData = itemsValue
  .filter((item) => {
    // Step 4: Filter the data based on the search query
    const bookName = item.name.toLowerCase();
    const bookCode = item.authors.toLowerCase();
    const language = item.language_name.toLowerCase();
    const query = searchQuery.toLowerCase();
    return bookName.includes(query) || bookCode.includes(query) || language.includes(query);
  })
  
  .map((item) =>
    [
      item.library_id,
      item.isbn_no,
      item.name,
      item.authors,
      item.language_name,
      <TouchableOpacity onPress={()=>{navigation.navigate("ReadeBook",{data:item})

      }}>
      <Text style={{ color: '#fff', textAlign: 'center',backgroundColor:'#c27b7f',marginLeft:20,marginRight:20,fontWeight:'bold',borderRadius:5,padding:5}}>Read</Text>
      </TouchableOpacity>
    ]
  );

  
  if (userToken === null) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
        <Text>You need to log in to view this page.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header
        rightIcon={require('../images/Logoelibrary.png')}
        leftIcon={require('../images/menu.png')}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
      />
      <View style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 20, fontFamily: 'Philosopher-Bold', color: '#000' }}>E-Books</Text>
      </View>
      <View style={{ marginTop: 8, marginLeft: 130, width: 100, height: 3, backgroundColor: '#fff3cd',
       justifyContent: 'center' }}></View>
     
      <View style={{ flex: 1, backgroundColor: '#fff3cd', marginTop: 15 }}>

{/* ==================search======================= */}
<View style={styles.searchcontainer}>
            <View style={styles.searchBar}>
              <Feather name="search" color={"gray"} size={20} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by Book Name, Author, Language"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />

              {searchQuery !== '' && (
                <TouchableOpacity onPress={() => {
                  setSearchQuery('');

                }}>
                  <Feather name="x" color={"gray"} size={20} style={styles.searchIcon} />
                </TouchableOpacity>)}
            </View>
          </View>
 {/* ===================================================================== */}    

        <ScrollView horizontal={true} contentContainerStyle={{ columnGap: 50 }}>
          <View style={{ backgroundColor: '#fff', marginTop: 15, marginLeft: 15, marginRight: 15 }}>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#fff' }}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} 
              textStyle={{ textAlign: 'center', fontWeight: 'bold', color: '#000' }} />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{ borderWidth: 1, borderColor: '#fff' }}>
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
  );
};

export default MyEBook;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 17, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#fff', fontWeight: 'bold' },
  text: { textAlign: 'center', fontWeight: '400', fontSize: 15 },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#fff' },

  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    fontSize: 15,
  },
  searchcontainer: {
    marginTop:10,
    marginLeft:10,
    padding: 5,
    width: '95%',
    height: 50,
    backgroundColor: '#fff3cd'
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: 'gray',
    paddingHorizontal: 3,

  },
}); 