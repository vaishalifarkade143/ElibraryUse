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


//======================= practice by prachi===============================









import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../common/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { Table, Row } from 'react-native-table-component';
import moment from 'moment';


const MyEBook = ({ navigation }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [Ebooks, setEbooks] = useState([]);
  const [AllEbooks, setAllEbooks] = useState([]);
  const route = useRoute();
  const { userToken,  userEmail,} = useContext(AuthContext);
  // const { data, subscribedBooks } = route.params;
  const{subscribe,setSubscribe} = ([]);
  
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



  console.log("itemsValue:", itemsValue);

  // //Create a row to display the data from route.params.data
  // const routeData = [
  //   route.params.data.library_id,
  //   route.params.data.isbn,
  //   route.params.data.name,
  //  `${route.params.data.authors[0].first_name} ${route.params.data.authors[0].last_name}`,
  //  route.params.data.items[0].language.language_name,
  //   // <Text style={{ color: 'blue', textAlign: 'center' }}>Subscribed</Text>
  // ];

  // const updatedTableData = [routeData, ...itemsValue.map((item) =>
  //   [
  //     item.library_id,
  //     item.isbn_no,
  //     item.name,
  //     item.authors,
  //     item.language_name,
  //     // <Text style={{ color: 'red', textAlign: 'center' }}>Subscribed</Text>
  //   ]
  // )];



  const updatedTableData = itemsValue.map((item) =>
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



  // console.log("table data is : "+tableData);
  // Combine the routeData row with the existing tableData
  // const updatedTableData = [routeData, ...TableData];

  
  
  if (userToken === null) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
        <Text>You need to log in to view this page.</Text>
      </View>
    );
  }

  // console.log("data is:", route.params.data);
  
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
}); 