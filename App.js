
import React,{useEffect} from 'react'
import AuthStack from './src/navigation/AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './src/navigation/AppStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';
import PushNotification from "react-native-push-notification";
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging'


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

// ===============================get divece token on load of app =======================//
  useEffect(() => {
    getDeviceToken();
}, []);


const getDeviceToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('Token is:', token);
      return token;
    } catch (error) {
      console.error('Error getting FCM token:', error);
      return null;
    }
  };


// =================to get alert in app ==========================

// useEffect(() => {
//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//         Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
//         console.log("A new FCM message arrived:", JSON.stringify(remoteMessage));
//     });

//     return unsubscribe;
// }, []);



// ===================need permition to send push notification in iso=========================

const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };
  
  // Call the function when the component mounts
  useEffect(() => {
    requestUserPermission();
  }, []);
    
  // ================================================================
  return (
    <AuthProvider>
      <AppNav /> 
       </AuthProvider>
  );
};

export default App;