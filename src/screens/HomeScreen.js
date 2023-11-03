
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, FlatList, Modal, ActivityIndicator, ImageBackground, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../common/Header';
import { AuthContext } from '../context/AuthContext';
import { useDispatch } from 'react-redux';
import { viewBooks } from '../redux/slice/BooksDetailSlice';
import Video from 'react-native-video';


const HomeScreen = ({ navigation }) => {
  // const { userInfo } = useContext(AuthContext);
  const { userToken } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [freqBooks, setFreqBooks] = useState([]);
  const [isLoaded, setisLoaded] = useState(true);

  //===========added recently=================================
  const format = [{ id: 1, name: "Hardcover" },
  { id: 2, name: "PAPERBACK" },
  { id: 3, name: "E_BOOK" }]


  //==============video section====================
  const [modalVisible, setModalVisible] = React.useState(false);
  const image = { uri: 'https://static.vecteezy.com/system/resources/thumbnails/022/574/918/small/abstract-blurred-public-library-interior-space-blurry-room-with-bookshelves-by-defocused-effect-use-for-background-or-backdrop-in-abstract-blurred-publicbusiness-or-education-concepts-generative-ai-photo.jpg' }
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  //================book recently added ===============
  useEffect(() => {
    const getbooks = () => {
      fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books")
        .then(res => res.json())

        .then(responce => {
          setBooks(responce.data.splice(-4));
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

    item.items[0].format === format[2].id

  );

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

          <View style={{ flexDirection: 'row', marginVertical: 5, justifyContent: 'space-between', marginLeft: 15, marginRight: 15, }}>
            <Text style={styles.coroselheading}>Recently Added</Text>

          </View>
         
          <View style={{ marginTop: 10, marginStart: 10, backgroundColor: '#fff' }}>

            <FlatList
              keyExtractor={(item) => item.id}
              data={books}

              renderItem={({ item }) =>
                <TouchableOpacity onPress={() => {
                  navigation.navigate('BooksDetailPage', { data: item })
                  console.log(item);
                }}>
                  <View style={{
                    width: 182,
                    height: 280,
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
                        }}


                      />
                    </View>
                    <View style={{ padding: 10, }}>
                      <Text style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#000',
                        flexDirection: 'column'
                      }} numberOfLines={2}>
                        {item.name}
                      </Text>



                      {item.items[0].format === 3 ? (<Text style={{
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
                      }}>E-Book</Text>
                      ) : (<Text style={{
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
                      }}>Book</Text>)}
                      

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
                        navigation.navigate('Loginnn')
                      }}>
                        <Text style={styles.joinLibraryText}>Join The Library</Text>
                      </TouchableOpacity> : null}


                  </View>
                  <View style={styles.rightCol}>
                    {/* You can place your video player component here */}
                    {/* For simplicity, we'll just show a placeholder */}
                    <TouchableOpacity onPress={openModal} style={styles.videoBtn}>
                      <Text style={styles.videoBtnText}>Play Video</Text>
                      {/* <image style={styles.videoBtnText}
        source={{uri:'https://i.pinimg.com/1200x/ef/07/47/ef07471474a0e1086a185086c342ae00.jpg'}}/> */}
                    </TouchableOpacity>

                  </View>

                </View>
              </View>

              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
              >
                <View style={styles.modalContainer}>
                  <Video
                    // source={{ uri: 'https://player.vimeo.com/external/403131658.sd.mp4' }}
                    source={{ uri: "https://player.vimeo.com/video" }}
                    style={styles.video}
                    controls={true} // Make sure controls are enabled
                    resizeMode={'cover'}
                  />
                  {/* Add any other content or close button here */}
                </View>


              </Modal>
            </ImageBackground >
          </View>




          {/* ===========Frequently added======== */}

          <View style={{ flexDirection: 'row', marginVertical: 5, justifyContent: 'space-between', marginLeft: 15, marginRight: 15, }}>
            <Text style={styles.coroselheading}>Featured Books</Text>

          </View>

          <View style={{ marginTop: 10, marginStart: 10, backgroundColor: '#fff' }}>

            <FlatList
              keyExtractor={(item) => item.id}
              data={filterBooks.splice(0, 6)}

              renderItem={({ item }) =>
                <TouchableOpacity onPress={() => {
                  navigation.navigate('BooksDetailPage', { data: item })
                 
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
                        }} />
                    </View>
                    <View style={{ padding: 10, }}>
                      <Text style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#000'
                      }} numberOfLines={2}>
                        {item.name}
                      </Text>


                      {item.items[0].format === 3 ? (<Text style={{
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
                      }}>E-Book</Text>
                      ) : (<Text style={{
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
                      }}>Book</Text>)}
                      
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



          {/* //=============featured ebooks======================== */}

          <View style={{ flexDirection: 'row', marginVertical: 5, justifyContent: 'space-between', marginLeft: 15, marginRight: 15, }}>
            <Text style={styles.coroselheading}>Featured E-Books</Text>

          </View>


        

          <View style={{ marginTop: 10, marginStart: 10, backgroundColor: '#fff' }}>

            <FlatList
              keyExtractor={(item) => item.id}
              data={featuredEBooks.splice(0, 6)}

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


                      {item.items[0].format === 3 ? (<Text style={{
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
                      }}>E-Book</Text>
                      ) : (<Text style={{
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
                      }}>Book</Text>)}
                      
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
    marginLeft: 85,
    right: 0
  },


  contactSection: {
    backgroundColor: '#fff',
    paddingVertical: 20,
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