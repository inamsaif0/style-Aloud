import { Mapping } from "../orm/sql.model";

export class Cart extends Mapping {
    static table = 'cart';

    $formJson (json) {
        json = super.$formatJson(json);
        delete json.Body
        return json;
    }
    // this is the method to define relation in the table
    // one of the best structure ever
    static get relationMappings () {
        return {

            // sender:{
            //     relation: Mapping.BelongsToOneRelation,
            //        modelClass: NotificationReceiver,
            //     join:{
            //         from: 'notification.sender_id',
            //         to: 'users.id'
            //     }
            // }
            
        }
    }
}

