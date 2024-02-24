const FCM = require('fcm-node');

export const sendNotification = async ({ title, body, fcmToken }) => {
  const serverKey = process.env.FCM_SERVER_KEY;
  const fcm = new FCM(serverKey);

  const message = {
    to: fcmToken,
    notification: {
      title,
      body,
    },
  };

  fcm.send(message, function (err, response) {
    if (err) {
      console.log('FCM - Something has gone wrong!');
    } else {
      console.log('Successfully sent with response: ', response);
    }
  });
};
