// import React, { useState, useEffect, useContext } from 'react';
// import { View, Text, ScrollView, StyleSheet } from 'react-native';
// import Header from '../common/Header';
// import { useDispatch, useSelector } from 'react-redux';
// import { useRoute } from '@react-navigation/native';
// import { AuthContext } from '../context/AuthContext';
// import { historyBooks } from '../redux/slice/BookHistorySlice';

// const MyEBook = ({ navigation }) => {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const dispatch = useDispatch();
//   const route = useRoute();
//   const { userToken } = useContext(AuthContext);

//   const booksHistory = useSelector((state) => state.bookHistory.data);

//   useEffect(() => {
//     const selectedBookData = route.params.data;
//     const getBooksHistory = () => {
//       fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books")
//         .then((res) => res.json())
//         .then((response) => {
//           dispatch(historyBooks(response.data));
//           setIsLoaded(true);
//         })
//         .catch((error) => {
//           console.error("Error fetching book history:", error);
//         });
//     };
//     getBooksHistory();
//   }, [dispatch]);

//   return (
//     <View style={{ flex: 1, backgroundColor: '#fff' }}>
//       <Header
//         rightIcon={require('../images/Logoelibrary.png')}
//         leftIcon={require('../images/menu.png')}
//         onClickLeftIcon={() => {
//           navigation.openDrawer();
//         }}
//       />
//       <View style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
//         <Text style={{ fontSize: 20, fontFamily: 'Philosopher-Bold', color: '#000' }}>E-Books</Text>
//       </View>
//       <View style={{ marginTop: 8, marginLeft: 130, width: 100, height: 3, backgroundColor: '#fff3cd', justifyContent: 'center' }}></View>

//       <ScrollView horizontal={true} contentContainerStyle={{ columnGap: 50 }}>
//         <View style={{ backgroundColor: '#fff', marginTop: 15 }}>
//           <ScrollView >
//           <View style={styles.table}>
//             <View style={styles.tableHeader}>
//               <Text style={styles.columnHeader}>LIBRARY</Text>
//               <Text style={styles.columnHeader}>ISBN</Text>
//               <Text style={styles.columnHeader}>Book Name</Text>
//               <Text style={styles.columnHeader}>Language</Text>
//               <Text style={styles.columnHeader}>Author</Text>
//               <Text style={styles.columnHeader}>Action</Text>
//             </View>
//             {isLoaded && booksHistory.map((item) => (
//               <View style={styles.tableRow} key={item.id}>
//                 <Text style={styles.tableCell}>{item.library_id}</Text>
//                 <Text style={[styles.tableCell, styles.isbnCell]}>{item.isbn}</Text>
//                 <Text numberOfLines={3} ellipsizeMode="tail" style={styles.tableCell}>{item.name}</Text>
//                 <Text style={styles.tableCell}>{/* Add language here */}</Text>
//                 <Text style={styles.tableCell}>{/* Add author here */}</Text>
//                 <Text style={styles.tableCell}>{/* Add action here */}</Text>
//               </View>
//             ))}
//             </View>
//           </ScrollView>
//         </View>
//       </ScrollView>

//       {!isLoaded && <Text>Loading...</Text>}
//     </View>
//   );
// };

// export default MyEBook;

// const styles = StyleSheet.create({
//   table: {
//     backgroundColor: '#fff',
//     width: '100%',
//   },
//   tableHeader: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#000',
//     justifyContent: 'space-between',
//   },
//   columnHeader: {
//     fontWeight: 'bold',
//     flex: 1,
//     color: '#000',
//   },
//   tableRow: {
//     flexDirection: 'row',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//    // borderBottomWidth: 1,
//     //alignItems:'center',
//     justifyContent: 'space-between',
//   },
//   tableCell: {
//     flex: 1,
//     color: '#000',
//   },
//   isbnCell: {
//     flex: 2, // Adjust the flex value to set the width of the ISBN column
//   },
// });






