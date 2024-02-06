"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FCMHelper = void 0;
const FCM = require('fcm-node');
const dotenv = require('dotenv');
const serverKey = process.env.FCM_SERVER_KEY;
const fcm = FCM(serverKey);
class FCMHelper {
    static async sendNotificationWithTitleBody({ deviceToken, notification, title, body }) {
        let message = {
            to: deviceToken,
            notification: { title, body },
            priority: 'high',
            data: notification
        };
        await this.FcmSender(message);
    }
    static async sendMultipleNotification({ deviceTokens, notification, title, body }) {
        let message = {
            registration_ids: deviceTokens,
            notification: { title, body },
            priority: 'high',
            data: notification
        };
        await this.FcmSender(message);
    }
    static async FcmSender(message) {
        fcm.send(message, (response) => {
            try {
                if (response) {
                    console.log(response, 'send successfully');
                    return;
                }
            }
            catch (err) {
                console.log(err, 'not send');
                return;
            }
        });
    }
}
exports.FCMHelper = FCMHelper;
//# sourceMappingURL=notification.fcm.js.map