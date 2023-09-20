import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { viewBooks } from '../redux/slice/BooksDetailSlice';
import { useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import Header from '../common/Header';


const BooksDetail = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [isLoaded, setisLoaded] = useState(true);
  const route = useRoute();
  const dispatch = useDispatch();
  const [tredbooks, setTredBooks] = useState([]);




  const [selectedlibraryOptions, setSelectedLibraryOptions] = useState('search by libraryOptions')

;
  const libraryOptions=['Dindayal Upadhyay Library','Kundanlal Gupta Library','Rashtramata Kasturba Library']

  // =================single book get================================


  useEffect(() => {
    const getbooks = () => {
      fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books")

        .then(res => res.json())
        //  .then(responce => console.log(responce));
        .then(responce => {
          // console.log(JSON.stringify(items) + ' ' +items.data.length);
          //console.log(responce.data);
          // console.log('Image : ' + responce.data.image);
          setBooks(responce.data);
          setisLoaded(false);
          dispatch(viewBooks(responce));

        });
    };
    getbooks();
  }, []);


  // ===========================Trending button=======================
  useEffect(() => {
    const tredingbooks = () => {
      fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books")
        .then(res => res.json())
        //  .then(responce => console.log(responce));
        .then(responce => {
          // console.log(JSON.stringify(items) + ' ' +items.data.length);
          //console.log(responce.data);
          // console.log('Image : ' + responce.data.image);
          setTredBooks(responce.data.splice(-4));
          setisLoaded(false);
          //dispatch(viewBooks(responce));

        });
    };
    tredingbooks();
  }, []);


  // =================single book get================================
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', flexDirection: 'column' }}>
       <Header
                rightIcon={require('../images/Logoelibrary.png')}
                leftIcon={require('../images/back.png')}
                onClickLeftIcon={() => {
                    // navigation.navigate('Book');
                    navigation.goBack();
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
              //uri: "https://cdn.pixabay.com/photo/2016/11/25/07/00/diamond-1857736_1280.png" 
            }}

              style={{
                aspectRatio: 0.8,
                resizeMode: 'cover'
              }}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
          <Text style={styles.textHeading}>ISBN No:</Text>
          <Text style={{ fontSize: 15, marginLeft: 8 }}>{route.params.data.isbn}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
          <Text style={styles.textHeading}>Author:</Text>
          <Text style={{ fontSize: 15, marginLeft: 8 }}>{route.params.data.authors_name}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
          <Text style={styles.textHeading}>Format:</Text>
          <Text style={{ fontSize: 15, marginLeft: 8 }}>{route.params.data.items[0].format}</Text>
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
          <Text style={styles.textHeading}>Belongs To:</Text>
          <Picker
            style={{ height: 50, width: '100%', marginTop: 20, borderWidth: 5, borderColor: 'black' }}
            prompt="Select Library"
            selectedValue={selectedlibraryOptions} // Set the initial selected value here
            onValueChange={(itemValue)=>setSelectedLibraryOptions(itemValue)}
            // enabled={true} // To disable user interaction with the Picker
          >
            {libraryOptions.map((option,index) => (
              <Picker.Item
                key={index}
                label={option}
                value={option}
                // enabled={option.value !== ''} // Disable the placeholder option
              />
            ))}
          </Picker>
        </View>




        <View style={{ flexDirection: 'column', marginTop: 10, marginLeft: 10, }}>
          <Text style={styles.textHeading}>Description:</Text>
          <Text style={{ fontSize: 15, marginLeft: 3 }}>{route.params.data.description}</Text>

        </View>
        <TouchableOpacity
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

          // {/* on login button click */}
          //   onPress={()=> {
          //     navigation.navigate('Home2');
          // }}

          onPress={() => { }}

        >
          <Text style={{
            color: '#fff',
            fontWeight: '700',
            fontSize: 18
          }}>Subscribe</Text>

        </TouchableOpacity>
        {/* =================================Treding books==================================== */}
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
                // {data:item}
              }}>
                <View style={{
                  width: 182,
                  height: 260,
                  marginEnd: 22,
                  borderRadius: 10,
                  // backgroundColor: '#fff'
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
                      }}


                    />
                  </View>
                  <View style={{ padding: 10, }}>
                    <Text style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: '#000'
                    }} numberOfLines={2}>
                      {item.name}
                    </Text>

                    <Text style={{
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

  )
}

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