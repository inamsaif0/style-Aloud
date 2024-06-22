import { Mapping } from "../orm/sql.model";

export class Review extends Mapping {
    [x: string]: any;

    static table = 'review';

}

