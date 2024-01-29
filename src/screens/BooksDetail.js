



// ========================================23rd nov=================================

import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, FlatList, Modal, Pressable } from 'react-native'
import React, { useEffect, useState, useContext, useCallback } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native';
import Header from '../common/Header';
import { AuthContext } from '../context/AuthContext';
import Pdf from 'react-native-pdf';
import { Alert } from "react-native";
import { Picker } from '@react-native-picker/picker';
import getStyles from '../Style/logNRegStyle';
import Theme from './Theme';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

const BooksDetail = ({ navigation }) => {
  const [isLoaded, setisLoaded] = useState(true);
  const route = useRoute();
  const [tredbooks, setTredBooks] = useState([]);
  const { userToken, userInfo, userEmail } = useContext(AuthContext);
  const [subscribedBooks, setSubscribedBooks] = useState([]);
  const [genre, setGenre] = useState([]);

  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore,setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => { //To toggle the show text or hide it
      setTextShown(!textShown);
  }
  
  const onTextLayout = useCallback(e =>{
      setLengthMore(e.nativeEvent.lines.length >=4); //to check the text is more than 4 lines or not
  },[]);


  //==========================ADDED=====================================
  const [bookdetails, setBookDetails] = useState([]);
  const [selectedLibrary, setSelectedLibrary] = useState(route.params.data.library_id);
  // console.log(selectedLibrary);
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const libraries = [
    
    { id: 111, name: "Dindayal Upadhyay Library" },
    { id: 222, name: "Kundanlal Gupta Library" },
    { id: 333, name: "Rashtramata Kasturba Library" }
  ];
 const [libraryid, setLibraryId] = useState([]);

  const currentDate = new Date();
  const endDate = new Date(currentDate);
  endDate.setDate(endDate.getDate() + 10);
  const [modalVisible, setModalVisible] = useState(false);

  
 const filename = route.params.data.items[0].pdf_preview_file;
  const pdfBaseUrl =
    selectedLibrary === 333
      ? 'https://rashtramatakasturba.smartcitylibrary.com/PDFPreview/'
      :selectedLibrary === 111
      ? 'https://dindayalupadhyay.smartcitylibrary.com/PDFPreview/'
      : 'https://kundanlalgupta.smartcitylibrary.com/PDFPreview/';

  const pdfUrl = `${pdfBaseUrl}${filename}`;
  const [pdfModalVisible, setPdfModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [singleSubscribedPlan, setSingleSubscribedPlan] = useState(null);

  useEffect(() => {
    // When the modal becomes visible, load specific pages (e.g., pages 5-8)
    if (pdfModalVisible) {
      loadSpecificPages(5, 8);
    }
  }, [pdfModalVisible]);

  const loadSpecificPages = (startPage, endPage) => {
    // Set the source with page range
    const source = { uri: `${pdfUrl}#page=${startPage}-${endPage}` };
    setTotalPages(endPage - startPage + 1);
    setCurrentPage(startPage);
    setPdfModalVisible(true);
  };

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

  const startDate = formatDate(currentDate);
  const endingDate = formatDate(endDate);
 
 
  //------------------handle of navigation to book history page for  reserve book---------------------------
  const image = route.params.data.image_path;

  const handleBookHistory = (item) => {


    const subscriptionData1 = {
      image_path : image,
      book_item_id: book1[0]?.id,
      library_id:selectedLibrary
    };

    // console.log('data retrived butttttl::::', subscriptionData1,item[0]?.id);
   const url = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/books/${item[0]?.id}/reserve-book`;

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
        // console.log("responce is:", response);
        return response.json();
      })
      .then((responseData) => {
        // console.log('Data stored successfully:', responseData);
        navigation.navigate('subscribebookHistory',{singleSubscribedPlan});
      })

      .catch((error) => {
        console.error('Error storing data:', error);
      });
 }




  // =================  for single data view ============================
  const fetchSinglePlan = () => {
    const singleUrl = 'https://dindayalupadhyay.smartcitylibrary.com/api/v1/membership-details';

    fetch(singleUrl, {
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
      .then((res) => {
        // console.log('Single Subscribed Plan Data:', res.data);
        setSingleSubscribedPlan(res.data);
        // setIsLoading(false); // Data has been loaded
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        // setIsLoading(false); // Handle error and set isLoading to false

      });
  };



  useEffect(() => {
    if (userToken !== null) {
      const unsubscribe = navigation.addListener('focus', () => {
        fetchSinglePlan();
      });
      return unsubscribe;
    }



  }, [navigation, userToken]);
  console.log('singleSubscribedPlan---------', singleSubscribedPlan);
  
 
 
 
 // ====================================== on click of subscribe=============================================
  const handleSubscribe = () => {
    const member_id = userInfo.data.user.member_id;
    const id = book1[0]?.id;
    // console.log('data id:::',id);
    const library_id = selectedLibrary;
    const subscriptionData = {
      issued_on: startDate,
      returned_on: endDate,
      ebook_id: id,
      member_id: member_id,
      library_id: library_id,
      razorpay_payment_id: 'NA',
      renew: false,
      amount: 10,
    };


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
        // console.log("responce is:", response);
        return response.json();
      })
      .then((responseData) => {
    console.log('Data  responseData:', responseData);

        setModalVisible(!modalVisible);
        navigation.navigate('myEBook',{singleSubscribedPlan});
      })
      .catch((error) => {
        console.error('Error storing data:', error);
      });
  };

  
  // =================================== treding books =============================

  useEffect(() => {
    const tredingbooks = () => {
      fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books")
        .then(res => res.json())
        .then(responce => {
          setTredBooks(responce.data.splice(-20));
          setGenre(responce.data);
          setisLoaded(false);
        });
    };
    tredingbooks();
  },[]);

  

// ======================================================================================
 
    (useEffect(() => {
      if(userToken !== null){const id = userInfo.data.user.id;
        //console.log(id);
        const apiUrl = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/is-member-registered/${id}`;
  
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
            setLibraryId(data.data);
  
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });}
      
    }, []))
 
 
   
 
    useEffect(() => {

    const apiUrl = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/ebook-subscription/undefined`;

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
        setSubscribedBooks(data.data);

      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  },[route,tredbooks]);




  const itemsValue1 = subscribedBooks.filter((item, i) =>

    item.ebook_id === route.params.data.items[0].id &&
    item.library_id === selectedLibrary &&
    item.email === userEmail  )
    ;
  const itemsValue = itemsValue1.length;

  const status = (itemsValue !== 0 ? (true) : (false))
 
 
 
  useEffect(() => {
    
    const id=route.params.data.id;
    // console.log("search",id,selectedLibrary);

    const apiUrl = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/search-books?id=${id}&search_by_book=true&library_id=${selectedLibrary}`;

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
        setBookDetails(data.data);
        setInitialDataFetched(true);
       
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  },[route,tredbooks])



  //=================fetching bookdetails when the page will render for first time================================
// const book=bookdetails.filter((item)=>
//     item.book.library_id===route.params.data.library_id)

//     console.log(book);

// const [filterbook,setFilterBook]=useState(book);

// useEffect(()=>{

//   let filteredBooks =filterbook;
//   if(selectedLibrary!==route.params.data.library_id)
//   {
//     filteredBooks=bookdetails.filter((item)=>
//     item.book.library_id===selectedLibrary)
//   }
//   setFilterBook(filteredBooks);

 
// },[selectedLibrary])

// console.log(filterbook);




const book1=bookdetails.filter((item)=>
    item.book.library_id===route.params.data.library_id)
   
