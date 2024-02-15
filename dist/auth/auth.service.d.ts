import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ApproveOtpDto, GuestDto, PhoneNumberDto } from './dto/create-auth.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(user: any): Promise<{
        token_type: string;
        token: string;
        user_details: any;
    }>;
    validateUser(email: string, pass: string, deviceToken: string): Promise<any>;
    logOut(req: any): Promise<any>;
    saveNumber(dto: PhoneNumberDto, req: any): Promise<any>;
    approveOtp(dto: ApproveOtpDto, req: any): Promise<any>;
    registerGuest(dto: GuestDto): Promise<any>;
}
