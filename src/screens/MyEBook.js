
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import Header from '../common/Header';
import { useRoute } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { Table, Row } from 'react-native-table-component';
import Feather from 'react-native-vector-icons/Feather';
import messaging from '@react-native-firebase/messaging';
import getStyles from '../Style/logNRegStyle';
import Theme from './Theme';

const MyEBook = ({ navigation, route }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [Ebooks, setEbooks] = useState([]);
  const [AllEbooks, setAllEbooks] = useState([]);
  // const route = useRoute();
  const { userToken, userEmail, userMemPlan, userInfo } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');

  const Plan_exist = route.params.singleSubscribedPlan;
  console.log('singleSubscribedPlan in MyEBook: ', Plan_exist);




  // ===================scheuled push notification=======================
  useEffect(() => {
    // ... your existing code

    const setupFirebaseMessaging = async () => {
      const fcmToken = await messaging().getToken();
      const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      });

      // Listen for messages when the app is in the background or closed
      const unsubscribeOnBackgroundMessage = messaging().setBackgroundMessageHandler(async remoteMessage => {
        // console.log('Background Message:', remoteMessage);
        // Handle background messages here
      });

      // Clean up listeners when the component unmounts
      return () => {
        unsubscribeOnMessage();
        unsubscribeOnBackgroundMessage();
      };
    };

    setupFirebaseMessaging();
  }, []);









  useEffect(() => {

    const member_id = userInfo.data.user.id;
    // console.log(member_id);

    const ebookSubscription = () => {
      fetch(`https://dindayalupadhyay.smartcitylibrary.com/api/v1/ebook-subscription/${member_id}`)
        .then(res => res.json())
        .then(responce => {
          setIsLoaded(false);
          setEbooks(responce.data);
          // console.log("in myebook page:", responce.data);
        });
    };

    ebookSubscription();
  }, []);


  // console.log('subscribedbooks', Ebooks);

  const state = {
    tableHead: ['LIBRARY', 'ISBN', 'Book Name', 'Author', 'Language', 'Action'],
    widthArr: [210, 130, 300, 130, 130, 130],
  };



  const updatedTableData = Ebooks
    .filter((item) => {

      const bookName = item.name.toLowerCase();
      const bookCode = item.authors.toLowerCase();
      // const language = item.language_name.toLowerCase();
      const query = searchQuery.toLowerCase();
      return bookName.includes(query) || bookCode.includes(query);
    })

    .map((book) => ({
      library: book.library_id === 111
        ? 'Dindayal Upadhyay Library'
        : book.library_id === 222
          ? 'Kundanlal Gupta Library'
          : 'Rashtramata Kasturba Library',
      isbn: book.isbn_no,
      name: book.name,
      imageUrl: book.image_path,
      author: book.authors,
      lang: book.language_name,


    }));

  // .map((item) =>
  //   [
  //     item.library_id === 111 ?
  //       (<Text
  //         style={{
  //           marginLeft: 10,
  //           fontSize: 15,
  //           color: '#2f4858'
  //         }}
  //       >
  //         Dindayal UpadhyayLibrary</Text>) :
  //       (item.library_id === 222 ?
  //         (<Text
  //           style={{
  //             marginLeft: 10,
  //             fontSize: 15,
  //             color: '#2f4858'
  //           }}
  //         >
  //           Kundanlal Gupta Library</Text>) :
  //         (<Text
  //           style={{
  //             marginLeft: 10,
  //             fontSize: 15,
  //             color: '#2f4858'
  //           }}
  //         >
  //           Rashtramata Kasturba Library</Text>)),

  //     // item.library_id,
  //     item.isbn_no,
  //     item.name,
  //     item.authors,
  //     item.language_name,
  //     <TouchableOpacity onPress={() => {
  //       navigation.navigate("ReadeBook", { data: item })

  //     }}>
  //       <Text style={{
  //         color: '#fff', textAlign: 'center',
  //         backgroundColor: '#c27b7f', marginLeft: 20, marginRight: 20,
  //         fontWeight: 'bold', borderRadius: 5, padding: 5
  //       }}>Read</Text>
  //     </TouchableOpacity>
  //   ]
  // );



  if (userToken === null) {
    return (
      <View style={{
        flex: 1, backgroundColor: '#fff',
        justifyContent: 'center', alignItems: 'center'
      }}>
        <Text>You need to log in to view this page.</Text>
      </View>
    );
  }



  const renderItem = ({ item, index }) => (
    <View style={[styles.flatListItemContainer,]}>
      {/* index % 2 === 1 && { backgroundColor: '#EBDEF0' } */}
      <View style={styles.rowContainer}>
        {item.imageUrl && (
          <Image source={{ uri: item.imageUrl }} style={styles.bookImagee} />
        )}
        <View style={styles.columnContainer}>
          <Text style={{
            fontSize: 15, fontFamily: 'Poppins-Regular',
            color: '#000', width: 250
          }}>{item.name}</Text>
          <Text style={styles.flatListItemText}>{item.library}</Text>

          <Text style={styles.flatListItemText}>
            {item.author}</Text>


          {/* <TouchableOpacity style={{ width: 50 }}
            onPress={() => {
              navigation.navigate("ReadeBook", { data: item })

            }}>
            <Text style={{
              color: '#fff', textAlign: 'center',
              backgroundColor: '#c27b7f',
              borderRadius: 5, padding: 3,
              fontFamily: 'OpenSans-Regular',
            }}>Read</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.flatListActionButton}
            onPress={() => {
              navigation.navigate("ReadeBook", { data: item })
            }}>
            <Text style={styles.flatListActionButtonText}>Read</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );


  return (
    <Theme>
      {({ theme }) => {
        const styles = getStyles(theme);
        return (
          <View style={styles.container}>
            {/* <Header
              rightIcon={require('../images/Logoelibrary.png')}
              leftIcon={require('../images/menu.png')}
              onClickLeftIcon={() => {
                navigation.openDrawer();
              }}
            /> */}
            <View style={{
              // marginTop: 20,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={styles.sectionHeading}>E-Books</Text>
            </View>
            {/* <View style={[styles.dividerView,{ width: 80, marginLeft: 140,}]}></View> */}

            {/* <View style={{ flex: 1, backgroundColor: '#fff', marginTop: 15 }}> */}

            {/* ==================search======================= */}
            <View style={styles.searchcontainer}>
              <View style={styles.searchBar}>
                <Feather name="search" color={"gray"} size={20} style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholderTextColor="#000"
                  placeholder="Search by Book Name, Author, Language"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />

                {searchQuery !== '' && (
                  <TouchableOpacity onPress={() => {
                    setSearchQuery('');

                  }}>
                    <Feather name="x" color={"gray"} size={20} style={[styles.searchIcon, { marginLeft: -25 }]} />
                  </TouchableOpacity>)}
              </View>
            </View>
            {/* ============================table ========================================= */}


            {/* {userInfo.data.user.membership_plan_name !== null?
             ( <View style={styles.alltableView}>
                <ScrollView horizontal={true} contentContainerStyle={{ columnGap: 50 }}>
                  
                  <View style={{ backgroundColor: '#fff', marginTop: 15, marginLeft: 15, marginRight: 15,marginBottom:25 }}>
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
                            style={[styles.row1, index % 2 && { backgroundColor: '#fff' }]}
                            textStyle={styles.texttt}
                          />
                        ))}
                      </Table>
                    </ScrollView>
                  </View>
                </ScrollView>
              </View>):(<View style={{alignItems:'center',
              backgroundColor:'#fff',
              marginLeft:10,
              marginRight:10,
              paddingBottom:30,
              paddingTop:30}}>
                <Text style={{fontSize:15,
                  fontFamily:'Philosopher-Bold'}}>Please Activate Any Subscription plan</Text>
                </View>)} */}

            {Plan_exist !== null ?
              (updatedTableData.length > 0 ? 
                (<FlatList
                data={updatedTableData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />)


                : (<View style={{
                  alignItems: 'center',
                  marginLeft: 10,
                  marginRight: 10,
                  paddingBottom: 30,
                  paddingTop: 30
                }}>
                  <Text style={styles.noPlanScreen}>
                    You haven't reserved any books yet.Please do reserve your book.
                  </Text>
                </View>)
              )
              : (
                <View style={{
                  alignItems: 'center',
                  marginLeft: 10,
                  marginRight: 10,
                  paddingBottom: 30,
                  paddingTop: 30
                }}>
                  <Text style={styles.noPlanScreen}>
                    Please Activate Any Subscription plan
                  </Text>
                </View>
              )
            }


          </View>


        );
      }}
    </Theme>
  );
};

