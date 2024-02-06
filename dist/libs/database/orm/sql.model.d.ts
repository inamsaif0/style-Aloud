import { Model } from "objection";
export declare class Mapping extends Model {
    static getCalledClassName: any;
    static tableNameCurrent: any;
    static table: any;
    constructor();
    static get tableName(): any;
    static create(column: any): Promise<any>;
    static update(column: any): any;
    static pagination(query: any, req?: any): Promise<any>;
    static findOneCustom(query: any): Promise<any>;
    static findAllCustom(query: any): Promise<any>;
}
