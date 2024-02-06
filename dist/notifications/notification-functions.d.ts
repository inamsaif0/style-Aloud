export declare class NotificationFunction {
    private readonly eventEmitter;
    private readonly safetyPointGateway;
    constructor();
    PublicReportAdded({ senderId, item, receiver_ids, notificationTitle }: {
        senderId: any;
        item: any;
        receiver_ids: any;
        notificationTitle: any;
    }): Promise<boolean>;
    addFriendNotify({ senderId, item, receiverId, notificationTitle }: {
        senderId: any;
        item: any;
        receiverId: any;
        notificationTitle: any;
    }): Promise<boolean>;
    AcceptFriendRequest({ senderId, item, receiverId, notificationTitle }: {
        senderId: any;
        item: any;
        receiverId: any;
        notificationTitle: any;
    }): Promise<boolean>;
    insertMultipleNotifications({ body, text, source_id, sender_id, receivedIds, type, relatedType, related_id, title }: {
        body: any;
        text: any;
        source_id: any;
        sender_id: any;
        receivedIds: any;
        type: any;
        relatedType: any;
        related_id: any;
        title: any;
    }): Promise<any>;
    insertSingleNotification({ body, text, source_id, sender_id, receiver_id, type, relatedId, relatedType, title }: {
        body: any;
        text: any;
        source_id: any;
        sender_id: any;
        receiver_id: any;
        type: any;
        relatedId: any;
        relatedType: any;
        title: any;
    }): Promise<any>;
    sendSingleNotification({ receiver_id, notification, title, body }: {
        receiver_id: any;
        notification: any;
        title: any;
        body: any;
    }): Promise<void>;
    sendMultipleNotifications({ receiver_ids, notification, title, body }: {
        receiver_ids: any;
        notification: any;
        title: any;
        body: any;
    }): Promise<void>;
}
