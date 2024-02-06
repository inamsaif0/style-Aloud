import { Mapping } from "../orm/sql.model";
export declare class Users extends Mapping {
    static table: string;
    $formJson(json: any): any;
    static get relationMappings(): {};
}
