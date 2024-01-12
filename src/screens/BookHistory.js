
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, Modal, TouchableOpacity, FlatList } from 'react-native';
import Header from '../common/Header';
import { AuthContext } from '../context/AuthContext';
import Feather from 'react-native-vector-icons/Feather';
import getStyles from '../Style/logNRegStyle';
import Theme from './Theme';

const BookHistory = ({ navigation }) => {
  const [booksHistory, setBooksHistory] = useState([]);
  const { userToken,userInfo } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {



    if (userToken !== null && userInfo.data.user.membership_plan_name !== null) {
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
      });}
  }, []);

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

  const handleUnreserve = (item) => {
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
        return response.json();
      })
      .then((responseData) => {
        setSelectedBook(responseData);
        setModalVisible(!modalVisible);
      })
      .catch((error) => {
        console.error('Error storing data:', error);
      });
  };

  const state = {
    tableHead: ['LIBRARY', 'Book Name ', 'Book Code', 'Issue Date', 'Issue Due Date ', 'Reserve Data ',
      'Return Due Date', 'Return Date', 'Status', 'Action'],
    widthArr: [210, 190, 120, 120, 130, 130, 130, 130, 130, 130],
  };

  const flatListData = booksHistory
    .filter((book) => {
      const bookName = book.book_item.book.name.toLowerCase();
      const bookCode = book.book_item.book_code.toLowerCase();
      const query = searchQuery.toLowerCase();
      return bookName.includes(query) || bookCode.includes(query);
    })
    .map((book) => ({
      library: book.book_item.book.library_id === 111
        ? 'Dindayal Upadhyay Library'
        : book.book_item.book.library_id === 222
          ? 'Kundanlal Gupta Library'
          : 'Rashtramata Kasturba Library',
      bookName: book.book_item.book.name,
      bookCode: book.book_item.book_code,
      // issueDate: book.issued_on ? formatDate(book.issued_on) : 'N/A',
      issueDueDate: formatDate(book.issue_due_date),
      reserveDate: formatDate(book.reserve_date),
      // returnDueDate: book.return_due_date ? formatDate(book.return_due_date) : 'N/A',
      // returnDate: book.return_date ? formatDate(book.return_date) : 'N/A',
      status: book.status === 1
        ? 'Reserved'
        : 'Unreserved',
      actionButton: book.status === 1
        ? {
          title: 'UNRESERVE',
          onPress: () => {
            setSelectedBook(book);
            setModalVisible(true);
          },
        }
        : null,
    }));

  const renderItem = ({ item }) => (
    <View style={styles.flatListItemContainer}>
       <Text style={{fontSize:20,fontFamily: 'Philosopher-Bold',color:'#000'}}>{item.bookName}</Text>
      <Text style={styles.flatListItemText}>{item.library}</Text>

     <View style={{flexDirection:'row'}}>
      <Text style={styles.ItemText}>ISBN : </Text>
      <Text style={styles.flatListItemText}>{item.bookCode}</Text>
      </View>
      {/* <Text style={styles.flatListItemText}>{item.issueDate}</Text> */}
      <View style={{flexDirection:'row'}}>
      <Text style={styles.ItemText}>Issue Due Date: </Text>
      <Text style={styles.flatListItemText}>{item.issueDueDate}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
      <Text style={styles.ItemText}>Reserve Date : </Text>
      <Text style={styles.flatListItemText}>{item.reserveDate}</Text>
      </View>
      {/* <Text style={styles.flatListItemText}>{item.returnDueDate}</Text> */}
      {/* <Text style={styles.flatListItemText}>{item.returnDate}</Text> */}
      <Text style={[styles.flatListItemText,{color:'blue'}]}>{item.status}</Text>
      {item.actionButton && (
        <TouchableOpacity
          style={styles.flatListActionButton}
          onPress={item.actionButton.onPress}
        >
          <Text style={styles.flatListActionButtonText}>{item.actionButton.title}</Text>
        </TouchableOpacity>
      )}
    </View>
  );

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
                  <Text style={styles.subscribeText}>Are you sure you want to unreserve </Text>
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
              <Text style={styles.sectionHeading}>Book History</Text>
            </View>
            <View style={[styles.dividerView, { width: 110, marginLeft: 130, }]}></View>
            <View style={{ flex: 1, backgroundColor: '#f5ebe6', marginTop: 15 }}>
              <View style={styles.searchcontainer}>
                <View style={styles.searchBar}>
                  <Feather name="search" color={"gray"} size={20} style={styles.searchIcon} />
                  <TextInput
                    style={styles.searchInput}
                    placeholderTextColor="#000"
                    placeholder="Search by Book Name or Book Code"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                  {searchQuery !== '' && (
                    <TouchableOpacity onPress={() => setSearchQuery('')}>
                      <Feather name="x" color={"gray"} size={20} style={[styles.searchIcon,]} />
                    </TouchableOpacity>)}
                </View>
              </View>
              <FlatList
                data={flatListData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />
            </View>
          </View>
        );
      }}
    </Theme>
  );
};

const styles = StyleSheet.create({
  // Define your styles here
  flatListItemContainer: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor:'#fff',
    borderRadius:5,
    marginLeft:10,marginRight:10
    // borderBottomColor: '#ccc',
  },
  flatListItemText: {
    // flex: 1,
    textAlign: 'center',
    color: '#2f4858',

  },
  flatListActionButton: {
    backgroundColor: '#c27b7f',
    borderRadius: 5,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatListActionButtonText: {
    padding: 6,
    textAlign: 'center',
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  ItemText:{
    fontSize:14,
    fontWeight:'bold',
    color:'#000'
  }
});

export default BookHistory;