const [filterbook,setFilterBook]=useState(null);

  useEffect(()=>{

    let filteredBooks =book1;

    if(selectedLibrary!==route.params.data.library_id)
    {
      filteredBooks=bookdetails.filter((item)=>
      item.book.library_id===selectedLibrary)
    }
      else{
      filteredBooks=bookdetails.filter((item)=>
          item.book.library_id===route.params.data.library_id)
     }

    setFilterBook(filteredBooks);
    setInitialDataFetched(false);
  },[selectedLibrary])
  

  //===================API CALL FOR DIFFERENT LIBRARY WHEATHER THE MEMBER IS REGISTERED OR NOT=======================


  const handle_member = () => {

    const id = userInfo.data.user.id;
   // console.log(id);
    const apiUrl = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/is-member-registered/${id}`;

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
        setLibraryId(data.data);

      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }




  useEffect(() => {
    if(userToken!==null)
    { handle_member();}
   
   
   },[route,tredbooks])
 
 
 
 
 const membership_exist = libraryid.map((item) => [
     item.membership_plan_name,
   ]);
   const plan_exist = membership_exist.flat();
   console.log(plan_exist[0]);

  //===================API CALL FOR register-member-to-library=======================  

  const handleMemberRegistered = (item) => {


    //console.log(item);
    const url = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/register-member-to-library/${item}`;
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
        return response.json();
      })
      .then((responseData) => {

        setModalVisible(!modalVisible);

        Alert.alert(
          'Success!',
          'You are successfully registered with same email and password'
        )
      })

      .catch((error) => {
        console.error('Error storing data:', error);
      });
  };


  const userLibraryId = libraryid.map((item) => [
    item.user_library_id,
  ]);
  const LibraryId = userLibraryId.flat();


  return (
    <Theme>
    {({ theme }) => {
      const styles = getStyles(theme);
      return (
      
    <View style={styles.container}>
        
      <Header
        // rightIcon={require('../images/Logoelibrary.png')}
        leftIcon={require('../images/back.png')}
        onClickLeftIcon={() => {
          navigation.navigate('Book', { screen: 'Home' });
        }}
     
      />
<ScrollView showsVerticalScrollIndicator={false}  >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>

        <View style={styles.centeredView}>
          {LibraryId.includes(selectedLibrary) ?
            (<View style={styles.modalView}>

              <Text style={styles.subscribeText}>The Book Will be Subscribed from</Text>
              <View style={{ flexDirection: 'row', marginBottom: 15, }}>
                <Text style={styles.subscribeDate}>{startDate}</Text>
                <Text style={styles.subscribeText}>  to  </Text>
                <Text style={styles.subscribeDate}>{endingDate}</Text>
              </View>
              <Pressable
                style={styles.button}
                onPress={() => { 
                handleSubscribe(book1),
                 handle_member() 
                 }}>
                <Text style={styles.textStyle}>Subscribe</Text>
              </Pressable>

            </View>) :
            (<View style={styles.modalView}>

              <Text style={styles.modalText}>Book Reservation/Subscription</Text>
              <View style={{ marginBottom: 15, }}>

                <View style={{ flexDirection: 'row' }}>
                  <Text>These books belong to </Text>
                  <Text style={styles.libraryName}>
                    {selectedLibrary === 111 ? 'Dindayal Upadhyay Library' :
                      selectedLibrary === 222 ? 'Kundanlal Gupta Library' :
                        'Rashtramata Kasturba Library'}
                  </Text>
                  <Text>. </Text>
                </View>


                <Text>You are not a member yet. Do you want to register </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text>for </Text>
                  <Text style={styles.libraryName}>
                    {selectedLibrary === 111 ? 'Dindayal Upadhyay Library' :
                      selectedLibrary === 222 ? 'Kundanlal Gupta Library' :
                        'Rashtramata Kasturba Library'}
                  </Text>
                  <Text> and continue?</Text>
                </View>

              </View>

              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Pressable
                  style={styles.button}
                  onPress={() => { handleMemberRegistered(selectedLibrary), handle_member() }}>
                  <Text style={styles.textStyle}>Yes</Text>
                </Pressable>
           
                <Pressable
                  style={styles.button}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>No</Text>
                </Pressable>
              </View>


            </View>)}
        </View>
      </Modal>

      {/* ===============================Pdf Modal============================================== */}
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={pdfModalVisible}
        onRequestClose={() => {
          setPdfModalVisible(false);

        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pdf
              trustAllCerts={false}
              source={{ uri: pdfUrl }}
              onLoadComplete={(numberOfPages, filePath) => {
                console.log(`Number of pages: ${numberOfPages}`);
              }}
              onPageChanged={(page, numberOfPages) => {
                setCurrentPage(page);
              }}
              onError={(error) => {
                console.log(error);
              }}
              onPressLink={(uri) => {
                console.log(`Link pressed: ${uri}`);
              }}
              style={styles.pdf}
            /> */}

<Modal
      animationType="slide"
      transparent={true}
      visible={pdfModalVisible}
      onRequestClose={() => {
        setPdfModalVisible(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pdf
            trustAllCerts={false}
            source={{ uri: pdfUrl }}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
              setTotalPages(numberOfPages);
            }}
            onPageChanged={(page, numberOfPages) => {
              setCurrentPage(page);
            }}
            onError={(error) => {
              console.log(error);
            }}
            onPressLink={(uri) => {
              // console.log(`Link pressed: ${uri}`);
            }}
            // Use scale prop to control the scaling of pages
            scale={totalPages > 8 ? 8 / totalPages : 1}
            style={styles.pdf}
          />

            <View style={styles.pageButton}>
              <Text style={styles.pageButtonText}> {currentPage}</Text>
            </View>

          </View>
        </View>
      </Modal>




<View  style={{
            marginTop:-30,
          }}>
<View style={{
         flexDirection:'row',}}>
      <View style={{
            width: 110,
            marginTop: 14 / 2,
            overflow: 'visible',
            marginLeft:10,
            marginTop:40,
          }}>
            <Image source={{
              uri: route.params.data.image_path
            }}
              style={{
                aspectRatio: 0.7,
                resizeMode: 'contain',
                borderRadius:5,
              }}
            />
          </View>
      <View>

        <View style={{marginTop:35,justifyContent:'center',alignItems:'center'}}>
          <Text  onTextLayout={onTextLayout}
          style={{
      fontSize: 25,
      color: theme === 'LIGHT' ? '#000' : '#fff',
      fontFamily: 'OpenSans-Regular',
       marginLeft: 13,
        marginRight: 20,
       width:230
    }}
          >{book1[0]?.book?.name}</Text>
        
        </View>

          {/* <View style={[styles.textHeadingView,]}>
          <Text style={styles.textHeading}>ISBN No :</Text>
          <Text style={styles.textHeadingOutput}>{book1[0]?.book?.isbn}</Text>
        </View> */}

        <View style={styles.textHeadingView}>
          {/* <Text style={styles.textHeading}>Author :</Text> */}
          <Text style={styles.textHeadingOutput}>{book1[0]?.book?.authors[0].first_name} 
          {book1[0]?.book?.authors[0].last_name}</Text>
        </View>
        {/* <View style={styles.textHeadingView}>
          <Text style={styles.textHeading}>Format :</Text>
          {book1[0]?.format === 3 ?
            (<Text style={styles.textHeadingOutput}>E-Book</Text>)
            : book1[0]?.format === 1 ?
              (<Text style={styles.textHeadingOutput}>hardcover</Text>) :
              (<Text style={styles.textHeadingOutput}>Book</Text>)}
        </View> */}
        {/* <View style={styles.textHeadingView}>
          <Text style={styles.textHeading}>Edition :</Text>
          <Text style={styles.textHeadingOutput}>{book1[0]?.edition}</Text>
        </View> */}
        {/* <View style={styles.textHeadingView}>
          <Text style={styles.textHeading}>Genre :</Text>
          <Text style={styles.textHeadingOutput}>{book1[0]?.book?.genres[0].name}</Text>
        </View> */}
        <View style={styles.textHeadingView}>
          {/* <Text style={styles.textHeading}>Publisher  :</Text> */}
          <Text style={styles.textHeadingOutput}>{book1[0]?.publisher?.name}</Text>
        </View>
     </View>

  </View>

  <View style={{
                flexDirection: 'row', 
                justifyContent: 'center',
                alignItems: 'center',
                 marginTop: 25,
                  marginBottom: 30,
              }}>

                <View style={{
                  borderRightColor: '#2826268a',
                   borderRightWidth: 1,
                }}>
                  <AntDesign name="book" color={"gray"} size={15}  
                  style={{marginLeft: 25,
                      marginRight: 25,}} />
                   {book1[0]?.format === 3 ?
            (<Text style={styles.textHeadingOutput}>E-Book</Text>)
            : book1[0]?.format === 1 ?
              (<Text style={styles.textHeadingOutput}>hardcover</Text>) :
              (<Text style={styles.textHeadingOutput}>Book</Text>)}
                  
                </View >
                <View style={{
                  borderRightColor: '#2826268a', borderRightWidth: 1
                }}>
                   <Entypo name="bookmarks" color={"gray"} size={15}  
                  style={{marginLeft: 25,
                    marginRight: 25,}} />
                  <Text style={styles.textHeadingOutput}>{book1[0]?.book?.genres[0].name}</Text>
                 
                </View>
                <View>
                <Feather name="edit" color={"gray"} size={15}  
                  style={{ marginLeft: 25,
                    marginRight: 25,}} />
                  <Text style={styles. textHeadingOutput}>{book1[0]?.edition}</Text>
                  
                </View>

              </View>


</View>

     
    

  
       
        {/* <View style={[styles.textHeadingView,{marginTop:35}]}>
          <Text style={styles.textHeading}>ISBN No:</Text>
          <Text style={styles.textHeadingOutput}>{book1[0]?.book?.isbn}</Text>
        </View> */}

        
        {/* <View style={styles.textHeadingView}>
          <Text style={styles.textHeading}>Author:</Text>
          <Text style={styles.textHeadingOutput}>{book1[0]?.book?.authors[0].first_name} 
          {book1[0]?.book?.authors[0].last_name}</Text>
        </View>
        <View style={styles.textHeadingView}>
          <Text style={styles.textHeading}>Format:</Text>
          {book1[0]?.format === 3 ?
            (<Text style={styles.textHeadingOutput}>E-Book</Text>)
            : book1[0]?.format === 1 ?
              (<Text style={styles.textHeadingOutput}>hardcover</Text>) :
              (<Text style={styles.textHeadingOutput}>Book</Text>)}
        </View>
        <View style={styles.textHeadingView}>
          <Text style={styles.textHeading}>Edition</Text>
          <Text style={styles.textHeadingOutput}>{book1[0]?.edition}</Text>
        </View>
        <View style={styles.textHeadingView}>
          <Text style={styles.textHeading}>Genre:</Text>
          <Text style={styles.textHeadingOutput}>{book1[0]?.book?.genres[0].name}</Text>
        </View>
        <View style={styles.textHeadingView}>
          <Text style={styles.textHeading}>Publisher:</Text>
          <Text style={styles.textHeadingOutput}>{book1[0]?.publisher?.name}</Text>
        </View> */}

        <Text style={[styles.textHeading,{marginLeft:10,
          marginTop:10,
          marginBottom:5}]}>Belongs To:</Text>

<View style={{ 
               flexDirection: 'column', 
                marginLeft: 10,
                 marginBottom:5,
                 marginRight:10,
                 borderColor:'grey',
                 borderWidth:1.5,
                borderRadius:5
}}>
      <Picker
        selectedValue={selectedLibrary}
        onValueChange={(itemValue) => setSelectedLibrary(itemValue)}
        style={{
           height: 40,
           marginTop: -14, 
          textAlign: 'center',
          fontFamily: 'Poppins-Regular',
          borderWidth:0.2,
          borderColor:'#efefef' }}
        
        itemStyle={{}}
      >
        {libraries.map((library) => (
          <Picker.Item 
          key={library.id}
           label={library.name} 
           value={library.id}
          enabled={bookdetails.some((book) => book.book.library_id === library.id)}
          />
        ))}
      </Picker>
 </View>

        <View style={styles.textHeadingView}>
          <Text style={styles.textHeading}>Description:</Text>
          </View>
         
          <View>
          <Text onTextLayout={onTextLayout}
              numberOfLines={textShown ? undefined : 3}
              style={styles.textHeadingOutput}
            >{book1[0]?.book?.description}</Text>
            
          {
                  lengthMore ?
                   <Text
                  onPress={toggleNumberOfLines}
                  style={{ marginStart:14,
                    fontFamily: 'OpenSans-Regular', }}>
                    {textShown ? 'Read less...' : 'Read more...'}
                    </Text>
                  :null
              }
        </View>

          
 {book1[0]?.status === 1 ?
          (<View style={{ flexDirection: 'column' }}>

            {book1[0]?.format !== 3 ?
              (<View style={{ flexDirection: 'row',
               alignItems: 'center',
                justifyContent: 'center',
               marginTop: 10, }}>
                <Text style={{ textAlign: 'center',
                fontSize: 15, 
                 fontFamily: 'Poppins-Regular',
                color: '#c27b7f' }}>Available </Text>
                <Text style={{ backgroundColor: '#c27b7f', 
                color: 'white',
                 height:20,width:20,
                 borderRadius: 15 ,textAlign:'center'}}>1</Text></View>)
              :
              (null)}

            {userToken !== null && 
            itemsValue ? (<Text style={{
              backgroundColor: 'grey',
              padding: 10,
              borderRadius: 5,
              width: 170,
              height: 40,
              marginTop: 20,
              marginLeft: 20,
              marginBottom: 20,
              color: 'black', 
              textAlign:'center',
              fontSize:15,
              fontWeight:'bold',
              opacity:0.4
            }}>Ebook is Subscribed</Text>) :
              (

                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#c27b7f',
                      padding: 5,
                      borderRadius: 10,
                      width: 100,
                      height: 35,
                      marginTop: 20,
                      marginLeft: 13,
                      marginBottom: 20,

                    }}
                    onPress={() => {
                      if (userToken !== null &&
                        plan_exist[0]===null) {
                      
                        Alert.alert(
                          `YOU DON'T HAVE ANY MEMBERSHIPPLAN`,)
                      }

                      else {
                        if (userToken !== null) {

                          if (book1[0]?.format=== 3) {

                            handle_member();
                            setModalVisible(!modalVisible);
                          } else {
                            if (LibraryId.includes(selectedLibrary)) {
                              handleBookHistory(book1);
                            } else {
                              handle_member();
                              setModalVisible(!modalVisible);
                            }
                          }
                        }

                        else {
                          navigation.navigate('sLogin');
                        }
                      }

                    }}


                  >
                    <Text style={{
                      color: '#fff',
                      fontFamily: 'OpenSans-Regular',
                      fontSize: 15,
                      textAlign: 'center',
                    }}> {book1[0]?.format === 3 ? 'Subscribe' : 'Reserved'}</Text>
                  </TouchableOpacity>


                  {userToken !== null &&
                    book1[0]?.format === 3 &&
                    book1[0]?.pdf_preview_file !== null ?
                    (<TouchableOpacity
                      style={{
                        backgroundColor: '#c27b7f',
                        padding: 5,
                        borderRadius: 10,
                        width: 100,
                        height: 35,
                        marginTop: 20,
                        marginLeft: 20,
                        marginBottom: 20,
                      }}
                      onPress={() => {
                        setPdfModalVisible(true);

                      }}
                    >

                      <Text style={{
                        color: '#fff',
                        fontFamily: 'OpenSans-Regular',
                        fontSize: 15,
                        textAlign: 'center',
                      }}>Preview</Text>

                    </TouchableOpacity>) : null}


                </View>

              )}
  </View>
   ) :
   (<Text style={{
            textAlign: 'center', color: 'red',
            fontSize: 15,  fontFamily: 'Poppins-Regular', marginBottom: 10
          }}>Unavailable</Text>)

        }
          {/* =================================Trending books==================================== */}

        <View style={{ flexDirection: 'row', marginVertical: 5, justifyContent: 'space-between', marginLeft: 15, marginRight: 15, }}>
          <Text style={styles.coroselheading}>Trending Books</Text>
        </View>
        

        <View style={{ marginTop: 10,
           marginStart: 10, 
           backgroundColor: theme === 'light'?'#000':'#fff' }}>
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
            data={tredbooks}
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
                    width: 155,
                    height: 300,
                    marginEnd: 50,
                  }}>
                    <View style={{
                      elevation: 5,
                      borderRadius: 5,
                      color: '#000'
                    }}>
                    <Image source={{ uri: item.image_path }}
                      style={{
                        aspectRatio: 0.7,
                        resizeMode: 'contain',
                        borderRadius: 10,
                      }} />
                      </View>
                    <Text  style={{
                      marginTop: 10,
                      fontSize: 15,
                      fontFamily: 'Poppins-Regular',
                      color:  theme === 'LIGHT'? '#34495E':'#fff',
                      flexDirection: 'column'
                    }} numberOfLines={1}>
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
      </ScrollView>
    </View>
     );
    }}
  </Theme>
  );
};

