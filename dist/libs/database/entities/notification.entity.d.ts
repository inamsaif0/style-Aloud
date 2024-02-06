import { Mapping } from "../orm/sql.model";
import { NotificationReceiver } from "./notification-receiver.entity";
export declare class Notification extends Mapping {
    static table: string;
    $formJson(json: any): any;
    static get relationMappings(): {
        received_notification: {
            relation: any;
            modelClass: typeof NotificationReceiver;
            join: {
                from: string;
                to: string;
            };
        };
        sender: {
            relation: any;
            modelClass: typeof NotificationReceiver;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
