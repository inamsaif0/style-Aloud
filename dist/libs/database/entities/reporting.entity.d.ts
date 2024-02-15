import { Mapping } from "../orm/sql.model";
import { Users } from "./user.entity";
export declare class Reporting extends Mapping {
    static table: string;
    $formJson(json: any): any;
    static get relationMappings(): {
        user: {
            relation: import("objection").RelationType;
            modelClass: typeof Users;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