export default BooksDetail;
const styles = StyleSheet.create({

  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    backgroundColor: '#c27b7f',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',

  },
  modalText: {
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'OpenSans-Regular',
    color: '#000'
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  pageButton: {
    position: 'absolute',
    bottom: 210,
    right: 0,
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 10,
  },
  pageButtonText: {
    color: 'white',
  },
 
});







//======================= working=================




// import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, FlatList, Modal, Pressable } from 'react-native'
// import React, { useEffect, useState, useContext } from 'react'
// import { useRoute, useNavigation } from '@react-navigation/native';
// import Header from '../common/Header';
// import { AuthContext } from '../context/AuthContext';
// import Pdf from 'react-native-pdf';
// import { Alert } from "react-native";
// import { Picker } from '@react-native-picker/picker';



// const BooksDetail = ({ navigation }) => {
//   const [isLoaded, setisLoaded] = useState(true);
//   const route = useRoute();
//   const [tredbooks, setTredBooks] = useState([]);
//   const { userToken, userInfo, userEmail } = useContext(AuthContext);
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [Ebooks, setEbooks] = useState([]);
//   const [subscribedBooks, setSubscribedBooks] = useState([]);
//   const [subscribe, setSubscribe] = useState([]);




//   //==========================ADDED=====================================
//   const [bookdetails, setBookDetails] = useState([]);
//   const [selectedLibrary, setSelectedLibrary] = useState(route.params.data.library_id);

//   const libraries = [
    
//     { id: 111, name: "Dindayal Upadhyay Library" },
//     { id: 222, name: "Kundanlal Gupta Library" },
//     { id: 333, name: "Rashtramata Kasturba Library" }
//   ];
 


//   const [libraryid, setLibraryId] = useState([]);

//   const currentDate = new Date();
//   const endDate = new Date(currentDate);
//   endDate.setDate(endDate.getDate() + 10);
//   const [modalVisible, setModalVisible] = useState(false);




//   // const filename = route.params.data.items[0].pdf_preview_file;
//   // const pdfUrl = filterbook.book.library_id  === 333
//   //   ? `https://rashtramatakasturba.smartcitylibrary.com/PDFPreview/${filename}`
//   //   : filterbook.book.library_id  === 111
//   //     ? `https://dindayalupadhyay.smartcitylibrary.com/PDFPreview/${filename}`
//   //     : `https://kundanlalgupta.smartcitylibrary.com/PDFPreview/${filename}`;



//   const [currentPage, setCurrentPage] = useState(1);
//   const [pdfModalVisible, setPdfModalVisible] = useState(false);


//   const [subscribeCount, setSubscribeCount] = useState(0);


  
  
  
//   //-----------------for convertion of date to personalized style date ----------------------------
//   function formatDate(inputDate) {

//     const inputDateObj = new Date(inputDate);


//     const monthNames = [
//       'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//     ];


//     const day = inputDateObj.getDate();
//     const month = monthNames[inputDateObj.getMonth()];
//     const year = inputDateObj.getFullYear();


//     let daySuffix;
//     if (day >= 11 && day <= 13) {
//       daySuffix = 'th';
//     } else {
//       switch (day % 10) {
//         case 1:
//           daySuffix = 'st';
//           break;
//         case 2:
//           daySuffix = 'nd';
//           break;
//         case 3:
//           daySuffix = 'rd';
//           break;
//         default:
//           daySuffix = 'th';
//       }
//     }
//     const formattedDate = `${day}${daySuffix} ${month}, ${year}`;
//     return formattedDate;
//   }

//   const startDate = formatDate(currentDate);
//   const endingDate = formatDate(endDate);




//   // ------------------handle of navigation to book history page---------------------------
//   // ==============changes needed==========================================
//   const handleBookHistory = (item) => {


//     const subscriptionData1 = {
//       book_item_id: route.params.data.items[0].id,
//       library_id: filterbook.book.library_id ,
//     };

//     console.log('data retrived butttttl::::', subscriptionData1);



//     const url = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/books/${item.items[0].id}/reserve-book`;

//     fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${userToken}`,
//       },
//       body: JSON.stringify(subscriptionData1),
//     })

//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         console.log("responce is:", response);
//         return response.json();
//       })
//       .then((responseData) => {
//         console.log('Data stored successfully:', responseData);
//         navigation.navigate('subscribebookHistory');
//       })

//       .catch((error) => {
//         console.error('Error storing data:', error);
//       });

//   }






// // ===================================================================================
// //==============changes needed==========================================
//   const handleSubscribe = (item) => {
//     const member_id = userInfo.data.user.member_id;
//     const id = route.params.data.items[0].id;
//     const library_id = filterbook.book.library_id ;
//     console.log('data testis::::', item);
//     const subscriptionData = {


//       issued_on: startDate,
//       returned_on: endDate,
//       ebook_id: id,
//       member_id: member_id,
//       library_id: library_id,
//       razorpay_payment_id: 'NA',
//       renew: false,
//       amount: 10,
//     };


//     const url = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/ebook-subscription`;
//     fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${userToken}`,
//       },
//       body: JSON.stringify(subscriptionData),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         console.log("responce is:", response);
//         return response.json();
//       })
//       .then((responseData) => {
//         console.log('Data stored successfully:', responseData);

