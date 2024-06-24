import { Mapping } from "../orm/sql.model";
import { Users } from "./user.entity";
export class Review extends Mapping {

    static table = 'review';

    $formJson (json) {
        json = super.$formatJson(json);
        delete json.Body
        return json;
    }
    // this is the method to define relation in the table
    // one of the best structure ever
    static get relationMappings () {
        return {
            user:{
                relation: Mapping.BelongsToOneRelation,
                modelClass:Users,
                join: {
                    from: 'review.user_id',
                    to: 'users.id'
                },
                
            }
        }
    }
}

