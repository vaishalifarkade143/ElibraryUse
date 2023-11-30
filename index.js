/**
 * @format
 */
import 'react-native-gesture-handler';
import {Alert, AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";
import NotificationServicesNotifee from './src/services/NotificationServicesNotifee';



// ===========background push notification =================
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

//   ===============kill state ===================
messaging().getInitialNotification(
    async remoteMessage => {
        console.log('Message handled in the Kill!', remoteMessage);
      }
);

//===========================forground push notification ================
messaging().onMessage(async remoteMessage => {

  // console.log(remoteMessage.notification.title,
  //   remoteMessage.notification.body,
  //   remoteMessage.data,
  //   'remoteMessage');

  NotificationServicesNotifee.displayLocalNotification(
    remoteMessage.notification.title,
    remoteMessage.notification.body,
    remoteMessage.data,
  );

   //Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
});

// =================for push notification permition==================



  const authStatus = messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }




AppRegistry.registerComponent(appName, () => App);