//         setModalVisible(!modalVisible);
//         setSubscribeCount(subscribeCount + 1);
//         navigation.navigate('myEBook');
//       })

//       .catch((error) => {
//         console.error('Error storing data:', error);
//       });
//   };

  
  
  
  
//   // ================================================================

// useEffect(() => {
//     const tredingbooks = () => {
//       fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books")
//         .then(res => res.json())
//         .then(responce => {
//           setTredBooks(responce.data.splice(-4));
//           setisLoaded(false);
//         });
//     };
//     tredingbooks();
//   },[]);








//   // userToken !== null ?
//   //   (useEffect(() => {
//   //     const id = userInfo.data.user.id;
//   //     console.log(id);
//   //     const apiUrl = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/is-member-registered/${id}`;

//   //     fetch(apiUrl, {
//   //       method: 'GET',
//   //       headers: {
//   //         'Authorization': `Bearer ${userToken}`,
//   //         'Content-Type': 'application/json',
//   //       },
//   //     })
//   //       .then((response) => {
//   //         if (!response.ok) {
//   //           throw new Error(`HTTP error! Status: ${response.status}`);
//   //         }
//   //         return response.json();
//   //       })
//   //       .then((data) => {
//   //         setLibraryId(data.data);

//   //       })
//   //       .catch((error) => {
//   //         console.error('Error fetching data:', error);
//   //       });
//   //   }, [])) : (null);







//   // useEffect(() => {

//   //   const apiUrl = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/ebook-subscription`;

//   //   fetch(apiUrl, {
//   //     method: 'GET',
//   //     headers: {
//   //       'Authorization': `Bearer ${userToken}`,
//   //       'Content-Type': 'application/json',
//   //     },
//   //   })
//   //     .then((response) => {
//   //       if (!response.ok) {
//   //         throw new Error(`HTTP error! Status: ${response.status}`);
//   //       }
//   //       return response.json();
//   //     })
//   //     .then((data) => {
//   //       setSubscribedBooks(data.data);

//   //     })
//   //     .catch((error) => {
//   //       console.error('Error fetching data:', error);
//   //     });
//   // },[route,tredbooks,selectedLibrary]);






// //==============changes needed==========================================
//   // const itemsValue1 = subscribedBooks.filter((item, i) =>

//   //   item.ebook_id === route.params.data.items[0].id &&
//   //   item.library_id === filterbook.book.library_id &&
//   //   item.email === userEmail

//   // )
//   //   ;
//   // const itemsValue = itemsValue1.length;

//   // const status = (itemsValue !== 0 ? (true) : (false))




//   // console.log("yes", status);









// //======================fetch everytime when this page will load ====================================

//   useEffect(() => {
    
//     const id=route.params.data.id;
//     const libraryid=route.params.data.library_id;

//     console.log(id,libraryid);

//     const apiUrl = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/search-books?id=${id}&search_by_book=true&library_id=${libraryid}`;

//     fetch(apiUrl, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${userToken}`,
//         'Content-Type': 'application/json',
//       },
      
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setBookDetails(data.data);
       
        
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   },[route,tredbooks])


//   console.log(bookdetails);


//   const userLibraryId1 = bookdetails.map((item) => [
//     item.book.library_id,
//   ]);
//   const LibraryId1 = userLibraryId1.flat();
  
//   console.log(LibraryId1);








// //=================fetching bookdetails when the page will render for first time================================

//   const [filterbook,setFilterBook]=useState(filterbook1);
//   const filterbook1=bookdetails.filter((item)=>
//         item.book.library_id===route.params.data.library_id
//         )
//         console.log(filterbook1);




//   useEffect(()=>{

//     let filteredBooks = filterbook1;
//     if(selectedLibrary!==route.params.data.library_id)
//     {
//       filteredBooks=bookdetails.filter((item)=>
//       item.book.library_id===selectedLibrary)
//     }
//     setFilterBook(filteredBooks);

   
//   },[filterbook,selectedLibrary])



 










//   //===================API CALL FOR DIFFERENT LIBRARY WHEATHER THE MEMBER IS REGISTERED OR NOT=======================


//   const handle_member = () => {

//     const id = userInfo.data.user.id;
//     console.log(id);
//     const apiUrl = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/is-member-registered/${id}`;

//     fetch(apiUrl, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${userToken}`,
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setLibraryId(data.data);

//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }




//   // console.log(libraryid);


//   //===================API CALL FOR register-member-to-library=======================  

//   const handleMemberRegistered = (item) => {


//     console.log(item);
//     const url = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/register-member-to-library/${item}`;
//     fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${userToken}`,
//       },

//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         // console.log("responce is:", response);
//         return response.json();
//       })
//       .then((responseData) => {
//         // console.log('Data stored successfully:', responseData);

//         setModalVisible(!modalVisible);

//         Alert.alert(
//           'Success!',
//           'You are successfully registered with same email and password'
//         )
//       })

//       .catch((error) => {
//         console.error('Error storing data:', error);
//       });
//   };


//   const userLibraryId = libraryid.map((item) => [
//     item.user_library_id,
//   ]);
//   const LibraryId = userLibraryId.flat();

//   // console.log(LibraryId);
//   // console.log(LibraryId.includes(route.params.data.library_id));

 


//   return (
//     <View style={{ flex: 1, backgroundColor: '#fff', flexDirection: 'column' }}>
//       <Header
//         rightIcon={require('../images/Logoelibrary.png')}
//         leftIcon={require('../images/back.png')}
//         onClickLeftIcon={() => {
//           navigation.navigate('Book', { screen: 'Home' });
//         }}
//       />



// {/* ===============================Subscribe Modal============================================== */}
      
// <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(!modalVisible);
//         }}>

//         <View style={styles.centeredView}>
//           {/* //==============changes needed========================================== */} 
//           {LibraryId.includes(filterbook.book.library_id) ?
//             (<View style={styles.modalView}>

//               <Text style={styles.modalText}>The Book Will be Subscribed from</Text>
//               <View style={{ flexDirection: 'row', marginBottom: 15, }}>
//                 <Text style={{ color: 'blue', fontSize: 15, fontWeight: 'bold', }}>{startDate}</Text>
//                 <Text style={{ fontSize: 15, fontWeight: 'bold', }}>  to  </Text>
//                 <Text style={{ color: 'blue', fontSize: 15, fontWeight: 'bold', }}>{endingDate}</Text>
//               </View>
              
//              {/* //==============changes needed========================================== */} 
//               <Pressable
//                 style={styles.button}

                
//                 onPress={() => { handleSubscribe(route.params.data), handle_member() }}>
//                 <Text style={styles.textStyle}>Subscribe</Text>
//               </Pressable>

//             </View>) :
//             (<View style={styles.modalView}>

//               <Text style={styles.modalText}>Book Reservation/Subscription</Text>



//               <View style={{ marginBottom: 15, }}>

//                 <View style={{ flexDirection: 'row' }}>
//                   {/* //==============changes needed========================================== */}
//                   <Text>These books belong to </Text>
//                   <Text style={styles.libraryName}>
//                     {filterbook.book.library_id  === 111 ? 'Dindayal Upadhyay Library' :
//                       filterbook.book.library_id  === 222 ? 'Kundanlal Gupta Library' :
//                         'Rashtramata Kasturba Library'}
//                   </Text>
//                   <Text>. </Text>
//                 </View>


//                 <Text>You are not a member yet. Do you want to register </Text>
//                 <View style={{ flexDirection: 'row' }}>
//                   <Text>for </Text>
//                   {/* //==============changes needed========================================== */}
//                   <Text style={styles.libraryName}>
//                     {filterbook.book.library_id  === 111 ? 'Dindayal Upadhyay Library' :
//                      filterbook.book.library_id  === 222 ? 'Kundanlal Gupta Library' :
//                         'Rashtramata Kasturba Library'}
//                   </Text>
//                   <Text> and continue?</Text>
//                 </View>

//               </View>



//               <View style={{ flexDirection: 'row', gap: 10 }}>
//                 {/* //==============changes needed========================================== */}
//                 <Pressable
//                   style={styles.button}
//                   // onPress={() => handleMemberRegistered(selectedLibraryId)}>
//                   onPress={() => {handleMemberRegistered(filterbook.book.library_id ), handle_member() }}>
//                   <Text style={styles.textStyle}>Yes</Text>
//                 </Pressable>

//                 <Pressable
//                   style={styles.button}
//                   onPress={() => setModalVisible(!modalVisible)}>
//                   <Text style={styles.textStyle}>No</Text>
//                 </Pressable>
//               </View>


//             </View>)}
//         </View>
//       </Modal>
//       {/* ===============================Pdf Modal============================================== */}
//       {/* <Modal
//         animationType="slide"
//         transparent={true}
//         visible={pdfModalVisible}
//         onRequestClose={() => {
//           setPdfModalVisible(false);

//         }}>
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Pdf
//               trustAllCerts={false}
//               source={{ uri: pdfUrl }}
//               onLoadComplete={(numberOfPages, filePath) => {
//                 console.log(`Number of pages: ${numberOfPages}`);
//               }}
//               onPageChanged={(page, numberOfPages) => {
//                 setCurrentPage(page);
//               }}
//               onError={(error) => {
//                 console.log(error);
//               }}
//               onPressLink={(uri) => {
//                 console.log(`Link pressed: ${uri}`);
//               }}
//               style={styles.pdf}
//             />

//             <View style={styles.pageButton}>
//               <Text style={styles.pageButtonText}> {currentPage}</Text>
//             </View>

//           </View>
//         </View>
//       </Modal> */}


