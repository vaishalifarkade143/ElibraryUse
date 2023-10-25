

// import React, { useState, useEffect, useContext } from 'react';
// import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native';
// import Header from '../common/Header';
// // import { useDispatch, useSelector } from 'react-redux'; // Import useSelector to access Redux state
// import { useRoute } from '@react-navigation/native';
// import { AuthContext } from '../context/AuthContext';
// // import { historyBooks } from '../redux/slice/BookHistorySlice';

// const BookHistory = ({ navigation }) => {
//   // const [booksHistory, setBooksHistory] = useState([]);
//   const [isLoaded, setIsLoaded] = useState(false); // Initialize isLoaded as false
//   // const dispatch = useDispatch();
//   const route = useRoute();
//   const { userToken } = useContext(AuthContext);

//   // Access the booksHistory data from the Redux store
//   // const booksHistory = useSelector((state) => state.book.data);

//  const booksHistory =[];
//   // ================== Fetch book history data ==================


//   useEffect(() => {
//     // Access the selected book's data from route.params.data
//     const selectedBookData = route.params.data;
//     const getBooksHistory = () => {
//       fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/ebook-subscription")
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
//   }, []);
//   // }, [dispatch]);


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
//         <Text style={{ fontSize: 20, fontFamily: 'Philosopher-Bold', color: '#000' }}>Book History</Text>
//       </View>
//       <View style={{ marginTop: 8, marginLeft: 130, width: 100, height: 3, backgroundColor: '#fff3cd', justifyContent: 'center' }}></View>

//       <ScrollView horizontal={true} contentContainerStyle={{columnGap:50}}>
//         <View style={{  backgroundColor: '#fff3cd',marginTop:15}}>

//           <View style={{ flexDirection: 'row', paddingBottom:10,paddingLeft: 10, paddingTop: 10, marginTop: 20, backgroundColor: '#fff', }}>

//             <Text style={{ fontWeight: 'bold',color:'#000' }}>LIBRARY </Text>
//             <Text style={styles.Details}>Book Name </Text>
//             <Text style={styles.Details}>Book Code </Text>
//             <Text style={styles.Details}>Issue Date </Text>
//             <Text style={styles.Details}>Issue Due Date </Text>
//             <Text style={styles.Details}>Researve Data </Text>
//             <Text style={styles.Details}>Rerurn Due Date </Text>
//             <Text style={styles.Details}>Return Date </Text>
//             <Text style={styles.Details}>Status </Text>
//             <Text style={styles.Details}>Action </Text>

//           </View>
//           <View style={{ marginTop: 2,backgroundColor:'#fff'}}>

//             {/* Render book history data here */}
//             {isLoaded &&
//               booksHistory.map((book) => (
//                 <View key={book.id}>
//                   <View style={{ flexDirection: 'row', }}>
//                   <Text style={{ fontSize:15  ,marginLeft:20,marginTop:5}}> {book.library_id}</Text>
//                   <Text style={{ fontSize:15,  marginLeft: 60, marginTop:5}}> {book.name}</Text>
//                   <Text style={{ fontSize:15,  marginLeft: 60, marginTop:5}}> {book.library_id}</Text>
//                   <Text style={{ fontSize:15,  marginLeft: 60, marginTop:5}}> {book.library_id}</Text>
//                   <Text style={{ fontSize:15,  marginLeft: 60, marginTop:5}}> {book.name}</Text>
//                   <Text style={{ fontSize:15,  marginLeft: 60, marginTop:5}}> {book.name}</Text>
//                   <Text style={{ fontSize:15,  marginLeft: 60, marginTop:5}}> {book.name}</Text>
//                   <Text style={{ fontSize:15,  marginLeft: 60, marginTop:5}}> {book.name}</Text>
//                   <Text style={{ fontSize:15,  marginLeft: 60, marginTop:5}}> {book.name}</Text>
//                   <Text style={{ fontSize:15,  marginLeft: 60, marginTop:5}}> {book.name}</Text>
//                   </View>
//                 </View>

