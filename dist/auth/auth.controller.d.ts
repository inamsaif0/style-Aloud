import { Request, Response } from 'express';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { ApproveOtpDto, LogInDto, PhoneNumberDto } from './dto/create-auth.dto';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    login(obj: LogInDto, req: Request, res: Response): Promise<any>;
    logOut(req: Request, res: Response): Promise<any>;
    saveNumber(dto: PhoneNumberDto, req: Request, res: Response): Promise<any>;
    approve_otp(dto: ApproveOtpDto, req: Request, res: Response): Promise<any>;
}
