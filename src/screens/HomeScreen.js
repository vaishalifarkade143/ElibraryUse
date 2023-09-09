import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, FlatList, Modal, ImageBackground, Button, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../common/Header';
import { AuthContext } from '../context/AuthContext';
import { useDispatch } from 'react-redux';
import { viewBooks } from '../redux/slice/BooksDetailSlice';
import Video from 'react-native-video';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';



const HomeScreen = ({ navigation }) => {
  const { userInfo } = useContext(AuthContext);
  const { userToken } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  // const dispatch = useDispatch();
  //const products = [1, 2, 3, 4];
  const [isLoaded, setisLoaded] = useState(true);



  //==============video section====================
  const [modalVisible, setModalVisible] = React.useState(false);
  const image = { uri: 'https://static.vecteezy.com/system/resources/thumbnails/022/574/918/small/abstract-blurred-public-library-interior-space-blurry-room-with-bookshelves-by-defocused-effect-use-for-background-or-backdrop-in-abstract-blurred-publicbusiness-or-education-concepts-generative-ai-photo.jpg' }
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };




  //================book fetch api call using redux===============
  useEffect(() => {
    const getbooks = () => {
      fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books")
        .then(res => res.json())
        //  .then(responce => console.log(responce));
        .then(responce => {
          // console.log(JSON.stringify(items) + ' ' +items.data.length);
          //console.log(responce.data);
          // console.log('Image : ' + responce.data.image);
          setBooks(responce.data.splice(-4));
          setisLoaded(false);
          //dispatch(viewBooks(responce));

        });
    };
    getbooks();
  }, []);




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
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 15, }}>
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
        <View style={{ flexDirection: 'row', marginVertical: 5, justifyContent: 'space-between', marginLeft: 15, marginRight: 15, }}>
          <Text style={styles.coroselheading}>Recently Added</Text>
          <TouchableOpacity>
            <Text style={{ color: '#0aada8', fontSize: 17 }}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* ================slider books=================   */}
        <View style={{ marginTop: 10, marginStart: 10, backgroundColor: '#fff' }}>

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
                      navigation.navigate('Login2')
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
              <Video
            source={{ uri: 'https://player.vimeo.com/external/403131658.sd.mp4' }} // Replace with your video URL
            style={styles.video}
            controls={true}
          /> 
              {/* Your video modal content */}
              {/* You can add your video player component here */}
              {/* For simplicity, we'll just show a close button */}
              {/* <View style={styles.modalContainer}>
                <TouchableOpacity onPress={closeModal} style={styles.closeModalBtn}>
                  <Text style={styles.closeModalText}>Close</Text>
                </TouchableOpacity>

              </View> */}
            </Modal>
          </ImageBackground >
        </View>


        {/* =================== */}


      </ScrollView>
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