//               ))}

//           </View>

//         </View>

//       </ScrollView>

//       {/* loading indicator if data is not loaded */}
//       {!isLoaded && <Text>Loading...</Text>}
//     </View>
//   );
// };

// export default BookHistory;
// const styles = StyleSheet.create({
//   Details: {
//     fontWeight: 'bold',
//      paddingLeft: 60,
//      color:'#000'
//   }
// })




























import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, Button } from 'react-native';
import Header from '../common/Header';
// import { useRoute } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { Table, Row } from 'react-native-table-component';


const BookHistory = ({ navigation }) => {
  const [booksHistory, setBooksHistory] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true); // Initialize isLoaded as false

  const { userToken } = useContext(AuthContext);
  const [status,setStatus]=useState(true);






  







  // =================  for table view ============================
  useEffect(() => {
    // Fetch AllSubscribedPlan data
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
  }, [userToken]);
















  const handleUnreserve = (item) => {
   
      // console.log(item.book_item_id);
  

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
          console.log("responce is:", response);
          return response.json();
        })
        .then((responseData) => {
          console.log('Data stored successfully:', responseData);
          setStatus(false);
         
  
  
  
  
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
    widthArr: [190, 190, 120, 120, 130, 130, 130, 130, 130, 130],
  };

  const updatedTableData = booksHistory.map((book) =>
    [
      book.book_item.book.library_id === 111 ? (<Text>Dindayal Upadhyay Library</Text>) : (book.book_item.book.library_id === 222 ? (<Text>Kundanlal Gupta Library</Text>) : (<Text>Rashtramata Kasturba Library</Text>)),
      book.book_item.book.name,
      book.book_item.book_code, book.issued_on === null ? (<Text>N/A</Text>) : (null), formatDate(book.issue_due_date),
      formatDate(book.reserve_date), book.return_due_date === null ? (<Text>N/A</Text>) : (null),
      book.return_date === null ? (<Text>N/A</Text>) : (null), book.status === 1 ? (<Text>Reserved</Text>) : (<Text style={{color:"#1998ff",fontWeight:'bold'}}>Unreserved</Text>),
      // book.status === 1 ?(<Button style={{ fontSize: 15, marginLeft: 60 }} title="Unreserve" onPress={handleUnreserve(book.book_item_id,book.book_item.book.library_id)} />):null
      book.status !== 1 ?null:(<Button style={{ fontSize: 15, marginLeft: 60,backgroundColor:'#c27b7f' }} title="Unreserve" onPress={()=>handleUnreserve(book)} />)

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
      <View style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 20, fontFamily: 'Philosopher-Bold', color: '#000' }}>Book History</Text>
      </View>
      <View style={{ marginTop: 8, marginLeft: 130, width: 100, height: 3, backgroundColor: '#fff3cd', justifyContent: 'center' }}></View>

      <ScrollView horizontal={true} contentContainerStyle={{ columnGap: 50 }}>
        <View style={{ backgroundColor: '#fff3cd', marginTop: 15 }}>


          <View style={{ flex: 1, backgroundColor: '#fff3cd', marginTop: 15 }}>
            <ScrollView horizontal={true} contentContainerStyle={{ columnGap: 50 }}>
              <View style={{ backgroundColor: '#fff', marginTop: 15, marginLeft: 15, marginRight: 15 }}>
                <Table borderStyle={{ borderWidth: 1, borderColor: '#fff' }}>
                  <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={{ textAlign: 'center', fontWeight: 'bold', color: '#000' }} />
                </Table>
                <ScrollView style={styles.dataWrapper}>
                  <Table borderStyle={{ borderWidth: 1, borderColor: '#fff' }}>
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
            </ScrollView>
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
    paddingLeft: 80,
    color: '#000'
  },
  container: { flex: 1, padding: 20, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#fff', fontWeight: 'bold' },
  text: { textAlign: 'center', fontWeight: '400', fontSize: 15 },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#fff' },
})