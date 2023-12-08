
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, FlatList, Modal, ActivityIndicator, ImageBackground, ScrollView, Animated } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Header from '../common/Header';
import { AuthContext } from '../context/AuthContext';
import WebView from 'react-native-webview';
import Ionicons from 'react-native-vector-icons/Ionicons';





const HomeScreen = ({ navigation }) => {
  const { userToken } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [freqBooks, setFreqBooks] = useState([]);
  const [isLoaded, setisLoaded] = useState(true);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  


  // generating a random number
  const a = Math.floor(Math.random() * (10 - 1)) + 1;
  //==============================video working=================================================

  const videoUrl = `https://player.vimeo.com/video/808983383?h=81d7a35acb&badge=0&autopause=0&player_id=0&app_id=58479`
 
 

  //===========added recently=================================
  const format = [{ id: 1, name: "Hardcover" },
  { id: 2, name: "PAPERBACK" },
  { id: 3, name: "E_BOOK" }]


  //==============video section====================
  const image = { uri: 'https://static.vecteezy.com/system/resources/thumbnails/022/574/918/small/abstract-blurred-public-library-interior-space-blurry-room-with-bookshelves-by-defocused-effect-use-for-background-or-backdrop-in-abstract-blurred-publicbusiness-or-education-concepts-generative-ai-photo.jpg' }

  //================book recently added ===============
  useEffect(() => {
    const getbooks = () => {
      fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books")
        .then(res => res.json())

        .then(responce => {
          setBooks(responce.data.splice(-20));
          setisLoaded(false);
        });
    };
    getbooks();
  }, []);



  useEffect(() => {
    const freqBooks = () => {
      fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books")
        .then(res => res.json())
        .then(respo => {
          setFreqBooks(respo.data);
          setisLoaded(false);
        });
    };
    freqBooks();
  }, []);

  const filterBooks = freqBooks.filter((item) =>
    item.items[0].format === (format[0].id || format[1].id));


  const featuredEBooks = freqBooks.filter((item) =>
    item.items[0].format === format[2].id);

  // ======================frequently added end========================//

  return (
    <View style={styles.container}>
      <Header
        rightIcon={require('../images/Logoelibrary.png')}
        leftIcon={require('../images/menu.png')}
        onClickLeftIcon={() => {
          navigation.openDrawer();

        }}
      />
      {isLoaded ? (<ActivityIndicator style={{ flex: 1, marginTop: 10, marginStart: 10, justifyContent: 'center', alignItems: 'center' }}
        size="large" color="#c27b7f" />) :

        (<ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 15, }}>
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

          {/* ================Recently added books=================   */}

          <View style={{
            flexDirection: 'row',
            marginVertical: 5,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginLeft: 15, marginRight: 15,
          }}>
            <Text style={styles.coroselheading}>Recently Added</Text>
            <TouchableOpacity onPress={()=>{
              navigation.navigate('Books')
            }}>
            <Text style={{ color: 'blue', fontSize: 15 }}>See All</Text>
            </TouchableOpacity>
          </View>

        
          <View style={{ marginStart: 10,height:280 }}>
            <FlatList
              horizontal={true}
              snapToInterval={200} // Adjust the interval based on your design
              decelerationRate="fast"
              contentContainerStyle={{
                gap: -50,
                paddingHorizontal: 7,
              }}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              data={books}
              renderItem={({ item }) =>
                <TouchableOpacity
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    width: 200,
                    height: 320
                  }}
                  onPress={() => {
                    navigation.navigate('BooksDetailPage', { data: item })
                  }}>
                  <View style={{
                    width: 150,
                    height: 200,
                    marginEnd: 50,
                    marginTop: -120
                  }}>

                        
                    <View style={{
                      width: 140,
                      color: '#000'
                    }}>
                   <Image
                    source={item.image_path !== null ? { uri: item.image_path } : require('../images/book.png')}
                        style={{
                          aspectRatio: 0.6,
                          resizeMode: 'contain',
                          borderRadius: 5,
                        }}
                      />
                    </View>

                    <Text style={{
                      marginTop: 10,
                      fontSize: 15,
                      color: '#000',
                      flexDirection: 'column'
                    }} numberOfLines={1}>
                      {item.name}
                    </Text>

                  </View>

                </TouchableOpacity>

              }

            />

          </View>

          {/* ==============video section ============= */}

          <View style={styles.contactSection}>
            <ImageBackground source={image} >
              <View style={styles.container1}>
                <View style={styles.row}>
                  <View style={styles.leftCol}>

                    <Text style={styles.heading}>New to Nagpur Digital Library?</Text>
                    <Text style={styles.subHeading}>Here are some quick links to help you get started.</Text>
                    <Text style={styles.paragraph}>Signup for an account when connected to the campus network or contact library administrator.</Text>

                    {userToken === null ?
                      <TouchableOpacity style={styles.joinLibraryBtn} onPress={() => {
                        navigation.navigate('Userr')
                      }}>
                        <Text style={styles.joinLibraryText}>Join The Library</Text>
                      </TouchableOpacity> : null}


                  </View>
                  <View style={styles.rightCol}>

                    <TouchableOpacity onPress={() => {
                      setVideoModalVisible(true);
                    }} style={styles.videoBtn}>
                      <Text style={styles.videoBtnText}>Play Video</Text>

                    </TouchableOpacity>

                  </View>

                </View>
              </View>

              {/* =================video modal=================== */}

              <Modal
                animationType="slide"
                transparent={true}
                visible={videoModalVisible}
                onRequestClose={() => {
                  setVideoModalVisible(false);
                }}>

                <WebView
                  source={{ uri: videoUrl }}
                  style={{ flex: 1 }}
                  mediaPlaybackRequiresUserAction={false} // Enable autoplay
                />
              </Modal>

            </ImageBackground >
          </View>


          {/* ===========featured books======== */}

          <View style={{
            flexDirection: 'row',
            marginVertical: 5, marginTop: 15,
            justifyContent: 'space-between', marginLeft: 15, marginRight: 15,
          }}>
            <Text style={styles.coroselheading}>Featured Books</Text>
            
            <TouchableOpacity onPress={()=>{
              navigation.navigate('Books')
            }}>
            <Text style={{ color: 'blue', fontSize: 15,marginTop:10 }}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={{  marginTop: 10, marginStart: 10,
            backgroundColor: '#fff',height:250 }}>

            <FlatList
              horizontal={true}
              snapToInterval={200} // Adjust the interval based on your design
              decelerationRate="fast"
              contentContainerStyle={{
                gap: -20,
                paddingHorizontal: 12,
              }}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              data={filterBooks.splice(a, 20)}

              renderItem={({ item }) =>
                

                <TouchableOpacity
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    width: 180,
                    height: 300
                  }}
                  onPress={() => {
                    navigation.navigate('BooksDetailPage', { data: item })

                  }}>
                  <View style={{
                    width: 145,
                    height: 280,
                    marginEnd: 50,
                  }}>
                    <View style={{
                      elevation: 5,
                      borderRadius: 5,
                      color: '#000'
                    }}>
                      <Image source={{ uri: item.image_path }}
                        style={{
                          aspectRatio: 0.8,
                          resizeMode: 'cover',
                          borderRadius: 10,

                        }}
                      />
                    </View>
                    <Text style={{
                      marginTop: 10,
                      fontSize: 15,
                      color: '#000',
                      flexDirection: 'column'
                    }} numberOfLines={1}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              }
            />
          </View>
 {/* //=============featured ebooks======================== */}

          <View style={{
            flexDirection: 'row', marginVertical: 5,
            justifyContent: 'space-between', marginLeft: 15, marginRight: 15,
          }}>
            <Text style={styles.coroselheading}>Featured E-Books</Text>
             <TouchableOpacity onPress={()=>{
              navigation.navigate('Books')
            }}>
            <Text style={{ color: 'blue', fontSize: 15,marginTop:10  }}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={{
            marginTop: 10, marginStart: 10,
            backgroundColor: '#fff',height:250
          }}>

            <FlatList
              horizontal={true}
              snapToInterval={200} // Adjust the interval based on your design
              decelerationRate="fast"
              contentContainerStyle={{
                gap: -20,
                paddingHorizontal: 12,
              }}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              data={featuredEBooks.splice(a, 20)}

              renderItem={({ item }) =>
               <TouchableOpacity
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    width: 180,
                    height: 300
                  }}
                  onPress={() => {
                    navigation.navigate('BooksDetailPage', { data: item })

                  }}>
                  <View style={{
                    width: 145,
                    height: 280,
                    marginEnd: 50,
                  }}>
                    <View style={{
                      elevation: 5,
                      borderRadius: 5,
                      color: '#000'
                    }}>
                      <Image source={{ uri: item.image_path }}
                        style={{
                          aspectRatio: 0.8,
                          resizeMode: 'cover',
                          borderRadius: 10,

                        }}
                      />
                    </View>
                    <Text style={{
                      marginTop: 10,
                      fontSize: 15,
                      color: '#000',
                      flexDirection: 'column'
                    }} numberOfLines={1}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              }
            />
          </View>

        </ScrollView>)}
 </View>
  );
};


export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  bannar: {
    margin: 5,
    height: 200,
    backgroundColor: "#f5ebe6",
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
    right: 0
  },
   contactSection: {
    backgroundColor: '#fff',
  },
  container1: {
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftCol: {
    flex: 7,
    paddingRight: 10,
  },
  heading: {
    fontSize: 21,
    fontWeight: 'bold',
    marginTop: 8
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  paragraph: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20
  },
  joinLibraryBtn: {
    backgroundColor: '#c27b7f',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  joinLibraryText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rightCol: {
    flex: 3,
  },
  videoBtn: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  videoBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  closeModalBtn: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  closeModalText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
  },



});