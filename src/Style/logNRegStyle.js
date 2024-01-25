import { Dimensions, StyleSheet } from "react-native";


const getStyles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'LIGHT' ? '#fff' : '#000'
    },
    allbutton: {
      // padding: 10,
      borderRadius: 10,
      width: 150,
      height: 50,
      justifyContent: 'center',
      alignSelf: 'center'
      //marginLeft: 100 
    },
    allButtonText: {
      color: '#fff',
      fontWeight: '700',
      fontSize: 18, textAlign: 'center'
    },
    forgotNRegister: {
      color: '#c27b7f',
      margin: 12,
      // fontFamily: 'Poppin',
      // fontWeight: '700',
      fontSize: 15,
      fontFamily: 'Philosopher-Bold',
    },
    lognregHead: {
      // paddingVertical: 'auto',
      fontFamily: 'Philosopher-Bold',
      fontSize: 36,
      fontWeight: '500',
      textAlign: 'center',
      fontFamily: 'Philosopher-Bold',
      color: theme === 'LIGHT' ? '#2f4858' : '#fff',

    },
    subHeadinglognregHead: {
      marginTop: 10,
      paddingHorizontal: 50,
      textAlign: 'center',
      fontSize: 16,
      fontFamily: 'Poppin-Thin',
      color: theme === 'LIGHT' ? '#000' : '#fff'
    },
    vectorIcon:
    {
      width: 15,
      height: 15,
    },
    txtInputView: {
      backgroundColor: '#fff',
      display: 'flex',
      alignItems: 'center',
      flexDirection: "row",
      margin: 15,
      paddingLeft: 15,
      gap: 10,
      elevation: 5, borderRadius: 10
    },
    validation: {
      color: 'red',
      marginLeft: 30
    },
    floatView: {
      // backgroundColor: theme === 'LIGHT' ? '#fff' : '#000',//  #FBFCFC
      justifyContent: 'center',
      flexDirection: 'column',
      marginLeft: 20,
      marginRight: 20,
      marginTop: 10,
      margin: 30,
    },
    container3: {
      flex: 1,
      backgroundColor: '#f5ebe6'

    },
    loginText:
    {
      marginTop: 10,
      textAlign: 'center',
      color: '#c27b7f',
      fontWeight: '700',
      fontSize: 18,
    },

    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      //backgroundColor: theme === 'LIGHT' ? '#fff' : '#000',
    },

    userView: {
      // margin: 2,
      // backgroundColor: theme === 'LIGHT' ? '#E5E8E8' : '#000',
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10,
      marginRight: 10,
      borderBottomWidth: 0.2
    },
    userText: {
      fontFamily: 'Philosopher-Bold',
      fontSize: 16,
      color: theme === 'LIGHT' ? '#34495E' : '#fff',
      paddingLeft: 10,
      paddingTop: 10,
      paddingBottom: 10
    },
    bannar: {
      marginTop: 20,
      margin: 5,
      height: 200,
      flexDirection: 'column',
      paddingRight: 10,
      justifyContent: 'center'
    },
    bannar1: {
      marginTop: 50,
      // margin: 5,
      height: 200,
      // flexDirection: 'column',
      // paddingRight: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    // mainImgNText: {
    //   flexDirection: 'row',
    //   position: 'fixed'
    // },
    flatView1: {
      flexDirection: 'row',
      marginVertical: 5,
      marginTop: 15,
      justifyContent: 'space-between',
      marginLeft: 15,
      marginRight: 15,
      marginBottom: 15
    },
    flatView2: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    flatView3: {
      marginStart: 10,
      height: 250
    },
    bookImage: {
      aspectRatio: 0.7,
      resizeMode: 'contain',
      borderRadius: 10,
    },
    coroselheading: {
      fontFamily: 'Philosopher-Bold',
      fontSize: 25,
      fontWeight: '600',
      // color: theme === 'LIGHT' ? '#000' : '#fff',
      color: 'black',
      right: 0
    },
    seeAll: {
      color: 'blue',
      fontSize: 15,
      marginTop: 10,
      fontFamily: 'Roboto-Bold'
    },
    bookName: {
      marginTop: 8,
      fontSize: 15,
      color: theme === 'LIGHT' ? '#34495E' : '#fff',
      fontFamily: 'Philosopher-Bold',
    },
    bookName1: {
      // marginTop: 5,
      fontSize: 13,
      color: theme === 'LIGHT' ? '#34495E' : '#fff',
      fontWeight: '400'
      // fontFamily: 'Roboto-Bold'
    },
    mainImgNText: {
      flexDirection: 'row',
      // marginTop: 20,
      position: 'fixed'
    },
    imagecontainers: {
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
      fontFamily: 'Poppins-Regular',
    },
    texth2: {
      fontSize: 15,
      marginTop: 8,
      color: '#676768',
      textAlign: 'center',
      fontFamily: 'Poppin-Thin',
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
    terms: {
      flex: 1,
      padding: 10,
    },

    heading: {
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 10,
      textAlign: 'center',
      fontFamily: 'Philosopher-Bold',
      fontSize: 29,
      color: theme === 'LIGHT' ? '#000' : '#fff',
    },
    subHeading: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 10,
      color: theme === 'LIGHT' ? '#000' : '#fff',
    },
    disclemerText: {
      lineHeight: 20,
      fontWeight: '500',
      fontSize: 16,
      marginTop: 20,
      color: theme === 'LIGHT' ? '#2f4858' : '#fff',
    },
    socialIconsContainer: {
      marginTop: 20,
      flexDirection: "row",
      justifyContent: "space-between"
    },
    titleContainer: {
      alignItems: "center"
    },
    title: {
      marginTop: 20,
      fontSize: 18,
      fontWeight: '500',
      color: "#c27b7f",
    },
    subtitle: {
      fontSize: 20,
      marginBottom: 20,
      marginTop: 5,
      color: theme === 'LIGHT' ? '#2f4858' : '#fff',
      fontFamily: 'Philosopher-Bold',
    },
    divider: {
      width: 20,
      height: 3,
      backgroundColor: "black",
      marginVertical: 10
    },
    image1: {
      width: 300,
      height: 200,
      borderRadius: 10,
    },
    textContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    socialIcon: {
      width: 35,
      height: 35,
      marginBottom: 30,
      marginRight: 15,
    },
    review: {
      fontFamily: 'Philosopher-Bold',
      fontSize: 17,
      marginLeft: 15,
      marginRight: 20,
    },
    reviewcount: {
      fontSize: 20,
      marginLeft: 15,
      marginRight: 20,
      fontWeight: 'bold',
      color: '#876585'
    },
    line: {
      width: 10,
      height: 50,
    },
    aboutText: {
      marginTop: 20,
      marginLeft: 15,
      marginRight: 15,
      fontSize: 16,
      color: theme === 'LIGHT' ? '#2f4858' : '#fff',
    },
    formContainer: {
      marginBottom: 20,
      padding: 20,
      backgroundColor: theme === 'LIGHT' ? '#f5ebe6' : '#000',
      marginTop: 20,
      marginRight: 10,
      marginLeft: 10
    },
    input: {
      borderBottomWidth: 1,
      borderColor: 'gray',
      marginBottom: 15,
      paddingVertical: 5,
    },
    messageInput: {
      borderBottomWidth: 1,
      borderColor: 'gray',
      marginBottom: 15,
      paddingVertical: 5,
      height: 100,
    },
    loginbtn: {
      alignItems: 'center',
      borderRadius: 5,
      width: '40%',
      height: 60,
      justifyContent: 'center',
      marginLeft: 90
    },

    contactInfo: {
      marginBottom: 20,
      padding: 10,

    },
    infodetails: {
      fontSize: 15,
      color: theme === 'LIGHT' ? '#2f4858' : '#fff',
      fontWeight: '500'
    },
    info: {
      fontSize: 20,
      marginTop: 5,
      color: theme === 'LIGHT' ? '#000' : '#fff',
      fontFamily: 'Philosopher-Bold',
    },

    socialText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    socialIcons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    socialIconsContainer: {
      marginTop: 20,
      flexDirection: "row",
      justifyContent: "space-between"
    },
    imageContainer: {
      flex: 1,
      alignItems: "center",
      marginTop: 25,
      width: "100%",
      height: 200,
      marginBottom: 10,
    },
    image: {
      width: 300,
      height: 200,
      borderRadius: 10,
    },
    contactTxtInput: {
      backgroundColor: '#fff',
      display: 'flex',
      alignItems: 'center',
      flexDirection: "row",
      margin: 15,
      paddingLeft: 15,
      gap: 10
    },
    userpageText: {
      fontFamily: 'Poppin-Thin',
      color: '#34495E',
      textAlign: 'center',
    },
    //================= memberPlan section css starts  =========

    // subscribeButton: {
    //   marginTop: 15,
    //   backgroundColor: '#3498DB', // Update the button color
    //   borderRadius: 10,
    //   paddingVertical: 12,
    //   alignItems: 'center',
    //   marginHorizontal: 10,
    // },
    // buttonText: {
    //   textAlign: 'center',
    //   fontWeight: 'bold',
    //   fontSize: 16,
    //   color: "#fff",
    // },
    // price: {
    //   color: '#3498DB', // Update the text color
    //   fontSize: 18,
    //   fontFamily: 'Philosopher-Bold',
    // },
    // priceLabel: {
    //   fontWeight: 'bold',
    //   fontSize: 14,
    // },
    // description: {
    //   fontWeight: 'bold',
    //   color: '#c27b7f',
    //   fontSize: 12,
    //   textAlign: 'center',
    //   marginTop: 8,
    // },
    // loadingText: {
    //   flex: 1,
    //   fontSize: 20,
    //   textAlign: 'center',
    //   justifyContent: 'center',
    //   color: '#3498DB', // Update the text color
    // },
    // priceContainer: {
    //   flexDirection: 'row',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // },
    // body: {
    //   flex: 1,
    //   padding: 20,
    //   marginBottom: 20,
    //   backgroundColor: '#fff', // Update the background color
    //   borderRadius: 15,
    //   elevation: 5,
    // },
    // section: {
    //   alignItems: 'center',
    // },
    // sectionTitle: {
    //   fontSize: 18,
    //   color: '#3498DB', // Update the text color
    //   fontWeight: 'bold',
    // },
    // sectionHeading: {
    //   fontFamily: 'Philosopher-Bold',
    //   fontSize: 32,
    //   fontWeight: '600',
    //   marginTop: 10,
    //   color: '#3498DB', // Update the text color
    //   textAlign: 'center',
    // },
    // sectionHeading1: {
    //   fontSize: 16,
    //   fontWeight: '600',
    //   marginTop: 10,
    //   color: '#3498DB', // Update the text color
    //   textAlign: 'center',
    //   fontWeight: 'bold',
    // },
    // separator: {
    //   marginTop: 15,
    //   width: 150,
    //   height: 2,
    //   backgroundColor: '#3498DB', // Update the color
    //   alignSelf: 'center',
    // },
    // scrollContainer: {
    //   paddingHorizontal: 10,
    // },
    // planContainer: {
    //   backgroundColor: '#ECF0F1',
    //   borderRadius: 15,
    //   borderColor: '#3498DB', // Update the border color
    //   marginTop: 20,
    //   padding: 15,
    //   elevation: 5,
    //   width: 150,
    //   alignSelf: 'center',
    // },
    // planName: {
    //   textAlign: 'center',
    //   fontFamily: 'Philosopher-Bold',
    //   fontSize: 18,
    //   color: '#3498DB', // Update the text color
    // },




    body: {
      flex: 1,
      padding: 20,
      marginBottom: 20,
    },
    section: {
      alignItems: 'center',
    },
    sectionTitle: {
      fontSize: 16,
      color: '#c27b7f',
      fontWeight: 'bold',
    },
    sectionHeading: {
      fontFamily: 'Philosopher-Bold',
      fontSize: 24,
      marginTop: 20,
      color: theme === 'LIGHT' ? '#000' : '#fff',
      textAlign: 'center'
    },
    sectionHeading1: {
      fontSize: 15,
      fontWeight: '600',
      marginTop: 10,
      color: theme === 'LIGHT' ? '#000' : '#fff',
      textAlign: 'center',
      fontWeight: 'bold'
    },
    sectionHeading2: {
      fontFamily: 'Philosopher-Bold',
      fontSize: 28,
      fontWeight: '600',
      marginTop: 10,
      color: '#000',
      marginBottom: 8,
      textAlign: 'center'
    },
    separator: {
      marginTop: 10,
      width: 150,
      height: 2,
      backgroundColor: '#c27b7f',
      alignItems: 'center',
      marginLeft: 90,
    },
    scrollContainer: {
      paddingHorizontal: 10,
    },
    planContainer: {
      backgroundColor: '#fff',
      borderRadius: 10,
      borderColor: '#fff',
      marginTop: 20,
      padding: 10,
      elevation: 10,
      width: 150,
    },

    planName: {
      textAlign: 'center',
      fontFamily: 'Philosopher-Bold',
      fontSize: 17,
      color: '#000',
    },
    priceContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    price: {
      color: 'black',
      fontSize: 15,
      fontFamily: 'Philosopher-Bold',
    },
    priceLabel: {
      fontWeight: 'bold',
      fontSize: 12,
    },
    description: {
      fontWeight: 'bold',
      color: '#c27b7f',
      fontSize: 10,
    },
    subscribeButton: {
      marginTop: 10,
      backgroundColor: '#c27b7f',
      borderRadius: 8,
      paddingBottom: 10,
      paddingTop: 10,
      alignItems: 'center',

      marginLeft: 5,
      marginRight: 5
    },
    buttonText: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 13,
      color: "#fff",
    },
    //================= memberPlan section css end  =========
    noPlanScreen: {
      fontSize: 15,
      fontFamily: 'Philosopher-Bold',
      backgroundColor: '#fff',
      marginTop: 15,
      elevation: 10,
      padding: 20,
      borderRadius: 10
    },

    rupeeIcon: {
      width: 15,
      height: 15,
    },
    header: {
      height: 50,
      backgroundColor: '#fff',
      fontWeight: 'bold',
    },
    texttt: {
      textAlign: 'center',
      fontWeight: '400',
      fontSize: 15,
      color: '#2f4858'
    },
    dataWrapper: {
      marginTop: -1
    },
    row1: {
      height: 40,
      backgroundColor: '#fff',
    },
    loadingText: {
      flex: 1,
      fontSize: 20,
      textAlign: 'center',
      justifyContent: 'center'
    },
    searchIcon: {
      // justifyContent:'flex-end',
      color: theme === 'LIGHT' ? '#2f4858' : '#000',
    },
    searchInput: {
      color: theme === 'LIGHT' ? '#2f4858' : '#000',
      fontSize: 15,

    },
    // searchcontainer: {
    //   marginTop: 10,
    //   alignSelf: 'center',
    //   padding: 5,
    //   width: '90%',
    //   height: 50,
    //   backgroundColor: '#fff',// '#f5ebe6',
    //   color: theme === 'LIGHT' ? '#2f4858' : '#000',
    //   borderRadius: 10,
    //   elevation: 10
    // },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 10,
      borderColor: 'grey',
      borderWidth: 0.8,
      paddingHorizontal: 12,
      marginLeft: 10,
      marginRight: 10,
      color: theme === 'LIGHT' ? '#2f4858' : '#000',
    },

    searchBar3: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#eee',
      borderRadius: 20,
      paddingHorizontal: 10,
    },
    searchInput3: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 10,
      fontSize: 16,
      color: '#333',
    },
    searchIcon3: {
      marginRight: 5,
    },


    dividerView: {
      marginTop: 0,
      height: 2,
      backgroundColor: '#c27b7f',
      alignSelf: 'center'
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
    // centeredView: {
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   marginTop: 22,
    // },
    modalView: {
      margin: 20,
      backgroundColor: theme === 'LIGHT' ? '#fff' : '#000',
      borderRadius: 20,
      padding: 20,
      paddingLeft: 40,
      paddingRight: 40,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 5,
      padding: 10,
      elevation: 2,
      backgroundColor: '#c27b7f',
    },

    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 5,
      textAlign: 'center',
    },
    videoPlayer: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').width * (9 / 16),
    },
    // modalContainer: {
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   backgroundColor: 'rgba(0, 0, 0, 0.7)',
    // },
    controlsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    controlButton: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: '#c27b7f',
      color: 'white',
      borderRadius: 5,
      margin: 5,
    },
    profileButtons: {
      padding: 10,
      color: '#fff',
      backgroundColor: '#c27b7f',
      fontWeight: '700',
      fontSize: 18,
      textAlign: 'center',
      borderRadius: 5,
    },
    profileButtons1: {
      padding: 9,
      color: 'black',
      backgroundColor: 'grey',
      // fontWeight: '700',
      fontSize: 18,
      textAlign: 'center',
      borderRadius: 5,
      width: '30%',
      alignSelf: 'center',
      fontFamily: 'Philosopher-Bold',
    },
    saveTouch: {
      width: '40%',
      height: 70,
      justifyContent: 'center',
    },
    profileText: {
      color: theme === 'LIGHT' ? '#000' : '#fff',
      fontSize: 15,
      alignSelf: 'center',
      marginTop: 10,
      fontFamily: 'Philosopher-Bold',
    },
    profileStar: {
      color: 'red',
      fontSize: 20
    },
    profileView: {
      // gap: 3,
      // display: 'flex',
      alignItems: 'center',
      flexDirection: "row",
      marginTop: 15,
      marginLeft: 15,
      marginRight: 15,
    },
    profileTextView: {
      // alignItems:'center',
      backgroundColor: '#fff',
      display: 'flex',
      marginTop: 15,
      marginLeft: 15,
      marginRight: 15,
      elevation: 5,
      paddingLeft: 8,
      borderRadius: 10,
      borderColor: 'pink'
    },
    profilePhoto: {
      padding: 9,
      color: '#fff',
      backgroundColor: '#c27b7f',
      fontFamily: 'Philosopher-Bold',
      fontSize: 15,
      // textAlign: 'center',
      borderRadius: 5,
      backgroundColor: '#c27b7f',
      // marginRight: 13

    },
    // profilePhotoToch:
    // {
    //   alignItems:'center',
    //   marginBottom: 10,
    //   marginLeft: 10,

    // },

    profilePhotoToch:
    {
      alignItems: 'center',
      marginBottom: 10,
      marginLeft: 10,
      backgroundColor: '#fff',
      width: 70,
      height: 70,
      borderRadius: 35,
      borderWidth: 0.5,
      borderColor: 'grey'
    },
    image: {
      width: 20,
      height: 20,
      borderRadius: 25
    },
    booksearchcontainer: {
      padding: 5,
      width: '100%',
      height: 50,
      backgroundColor: '#f5ebe6'
    },
    booksearchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'gray',
      paddingHorizontal: 12,

    },
    booksearchIcon: {
      marginRight: 8,
    },
    // bookinput: {
    //   flex: 1,
    //   fontSize: 16,
    // },

    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
    },
    paginationButton: {
      backgroundColor: '#c27b7f',
      padding: 10,
      borderRadius: 5,
    },
    paginationText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    noBooksFound: {
      fontWeight: '900',
      marginLeft: 140,
      color: theme === 'LIGHT' ? '#000' : '#fff',
    },
    totalBooksCount: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme === 'LIGHT' ? '#000' : '#fff',
      marginLeft: 10,
      marginBottom: 10,
      textAlign: 'center'
    },
    scrollContainer: {
      flexGrow: 1,
    },

    pickerContainer: {
      flexDirection: 'row',
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    libraryName: {
      fontWeight: 'bold', // Add other styling properties as needed
      color: theme === 'LIGHT' ? '#000' : '#fff'
    },
    textHeading: {
      fontSize: 15,
      // fontWeight: 'bold',
      color: theme === 'LIGHT' ? '#000' : '#fff',
      fontFamily: 'Philosopher-Bold'
    },
    textHeadingOutput: {
      marginTop:2,
      fontSize: 13,
      marginLeft: 10,
      color: theme === 'LIGHT' ? '#34495E' : '#fff',
      fontFamily: 'Philosopher-Bold',
      textAlign:'center',
      marginRight:10
    },
    textHeadingView:
    {
      flexDirection: 'row',
      marginTop: 10,
      marginLeft: 10,
      marginRight:10
    },
    subscribeText: {
      fontSize: 15,
      fontWeight: 'bold',
      color: theme === 'LIGHT' ? '#000' : '#fff'
    },
    subscribeDate: {
      color: 'blue',
      fontSize: 15,
      fontWeight: 'bold',
    },
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
      fontFamily: 'Philosopher-Bold',
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
    alltableView:
    {
      backgroundColor: '#fff',
      marginTop: 15,
      marginLeft: 15,
      marginRight: 10
    },
    category: {
      fontWeight: '600',
      color: theme === 'LIGHT' ? '#2f4858' : '#000',
      fontFamily: 'Philosopher-Bold',
      fontSize: 17,
    },
    categoryView: {
      marginLeft: 10,
      marginRight: 10
    },
    categorytouch: {
      width: 130,
      height: 65,
      borderRadius: 10,
      borderWidth: 0.5,
      alignSelf: 'center',
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 15,
      paddingRight: 15,
      // backgroundColor: '#C8C8C8',
    },
    batch: {
      position: 'absolute',
      textAlign: 'center',
      right: 70,
      width: 80,
      height: 20,
      marginTop: 5,
      fontSize: 13,
      borderRadius: 10,
      borderWidth: 1.5,
      fontFamily: 'Roboto-Bold',
    },
    bookicon:
    {
      height: 20,
      width: 20,
      marginLeft: -8,
    },
    bookPageLibText: {
      fontSize: 12,
      fontFamily: 'Philosopher-Bold',
      color: theme === 'DARK' ? '#fff' : '#5D6D7E'
    },
    bookNameText: {
      fontSize: 15,
      marginLeft: -10,
      fontFamily: 'Philosopher-Bold',
      color: theme === 'DARK' ? '#fff' : '#424949'
    },
    categoryIcon: {
      width: 30,
      height: 30
    },




  });

};

export default getStyles;