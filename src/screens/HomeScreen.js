
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, FlatList, Modal, ActivityIndicator, ImageBackground, ScrollView, Animated } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Header from '../common/Header';
import { AuthContext } from '../context/AuthContext';
import WebView from 'react-native-webview';
import getStyles from '../Style/logNRegStyle';
import Theme from './Theme';

const HomeScreen = ({ navigation }) => {
  const { userToken } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [freqBooks, setFreqBooks] = useState([]);
  const [isLoaded, setisLoaded] = useState(true);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [genreBooks, setGenreBooks] = useState([]);


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
          setBooks(responce.data.splice(-10));
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

  const artBooks = freqBooks.filter((item) =>
    item.genres.some(genre => genre.name === "Art")
  );
  const comicBooks = freqBooks.filter((item) =>
    item.genres.some(comic => comic.name === "Comics")
  );
  const combinedBooks = [...artBooks, ...comicBooks];
  // console.log("combine",combinedBooks);

  const bussiness = freqBooks.filter((item) =>
    item.genres.some(genre => genre.name === "Business")
  );
  const success = freqBooks.filter((item) =>
    item.genres.some(genre => genre.name === "sucess")
  );

  const motivation = freqBooks.filter((item) =>
    item.genres.some(genre => genre.name === "Motivation")
  );

  const busSucMoti = [...bussiness, ...success, ...motivation];

  // ======================frequently added end========================//

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
            {isLoaded ? (<ActivityIndicator style={{
              flex: 1,
              marginTop: 10, marginStart: 10, justifyContent: 'center', alignItems: 'center'
            }}
              size="large" color="#c27b7f" />) :

              (<ScrollView showsVerticalScrollIndicator={false} >
                <View style={styles.bannar}>
                  <View style={styles.mainImgNText}>
                    <View >
                      <Image
                        source={require('../images/hero-brownElib.png')}
                        style={styles.imagecontainers}
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

                <View style={styles.flatView1}>
                  <Text style={styles.coroselheading}>Recently Added</Text>
                  <TouchableOpacity onPress={() => {
                    navigation.navigate('filterData', { books })
                  }}>
                    <Image
                      source={require('../images/arrow-right.png')}
                      style={styles.categoryIcon}
                    />
                  </TouchableOpacity>
                </View>


                <View style={{
                  marginStart: 10,
                  height: 300
                }}>
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
                        style={[styles.flatView2, {
                          width: 200,
                          height: 350
                        }]}
                        onPress={() => {
                          navigation.navigate('BooksDetailPage', { data: item })
                        }}>
                        <View style={{
                          width: 150,
                          height: 230,
                          marginEnd: 60,
                          marginTop: -120
                        }}>

                          <View style={{
                            width: 140,
                          }}>
                            <Image
                              source={item.image_path !== null ? { uri: item.image_path }
                                : require('../images/book.png')}
                              style={{
                                aspectRatio: 0.6,
                                resizeMode: 'contain',
                                borderRadius: 5,
                              }}
                            />
                          </View>
                          <Text style={styles.bookName} numberOfLines={1}>
                            {item.name}
                          </Text>
                          <Text style={styles.bookName1} numberOfLines={1}>
                            {item.authors[0].first_name} {item.authors[0].last_name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    }

                  />

                </View>

                {/* ==============video section ============= */}

                {/* <View style={styles.contactSection}>
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
                    </View> */}

                {/* =================video modal=================== */}

                {/* <Modal
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
                </View> */}


                {/* ===========featured books======== */}

                <View style={styles.flatView1}>
                  <Text style={styles.coroselheading}>Featured Books</Text>

                  <TouchableOpacity onPress={() => {
                    navigation.navigate('filterData',
                      { filterBooks })
                  }}>
                    {/* <Text style={styles.seeAll}>See All</Text> */}
                    <Image
                      source={require('../images/arrow-right.png')}
                      style={styles.categoryIcon}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.flatView3}>

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
                    data={filterBooks.splice(a, 10)}

                    renderItem={({ item }) =>


                      <TouchableOpacity
                        style={[styles.flatView2, {
                          width: 180,
                          height: 350
                        }]}
                        onPress={() => {
                          navigation.navigate('BooksDetailPage', { data: item })

                        }}>
                        <View style={{
                          width: 145,
                          height: 350,
                          marginEnd: 50,
                        }}>
                          <View style={{
                            elevation: 5,
                            borderRadius: 5,
                            color: '#000'
                          }}>
                            <Image source={{ uri: item.image_path }}
                              style={styles.bookImage}
                            />
                          </View>
                          <Text style={styles.bookName} numberOfLines={1}>
                            {item.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    }
                  />
                </View>
                {/* ================featured ebooks======================= */}

                <View style={styles.flatView1}>
                  <Text style={styles.coroselheading}>Featured E-Books</Text>
                  <TouchableOpacity onPress={() => {
                    navigation.navigate('filterData', { featuredEBooks })
                  }}>
                    {/* <Text style={styles.seeAll}>See All</Text> */}
                    <Image
                      source={require('../images/arrow-right.png')}
                      style={styles.categoryIcon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.flatView3}>

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
                    data={featuredEBooks.splice(a, 10)}

                    renderItem={({ item }) =>
                      <TouchableOpacity
                        style={[styles.flatView2, {
                          width: 180,
                          height: 300
                        }]}
                        onPress={() => {
                          navigation.navigate('BooksDetailPage', { data: item })

                        }}>
                        <View style={{
                          width: 145,
                          height: 280,
                          marginEnd: 50,
                        }}>
                          <View>
                            <Image source={{ uri: item.image_path }}
                              style={styles.bookImage}
                            />
                          </View>
                          <Text style={styles.bookName} numberOfLines={1}>
                            {item.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    }
                  />
                </View>


                {/* ===========Art======== */}

                <View style={styles.flatView1}>
                  <Text style={styles.coroselheading}>Art </Text>

                  <TouchableOpacity onPress={() => {
                    navigation.navigate('filterData', { artBooks })
                    console.log("art:", artBooks);
                  }}>

                    {/* <Text style={styles.seeAll}>See All</Text> */}
                    <Image
                      source={require('../images/arrow-right.png')}
                      style={styles.categoryIcon}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.flatView3}>
                  <FlatList
                    horizontal={true}
                    snapToInterval={200} // Adjust the interval based on your design
                    decelerationRate="fast"
                    contentContainerStyle={{
                      gap: -20,
                      paddingHorizontal: 12,
                    }}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                    data={artBooks.splice(a, 10)}
                    renderItem={({ item }) =>
                      <TouchableOpacity
                        style={[styles.flatView2, {
                          width: 180,
                          height: 350
                        }]}
                        onPress={() => {
                          navigation.navigate('BooksDetailPage',
                            { data: item })
                        }}>
                        <View style={{
                          width: 145,
                          height: 350,
                          marginEnd: 50,
                        }}>
                          <View style={{
                            elevation: 5,
                            borderRadius: 5,
                            color: '#000'
                          }}>
                            <Image source={{ uri: item.image_path }}
                              style={styles.bookImage}
                            />
                          </View>
                          <Text style={styles.bookName}
                            numberOfLines={1}>
                            {item.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    }
                  />
                </View>

                {/* ===========Art,Comics======== */}

                <View style={styles.flatView1}>
                  <Text style={styles.coroselheading}>Art ,Comics</Text>

                  <TouchableOpacity onPress={() => {
                    navigation.navigate('filterData', { combinedBooks })
                    // console.log("art n comics:",combinedBooks);
                  }}>

                    {/* <Text style={styles.seeAll}>See All</Text> */}
                    <Image
                      source={require('../images/arrow-right.png')}
                      style={styles.categoryIcon}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.flatView3}>
                  <FlatList
                    horizontal={true}
                    snapToInterval={200} // Adjust the interval based on your design
                    decelerationRate="fast"
                    contentContainerStyle={{
                      gap: -20,
                      paddingHorizontal: 12,
                    }}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item,index) => index.toString()}
                    data={combinedBooks.splice(a, 10)}
                    renderItem={({ item }) =>
                      <TouchableOpacity
                        style={[styles.flatView2, {
                          width: 180,
                          height: 350
                        }]}
                        onPress={() => {
                          navigation.navigate('BooksDetailPage',
                            { data: item })
                        }}>
                        <View style={{
                          width: 145,
                          height: 350,
                          marginEnd: 50,
                        }}>
                          <View style={{
                            elevation: 5,
                            borderRadius: 5,
                            color: '#000'
                          }}>
                            <Image source={{ uri: item.image_path }}
                              style={styles.bookImage}
                            />
                          </View>
                          <Text style={styles.bookName}
                            numberOfLines={1}>
                            {item.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    }
                  />
                </View>


                {/* ===========comics======== */}

                <View style={styles.flatView1}>
                  <Text style={styles.coroselheading}>Comics</Text>

                  <TouchableOpacity onPress={() => {
                    navigation.navigate('filterData',
                      { comicBooks })
                  }}>
                    {/* <Text style={styles.seeAll}>See All</Text> */}
                    <Image
                      source={require('../images/arrow-right.png')}
                      style={styles.categoryIcon}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{
                  marginStart: 10,
                  height: 250,
                  marginBottom: 30
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
                    keyExtractor={(item) => item.id.toString()}
                    data={comicBooks.splice(a, 10)}

                    renderItem={({ item }) =>


                      <TouchableOpacity
                        style={[styles.flatView2, {
                          width: 180,
                          height: 350
                        }]}
                        onPress={() => {
                          navigation.navigate('BooksDetailPage', { data: item })

                        }}>
                        <View style={{
                          width: 145,
                          height: 350,
                          marginEnd: 50,
                        }}>
                          <View style={{
                            elevation: 5,
                            borderRadius: 5,
                            color: '#000'
                          }}>
                            <Image source={{ uri: item.image_path }}
                              style={styles.bookImage}
                            />
                          </View>
                          <Text style={styles.bookName} numberOfLines={1}>
                            {item.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    }
                  />
                </View>
                {/* ===========Motivatin,Bussiness,Success======== */}

                <View style={styles.flatView1}>
                  <View>
                    <Text style={styles.coroselheading}>Bussiness,Motivation, </Text>
                    <Text style={styles.coroselheading}>Success </Text>
                  </View>
                  <TouchableOpacity onPress={() => {
                    navigation.navigate('filterData', { busSucMoti })
                    console.log("busSucMoti:", busSucMoti);
                  }}>

                    {/* <Text style={styles.seeAll}>See All</Text> */}
                    <Image
                      source={require('../images/arrow-right.png')}
                      style={styles.categoryIcon}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.flatView3}>
                  <FlatList
                    horizontal={true}
                    snapToInterval={200} // Adjust the interval based on your design
                    decelerationRate="fast"
                    contentContainerStyle={{
                      gap: -20,
                      paddingHorizontal: 12,
                    }}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item,index) => index.toString()}
                    data={busSucMoti}
                    renderItem={({ item }) =>
                      <TouchableOpacity
                        style={[styles.flatView2, {
                          width: 180,
                          height: 350
                        }]}
                        onPress={() => {
                          navigation.navigate('BooksDetailPage',
                            { data: item })
                        }}>
                        <View style={{
                          width: 145,
                          height: 350,
                          marginEnd: 50,
                        }}>
                          <View style={{
                            elevation: 5,
                            borderRadius: 5,
                            color: '#000'
                          }}>
                            <Image source={{ uri: item.image_path }}
                              style={styles.bookImage}
                            />
                          </View>
                          <Text style={styles.bookName}
                            numberOfLines={1}>
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
      }}
    </Theme>
  );
};


export default HomeScreen;
