

import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native';
//import { Picker } from '@react-native-picker/picker';
import Header from '../common/Header';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { BASE_URL } from "../config";


const BooksDetail = ({ navigation }) => {
  const [isLoaded, setisLoaded] = useState(true);
  const route = useRoute();
  const [tredbooks, setTredBooks] = useState([]);
  const { userToken, userInfo } = useContext(AuthContext);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [Ebooks, setEbooks] = useState([]);
  const [subscribedBooks, setSubscribedBooks] = useState([]);
  const [subscribe, setSubscribe] = useState([]);




// //------------------handle of navigation to book history page---------------------------
const handleBookHistory=(item)=>{
   
   
  const subscriptionData1={
              book_item_id:route.params.data.items[0].id,
              library_id:route.params.data.library_id
            };
 
  console.log('data retrived ', subscriptionData1);
 
 
 
  const url=`https://dindayalupadhyay.smartcitylibrary.com/api/v1/books/${item.items[0].id}/reserve-book`;

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify(subscriptionData1),
   
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
   
    console.log('Navigating to myEBook...');

    navigation.navigate('subscribebookHistory');

  })

  .catch((error) => {
    console.error('Error storing data:', error);
  });

}



















const handleSubscribe = (item) => {
    const member_id = userInfo.data.user.member_id;
    const id = route.params.data.items[0].id;
    console.log('data testis::::', item);
    const subscriptionData = {
      ebook_id: id,
      member_id: member_id,
      item
    };

  
    console.log("subbb:", subscriptionData);
    const url = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/ebook-subscription`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(subscriptionData),
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
        //setSubscribe(responseData.data);

        // Update state or perform other actions as needed

        // Navigate to 'myEBook' here if necessary
        console.log('Navigating to myEBook...');

        navigation.navigate('myEBook');

      })

      .catch((error) => {
        console.error('Error storing data:', error);
      });
  };


  // 

  /* post request for ebook subscribe end  */





  // ===========================Trending button=======================
  useEffect(() => {
    const tredingbooks = () => {
      fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books")
        .then(res => res.json())
        .then(responce => {
          setTredBooks(responce.data.splice(-4));
          setisLoaded(false);
        });
    };
    tredingbooks();
  }, []);

  // const item = route.params.data;
  // console.log("passing value to MyEBook Page", route.params.data);
  // const library_id = route.params.data.library_id;
  // console.log("library_id", route.params.data.library_id);
  // =================single book get================================
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', flexDirection: 'column' }}>
      <Header
        rightIcon={require('../images/Logoelibrary.png')}
        leftIcon={require('../images/back.png')}
        onClickLeftIcon={() => {
          navigation.navigate('Book', { screen: 'Home' });
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 15, }}>
        <View style={{
          marginLeft: 80,
          width: Dimensions.get('window').width,
          height: 200,
          marginEnd: 22,
          borderRadius: 10,
        }}>
          <View style={{
            width: 150,
            marginLeft: 60 / 2,
            marginTop: 10 / 2,
            overflow: 'visible',
          }}>
            <Image source={{
              uri: route.params.data.image_path
            }}
              style={{
                aspectRatio: 0.8,
                resizeMode: 'cover'
              }}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
          <Text style={styles.textHeading}>ISBN No:</Text><Text style={{ fontSize: 15, marginLeft: 8 }}>{route.params.data.isbn}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
          <Text style={styles.textHeading}>Author:</Text>
          <Text style={{ fontSize: 15, marginLeft: 8 }}>{route.params.data.authors[0].first_name} {route.params.data.authors[0].last_name}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
          <Text style={styles.textHeading}>Format:</Text>
          {route.params.data.items[0].format === 3 ?
            (<Text style={{ fontSize: 15, marginLeft: 8 }}>E-Book</Text>)
            : route.params.data.items[0].format === 1 ?
              (<Text style={{ fontSize: 15, marginLeft: 8 }}>hardcover</Text>) :
              (<Text style={{ fontSize: 15, marginLeft: 8 }}>Book</Text>)}
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
          <Text style={styles.textHeading}>Edition</Text>
          <Text style={{ fontSize: 15, marginLeft: 8 }}>{route.params.data.items[0].edition}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
          <Text style={styles.textHeading}>Genre:</Text>
          <Text style={{ fontSize: 15, marginLeft: 8 }}>{route.params.data.genres[0].name}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
          <Text style={styles.textHeading}>Publisher:</Text>
          <Text style={{ fontSize: 15, marginLeft: 8 }}>{route.params.data.items[0].publisher.name}</Text>
        </View>

        <View style={{ flexDirection: 'column', marginTop: 10, marginLeft: 10, }}>
          <Text style={styles.textHeading}>Belongs To:</Text>
          <View style={{ marginRight: 5 }}>{route.params.data.library_id === 111 ?
            (<Text style={{ fontWeight: 'bold', paddingTop: 10, height: 50, fontSize: 18, textAlign: 'center', marginTop: 10, borderWidth: 5 }}>
              Dindayal UpadhyayLibrary</Text>) :
            (route.params.data.library_id === 222 ?
              (<Text style={{ fontWeight: 'bold', paddingTop: 10, height: 50, fontSize: 18, textAlign: 'center', marginTop: 10, borderWidth: 5 }}>
                Kundanlal Gupta Library</Text>) :
              (<Text style={{ fontWeight: 'bold', paddingTop: 10, height: 50, fontSize: 18, textAlign: 'center', marginTop: 10, borderWidth: 5 }}>
                Rashtramata Kasturba Library</Text>))}</View></View>
        <View style={{ flexDirection: 'column', marginTop: 10, marginLeft: 10, }}>
          <Text style={styles.textHeading}>Description:</Text>
          <Text style={{ fontSize: 15, marginLeft: 3 }}>{route.params.data.description}</Text>
        </View>



        {userToken !== null ?
          (<TouchableOpacity
            style={{
              backgroundColor: '#c27b7f',
              alignItems: 'center',
              padding: 10,
              borderRadius: 5,
              width: '50%',
              height: 50,
              justifyContent: 'center',
              marginTop: 20,
              marginLeft: 100,
              marginBottom: 20
            }}
            onPress={() => {
              {route.params.data.items[0].format === 3 ?
             ( handleSubscribe(route.params.data)):(handleBookHistory(route.params.data))}
            }}
            
          >


            {/* {route.params.data.items[0].format === 3 ?
              (<Text style={{
                color: '#fff',
                fontWeight: '700',
                fontSize: 18
              }}>{subscribedBooks.some((book) => book.id === route.params.data.id)
                ? <Text>Unsubscribe</Text>
                : <Text>subscribe</Text>}</Text>) : (<Text style={{
                  color: '#fff',
                  fontWeight: '700',
                  fontSize: 18
                }}>Reserved</Text>)}

          </TouchableOpacity>)  */}


            {route.params.data.items[0].format === 3 ?
              (<Text style={{
                color: '#fff',
                fontWeight: '700',
                fontSize: 18
              }}>subscribe</Text>) : (<Text style={{
                color: '#fff',
                fontWeight: '700',
                fontSize: 18
              }}>Reserved</Text>)}

          </TouchableOpacity>) :
          (<TouchableOpacity
            style={{
              backgroundColor: '#c27b7f',
              alignItems: 'center',
              padding: 10,
              borderRadius: 5,
              width: '50%',
              height: 50,
              justifyContent: 'center',
              marginTop: 20,
              marginLeft: 100,
              marginBottom: 20
            }} onPress={() => {
              // Navigate to the login page since the user is not logged in
              navigation.navigate('sLogin');
            }}>(<Text style={{
              color: '#fff',
              fontWeight: '700',
              fontSize: 18
            }}>Subscribe</Text>)
            :
            (<Text style={{
              color: '#fff',
              fontWeight: '700',
              fontSize: 18
            }}>Reserved</Text>)
          </TouchableOpacity>)}


        {/* =================================Trending books==================================== */}

        <View style={{ flexDirection: 'row', marginVertical: 5, justifyContent: 'space-between', marginLeft: 15, marginRight: 15, }}>
          <Text style={styles.coroselheading}>Trending Books</Text>
        </View>

        <View style={{ marginTop: 10, marginStart: 10, backgroundColor: '#fff' }}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={tredbooks}

            renderItem={({ item }) =>
              <TouchableOpacity onPress={() => {
                navigation.navigate('BooksDetailPage', { data: item })
              }}>
                <View style={{
                  width: 182,
                  height: 260,
                  marginEnd: 22,
                  borderRadius: 10,
                }}>
                  <View style={{
                    flex: 1,
                    width: 100,
                    marginLeft: 60 / 2,
                    marginTop: 10 / 2,
                    borderRadius: 5,
                    overflow: 'visible',
                  }}>
                    <Image source={{ uri: item.image_path }}
                      style={{
                        aspectRatio: 0.8,
                        resizeMode: 'cover'
                      }} /></View>
                  <View style={{ padding: 10, }}>
                    <Text style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: '#000'
                    }} numberOfLines={2}>{item.name}</Text><Text style={{
                      backgroundColor: '#a3a3c2',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: '#fff',
                      marginLeft: 40,
                      marginRight: 40,
                      paddingTop: 5,
                      height: 30,
                      marginTop: 5,
                      borderRadius: 5,
                    }}>Book</Text>
                    <Text style={{
                      backgroundColor: '#c27b7f',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: '#fff',
                      marginLeft: 30,
                      marginRight: 40,
                      paddingTop: 10,
                      width: 100,
                      height: 40,
                      marginTop: 5,
                      borderRadius: 5,
                    }}>Read More</Text>
                  </View>
                </View>
              </TouchableOpacity>
            }
            horizontal={true}
            contentContainerStyle={{ columnGap: 10 }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default BooksDetail;
const styles = StyleSheet.create({
  textHeading: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000'
  }, coroselheading: {
    fontFamily: 'Philosopher-Bold',
    fontSize: 25,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center'
  },

});


