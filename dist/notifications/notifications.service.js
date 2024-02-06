"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const notification_entity_1 = require("../libs/database/entities/notification.entity");
const notification_receiver_entity_1 = require("../libs/database/entities/notification-receiver.entity");
let NotificationsService = class NotificationsService {
    async deleteMySingleNotification(seenDto, req) {
        let queryNotification = await notification_entity_1.Notification.query()
            .where("id", seenDto.notification_id)
            .withGraphFetched("receiver_notification")
            .modifyGraph('receiver_notification', (builder) => {
            builder.where('receiver_id', req.user.id);
        }).first();
        if (!queryNotification) {
            throw new common_1.HttpException('Notification not found', common_1.HttpStatus.NOT_FOUND);
        }
        await notification_receiver_entity_1.NotificationReceiver.query()
            .where('id', queryNotification.received_notification.id)
            .delete();
    }
    async seenSingleNotification(SeenDto, req) {
        let query = await notification_entity_1.Notification.query()
            .where('id', SeenDto.notification_id)
            .withGraphFetched('received_notification')
            .modifyGraph('received_notification', (builder) => {
            builder.where('received_id', req.user.id);
        })
            .first();
        if (!query) {
            throw new common_1.HttpException('Notification not Found ', common_1.HttpStatus.NOT_FOUND);
        }
        notification_receiver_entity_1.NotificationReceiver.query()
            .updateAndFetchById(query.received_notification.id, {
            is_seen: true
        });
        return query;
    }
    async seenMultipleNotifications(SeenDto, req) {
        let query = await notification_entity_1.Notification.query()
            .where('id', SeenDto.notification_id)
            .withGraphFetched('received_notification')
            .modifyGraph('received_notification', (builder) => {
            builder.where('receiver_id', req.user.id);
        }).first();
        return query;
    }
};
NotificationsService = __decorate([
    (0, common_1.Injectable)()
], NotificationsService);
exports.NotificationsService = NotificationsService;
//# sourceMappingURL=notifications.service.js.map