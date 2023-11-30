/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});



// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// const axios = require('axios');

// admin.initializeApp();

// const db = admin.firestore();

// exports.schedulePushNotifications = functions.https.onRequest(async (req, res) => {
//   try {
//     // Implement logic to find subscriptions that are 7 days old
//     const subscriptionsSevenDaysAgo = await db.collection('subscriptions')
//       .where('issuedOn', '<=', new Date(new Date() - 1 * 24 * 60 * 60 * 1000))
//       .get();

//     // Iterate over subscriptions and send push notifications
//     subscriptionsSevenDaysAgo.forEach((subscription) => {
//       const userId = subscription.data().userId;
//       const message = 'Your message here';
//       sendPushNotification(userId, message);
//     });

//     res.status(200).json({ message: 'Push notifications scheduled and sent successfully' });
//   } catch (error) {
//     console.error('Error scheduling and sending push notifications:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Function to send push notifications using axios to your React Native app
// const sendPushNotification = (userId, message) => {
//   // Replace 'YOUR_REACT_NATIVE_APP_ENDPOINT' with the actual endpoint of your React Native app
//   const endpoint = 'YOUR_REACT_NATIVE_APP_ENDPOINT';

//   axios.post(endpoint, { userId, message })
//     .then((response) => {
//       console.log('Notification sent successfully:', response.data);
//     })
//     .catch((error) => {
//       console.error('Error sending notification:', error);
//     });
// };
