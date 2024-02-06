import { Mapping } from "../orm/sql.model";
import { Users } from "./user.entity";
import { NotificationReceiver } from "./notification-receiver.entity";

export class Notification extends Mapping {
    static table = 'notification';

    $formJson (json) {
        json = super.$formatJson(json);
        delete json.Body
        return json;
    }
    // this is the method to define relation in the table
    // one of the best structure ever
    static get relationMappings () {
        return {
            received_notification:{
                relation: Mapping.BelongsToOneRelation,
                modelClass:NotificationReceiver,
                join: {
                    from: 'notification.id',
                    to: 'notification_receiver.notification_id'
                },
                
            },

            sender:{
                relation: Mapping.BelongsToOneRelation,
                modelClass: NotificationReceiver,
                join:{
                    from: 'notification.sender_id',
                    to: 'users.id'
                }
            }
        }
    }
}