import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto, DeleteLocationDto, OtpDto, PetProfileDto, SignUpDto, UpdateProfileDto, savedLocationDto } from './dto/users.dto';
export declare class UsersService {
    private jwtService;
    constructor(jwtService: JwtService);
    signUp(dto: SignUpDto, files: any): Promise<any>;
    generateResetToken(): Promise<number>;
    findOne(email: string, deviceToken: string): Promise<any>;
    updateDeviceToken(userId: any, deviceToken: any): Promise<any>;
    getUserById(dto: any, req: any): Promise<any>;
    getAllUsers(): Promise<any>;
    updateUser(dto: UpdateProfileDto, req: any, file: any): Promise<any>;
    saveLocation(dto: savedLocationDto, req: any): Promise<any>;
    deleteLocation(dto: DeleteLocationDto): Promise<any>;
    getAllLocation(req: any): Promise<any>;
    sendOtp(otpDto: OtpDto): Promise<string>;
    changePassword(changePasswordDto: ChangePasswordDto): Promise<any>;
    createVideoThumbnail(val: any): string;
    addProfileDetails(dto: PetProfileDto, req: any, file: any): Promise<any>;
}
