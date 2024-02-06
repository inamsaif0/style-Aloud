import { Mapping } from "../orm/sql.model";
import { Users } from "./user.entity";
export class Reporting extends Mapping {
    static table = 'reporting'

    $formJson (json) {
        json = super.$formatJson(json);
        return json;
    }
    // this is the method to define relation in the table
    // one of the best structure ever
    static get relationMappings () {
        return {
            user:{
                relation: Mapping.BelongsToOneRelation,
                modelClass: Users,
                join: {
                    from : 'reporting.user_id',
                    to:  'users.id'
                }
            }
        }
    }
}