export default MyEBook;

const styles = StyleSheet.create({
  // flatListItemContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-around',
  //   paddingVertical: 15,
  // },
  // flatListItemText: {
  //   flex: 1,
  //   textAlign: 'center',
  //   color: '#2f4858',
  // },
  // flatListActionButtonText: {
  //   color: '#fff',
  //   textAlign: 'center',
  //   backgroundColor: '#c27b7f',
  //   borderRadius: 5,
  //   padding: 5,
  //   fontWeight: 'bold',
  // },





  bookImagee: {
    width: 90, // Adjust the width as needed
    height: 130, // Adjust the height as needed
    resizeMode: 'contain', // or 'contain' based on your preference
    borderRadius: 8, // Add borderRadius if needed
  },


  flatListItemContainer: {
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    // marginLeft: 5,
    marginRight: 10,
    padding: 15,
    shadowColor: '#000',

  },

  flatListItemText: {
    color: '#2f4858',
    marginTop: 1,
    marginBottom: 3
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  columnContainer: {
    flexDirection: 'column',
    marginLeft: 10,
  },

  flatListActionButton: {
    backgroundColor: '#c27b7f',
    borderRadius: 5,
    paddingVertical: 8,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120
  },
  flatListActionButtonText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'OpenSans-Regular',
  },
  ItemText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000'
  }

});