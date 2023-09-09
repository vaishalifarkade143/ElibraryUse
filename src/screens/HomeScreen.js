import { View, Text, Image, Dimensions,StyleSheet, TouchableOpacity, FlatList, Button, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../common/Header';
import { AuthContext } from '../context/AuthContext';
import { useDispatch } from 'react-redux';
import { viewBooks } from '../redux/slice/BooksDetailSlice';



const HomeScreen = ({ navigation }) => {
  const { userInfo } = useContext(AuthContext);
  const { userToken } = useContext(AuthContext);
  const [books,setBooks] = useState([]);
 // const dispatch = useDispatch();
  //const products = [1, 2, 3, 4];
  const [isLoaded,setisLoaded] = useState(true);

  //================book fetch api call using redux===============
  useEffect(() => {
    const getbooks = () => {
      fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books")
      .then(res => res.json())
     //  .then(responce => console.log(responce));
       .then(responce => 
       {
           console.log(responce.data);
               console.log('price : ' + responce.data.book_id);
           setBooks(responce.data.splice(0,4));
           setisLoaded(false);
           //dispatch(viewBooks(responce));
          
       });
     };
    getbooks();
  },[]);

  // const getbooks = () => {
  //  fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/search-books")
  //  .then(res => res.json())
  // //  .then(responce => console.log(responce));
  //   .then(responce => 
  //   {
  //       console.log(responce);
  //           console.log('price : ' + responce.data.book_id);
  //       setBooks(responce);
  //       setisLoaded(false);
  //       //dispatch(viewBooks(responce));
       
  //   });
  // };

  // const getbooks = async ()=>{
  //   try{
  //   const responce = await fetch(
  //     "https://dindayalupadhyay.smartcitylibrary.com/api/v1/search-books"
  //   );
  //   const realBooks = responce.json();
  //   setBooks(realBooks);
  //   setisLoaded(false);
  //   console.log(realBooks);
  //   }
  //   catch(e)
  //   {
  //     console.log("error is:"+e)

  //   }
  // };


  //==========Books fetching end=========//

  return (
    <View style={styles.container}>
      <Header
        rightIcon={require('../images/Logoelibrary.png')}
        leftIcon={require('../images/menu.png')}
        onClickLeftIcon={() => {
          navigation.openDrawer();

        }}
      />
{/* <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 15, }}> */}
      <View style={styles.bannar}>
        <View style={styles.mainImgNText}>
          <View >
            <Image
              source={require('../images/hero-brownElib.png')}
              style={styles.imagecontainer}
              resizeMode='contain'
            />
          </View>
          <View style={styles.text}>
            <Text style={styles.texth1}>Nagpur Digital Library</Text>
            <Text style={styles.texth2}>Serving You Millions of eResources | 24x7 | Everywhere</Text>
          </View >
        </View>


      </View>
      <View style={{ flexDirection: 'row', marginVertical: 5, justifyContent: 'space-between', marginLeft: 15, marginRight: 15 }}>
        <Text style={styles.coroselheading}>Recently Added</Text>
        <TouchableOpacity>
          <Text style={{ color: '#0aada8', fontSize: 17 }}>See all</Text>
        </TouchableOpacity>
      </View>
      
      {/* ================slider books=================   */}
      <View style={{ marginTop: 10, marginStart: 10 }}>

      <FlatList
          keyExtractor={(item) => item.id}
          data={books}
          
          renderItem={({ item }) =>
            <TouchableOpacity onPress={() => {
              navigation.navigate('BooksDetailPage') 
              // {data:item}
              }}>
              <View style={{
                width: 182,
                height: 240,
                marginEnd: 22,
                borderRadius: 10,
                backgroundColor: '#fff3cd'
              }}>
                <View style={{
                  flex: 1,
                  width: 150,
                  marginLeft: 30 / 2,
                  marginTop: 10 / 2,
                  borderRadius: 5,
                  overflow: 'hidden',
                  

                }}>
                  <Image source={{ 
                    uri: item.image
                    //"https://cdn.pixabay.com/photo/2017/07/27/09/56/sphere-stone-2544690_1280.png"
                   }}
                    style={{
                      aspectRatio: 1,
                      resizeMode: 'cover'
                    }}
                    
                    
               /> 
                </View>
                <View style={{ padding: 10,  }}>
                  <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: '#000'
                  }} numberOfLines={1}>
                    {/* {item.title} */}
                    </Text>

                    <Text style={{
                      backgroundColor: '#a3a3c2',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: '#fff',
                      marginLeft: 40,
                      marginRight: 40,
                      paddingTop:5,
                      height: 30, 
                      marginTop: 5,
                      borderRadius: 5,
                    }}>Book</Text>
                    <Text style={{ backgroundColor: '#c27b7f',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: '#fff',
                      marginLeft: 30,
                      marginRight: 40,
                      paddingTop:10,
                      width:100,
                      height: 40, 
                      marginTop: 5,
                      borderRadius: 5,}}>Read More</Text>
                  </View>

                </View>
             
            </TouchableOpacity>

          }
          horizontal={true}
          contentContainerStyle={{ columnGap: 10 }}
        />
       
      </View>


      {/* =================== */}

    
      {/* </ScrollView> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannar: {
    margin: 5,
    height: 200,
    backgroundColor: "#fff3cd",
    flexDirection: 'column',
    paddingRight: 10,
    justifyContent: 'center'
  },
  mainImgNText: {
    flexDirection: 'row',
    marginTop: 20,
    position: 'fixed'
  },
  imagecontainer: {
    width: 160,
    height: '70%'
  },
  text: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
  },
  texth1: {
    flexBasis: 'auto',
    fontSize: 29,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Philosopher-Bold',
  },
  texth2: {
    fontSize: 14,
    marginTop: 8,
    color: '#676768',
    textAlign: 'center',
    fontFamily: 'Poppin-Thin',
  },
  coroselheading: {
    fontFamily: 'Philosopher-Bold',
    fontSize: 25,
    fontWeight: '600',
    color: '#000',
  },
 
  

});
