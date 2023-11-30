import notifee from '@notifee/react-native'


class NotificationServicesNotifee {
    static displayLocalNotification = async (title, body, data) =>{
     const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Notification',
    });

        // Required for iOS
        // See https://notifee.app/react-native/docs/ios/permissions
        await notifee.requestPermission();

        // const notificationId = await notifee.displayNotification({
        //     id: '123',
        //     title: title,
        //     body: body,
        //     data: data ,
        //     // ? data : null,
        //     android: {
        //         channelId,
        //     },
        // });

        await notifee.displayNotification({
            id: '123',
            title: title,
            body: body,
            data: data  ? data : null,
            android: {
                channelId,
            },
        });
    };
}



export default NotificationServicesNotifee;

