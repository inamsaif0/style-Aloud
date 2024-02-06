export declare class FCMHelper {
    static sendNotificationWithTitleBody({ deviceToken, notification, title, body }: {
        deviceToken: any;
        notification: any;
        title: any;
        body: any;
    }): Promise<void>;
    static sendMultipleNotification({ deviceTokens, notification, title, body }: {
        deviceTokens: any;
        notification: any;
        title: any;
        body: any;
    }): Promise<void>;
    static FcmSender(message: any): Promise<void>;
}