//============================== i m using this code=======================


// import React, { useState, useEffect, useContext } from 'react';
// import { View, Text, ScrollView, StyleSheet } from 'react-native';
// import Header from '../common/Header';
// import { useDispatch, useSelector } from 'react-redux';
// import { useRoute } from '@react-navigation/native';
// import { AuthContext } from '../context/AuthContext';
// import { viewBooks ,subscribeToBook, unsubscribeFromBook} from '../redux/slice/BooksDetailSlice';
// import { Table, TableWrapper, Row, Col } from 'react-native-table-component';
// import moment from 'moment';
// const MyEBook = ({ navigation }) => {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const dispatch = useDispatch();
//   const route = useRoute();
//   const { userToken, } = useContext(AuthContext);

//   const book = useSelector((state) => state.book.subscribedBooks);

//   // const userSubscriptions = useSelector((state) => state.bookHistory.data) || []; // Provide an empty array as a default
//   // Filter the booksHistory array to include only subscribed books
//   // const subscribedBooks = subscribedBooks.filter((book) =>
//   // book.includes(book.isbn)
//   // );
//   // const subscribedBooks = useSelector((state) => state.book.subscribedBooks);

//   console.log(book );

//   useEffect(() => {
//     const selectedBookData = route.params.data;
//     const getBooksHistory = () => {
//       fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books")
//         .then((res) => res.json())
//         .then((response) => {
//           dispatch(viewBooks(response.data));
//           setIsLoaded(true);
//         })
//         .catch((error) => {
//           console.error("Error fetching book history:", error);
//         });
//     };
//     getBooksHistory();
//   }, [dispatch]);

//   const state = {
//     tableHead: ['LIBRARY', 'ISBN', 'Book Name', 'Language', 'Author', 'Action'],
//     widthArr: [130, 130, 300, 130, 130, 130], // Adjust the column widths as needed
//   };

//   const tableData = isLoaded
//     ? book.map((item) => [item.library_id, item.isbn, item.name, '', '', '']) // Fill in language, author, and action
//     : [];

//   // Render the content only when the user is logged in
//   if (userToken === null) {
//     return (
//       <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
//         <Text>You need to log in to view this page.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={{ flex: 1, backgroundColor: '#fff' }}>
      
//       <Header
//         rightIcon={require('../images/Logoelibrary.png')}
//         leftIcon={require('../images/menu.png')}
//         onClickLeftIcon={() => {
//           navigation.openDrawer();
//         }}
//       />
//       <View style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
//         <Text style={{ fontSize: 20, fontFamily: 'Philosopher-Bold', color: '#000' }}>E-Books</Text>
//       </View>
//       <View style={{ marginTop: 8, marginLeft: 130, width: 100, height: 3, backgroundColor: '#fff3cd', justifyContent: 'center' }}></View>
//       <View style={{ flex: 1, backgroundColor: '#fff3cd', marginTop: 15 }}>
//         <ScrollView horizontal={true} contentContainerStyle={{ columnGap: 50 }}>
//           <View style={{ backgroundColor: '#fff', marginTop: 15,marginLeft:15,marginRight:15 }}>

//             <Table borderStyle={{ borderWidth: 1, borderColor: '#fff' }}>
//               <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={{ textAlign: 'center', fontWeight: 'bold', color: '#000' }} />
//             </Table>
//             <ScrollView style={styles.dataWrapper}>
//               <Table borderStyle={{ borderWidth: 1, borderColor: '#fff' }}>
//                 {tableData.map((rowData, index) => (
//                   <Row
//                     key={index}
//                     data={rowData}
//                     widthArr={state.widthArr}
//                     style={[styles.row, index % 2 && { backgroundColor: '#fff' }]}
//                     textStyle={styles.text}
//                   />
//                 ))}
//               </Table>
//             </ScrollView>

