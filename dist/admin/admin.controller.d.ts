import { Request, Response } from 'express';
import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    allUsers(req: Request, res: Response, query: any): Promise<any>;
    allAdmins(req: Request, res: Response, query: any): Promise<any>;
}
