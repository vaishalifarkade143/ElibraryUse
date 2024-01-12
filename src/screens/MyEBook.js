
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Header from '../common/Header';
import { useRoute } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { Table, Row } from 'react-native-table-component';
import Feather from 'react-native-vector-icons/Feather';
import messaging from '@react-native-firebase/messaging';
import getStyles from '../Style/logNRegStyle';
import Theme from './Theme';

const MyEBook = ({ navigation }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [Ebooks, setEbooks] = useState([]);
  const [AllEbooks, setAllEbooks] = useState([]);
  const route = useRoute();
  const { userToken, userEmail, userMemPlan ,userInfo} = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');



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

        });
    };

    getbooks();
    ebookSubscription();
  }, []);



  const state = {
    tableHead: ['LIBRARY', 'ISBN', 'Book Name', 'Author', 'Language', 'Action'],
    widthArr: [210, 130, 300, 130, 130, 130],
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

      const bookName = item.name.toLowerCase();
      const bookCode = item.authors.toLowerCase();
      const language = item.language_name.toLowerCase();
      const query = searchQuery.toLowerCase();
      return bookName.includes(query) || bookCode.includes(query) || language.includes(query);
    })

    .map((item) =>
      [
        item.library_id === 111 ?
          (<Text
            style={{
              marginLeft: 10,
              fontSize: 15,
              color: '#2f4858'
            }}
          >
            Dindayal UpadhyayLibrary</Text>) :
          (item.library_id === 222 ?
            (<Text
              style={{
                marginLeft: 10,
                fontSize: 15,
                color: '#2f4858'
              }}
            >
              Kundanlal Gupta Library</Text>) :
            (<Text
              style={{
                marginLeft: 10,
                fontSize: 15,
                color: '#2f4858'
              }}
            >
              Rashtramata Kasturba Library</Text>)),

        // item.library_id,
        item.isbn_no,
        item.name,
        item.authors,
        item.language_name,
        <TouchableOpacity onPress={() => {
          navigation.navigate("ReadeBook", { data: item })

        }}>
          <Text style={{
            color: '#fff', textAlign: 'center',
            backgroundColor: '#c27b7f', marginLeft: 20, marginRight: 20,
            fontWeight: 'bold', borderRadius: 5, padding: 5
          }}>Read</Text>
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
            <View style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.sectionHeading}>E-Books</Text>
            </View>
            <View style={[styles.dividerView,{ width: 80, marginLeft: 140,}]}></View>

            <View style={{ flex: 1, backgroundColor: '#f5ebe6', marginTop: 15 }}>

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
              {/* ===================================================================== */}


              {userInfo.data.user.membership_plan_name !== null?
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
              </View>):(<Text>Please Activate Any Subscription plan</Text>)}





            </View>

          </View>
        );
      }}
    </Theme>
  );
};

export default MyEBook;
