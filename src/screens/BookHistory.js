import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Pressable, ScrollView, TextInput, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import Header from '../common/Header';
import { AuthContext } from '../context/AuthContext';
import { Table, Row } from 'react-native-table-component';
import Feather from 'react-native-vector-icons/Feather';


const BookHistory = ({ navigation }) => {
  const [booksHistory, setBooksHistory] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const { userToken } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  // =================  for table view ============================
  useEffect(() => {

    const apiUrl = 'https://dindayalupadhyay.smartcitylibrary.com/api/v1/books-history';

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
        setBooksHistory(data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const handleUnreserve = (item) => {

    console.log(item);


    const url = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/books/${item.book_item_id}/un-reserve-book`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // console.log("responce is:", response);
        return response.json();
      })
      .then((responseData) => {
        // console.log('Data stored successfully:', responseData);
        setSelectedBook(responseData);
        setModalVisible(!modalVisible);
      })


      .catch((error) => {
        console.error('Error storing data:', error);
      });
  }

  //-----------------for convertion of date to personalized style date ----------------------------
  function formatDate(inputDate) {

    const inputDateObj = new Date(inputDate);


    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];


    const day = inputDateObj.getDate();
    const month = monthNames[inputDateObj.getMonth()];
    const year = inputDateObj.getFullYear();


    let daySuffix;
    if (day >= 11 && day <= 13) {
      daySuffix = 'th';
    } else {
      switch (day % 10) {
        case 1:
          daySuffix = 'st';
          break;
        case 2:
          daySuffix = 'nd';
          break;
        case 3:
          daySuffix = 'rd';
          break;
        default:
          daySuffix = 'th';
      }
    }


    const formattedDate = `${day}${daySuffix} ${month}, ${year}`;

    return formattedDate;
  }



  const state = {
    tableHead: ['LIBRARY', 'Book Name ', 'Book Code', 'Issue Date', 'Issue Due Date ', 'Reserve Data ',
      'Return Due Date', 'Return Date', 'Status', 'Action'],
    widthArr: [210, 190, 120, 120, 130, 130, 130, 130, 130, 130],
  };

  const updatedTableData = booksHistory
    .filter((book) => {
      const bookName = book.book_item.book.name.toLowerCase();
      const bookCode = book.book_item.book_code.toLowerCase();
      const query = searchQuery.toLowerCase();
      return bookName.includes(query) || bookCode.includes(query);
    })



    .map((book) =>
      [
        book.book_item.book.library_id === 111 ? (<Text style={{ marginLeft: 10,  fontSize: 15,}}>Dindayal Upadhyay Library</Text>)
          : (book.book_item.book.library_id === 222 ? (<Text style={{ marginLeft: 10,  fontSize: 15,}}>Kundanlal Gupta Library</Text>) :
            (<Text style={{ marginLeft: 10,  fontSize: 15,}}>Rashtramata Kasturba Library</Text>)),

        book.book_item.book.name,
        book.book_item.book_code,

        book.issued_on === null ? (<Text style={{ textAlign: 'center' }}>N/A</Text>) : (null),

        formatDate(book.issue_due_date),
        formatDate(book.reserve_date),

        book.return_due_date === null ? (<Text style={{ textAlign: 'center' }}>N/A</Text>) : (null),

        book.return_date === null ? (<Text style={{ textAlign: 'center' }}>N/A</Text>) : (null),

        book.status === 1 ?
          (<Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#c27b7f', fontSize: 15, }}>Reserved</Text>) :
          (<Text style={{ color: "#1998ff", fontWeight: 'bold', textAlign: 'center' }}>Unreserved</Text>),

        book.status !== 1 ? null : (<TouchableOpacity style={{ backgroundColor: '#c27b7f', borderRadius: 5, marginRight: 15, alignItems: 'center', justifyContent: 'center' }}
          onPress={() => {
            setSelectedBook(book);
            setModalVisible(!modalVisible)
          }}><Text style={{ padding: 6, textAlign: 'center', color: '#fff', fontSize: 15, fontWeight: 'bold' }}>UNRESERVE</Text></TouchableOpacity>)
      ]
    );
   
  
    return (
    <View style={{ flex: 1, backgroundColor: '#fff', }}>
      <Header
        rightIcon={require('../images/Logoelibrary.png')}
        leftIcon={require('../images/menu.png')}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {

          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{
              marginBottom: 5,
              textAlign: 'center',
              fontFamily: 'Philosopher-Bold',
              fontSize: 15
            }}>Unreserve a book</Text>
            <Text style={styles.modalText}>Are you sure you want to unreserve  </Text>
           
            <View style={{ flexDirection: 'row', gap: 10 }}>


              <Pressable
                style={styles.button}
                onPress={() => handleUnreserve(selectedBook)}>
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>

              <Pressable
                style={styles.button}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>No</Text>
              </Pressable>
            </View>


          </View>
        </View>
      </Modal>



      <View style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 20, fontFamily: 'Philosopher-Bold', color: '#000' }}>Book History</Text>
      </View>
      <View style={{ marginTop: 8, marginLeft: 130, width: 100, height: 3, backgroundColor: '#fff3cd', justifyContent: 'center' }}></View>
      <View style={{ flex: 1, backgroundColor: '#fff3cd', marginTop: 15 }}>
        {/* ==================search======================= */}
        <View style={styles.searchcontainer}>
          <View style={styles.searchBar}>
            <Feather name="search" color={"gray"} size={20} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by Book Name or Book Code"
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
          <View style={{ backgroundColor: '#fff3cd', marginTop: 15 }}>


            <View style={{ flex: 1, backgroundColor: '#fff3cd', paddingTop: -60 }}>


              <View style={{ backgroundColor: '#fff', marginTop: 15, marginLeft: 15, marginRight: 10 }}>

                <Table borderStyle={{ borderWidth: 1, borderColor: '#fff' }}>
                  <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={{ textAlign: 'center', fontWeight: 'bold', color: '#000' }} />
                </Table>
                <ScrollView style={styles.dataWrapper}>
                  <Table borderStyle={{ borderWidth: 1, borderColor: '#fff', }}>
                    {updatedTableData.map((book, index) => (
                      <Row
                        key={index}
                        data={book}
                        widthArr={state.widthArr}
                        style={[styles.row, index % 2 && { backgroundColor: '#fff' }]}
                        textStyle={styles.text}
                      />
                    ))}
                  </Table>
                </ScrollView>
              </View>

            </View>

          </View>

        </ScrollView>



      </View>


    </View>
  );
};

export default BookHistory;
const styles = StyleSheet.create({
  Details: {
    fontWeight: 'bold',
    paddingLeft: 80,
    color: '#000'
  },
  container: { flex: 1, padding: 20, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#fff', fontWeight: 'bold' },
  text: { textAlign: 'center', fontWeight: '400', fontSize: 15 },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#fff' },



  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    backgroundColor: '#c27b7f',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 5,
    textAlign: 'center',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    fontSize: 15,
  },
  searchcontainer: {
    marginTop: 10,
    marginLeft: 10,
    padding: 5,
    width: '93%',
    height: 50,
    backgroundColor: '#fff3cd'
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: 'gray',
    paddingHorizontal: 12,

  },
})





























