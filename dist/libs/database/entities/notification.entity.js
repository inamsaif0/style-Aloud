"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const sql_model_1 = require("../orm/sql.model");
const notification_receiver_entity_1 = require("./notification-receiver.entity");
class Notification extends sql_model_1.Mapping {
    $formJson(json) {
        json = super.$formatJson(json);
        delete json.Body;
        return json;
    }
    static get relationMappings() {
        return {
            received_notification: {
                relation: sql_model_1.Mapping.BelongsToOneRelation,
                modelClass: notification_receiver_entity_1.NotificationReceiver,
                join: {
                    from: 'notification.id',
                    to: 'notification_receiver.notification_id'
                },
            },
            sender: {
                relation: sql_model_1.Mapping.BelongsToOneRelation,
                modelClass: notification_receiver_entity_1.NotificationReceiver,
                join: {
                    from: 'notification.sender_id',
                    to: 'users.id'
                }
            }
        };
    }
}
exports.Notification = Notification;
Notification.table = 'notification';
//# sourceMappingURL=notification.entity.js.map