//           </View>
//         </ScrollView>
//       </View>
//       {!isLoaded && <Text>Loading...</Text>}
//     </View>
//   );
// };

// export default MyEBook;

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 17, paddingTop: 30, backgroundColor: '#fff' },
//   header: { height: 50, backgroundColor: '#fff', fontWeight: 'bold' },
//   text: { textAlign: 'center', fontWeight: '400', fontSize: 15 },
//   dataWrapper: { marginTop: -1 },
//   row: { height: 40, backgroundColor: '#fff' },
// });



//=====================================//==============================================//





//MyEbooks.js
// import React ,{useEffect, useState ,useContext} from 'react';
// import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
// import { useSelector,useDispatch } from 'react-redux';
// import { useRoute,useNavigation  } from '@react-navigation/native';
// import { viewBooks ,subscribeToBook, unsubscribeFromBook} from '../redux/slice/BooksDetailSlice';


// const MyEbooks = () => {
//   const [books, setBooks] = useState([]);
//   const [isLoaded, setisLoaded] = useState(true);
//   const route = useRoute();
//   const dispatch = useDispatch();

//   const subscribedBooks = useSelector((state) => state.book.subscribedBooks);
//   console.log(subscribedBooks )


  // useEffect(() => {
  //   const getbooks = () => {
  //     fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books")

  //       .then(res => res.json())
  //       //  .then(responce => console.log(responce));
  //       .then(responce => {
  //         // console.log(JSON.stringify(items) + ' ' +items.data.length);
  //         //console.log(responce.data);
  //         // console.log('Image : ' + responce.data.image);
  //         setBooks(responce.data);
  //         setisLoaded(false);
  //         dispatch(viewBooks(responce));

  //       });
  //   };
  //   getbooks();
  // }, []);


  // useEffect(() => {
  //   // Fetch book details for the subscribed ISBN numbers here
  //   const fetchBookDetails = async () => {
  //     try {
  //       const bookDetails = await Promise.all(
  //         subscribedBooks.map(async (isbn) => {
  //           const response = await fetch(`https://dindayalupadhyay.smartcitylibrary.com/api/v1/books/${isbn}`);
  //           const data = await response.json();
  //           return data; // Return the book details for each ISBN
  //         })
  //       );
  //       setBooks(bookDetails);
  //       setisLoaded(false);
  //     } catch (error) {
  //       console.error('Error fetching book details:', error);
  //     }
  //   };

  //   if (subscribedBooks.length > 0) {
  //     fetchBookDetails();
  //   }
  // }, [subscribedBooks]);



  // useEffect(() => {
  //     // Access the selected book's data from route.params.data
  //     // const selectedBookData = route.params.data;
  //     const getBooksHistory = () => {
  //       fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/ebook-subscription")
  //         .then((res) => res.json())
  //         .then((response) => {
  //           setBooks(response.data)
  //           dispatch( subscribeToBook(response.data));
            
  //          setisLoaded(false); // Set isLoaded to true when data is fetched
  //         })
  //         .catch((error) => {
  //           console.error("Error fetching book history:", error);
  //         });
  //     };
  //     getBooksHistory();
  //   }, []);



//   return (
//     <View style={{ flex: 1, backgroundColor: '#fff' }}>
//       <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 20 }}>My Ebooks</Text>
//       {isLoaded ? (
//         <Text style={{ textAlign: 'center', fontSize: 16 }}>Loading...</Text>
//       ) : (
//         <FlatList
//           keyExtractor={(item) => item.isbn}
//           data={books}
//           renderItem={({ item }) => (
            
//               <View style={{ padding: 10 }}>
//                 <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.isbn}</Text>
//                 {/* <Text style={{ fontSize: 16 }}>{item.authors[0].first_name} {item.authors[0].last_name}</Text> */}
//                 {/* Add more book details as needed */}
//               </View>
            
//           )}
//         />
//       )}
//     </View>
//   );
// };


