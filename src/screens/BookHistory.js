

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native';
import Header from '../common/Header';
// import { useDispatch, useSelector } from 'react-redux'; // Import useSelector to access Redux state
import { useRoute } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
// import { historyBooks } from '../redux/slice/BookHistorySlice';

const BookHistory = ({ navigation }) => {
  // const [booksHistory, setBooksHistory] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); // Initialize isLoaded as false
  // const dispatch = useDispatch();
  const route = useRoute();
  const { userToken } = useContext(AuthContext);

  // Access the booksHistory data from the Redux store
  // const booksHistory = useSelector((state) => state.book.data);

 const booksHistory =[];
  // ================== Fetch book history data ==================
  

  useEffect(() => {
    // Access the selected book's data from route.params.data
    const selectedBookData = route.params.data;
    const getBooksHistory = () => {
      fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/ebook-subscription")
        .then((res) => res.json())
        .then((response) => {
          dispatch(historyBooks(response.data));
          setIsLoaded(true); // Set isLoaded to true when data is fetched
        })
        .catch((error) => {
          console.error("Error fetching book history:", error);
        });
    };
    getBooksHistory();
  }, []);
  // }, [dispatch]);

  
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', }}>
      <Header
        rightIcon={require('../images/Logoelibrary.png')}
        leftIcon={require('../images/menu.png')}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
      />
      <View style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 20, fontFamily: 'Philosopher-Bold', color: '#000' }}>Book History</Text>
      </View>
      <View style={{ marginTop: 8, marginLeft: 130, width: 100, height: 3, backgroundColor: '#fff3cd', justifyContent: 'center' }}></View>

      <ScrollView horizontal={true} contentContainerStyle={{columnGap:50}}>
        <View style={{  backgroundColor: '#fff3cd',marginTop:15}}>
        
          <View style={{ flexDirection: 'row', paddingBottom:10,paddingLeft: 10, paddingTop: 10, marginTop: 20, backgroundColor: '#fff', }}>
        
            <Text style={{ fontWeight: 'bold',color:'#000' }}>LIBRARY </Text>
            <Text style={styles.Details}>Book Name </Text>
            <Text style={styles.Details}>Book Code </Text>
            <Text style={styles.Details}>Issue Date </Text>
            <Text style={styles.Details}>Issue Due Date </Text>
            <Text style={styles.Details}>Researve Data </Text>
            <Text style={styles.Details}>Rerurn Due Date </Text>
            <Text style={styles.Details}>Return Date </Text>
            <Text style={styles.Details}>Status </Text>
            <Text style={styles.Details}>Action </Text>
           
          </View>
          <View style={{ marginTop: 2,backgroundColor:'#fff'}}>

            {/* Render book history data here */}
            {isLoaded &&
              booksHistory.map((book) => (
                <View key={book.id}>
                  <View style={{ flexDirection: 'row', }}>
                  <Text style={{ fontSize:15  ,marginLeft:20,marginTop:5}}> {book.library_id}</Text>
                  <Text style={{ fontSize:15,  marginLeft: 60, marginTop:5}}> {book.name}</Text>
                  <Text style={{ fontSize:15,  marginLeft: 60, marginTop:5}}> {book.library_id}</Text>
                  <Text style={{ fontSize:15,  marginLeft: 60, marginTop:5}}> {book.library_id}</Text>
                  <Text style={{ fontSize:15,  marginLeft: 60, marginTop:5}}> {book.name}</Text>
                  <Text style={{ fontSize:15,  marginLeft: 60, marginTop:5}}> {book.name}</Text>
                  <Text style={{ fontSize:15,  marginLeft: 60, marginTop:5}}> {book.name}</Text>
                  <Text style={{ fontSize:15,  marginLeft: 60, marginTop:5}}> {book.name}</Text>
                  <Text style={{ fontSize:15,  marginLeft: 60, marginTop:5}}> {book.name}</Text>
                  <Text style={{ fontSize:15,  marginLeft: 60, marginTop:5}}> {book.name}</Text>
                  </View>
                </View>

              ))}
        
          </View>
         
        </View>
        
      </ScrollView>
    
      {/* loading indicator if data is not loaded */}
      {!isLoaded && <Text>Loading...</Text>}
    </View>
  );
};

export default BookHistory;
const styles = StyleSheet.create({
  Details: {
    fontWeight: 'bold',
     paddingLeft: 60,
     color:'#000'
  }
})