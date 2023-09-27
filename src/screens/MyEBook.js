

// import React, { useState, useEffect, useContext } from 'react';
// import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native';
// import Header from '../common/Header';
// import { useDispatch, useSelector } from 'react-redux'; // Import useSelector to access Redux state
// import { useRoute } from '@react-navigation/native';
// import { AuthContext } from '../context/AuthContext';
// import { historyBooks } from '../redux/slice/BookHistorySlice';

// const MyEBook = ({ navigation }) => {
//   // const [booksHistory, setBooksHistory] = useState([]);
//   const [isLoaded, setIsLoaded] = useState(false); // Initialize isLoaded as false
//   const dispatch = useDispatch();
//   const route = useRoute();
//   const { userToken } = useContext(AuthContext);

//   // Access the booksHistory data from the Redux store
//   const booksHistory = useSelector((state) => state.bookHistory.data);

//   // ================== Fetch book history data ==================


//   useEffect(() => {
//     // Access the selected book's data from route.params.data
//     const selectedBookData = route.params.data;
//     const getBooksHistory = () => {
//       fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books")
//         .then((res) => res.json())
//         .then((response) => {
//           dispatch(historyBooks(response.data));
//           setIsLoaded(true); // Set isLoaded to true when data is fetched
//         })
//         .catch((error) => {
//           console.error("Error fetching book history:", error);
//         });
//     };
//     getBooksHistory();
//   }, [dispatch]);

//   return (
//     <View style={{ flex: 1, backgroundColor: '#fff', }}>
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

//       <ScrollView horizontal={true} contentContainerStyle={{columnGap:50}}>
//         <View style={{  backgroundColor: '#fff3cd',marginTop:15,}}>

//           <View style={{ flexDirection: 'row', paddingBottom:10,paddingLeft: 10,marginLeft:20,marginRight:20, paddingTop: 10, marginTop: 20, backgroundColor: '#fff', paddingRight:30}}>
//             <Text style={{ fontWeight: 'bold',color:'#000' }}>LIBRARY </Text>
//             <Text style={styles.Details}>ISBN </Text>
//             <Text style={styles.Details}>Book Name </Text>
//             <Text style={styles.Details}>language </Text>
//             <Text style={styles.Details}>Author</Text>
//             <Text style={styles.Details}>Action </Text>
//            </View>
// <ScrollView>
//           <View style={{ marginTop: 0,backgroundColor:'#fff',marginLeft:20,marginRight:20}}>
//            {/* Render book history data here */}
//             {isLoaded &&
//               booksHistory.map((item) => (
//                 <View key={item.id}>
//                   <View style={{ flexDirection: 'row', }}>
//                   <Text style={{ fontSize:15  ,marginLeft:20,marginTop:5}}> {item.library_id}</Text>
//                   <Text style={styles.Detailsget}> {item.isbn}</Text>
//                   <Text style={styles.Detailsget}> {item.name}</Text>
//                   <Text style={styles.Detailsget}> </Text>
//                   <Text style={styles.Detailsget}> </Text>
//                   <Text style={styles.Detailsget}></Text>
//                   </View>
//                 </View>
//               ))}
//         </View>
//         </ScrollView>
// </View>

//       </ScrollView>

//       {/* loading indicator if data is not loaded */}
//       {!isLoaded && <Text>Loading...</Text>}
//     </View>
//   );
// };

// export default MyEBook;
// const styles = StyleSheet.create({
//   Details: {
//     fontWeight: 'bold',
//      paddingLeft: 100,
//      color:'#000'
//   },
//   Detailsget:{
//     flex:1,
//     fontSize:15,  
//     marginLeft: 100,
//      marginTop:5
//   }
// })















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









// import React, { useState, useEffect, useContext } from 'react';
// import { View, Text, ScrollView, StyleSheet } from 'react-native';
// import Header from '../common/Header';
// import { useDispatch, useSelector } from 'react-redux';
// import { useRoute } from '@react-navigation/native';
// import { AuthContext } from '../context/AuthContext';
// import { historyBooks } from '../redux/slice/BookHistorySlice';
// import { Table, TableWrapper, Row } from 'react-native-table-component';

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

//   const state = {
//     tableHead: ['LIBRARY', 'ISBN', 'Book Name', 'Language', 'Author', 'Action'],
//     widthArr: [100, 100, 200, 100, 100, 100], // Adjust the column widths as needed
//   };

//   const tableData = isLoaded
//     ? booksHistory.map((item) => [item.library_id, item.isbn, item.name, '', '', '']) // Fill in language, author, and action
//     : [];

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
//           <ScrollView horizontal={true}>
//             <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
//               <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text} />
//             </Table>
//             <ScrollView style={styles.dataWrapper}>
//               <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
//                 {tableData.map((rowData, index) => (
//                   <Row
//                     key={index}
//                     data={rowData}
//                     widthArr={state.widthArr}
//                     style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
//                     textStyle={styles.text}
//                   />
//                 ))}
//               </Table>
//             </ScrollView>
//           </ScrollView>
//         </View>
//       </ScrollView>

//       {!isLoaded && <Text>Loading...</Text>}
//     </View>
//   );
// };

// export default MyEBook;

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
//   header: { height: 50, backgroundColor: '#537791' },
//   text: { textAlign: 'center', fontWeight: '100' },
//   dataWrapper: { marginTop: -1 },
//   row: { height: 40, backgroundColor: '#E7E6E1' },
// });






import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Header from '../common/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { historyBooks } from '../redux/slice/BookHistorySlice';
import { Table, TableWrapper, Row, Col } from 'react-native-table-component';

const MyEBook = ({ navigation }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const route = useRoute();
  const { userToken } = useContext(AuthContext);

  const booksHistory = useSelector((state) => state.bookHistory.data);

  useEffect(() => {
    // const selectedBookData = route.params.data;
    const getBooksHistory = () => {
      fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books")
        .then((res) => res.json())
        .then((response) => {
          dispatch(historyBooks(response.data));
          setIsLoaded(true);
        })
        .catch((error) => {
          console.error("Error fetching book history:", error);
        });
    };
    getBooksHistory();
  }, [dispatch]);

  const state = {
    tableHead: ['LIBRARY', 'ISBN', 'Book Name', 'Language', 'Author', 'Action'],
    widthArr: [130, 130, 300, 130, 130, 130], // Adjust the column widths as needed
  };

  const tableData = isLoaded
    ? booksHistory.map((item) => [item.library_id, item.isbn, item.name, '', '', '']) // Fill in language, author, and action
    : [];

  // Render the content only when the user is logged in
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
          <View style={{ backgroundColor: '#fff', marginTop: 15,marginLeft:15,marginRight:15 }}>

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