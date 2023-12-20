/**
 * @format
 */
import 'react-native-gesture-handler';
import {Alert, AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
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
NotificationServicesNotifee.displayLocalNotification(
    remoteMessage.notification.title,
    remoteMessage.notification.body,
    remoteMessage.data,
  );
});

AppRegistry.registerComponent(appName, () => App);
