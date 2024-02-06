"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationFunction = void 0;
const common_1 = require("@nestjs/common");
const notification_receiver_entity_1 = require("../libs/database/entities/notification-receiver.entity");
const user_entity_1 = require("../libs/database/entities/user.entity");
const notification_entity_1 = require("../libs/database/entities/notification.entity");
const event_emitter_1 = require("@nestjs/event-emitter");
const helper_global_1 = require("../utils/helper/helper.global");
const notification_fcm_1 = require("./notification.fcm");
let NotificationFunction = class NotificationFunction {
    constructor() { }
    async PublicReportAdded({ senderId, item, receiver_ids, notificationTitle }) {
        try {
            let user = await user_entity_1.Users.query().where({ id: senderId }).first();
            let title = `${user === null || user === void 0 ? void 0 : user.first_name} ${user.last_name} added report`;
            await this.insertMultipleNotifications({
                body: item,
                text: title,
                source_id: item,
                sender_id: senderId,
                receivedIds: receiver_ids,
                type: 'adding_report',
                relatedType: "report",
                related_id: item.id,
                title: notificationTitle
            });
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
    async addFriendNotify({ senderId, item, receiverId, notificationTitle }) {
        try {
            let user = await user_entity_1.Users.query().where({ id: senderId }).first();
            let title = `${user === null || user === void 0 ? void 0 : user.first_name} ${user === null || user === void 0 ? void 0 : user.last_name} sent you friend request `;
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
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
    async AcceptFriendRequest({ senderId, item, receiverId, notificationTitle }) {
        try {
            let user = await user_entity_1.Users.query().where({ id: senderId }).first();
            let title = `${user === null || user === void 0 ? void 0 : user.first_name} ${user === null || user === void 0 ? void 0 : user.last_name} accepted your friend request`;
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
            });
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
    async insertMultipleNotifications({ body, text, source_id, sender_id, receivedIds, type, relatedType, related_id, title }) {
        try {
            let notification;
            notification = new notification_entity_1.Notification();
            notification.body = body;
            notification.text = text;
            notification.source_id = source_id;
            notification.type = type;
            notification.related_id = related_id;
            notification.related_type = relatedType;
            notification.sender_id = sender_id;
            notification.received_id = receivedIds;
            notification.title = title;
            notification = await notification_entity_1.Notification.query().insertAndFetch(notification);
            this.eventEmitter.emit('send-multiple-notification', { receivedIds, notification, relatedType, related_id, body: text, title });
            return notification;
        }
        catch (err) {
            console.log(err, 'error');
            return err;
        }
    }
    async insertSingleNotification({ body, text, source_id, sender_id, receiver_id, type, relatedId, relatedType, title }) {
        let notification;
        notification = new notification_entity_1.Notification();
        notification.body = body;
        notification.text = text;
        notification.type = type;
        notification.source_id = source_id;
        notification.sender_id = sender_id;
        notification.related_id = relatedId;
        notification.related_type = relatedType;
        notification = await notification_entity_1.Notification.query().insertAndFetch(notification);
        let notificationReceiver;
        notificationReceiver = new notification_receiver_entity_1.NotificationReceiver();
        notificationReceiver.notification_id = notification.id;
        notificationReceiver.receiver_id = receiver_id;
        await notification_receiver_entity_1.NotificationReceiver.query().insert(notificationReceiver);
        this.eventEmitter.emit('send-single-notification', { receiver_id, notification, title: title, body: text });
        return notification;
    }
    async sendSingleNotification({ receiver_id, notification, title, body }) {
        try {
            let deviceToken = await helper_global_1.Helper.deviceTokenByUsers(receiver_id);
            await notification_fcm_1.FCMHelper.sendNotificationWithTitleBody({ deviceToken, notification, title, body });
        }
        catch (err) {
            console.log(err);
        }
    }
    async sendMultipleNotifications({ receiver_ids, notification, title, body }) {
        try {
        }
        catch (err) {
            console.log(err);
        }
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('send-single-notification', { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationFunction.prototype, "sendSingleNotification", null);
__decorate([
    (0, event_emitter_1.OnEvent)('send-multiple-notifications', { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationFunction.prototype, "sendMultipleNotifications", null);
NotificationFunction = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], NotificationFunction);
exports.NotificationFunction = NotificationFunction;
//# sourceMappingURL=notification-functions.js.map