//       <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 15, }}>
//         <View style={{
//           marginLeft: 80,
//           width: Dimensions.get('window').width,
//           height: 200,
//           marginEnd: 22,
//           borderRadius: 10,
//         }}>
//           <View style={{
//             width: 150,
//             marginLeft: 60 / 2,
//             marginTop: 10 / 2,
//             overflow: 'visible',
//           }}>
//             <Image source={{
//               uri: route.params.data.image_path
//             }}
//               style={{
//                 aspectRatio: 0.8,
//                 resizeMode: 'cover'
//               }}
//             />
//           </View>
//         </View>
//         <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
//           <Text style={styles.textHeading}>ISBN No:</Text><Text style={{ fontSize: 15, marginLeft: 8 }}>{filterbook.book.isbn}</Text>
//         </View>
//         <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
//           <Text style={styles.textHeading}>Author:</Text>
//           <Text style={{ fontSize: 15, marginLeft: 8 }}>{filterbook.book.authors[0].first_name} {filterbook.book.authors[0].last_name}</Text>
//         </View>
//         <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
//           <Text style={styles.textHeading}>Format:</Text>
//           {filterbook.format === 3 ?
//             (<Text style={{ fontSize: 15, marginLeft: 8 }}>E-Book</Text>)
//             : filterbook.format === 1 ?
//               (<Text style={{ fontSize: 15, marginLeft: 8 }}>hardcover</Text>) :
//               (<Text style={{ fontSize: 15, marginLeft: 8 }}>Book</Text>)}
//         </View>
//         <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
//           <Text style={styles.textHeading}>Edition</Text>
//           <Text style={{ fontSize: 15, marginLeft: 8 }}>{filterbook.edition}</Text>
//         </View>
//         <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
//           <Text style={styles.textHeading}>Genre:</Text>
//           <Text style={{ fontSize: 15, marginLeft: 8 }}>{filterbook.book.genres[0].name}</Text>
//         </View>
//         <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
//           <Text style={styles.textHeading}>Publisher:</Text>
//           <Text style={{ fontSize: 15, marginLeft: 8 }}>{filterbook.publisher.name}</Text>
//         </View>

//         {/* <View style={{ flexDirection: 'column', marginTop: 10, marginLeft: 10, }}>
//           <Text style={styles.textHeading}>Belongs To:</Text>
//           <View style={{ marginRight: 5 }}>{route.params.data.library_id === 111 ?
//             (<Text style={{ fontWeight: 'bold', paddingTop: 10, height: 50, fontSize: 18, textAlign: 'center', marginTop: 10, borderWidth: 5 }}>
//               Dindayal UpadhyayLibrary</Text>) :
//             (route.params.data.library_id === 222 ?
//               (<Text style={{ fontWeight: 'bold', paddingTop: 10, height: 50, fontSize: 18, textAlign: 'center', marginTop: 10, borderWidth: 5 }}>
//                 Kundanlal Gupta Library</Text>) :
//               (<Text style={{ fontWeight: 'bold', paddingTop: 10, height: 50, fontSize: 18, textAlign: 'center', marginTop: 10, borderWidth: 5 }}>
//                 Rashtramata Kasturba Library</Text>))}</View></View> */}


// <View style={{ flexDirection: 'column', marginTop: 10, marginLeft: 10 }}>
//       <Text style={styles.textHeading}>Belongs To:</Text>

//       <Picker
//         selectedValue={selectedLibrary}
//         onValueChange={(itemValue) => setSelectedLibrary(itemValue)}
//         style={{ height: 40, marginTop: 10 }}
//       >
       
//         {libraries.map((library) => (
//           <Picker.Item key={library.id} label={library.name} value={library.id}
          
//           />
//         ))}
//       </Picker>

//       {/* {selectedLibrary && (
//         <Text
//           style={{
//             fontWeight: 'bold',
//             paddingTop: 10,
//             height: 50,
//             fontSize: 18,
//             textAlign: 'center',
//             marginTop: 10,
//             borderWidth: 5,
//           }}
//         >
//           {selectedLibrary === 111
//             ? 'Dindayal Upadhyay Library'
//             : selectedLibrary === 222
//             ? 'Kundanlal Gupta Library'
//             : 'Rashtramata Kasturba Library'}
//         </Text>
//       )} */}
//     </View>
       
       
       
       
       
       
       
       
//         <View style={{ flexDirection: 'column', marginTop: 10, marginLeft: 10, }}>
//           <Text style={styles.textHeading}>Description:</Text>
//           <Text style={{ fontSize: 15, marginLeft: 3 }}>{filterbook.book.description}</Text>
//         </View>



//         {/* ========================working with preview================ */}


//         {/* 
// {route.params.data.items[0].status === 1 ?
//           (<View style={{ flexDirection: 'column', }}>

//             {route.params.data.items[0].format !== 3 ?
//               (<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, }}>
//                 <Text style={{ textAlign: 'center', fontSize: 17, fontWeight: 700, color: '#c27b7f' }}>Available </Text>
//                 <Text style={{ backgroundColor: '#c27b7f', color: 'white', padding: 5, borderRadius: 15 }}>1</Text></View>)
//               :
//               (null)}

//             <View style={{ flexDirection: 'row' }}>
//               <TouchableOpacity
//                 style={{
//                   backgroundColor: '#c27b7f',
//                   padding: 10,
//                   borderRadius: 5,
//                   width: '35%',
//                   height: 50,
//                   marginTop: 20,
//                   marginLeft: 20,
//                   marginBottom: 20,

//                 }}
//                 onPress={() => {

//                   if (userToken !== null) {

//                     if (route.params.data.items[0].format === 3) {
//                       // If the condition is true (format is equal to 3), execute the following:
//                       // handle_member();
//                       handle_member();
//                       // setModalVisible(!modalVisible);
//                       setModalVisible(!modalVisible);
//                     } else {
//                       // If the condition is false, execute the following:
//                       // Check if LibraryId includes the library_id from route.params.data
//                       if (LibraryId.includes(route.params.data.library_id)) {
//                         // If true, execute handleBookHistory with route.params.data
//                         handleBookHistory(route.params.data);
//                       } else {
//                         // If false, execute the following:
//                         // handle_member();
//                         handle_member();
//                         // setModalVisible(!modalVisible);
//                         setModalVisible(!modalVisible);
//                       }
//                     }
//                   }

//                   else {
//                     navigation.navigate('sLogin');
//                   }
//                 }}


//               >
//                 <Text style={{
//                   color: '#fff',
//                   fontWeight: '700',
//                   fontSize: 18,
//                   textAlign: 'center',
//                 }}> {route.params.data.items[0].format === 3 ? 'Subscribe' : 'Reserved'}</Text>
//               </TouchableOpacity>


//               {userToken !== null &&
//                 route.params.data.items[0].format === 3 &&
//                 route.params.data.items[0].pdf_preview_file !== null ?
//                 (<TouchableOpacity
//                   style={{
//                     backgroundColor: '#c27b7f',
//                     padding: 10,
//                     borderRadius: 5,
//                     width: '35%',
//                     height: 50,
//                     marginTop: 20,
//                     marginLeft: 20,
//                     marginBottom: 20,

//                   }}
//                   onPress={() => {
//                     setPdfModalVisible(true);

//                   }}
//                 >

//                   <Text style={{
//                     color: '#fff',
//                     fontWeight: '700',
//                     fontSize: 18,
//                     textAlign: 'center',
//                   }}>Preview</Text>

//                 </TouchableOpacity>) : null}


//             </View>

//           </View>


//           ) :
//           (<Text style={{
//             textAlign: 'center', color: 'red',
//             fontSize: 18, fontWeight: 'bold', marginBottom: 10
//           }}>Unavailable</Text>)
// } */}






// {/* //==============changes needed========================================== */}
//         {filterbook.status === 1 ?
//           (<View style={{ flexDirection: 'column' }}>

//             {route.params.data.items[0].format !== 3 ?
//               (<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, }}>
//                 <Text style={{ textAlign: 'center', fontSize: 17, fontWeight: 700, color: '#c27b7f' }}>Available </Text>
//                 <Text style={{ backgroundColor: '#c27b7f', color: 'white', padding: 5, borderRadius: 15 }}>1</Text></View>)
//               :
//               (null)}


//             {userToken !== null && itemsValue ? (<Text style={{
//               backgroundColor: 'grey',
//               padding: 10,
//               borderRadius: 5,
//               width: '35%',


//               height: 50,
//               marginTop: 20,
//               marginLeft: 20,
//               marginBottom: 20,
//               color: 'black'

//             }}>Ebook is Subscribed</Text>) :
//               (

//                 <View style={{ flexDirection: 'row' }}>
//                   <TouchableOpacity
//                     style={{
//                       backgroundColor: '#c27b7f',
//                       padding: 10,
//                       borderRadius: 5,
//                       width: '35%',
//                       height: 50,
//                       marginTop: 20,
//                       marginLeft: 20,
//                       marginBottom: 20,

//                     }}
//                     onPress={() => {

//                       if (userInfo.data.user.membership_plan_name === null) {
//                         navigation.navigate('Membershipplan');

//                         // Alert.alert(
//                         //   `YOU DON'T HAVE ANY MEMBERSHIPPLAN`,)
//                       }

//                       else {
//                         if (userToken !== null) {

//                           if (route.params.data.items[0].format === 3) {

//                             handle_member();
//                             setModalVisible(!modalVisible);
//                           } else {

//                             {/* //==============changes needed========================================== */}
//                             if (LibraryId.includes(filterbook.book.library_id)) {
//                               handleBookHistory(route.params.data);
//                             } else {
//                               handle_member();
//                               setModalVisible(!modalVisible);
//                             }
//                           }
//                         }

//                         else {
//                           navigation.navigate('sLogin');
//                         }
//                       }




//                     }}


//                   >
//                     <Text style={{
//                       color: '#fff',
//                       fontWeight: '700',
//                       fontSize: 18,
//                       textAlign: 'center',
//                     }}> {route.params.data.items[0].format === 3 ? 'Subscribe' : 'Reserved'}</Text>
//                   </TouchableOpacity>


//                   {userToken !== null &&
//                     route.params.data.items[0].format === 3 &&
//                     route.params.data.items[0].pdf_preview_file !== null ?
//                     (<TouchableOpacity
//                       style={{
//                         backgroundColor: '#c27b7f',
//                         padding: 10,
//                         borderRadius: 5,
//                         width: '35%',
//                         height: 50,
//                         marginTop: 20,
//                         marginLeft: 20,
//                         marginBottom: 20,

