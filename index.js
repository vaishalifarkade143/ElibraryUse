/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';


// ===========background push notification=================
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

//   ===============kill state===================
messaging().getInitialNotification(
    async remoteMessage => {
        console.log('Message handled in the Kill!', remoteMessage);
      }
);
// ========================scheduled message======================
// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// admin.initializeApp();

// exports.scheduleNotificationAfterSevenDays = functions.pubsub
//   .schedule('every 3 minutes')
//   .timeZone('your-timezone') // Set your timezone, e.g., 'America/New_York'
//   .onRun(async (context) => {
//     // Get the FCM token or user ID from your database
//     const token = 'user-fcm-token';

//     // Send a notification using FCM
//     const message = {
//       data: {
//         title: 'Your Notification Title',
//         body: 'Your Notification Message after  3 minutes',
//       },
//       token: token,
//     };

//     await admin.messaging().send(message);

//     return null;
//   });




AppRegistry.registerComponent(appName, () => App);
