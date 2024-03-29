import { HttpStatus } from "@nestjs/common";
export declare class ResponseHelper {
    static success({ res, data }: {
        res: any;
        data: any;
    }): Promise<any>;
    static error({ res, error, req, errorCode }: {
        res: any;
        error: any;
        req: any;
        errorCode?: HttpStatus;
    }): Promise<any>;
}