//                       }}
//                       onPress={() => {
//                         setPdfModalVisible(true);

//                       }}
//                     >

//                       <Text style={{
//                         color: '#fff',
//                         fontWeight: '700',
//                         fontSize: 18,
//                         textAlign: 'center',
//                       }}>Preview</Text>

//                     </TouchableOpacity>) : null}


//                 </View>

//               )}



//               </View>


//           ) :

//           (<Text style={{
//             textAlign: 'center', color: 'red',
//             fontSize: 18, fontWeight: 'bold', marginBottom: 10
//           }}>Unavailable</Text>)

//         }


//         {/* =================================Trending books==================================== */}

//         <View style={{ flexDirection: 'row', marginVertical: 5, justifyContent: 'space-between', marginLeft: 15, marginRight: 15, }}>
//           <Text style={styles.coroselheading}>Trending Books</Text>
//         </View>

//         <View style={{ marginTop: 10, marginStart: 10, backgroundColor: '#fff' }}>
//           <FlatList
//             keyExtractor={(item) => item.id}
//             data={tredbooks}

//             renderItem={({ item }) =>
//               <TouchableOpacity onPress={() => {
//                 navigation.navigate('BooksDetailPage', { data: item })
//               }}>
//                 <View style={{
//                   width: 182,
//                   height: 260,
//                   marginEnd: 22,
//                   borderRadius: 10,
//                 }}>
//                   <View style={{
//                     flex: 1,
//                     width: 100,
//                     marginLeft: 60 / 2,
//                     marginTop: 10 / 2,
//                     borderRadius: 5,
//                     overflow: 'visible',
//                   }}>
//                     <Image source={{ uri: item.image_path }}
//                       style={{
//                         aspectRatio: 0.8,
//                         resizeMode: 'cover'
//                       }} /></View>
//                   <View style={{ padding: 10, }}>
//                     <Text style={{
//                       fontSize: 15,
//                       fontWeight: 'bold',
//                       color: '#000'
//                     }} numberOfLines={2}>{item.name}</Text><Text style={{
//                       backgroundColor: '#a3a3c2',
//                       textAlign: 'center',
//                       fontWeight: 'bold',
//                       color: '#fff',
//                       marginLeft: 40,
//                       marginRight: 40,
//                       paddingTop: 5,
//                       height: 30,
//                       marginTop: 5,
//                       borderRadius: 5,
//                     }}>Book</Text>
//                     <Text style={{
//                       backgroundColor: '#c27b7f',
//                       textAlign: 'center',
//                       fontWeight: 'bold',
//                       color: '#fff',
//                       marginLeft: 30,
//                       marginRight: 40,
//                       paddingTop: 10,
//                       width: 100,
//                       height: 40,
//                       marginTop: 5,
//                       borderRadius: 5,
//                     }}>Read More</Text>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             }
//             horizontal={true}
//             contentContainerStyle={{ columnGap: 10 }}
//           />
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default BooksDetail;
// const styles = StyleSheet.create({
//   textHeading: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: '#000'
//   }, coroselheading: {
//     fontFamily: 'Philosopher-Bold',
//     fontSize: 25,
//     fontWeight: '600',
//     color: '#000',
//     textAlign: 'center'
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,

//   },
//   modalView: {
//     margin: 10,
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 15,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
      
//       height: 3,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   button: {
//     borderRadius: 5,
//     padding: 10,
//     elevation: 2,
//     backgroundColor: '#c27b7f',
//   },
//   buttonOpen: {
//     backgroundColor: '#F194FF',
//   },
//   buttonClose: {
//     backgroundColor: '#2196F3',
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',

//   },
//   modalText: {
//     marginBottom: 5,
//     textAlign: 'center',
//     fontSize: 25,
//     fontFamily: 'Philosopher-Bold',
//     color: '#000'
//   },
//   pdf: {
//     flex: 1,
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
//   pageButton: {
//     position: 'absolute',
//     bottom: 210,
//     right: 0,
//     backgroundColor: 'black',
//     borderRadius: 10,
//     padding: 10,
//   },
//   pageButtonText: {
//     color: 'white',
//   },
//   libraryName: {
//     fontWeight: 'bold', 
//     color: '#000'
//   },
// });







// =========================working for avail====================================


// import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, FlatList, Modal, Pressable } from 'react-native'
// import React, { useEffect, useState, useContext } from 'react'
// import { useRoute, useNavigation } from '@react-navigation/native';
// import Header from '../common/Header';
// import { AuthContext } from '../context/AuthContext';
// import Pdf from 'react-native-pdf';
// import { Alert } from "react-native";


// const BooksDetail = ({ navigation }) => {
//   const [isLoaded, setisLoaded] = useState(true);
//   const route = useRoute();
//   const [tredbooks, setTredBooks] = useState([]);
//   const { userToken, userInfo, userEmail } = useContext(AuthContext);
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [Ebooks, setEbooks] = useState([]);
//   const [subscribedBooks, setSubscribedBooks] = useState([]);
//   const [subscribe, setSubscribe] = useState([]);


//   const [book_libraryid, setBook_LibraryId] = useState([]);


//   const [libraryid, setLibraryId] = useState([]);

//   const currentDate = new Date();
//   const endDate = new Date(currentDate);
//   endDate.setDate(endDate.getDate() + 10);
//   const [modalVisible, setModalVisible] = useState(false);




//   const filename = route.params.data.items[0].pdf_preview_file;
//   const pdfUrl = route.params.data.library_id === 333
//     ? `https://rashtramatakasturba.smartcitylibrary.com/PDFPreview/${filename}`
//     : route.params.data.library_id === 111
//       ? `https://dindayalupadhyay.smartcitylibrary.com/PDFPreview/${filename}`
//       : `https://kundanlalgupta.smartcitylibrary.com/PDFPreview/${filename}`;



//   const [currentPage, setCurrentPage] = useState(1);
//   const [pdfModalVisible, setPdfModalVisible] = useState(false);


//   const [subscribeCount, setSubscribeCount] = useState(0);


//   //-----------------for convertion of date to personalized style date ----------------------------
//   function formatDate(inputDate) {

//     const inputDateObj = new Date(inputDate);


//     const monthNames = [
//       'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//     ];


//     const day = inputDateObj.getDate();
//     const month = monthNames[inputDateObj.getMonth()];
//     const year = inputDateObj.getFullYear();


//     let daySuffix;
//     if (day >= 11 && day <= 13) {
//       daySuffix = 'th';
//     } else {
//       switch (day % 10) {
//         case 1:
//           daySuffix = 'st';
//           break;
//         case 2:
//           daySuffix = 'nd';
//           break;
//         case 3:
//           daySuffix = 'rd';
//           break;
//         default:
//           daySuffix = 'th';
//       }
//     }
//     const formattedDate = `${day}${daySuffix} ${month}, ${year}`;
//     return formattedDate;
//   }

//   const startDate = formatDate(currentDate);
//   const endingDate = formatDate(endDate);




//   //------------------handle of navigation to book history page---------------------------
//   const handleBookHistory = (item) => {


//     const subscriptionData1 = {
//       book_item_id: route.params.data.items[0].id,
//       library_id: route.params.data.library_id
//     };

//     console.log('data retrived butttttl::::', subscriptionData1);



//     const url = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/books/${item.items[0].id}/reserve-book`;

//     fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${userToken}`,
//       },
//       body: JSON.stringify(subscriptionData1),
//     })

//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         console.log("responce is:", response);
//         return response.json();
//       })
//       .then((responseData) => {
//         console.log('Data stored successfully:', responseData);
//         navigation.navigate('subscribebookHistory');
//       })

//       .catch((error) => {
//         console.error('Error storing data:', error);
//       });

//   }

//   // ===================================================================================

//   const handleSubscribe = (item) => {
//     const member_id = userInfo.data.user.member_id;
//     const id = route.params.data.items[0].id;
//     const library_id = route.params.data.library_id;
//     console.log('data testis::::', item);
//     const subscriptionData = {


//       issued_on: startDate,
//       returned_on: endDate,
//       ebook_id: id,
//       member_id: member_id,
//       library_id: library_id,
//       razorpay_payment_id: 'NA',
//       renew: false,
//       amount: 10,
//     };


//     const url = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/ebook-subscription`;
//     fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${userToken}`,
//       },
//       body: JSON.stringify(subscriptionData),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         console.log("responce is:", response);
//         return response.json();
//       })
//       .then((responseData) => {
//         console.log('Data stored successfully:', responseData);

//         setModalVisible(!modalVisible);
//         setSubscribeCount(subscribeCount + 1);
//         navigation.navigate('myEBook');
//       })

//       .catch((error) => {
//         console.error('Error storing data:', error);
//       });
//   };

//   // ================================================================




//   useEffect(() => {
//     const tredingbooks = () => {
//       fetch("https://dindayalupadhyay.smartcitylibrary.com/api/v1/books")
//         .then(res => res.json())
//         .then(responce => {
//           setTredBooks(responce.data.splice(-4));
//           setisLoaded(false);
//         });
//     };
//     tredingbooks();
//   }, []);








//   userToken !== null ?
//     (useEffect(() => {
//       const id = userInfo.data.user.id;
//       console.log(id);
//       const apiUrl = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/is-member-registered/${id}`;

//       fetch(apiUrl, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${userToken}`,
//           'Content-Type': 'application/json',
//         },
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//           }
//           return response.json();
//         })
//         .then((data) => {
//           setLibraryId(data.data);

//         })
//         .catch((error) => {
//           console.error('Error fetching data:', error);
//         });
//     }, [])) : (null);







//   useEffect(() => {

//     const apiUrl = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/ebook-subscription`;

//     fetch(apiUrl, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${userToken}`,
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setSubscribedBooks(data.data);

//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, [route, tredbooks]);



//   const itemsValue1 = subscribedBooks.filter((item, i) =>

//     item.ebook_id === route.params.data.items[0].id &&
//     item.library_id === route.params.data.library_id &&
//     item.email === userEmail

