
import React,{useEffect} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';
import PushNotification from "react-native-push-notification";
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging'

// import { getDatabase, ref, push, onValue } from '@react-native-firebase/database';

const stack = createNativeStackNavigator();
const App = () => {

  //==================cloud messaging using push react-native-push-notification=================================
  // PushNotification.configure({
  //   // (optional) Called when Token is generated (iOS and Android)
  //   onRegister: function(token) {
  //   console.log("TOKEN:", token);
  //   },
  //   // (required) Called when a remote or local notification is opened or received
  //   onNotification: function(notification) {
  //   console.log("NOTIFICATION:", notification);
  //   // process the notification here
  //   // required on iOS only
  //   notification.finish(PushNotificationIOS.FetchResult.NoData);
  //   },
  //   // Android only
  //   senderID: "1090501687137",
  //   // iOS only
  //   permissions: {
  //   alert: true,
  //   badge: true,
  //   sound: true
  //   },
  //   popInitialNotification: true,
  //   requestPermissions: true
  //   });

  // ========================notifee ======================

//notifee.requestPermission()

 //==========to display with channels=================

  // Create a channel (required for Android)
  // const channelId = notifee.createChannel({
  //   id: 'default',
  //   name: 'Default Channel',
  // });

  // Display a notification
  // notifee.displayNotification({
  //   title: 'Notification Title',
  //   body: 'Main body content of the notification',
  //   android: {
  //     channelId,
  //     smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
  //     // pressAction is needed if you want the notification to open the app when pressed
  //     pressAction: {
  //       id: 'default',
  //     },
  //   },
  // });


  
// =================== Important  need permition to send push notification in iso=========================

// const requestUserPermission = async () => {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
//     if (enabled) {
//       console.log('Authorization status:', authStatus);
//     }
//   };
  
//   // Call the function when the component mounts
//   useEffect(() => {
//     requestUserPermission();
//   }, []);
    

// ===============================Important get device token on load of app and to store device token========================//
//   useEffect(() => {
//     getDeviceToken();
// }, []);


//--------------------token is replacing===========================
  // const getDeviceToken = async () => {
  //   try {
  //     const token = await messaging().getToken();
  //     console.log('Token is:', token);

  //     // Store the token in Firebase Realtime Database
  //     const tokensRef = ref(getDatabase(), 'deviceTokens');
  //     set(tokensRef, { [token]: true });
  //     console.log('FCM token is stored successfully in firebase.');
  //     return token;
  //   } catch (error) {
  //     console.error('Error storing FCM token:', error);
  //     return null;
  //   }
  // };


  //========================token is adding when app is open=================================================
  // const getDeviceToken = async () => {
  //   try {
  //     const token = await messaging().getToken();
  //     console.log('Token is:', token);

  //     // Store the token in Firebase Realtime Database without replacing the previous tokens
  //     const tokensRef = ref(getDatabase(), 'deviceTokens');
  //     const newTokenRef = push(tokensRef);
  //     newTokenRef.set({ token });
      
  //     console.log('FCM token is stored successfully in Firebase.');
  //     return token;
  //   } catch (error) {
  //     console.error('Error storing FCM token:', error);
  //     return null;
  //   }
  // };


// =================to get alert in app ==========================

// useEffect(() => {
//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//         Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
//         console.log("A new FCM message arrived:", JSON.stringify(remoteMessage));
//     });

//     return unsubscribe;
// }, []);



  return (
    <AuthProvider>
      <AppNav /> 
       </AuthProvider>
  );
};

export default App;