//   return (
//     <View style={{ flex: 1, backgroundColor: '#fff' }}>
//       <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 20 }}>My Ebooks</Text>
//       {subscribedBooks.length === 0 ? (
//         <Text style={{ textAlign: 'center', fontSize: 16 }}>
//           You haven't subscribed to any books yet.
//         </Text>
//       ) : (
       
//         <FlatList
//           data={subscribedBooks}
         
//           keyExtractor={(item) => item.isbn}
//           renderItem={({ item }) => (
//             <View style={{ padding: 10 }}>
//               {/* Display book details here based on the subscribed book data */}
//               {/* You can fetch the book details based on 'item' */}
              
//               <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.isbn}</Text>
//               <Text style={{ fontSize: 16 }}>{item.library_id}</Text>
//               {/* Add more details as needed */}
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// export default MyEbooks;




//===================================practice=============================



import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../common/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { viewBooks, subscribeToBook, unsubscribeFromBook } from '../redux/slice/BooksDetailSlice';
import { Table, Row } from 'react-native-table-component';


const MyEBook = ({ navigation }) => {
  // const [books, setBooks] = useSelector((state) => state.book.data);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const route = useRoute();
  const { userToken, member } = useContext(AuthContext);
  const books = useSelector((state) => state.book.subscribedBooks);
  const [subscriptionData, setSubscriptionData] = useState([]);
 // const navigation = useNavigation(); // Get the navigation object

 console.log("Books:", books);
  useEffect(() => {
    const getbooks = () => {
      fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books")
        .then(res => res.json())
        .then(responce => {
          // setBooks(responce.data);
          setIsLoaded(false);
          dispatch(viewBooks(responce));
        });
    };
    getbooks();
  }, []);

  
  
  
  const handleSubscribe = (library_id,isbn,name,language,author) => {
    const isAlreadySubscribed = subscriptionData.some((item) => {
      return (
        item.email === member.email &&
        item.library_id === route.params.data.library_id &&
        item.ebook_id === route.params.data.id
      );
    });

    if (isAlreadySubscribed) {
      // User is already subscribed, implement the unsubscribe logic here if needed.
      // ...
    } else {
      const newSubscription = {
        email: member.email,
        library_id: route.params.data.library_id,
        ebook_id: route.params.data.id,
      };

      setSubscriptionData([...subscriptionData, newSubscription]);

      // Navigate to the MyEBook page after subscribing
      navigation.navigate('MyEBook'); // Replace 'MyEBook' with the actual screen name
    }
  };

  
  
  
  const state = {
    tableHead: ['LIBRARY', 'ISBN', 'Book Name', 'Language', 'Author', 'Action'],
    widthArr: [130, 130, 300, 130, 130, 130],
  };

  const tableData = books.map((item) => 
  //{
   // console.log("Item:", item);
    //return
    [
    item.library_id,
    item.isbn,
    item.name,
    '',
    '',
    <TouchableOpacity onPress={() => handleSubscribe( item.library_id,item.isbn,item.name)}>
      <Text style={{ color: 'red' }}>Subscribe</Text>
    </TouchableOpacity>,
  ]
//}
);
  console.log("table data is : "+tableData);

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
      <View style={{ marginTop: 8, marginLeft: 130, width: 100, height: 3, backgroundColor: '#fff3cd', justifyContent: 'center' }}></View>
      <View style={{ flex: 1, backgroundColor: '#fff3cd', marginTop: 15 }}>
        <ScrollView horizontal={true} contentContainerStyle={{ columnGap: 50 }}>
          <View style={{ backgroundColor: '#fff', marginTop: 15, marginLeft: 15, marginRight: 15 }}>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#fff' }}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={{ textAlign: 'center', fontWeight: 'bold', color: '#000' }} />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{ borderWidth: 1, borderColor: '#fff' }}>
                {tableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
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
      {!isLoaded && <Text>Loading...</Text>}
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
});


//=========================================================================