//   )
//     ;
//   const itemsValue = itemsValue1.length;

//   const status = (itemsValue !== 0 ? (true) : (false))




//   console.log("yes", status);










//   // useEffect(() => {
    
//   //   const id=route.params.data.id;
//   //   const libraryid=route.params.data.library_id;

//   //   const subscriptionData2 = {
//   //     id:id,
//   //     search_by_book: true,
//   //     library_id:libraryid
//   //   };

//   //   const apiUrl = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/search-books?id=${id}&search_by_book=true&library_id=${libraryid}`;

//   //   fetch(apiUrl, {
//   //     method: 'GET',
//   //     headers: {
//   //       'Authorization': `Bearer ${userToken}`,
//   //       'Content-Type': 'application/json',
//   //     },
//   //     // body: JSON.stringify(subscriptionData2),
//   //   })
//   //     .then((response) => {
//   //       if (!response.ok) {
//   //         throw new Error(`HTTP error! Status: ${response.status}`);
//   //       }
//   //       return response.json();
//   //     })
//   //     .then((data) => {
//   //       setBook_LibraryId(data.data);
       
        
//   //     })
//   //     .catch((error) => {
//   //       console.error('Error fetching data:', error);
//   //     });
//   // })


//   // console.log(book_libraryid);











//   //===================API CALL FOR DIFFERENT LIBRARY WHEATHER THE MEMBER IS REGISTERED OR NOT=======================


//   const handle_member = () => {

//     const id = userInfo.data.user.id;
//     console.log(id);
//     const apiUrl = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/is-member-registered/${id}`;

//     fetch(apiUrl, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${userToken}`,
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setLibraryId(data.data);

//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }




//   // console.log(libraryid);


//   //===================API CALL FOR register-member-to-library=======================  

//   const handleMemberRegistered = (item) => {


//     console.log(item);
//     const url = `https://dindayalupadhyay.smartcitylibrary.com/api/v1/register-member-to-library/${item}`;
//     fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${userToken}`,
//       },

//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         // console.log("responce is:", response);
//         return response.json();
//       })
//       .then((responseData) => {
//         // console.log('Data stored successfully:', responseData);

//         setModalVisible(!modalVisible);

//         Alert.alert(
//           'Success!',
//           'You are successfully registered with same email and password'
//         )
//       })

//       .catch((error) => {
//         console.error('Error storing data:', error);
//       });
//   };


//   const userLibraryId = libraryid.map((item) => [
//     item.user_library_id,
//   ]);
//   const LibraryId = userLibraryId.flat();

//   // console.log(LibraryId);
//   // console.log(LibraryId.includes(route.params.data.library_id));

 


//   return (
//     <View style={{ flex: 1, backgroundColor: '#fff', flexDirection: 'column' }}>
//       <Header
//         rightIcon={require('../images/Logoelibrary.png')}
//         leftIcon={require('../images/back.png')}
//         onClickLeftIcon={() => {
//           navigation.navigate('Book', { screen: 'Home' });
//         }}
//       />

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(!modalVisible);
//         }}>

//         <View style={styles.centeredView}>
//           {LibraryId.includes(route.params.data.library_id) ?
//             (<View style={styles.modalView}>

//               <Text style={styles.modalText}>The Book Will be Subscribed from</Text>
//               <View style={{ flexDirection: 'row', marginBottom: 15, }}>
//                 <Text style={{ color: 'blue', fontSize: 15, fontWeight: 'bold', }}>{startDate}</Text>
//                 <Text style={{ fontSize: 15, fontWeight: 'bold', }}>  to  </Text>
//                 <Text style={{ color: 'blue', fontSize: 15, fontWeight: 'bold', }}>{endingDate}</Text>
//               </View>
//               <Pressable
//                 style={styles.button}
//                 onPress={() => { handleSubscribe(route.params.data), handle_member() }}>
//                 <Text style={styles.textStyle}>Subscribe</Text>
//               </Pressable>

//             </View>) :
//             (<View style={styles.modalView}>

//               <Text style={styles.modalText}>Book Reservation/Subscription</Text>



//               <View style={{ marginBottom: 15, }}>

//                 <View style={{ flexDirection: 'row' }}>
//                   <Text>These books belong to </Text>
//                   <Text style={styles.libraryName}>
//                     {route.params.data.library_id === 111 ? 'Dindayal Upadhyay Library' :
//                       route.params.data.library_id === 222 ? 'Kundanlal Gupta Library' :
//                         'Rashtramata Kasturba Library'}
//                   </Text>
//                   <Text>. </Text>
//                 </View>


//                 <Text>You are not a member yet. Do you want to register </Text>
//                 <View style={{ flexDirection: 'row' }}>
//                   <Text>for </Text>
//                   <Text style={styles.libraryName}>
//                     {route.params.data.library_id === 111 ? 'Dindayal Upadhyay Library' :
//                       route.params.data.library_id === 222 ? 'Kundanlal Gupta Library' :
//                         'Rashtramata Kasturba Library'}
//                   </Text>
//                   <Text> and continue?</Text>
//                 </View>

//               </View>



//               <View style={{ flexDirection: 'row', gap: 10 }}>
//                 <Pressable
//                   style={styles.button}
//                   // onPress={() => handleMemberRegistered(selectedLibraryId)}>
//                   onPress={() => { handleMemberRegistered(route.params.data.library_id), handle_member() }}>
//                   <Text style={styles.textStyle}>Yes</Text>
//                 </Pressable>

//                 <Pressable
//                   style={styles.button}
//                   onPress={() => setModalVisible(!modalVisible)}>
//                   <Text style={styles.textStyle}>No</Text>
//                 </Pressable>
//               </View>


//             </View>)}
//         </View>
//       </Modal>

//       {/* ===============================Pdf Modal============================================== */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={pdfModalVisible}
//         onRequestClose={() => {
//           setPdfModalVisible(false);

//         }}>
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Pdf
//               trustAllCerts={false}
//               source={{ uri: pdfUrl }}
//               onLoadComplete={(numberOfPages, filePath) => {
//                 console.log(`Number of pages: ${numberOfPages}`);
//               }}
//               onPageChanged={(page, numberOfPages) => {
//                 setCurrentPage(page);
//               }}
//               onError={(error) => {
//                 console.log(error);
//               }}
//               onPressLink={(uri) => {
//                 console.log(`Link pressed: ${uri}`);
//               }}
//               style={styles.pdf}
//             />

//             <View style={styles.pageButton}>
//               <Text style={styles.pageButtonText}> {currentPage}</Text>
//             </View>

//           </View>
//         </View>
//       </Modal>


//       <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 15, }}>
//         <View style={{
//           marginLeft: 80,
//           width: Dimensions.get('window').width,
//           height: 200,
//           marginEnd: 22,
//           borderRadius: 10,
//         }}>
//           <View style={{
//             width: 150,
//             marginLeft: 60 / 2,
//             marginTop: 10 / 2,
//             overflow: 'visible',
//           }}>
//             <Image source={{
//               uri: route.params.data.image_path
//             }}
//               style={{
//                 aspectRatio: 0.8,
//                 resizeMode: 'cover'
//               }}
//             />
//           </View>
//         </View>
//         <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
//           <Text style={styles.textHeading}>ISBN No:</Text><Text style={{ fontSize: 15, marginLeft: 8 }}>{route.params.data.isbn}</Text>
//         </View>
//         <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
//           <Text style={styles.textHeading}>Author:</Text>
//           <Text style={{ fontSize: 15, marginLeft: 8 }}>{route.params.data.authors[0].first_name} {route.params.data.authors[0].last_name}</Text>
//         </View>
//         <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
//           <Text style={styles.textHeading}>Format:</Text>
//           {route.params.data.items[0].format === 3 ?
//             (<Text style={{ fontSize: 15, marginLeft: 8 }}>E-Book</Text>)
//             : route.params.data.items[0].format === 1 ?
//               (<Text style={{ fontSize: 15, marginLeft: 8 }}>hardcover</Text>) :
//               (<Text style={{ fontSize: 15, marginLeft: 8 }}>Book</Text>)}
//         </View>
//         <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
//           <Text style={styles.textHeading}>Edition</Text>
//           <Text style={{ fontSize: 15, marginLeft: 8 }}>{route.params.data.items[0].edition}</Text>
//         </View>
//         <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
//           <Text style={styles.textHeading}>Genre:</Text>
//           <Text style={{ fontSize: 15, marginLeft: 8 }}>{route.params.data.genres[0].name}</Text>
//         </View>
//         <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, }}>
//           <Text style={styles.textHeading}>Publisher:</Text>
//           <Text style={{ fontSize: 15, marginLeft: 8 }}>{route.params.data.items[0].publisher.name}</Text>
//         </View>

//         <View style={{ flexDirection: 'column', marginTop: 10, marginLeft: 10, }}>
//           <Text style={styles.textHeading}>Belongs To:</Text>
//           <View style={{ marginRight: 5 }}>{route.params.data.library_id === 111 ?
//             (<Text style={{ fontWeight: 'bold', paddingTop: 10, height: 50, fontSize: 18, textAlign: 'center', marginTop: 10, borderWidth: 5 }}>
//               Dindayal UpadhyayLibrary</Text>) :
//             (route.params.data.library_id === 222 ?
//               (<Text style={{ fontWeight: 'bold', paddingTop: 10, height: 50, fontSize: 18, textAlign: 'center', marginTop: 10, borderWidth: 5 }}>
//                 Kundanlal Gupta Library</Text>) :
//               (<Text style={{ fontWeight: 'bold', paddingTop: 10, height: 50, fontSize: 18, textAlign: 'center', marginTop: 10, borderWidth: 5 }}>
//                 Rashtramata Kasturba Library</Text>))}</View></View>

//         <View style={{ flexDirection: 'column', marginTop: 10, marginLeft: 10, }}>
//           <Text style={styles.textHeading}>Description:</Text>
//           <Text style={{ fontSize: 15, marginLeft: 3 }}>{route.params.data.description}</Text>
//         </View>



