import { Injectable } from "@nestjs/common";
import { NotificationReceiver } from "src/libs/database/entities/notification-receiver.entity";
import {  Users } from "src/libs/database/entities/user.entity";
import {Notification} from "src/libs/database/entities/notification.entity"
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
// import { Helper } from "src/libs/helper/helper.global";
import { Helper } from "src/utils/helper/helper.global";
import { FCMHelper } from "./notification.fcm";
import { SafetyPointGateway } from "src/socket/safetypoint.gateway";
import { query } from "express";


@Injectable()
export class NotificationFunction {
    private readonly eventEmitter: EventEmitter2
    private readonly safetyPointGateway: SafetyPointGateway
    constructor() { }



    async PublicReportAdded({ senderId, item, receiver_ids, notificationTitle}) {
        try {
            let user: any = await Users.query().where({id: senderId}).first()
            let title: any = `${user?.first_name} ${user.last_name} added report`
            await this.insertMultipleNotifications({
                body: item,
                text: title,
                source_id: item,
                sender_id: senderId,
                receivedIds: receiver_ids,
                type: 'adding_report',
                relatedType:"report",
                related_id:item.id,
                title: notificationTitle
            })
            return true
        } catch(err) {
            console.log(err)
            return false
        }
    }

    // add friend notification
    async addFriendNotify({ senderId, item, receiverId, notificationTitle }) {

        try {
            let user: any = await Users.query().where({ id: senderId }).first()
            let title: any = `${user?.first_name} ${user?.last_name} sent you friend request `;
            await this.insertSingleNotification({
                body: item,
                text: title,
                source_id: item.id,
                sender_id: senderId,
                receiver_id: receiverId,
                type: 'add_friend',
                relatedId: item.id,
                relatedType: 'friend',
                title: notificationTitle
            });
            return true;
        } catch (err) {

            console.log(err)
            return false;
        }
    }

    async AcceptFriendRequest({ senderId, item, receiverId, notificationTitle }) {

        try {
            let user: any = await Users.query().where({ id: senderId }).first();
            let title: any = `${user?.first_name} ${user?.last_name} accepted your friend request`;
            await this.insertSingleNotification({
                body: item,
                text: title,
                source_id: item.id,
                sender_id: senderId,
                receiver_id: receiverId,
                type: 'accepted_request',
                relatedId: item.id,
                relatedType: "friend",
                title: notificationTitle
            })

            return true;
        } catch (err) {
            console.log(err)
            return false;
        }
    }

    // add Report
    async insertMultipleNotifications({
        body,
        text,
        source_id,
        sender_id,
        receivedIds,
        type,
        relatedType,
        related_id,
        title
    }) {
        try {
            let notification: any;
            notification = new Notification();
            notification.body = body;
            notification.text = text;
            notification.source_id = source_id;
            notification.type = type;
            notification.related_id = related_id;
            notification.related_type = relatedType;
            notification.sender_id = sender_id;
            notification.received_id = receivedIds;
            notification.title = title;

            notification = await Notification.query().insertAndFetch(notification);
            this.eventEmitter.emit('send-multiple-notification', { receivedIds, notification, relatedType, related_id, body:text, title})
            return notification;

        } catch (err) {
            console.log(err, 'error')
            return err
        }
    }


    async insertSingleNotification({
        body,
        text,
        source_id,
        sender_id,
        receiver_id,
        type,
        relatedId,
        relatedType,
        title
    }) {
        let notification: any;
        notification = new Notification();
        notification.body = body;
        notification.text = text;
        notification.type = type;
        notification.source_id = source_id;
        notification.sender_id = sender_id;
        notification.related_id = relatedId;
        notification.related_type = relatedType;
        notification = await Notification.query().insertAndFetch(notification);

        let notificationReceiver: any;
        notificationReceiver = new NotificationReceiver();
        notificationReceiver.notification_id = notification.id;
        notificationReceiver.receiver_id = receiver_id;
        await NotificationReceiver.query().insert(notificationReceiver);

        // single notification
        // this is the socket to display the notification to desire users 
        this.eventEmitter.emit('send-single-notification', { receiver_id, notification, title: title, body: text });
        return notification;
    }


    @OnEvent('send-single-notification', { async: true })
    async sendSingleNotification({ receiver_id, notification, title, body }) {
        try {
            let deviceToken: any = await Helper.deviceTokenByUsers(receiver_id);
            await FCMHelper.sendNotificationWithTitleBody({ deviceToken, notification, title, body })
        } catch (err) {
            console.log(err)
        }
    }

    @OnEvent('send-multiple-notifications', { async: true })
    async sendMultipleNotifications({ receiver_ids, notification, title, body }) {
        try {

        // let deviceTokens =
            // if (receiver_ids?.length > 0) {
            //     let allUsers: any = receiver_ids.reduce((acc, curr) => {
            //         // let deviceToken: any  = await Helper.deviceTokenByUsers(acc)
            //         acc.push({
            //             notification_id: notification.id,
            //             receiver_ids: curr
            //         });
            //         return acc;
            //     }, []);

            //     let deviceTokens: any = await Helper.sendMultipleNotification(receiver_ids)
            //     await FcmHelper.SendMultipleNotificationWithTitleBody({ deviceTokens, notification, title: title, body: body })
            //     await NotificationReceiver.query().insertGraph(allUsers)
            // }
        }
        catch (err) {
            console.log(err)
        }
    }



}