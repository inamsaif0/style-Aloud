import { JwtService } from '@nestjs/jwt';
import { Users } from '../libs/database/entities/user.entity';
import { UserAddresses } from 'src/libs/database/entities/user-addresses.entity';
import { ChangePasswordDto, DeleteLocationDto, OtpDto, PetProfileDto, SignUpDto, UpdateProfileDto, savedLocationDto } from './dto/users.dto';
import { PetProfile } from 'src/libs/database/entities/pet-profile.entity';
export declare class UsersService {
    private jwtService;
    constructor(jwtService: JwtService);
    signUp(dto: SignUpDto, files: any): Promise<any>;
    generateResetToken(): Promise<number>;
    findOne(email: string, deviceToken: string): Promise<any>;
    updateDeviceToken(userId: any, deviceToken: any): Promise<any>;
    getUserById(dto: any, req: any): Promise<Users>;
    getAllUsers(): Promise<Users[]>;
    updateUser(dto: UpdateProfileDto, req: any, file: any): Promise<any>;
    saveLocation(dto: savedLocationDto, req: any): Promise<any>;
    deleteLocation(dto: DeleteLocationDto): Promise<number>;
    getAllLocation(req: any): Promise<UserAddresses[]>;
    sendOtp(otpDto: OtpDto): Promise<string>;
    changePassword(changePasswordDto: ChangePasswordDto): Promise<Users>;
    createVideoThumbnail(val: any): string;
    addProfileDetails(dto: PetProfileDto, req: any, file: any): Promise<PetProfile>;
}
