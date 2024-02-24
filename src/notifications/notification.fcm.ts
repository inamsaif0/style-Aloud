const FCM = require('fcm-node')
const dotenv =  require('dotenv')
const serverKey = process.env.FCM_SERVER_KEY;

const fcm = FCM(serverKey)


export class FCMHelper {
    static async sendNotificationWithTitleBody({deviceToken, notification, title , body}) {
        let message  = {
            to: deviceToken,
            notification: {title, body},
            priority: 'high',
            data: notification
        }
        // now send this object as a notification to a user
        await this.FcmSender(message);
    }
    static async sendMultipleNotification({deviceTokens, notification, title, body }){
        console.log('sssssssssssssssssssss')
        let message =  {
            registration_ids: deviceTokens,
            notification: {title, body},
            priority: 'high',
            data: notification
        }
        await this.FcmSender(message);
    }
    static async FcmSender(message: any){
    console.log(serverKey, fcm)

        console.log(message)
        fcm.send(message,  (response: any) => {
            try{
                if(response){
                    console.log(response, 'send successfully')
                    return;
                }
            }
            catch(err){
                console.log(err, 'not send')
                return;
            }
        })
    }
}