//         {/* ========================working with preview================ */}


//         {/* 
// {route.params.data.items[0].status === 1 ?
//           (<View style={{ flexDirection: 'column', }}>

//             {route.params.data.items[0].format !== 3 ?
//               (<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, }}>
//                 <Text style={{ textAlign: 'center', fontSize: 17, fontWeight: 700, color: '#c27b7f' }}>Available </Text>
//                 <Text style={{ backgroundColor: '#c27b7f', color: 'white', padding: 5, borderRadius: 15 }}>1</Text></View>)
//               :
//               (null)}

//             <View style={{ flexDirection: 'row' }}>
//               <TouchableOpacity
//                 style={{
//                   backgroundColor: '#c27b7f',
//                   padding: 10,
//                   borderRadius: 5,
//                   width: '35%',
//                   height: 50,
//                   marginTop: 20,
//                   marginLeft: 20,
//                   marginBottom: 20,

//                 }}
//                 onPress={() => {

//                   if (userToken !== null) {

//                     if (route.params.data.items[0].format === 3) {
//                       // If the condition is true (format is equal to 3), execute the following:
//                       // handle_member();
//                       handle_member();
//                       // setModalVisible(!modalVisible);
//                       setModalVisible(!modalVisible);
//                     } else {
//                       // If the condition is false, execute the following:
//                       // Check if LibraryId includes the library_id from route.params.data
//                       if (LibraryId.includes(route.params.data.library_id)) {
//                         // If true, execute handleBookHistory with route.params.data
//                         handleBookHistory(route.params.data);
//                       } else {
//                         // If false, execute the following:
//                         // handle_member();
//                         handle_member();
//                         // setModalVisible(!modalVisible);
//                         setModalVisible(!modalVisible);
//                       }
//                     }
//                   }

//                   else {
//                     navigation.navigate('sLogin');
//                   }
//                 }}


//               >
//                 <Text style={{
//                   color: '#fff',
//                   fontWeight: '700',
//                   fontSize: 18,
//                   textAlign: 'center',
//                 }}> {route.params.data.items[0].format === 3 ? 'Subscribe' : 'Reserved'}</Text>
//               </TouchableOpacity>


//               {userToken !== null &&
//                 route.params.data.items[0].format === 3 &&
//                 route.params.data.items[0].pdf_preview_file !== null ?
//                 (<TouchableOpacity
//                   style={{
//                     backgroundColor: '#c27b7f',
//                     padding: 10,
//                     borderRadius: 5,
//                     width: '35%',
//                     height: 50,
//                     marginTop: 20,
//                     marginLeft: 20,
//                     marginBottom: 20,

//                   }}
//                   onPress={() => {
//                     setPdfModalVisible(true);

//                   }}
//                 >

//                   <Text style={{
//                     color: '#fff',
//                     fontWeight: '700',
//                     fontSize: 18,
//                     textAlign: 'center',
//                   }}>Preview</Text>

//                 </TouchableOpacity>) : null}


//             </View>

//           </View>


//           ) :
//           (<Text style={{
//             textAlign: 'center', color: 'red',
//             fontSize: 18, fontWeight: 'bold', marginBottom: 10
//           }}>Unavailable</Text>)
// } */}







//         {route.params.data.items[0].status === 1 ?
//           (<View style={{ flexDirection: 'column' }}>

//             {route.params.data.items[0].format !== 3 ?
//               (<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, }}>
//                 <Text style={{ textAlign: 'center', fontSize: 17, fontWeight: 700, color: '#c27b7f' }}>Available </Text>
//                 <Text style={{ backgroundColor: '#c27b7f', color: 'white', padding: 5, borderRadius: 15 }}>1</Text></View>)
//               :
//               (null)}


//             {userToken !== null && itemsValue ? (<Text style={{
//               backgroundColor: 'grey',
//               padding: 10,
//               borderRadius: 5,
//               width: '35%',


//               height: 50,
//               marginTop: 20,
//               marginLeft: 20,
//               marginBottom: 20,
//               color: 'black'

//             }}>Ebook is Subscribed</Text>) :
//               (

//                 <View style={{ flexDirection: 'row' }}>
//                   <TouchableOpacity
//                     style={{
//                       backgroundColor: '#c27b7f',
//                       padding: 10,
//                       borderRadius: 5,
//                       width: '35%',
//                       height: 50,
//                       marginTop: 20,
//                       marginLeft: 20,
//                       marginBottom: 20,

//                     }}
//                     onPress={() => {

//                       if (userInfo.data.user.membership_plan_name === null) {

//                         Alert.alert(
//                           `YOU DON'T HAVE ANY MEMBERSHIPPLAN`,)
//                       }

//                       else {
//                         if (userToken !== null) {

//                           if (route.params.data.items[0].format === 3) {

//                             handle_member();
//                             setModalVisible(!modalVisible);
//                           } else {
//                             if (LibraryId.includes(route.params.data.library_id)) {
//                               handleBookHistory(route.params.data);
//                             } else {
//                               handle_member();
//                               setModalVisible(!modalVisible);
//                             }
//                           }
//                         }

//                         else {
//                           navigation.navigate('sLogin');
//                         }
//                       }




//                     }}


//                   >
//                     <Text style={{
//                       color: '#fff',
//                       fontWeight: '700',
//                       fontSize: 18,
//                       textAlign: 'center',
//                     }}> {route.params.data.items[0].format === 3 ? 'Subscribe' : 'Reserved'}</Text>
//                   </TouchableOpacity>


//                   {userToken !== null &&
//                     route.params.data.items[0].format === 3 &&
//                     route.params.data.items[0].pdf_preview_file !== null ?
//                     (<TouchableOpacity
//                       style={{
//                         backgroundColor: '#c27b7f',
//                         padding: 10,
//                         borderRadius: 5,
//                         width: '35%',
//                         height: 50,
//                         marginTop: 20,
//                         marginLeft: 20,
//                         marginBottom: 20,

//                       }}
//                       onPress={() => {
//                         setPdfModalVisible(true);

//                       }}
//                     >

//                       <Text style={{
//                         color: '#fff',
//                         fontWeight: '700',
//                         fontSize: 18,
//                         textAlign: 'center',
//                       }}>Preview</Text>

//                     </TouchableOpacity>) : null}


//                 </View>

//               )}






//           </View>


//           ) :




//           (<Text style={{
//             textAlign: 'center', color: 'red',
//             fontSize: 18, fontWeight: 'bold', marginBottom: 10
//           }}>Unavailable</Text>)

//         }


//         {/* =================================Trending books==================================== */}

//         <View style={{ flexDirection: 'row', marginVertical: 5, justifyContent: 'space-between', marginLeft: 15, marginRight: 15, }}>
//           <Text style={styles.coroselheading}>Trending Books</Text>
//         </View>

//         <View style={{ marginTop: 10, marginStart: 10, backgroundColor: '#fff' }}>
//           <FlatList
//             keyExtractor={(item) => item.id}
//             data={tredbooks}

//             renderItem={({ item }) =>
//               <TouchableOpacity onPress={() => {
//                 navigation.navigate('BooksDetailPage', { data: item })
//               }}>
//                 <View style={{
//                   width: 182,
//                   height: 260,
//                   marginEnd: 22,
//                   borderRadius: 10,
//                 }}>
//                   <View style={{
//                     flex: 1,
//                     width: 100,
//                     marginLeft: 60 / 2,
//                     marginTop: 10 / 2,
//                     borderRadius: 5,
//                     overflow: 'visible',
//                   }}>
//                     <Image source={{ uri: item.image_path }}
//                       style={{
//                         aspectRatio: 0.8,
//                         resizeMode: 'cover'
//                       }} /></View>
//                   <View style={{ padding: 10, }}>
//                     <Text style={{
//                       fontSize: 15,
//                       fontWeight: 'bold',
//                       color: '#000'
//                     }} numberOfLines={2}>{item.name}</Text><Text style={{
//                       backgroundColor: '#a3a3c2',
//                       textAlign: 'center',
//                       fontWeight: 'bold',
//                       color: '#fff',
//                       marginLeft: 40,
//                       marginRight: 40,
//                       paddingTop: 5,
//                       height: 30,
//                       marginTop: 5,
//                       borderRadius: 5,
//                     }}>Book</Text>
//                     <Text style={{
//                       backgroundColor: '#c27b7f',
//                       textAlign: 'center',
//                       fontWeight: 'bold',
//                       color: '#fff',
//                       marginLeft: 30,
//                       marginRight: 40,
//                       paddingTop: 10,
//                       width: 100,
//                       height: 40,
//                       marginTop: 5,
//                       borderRadius: 5,
//                     }}>Read More</Text>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             }
//             horizontal={true}
//             contentContainerStyle={{ columnGap: 10 }}
//           />
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default BooksDetail;
// const styles = StyleSheet.create({
//   textHeading: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: '#000'
//   }, coroselheading: {
//     fontFamily: 'Philosopher-Bold',
//     fontSize: 25,
//     fontWeight: '600',
//     color: '#000',
//     textAlign: 'center'
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,

//   },
//   modalView: {
//     margin: 10,
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 15,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       // width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   button: {
//     borderRadius: 5,
//     padding: 10,
//     elevation: 2,
//     backgroundColor: '#c27b7f',
//   },
//   buttonOpen: {
//     backgroundColor: '#F194FF',
//   },
//   buttonClose: {
//     backgroundColor: '#2196F3',
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',

//   },
//   modalText: {
//     marginBottom: 5,
//     textAlign: 'center',
//     fontSize: 25,
//     fontFamily: 'Philosopher-Bold',
//     color: '#000'
//   },
//   pdf: {
//     flex: 1,
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
//   pageButton: {
//     position: 'absolute',
//     bottom: 210,
//     right: 0,
//     backgroundColor: 'black',
//     borderRadius: 10,
//     padding: 10,
//   },
//   pageButtonText: {
//     color: 'white',
//   },
//   libraryName: {
//     fontWeight: 'bold', // Add other styling properties as needed
//     color: '#000'
//   },
// });


//===============


