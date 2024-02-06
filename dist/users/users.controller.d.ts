import { Request, Response } from 'express';
import { ChangePasswordDto, DeleteLocationDto, GetUserByIdDto, OtpDto, PetProfileDto, SignUpDto, UpdateProfileDto, savedLocationDto } from './dto/users.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    signUp(file: any, signUpDto: SignUpDto, req: Request, res: Response): Promise<any>;
    getAllUsers(req: Request, res: Response): Promise<any>;
    editUser(file: any, dto: UpdateProfileDto, req: Request, res: Response): Promise<any>;
    saveLocation(dto: savedLocationDto, req: Request, res: Response): Promise<any>;
    getAllLocation(req: Request, res: Response): Promise<any>;
    getData(req: Request, res: Response): Promise<any>;
    getById(dto: GetUserByIdDto, req: Request, res: Response): Promise<any>;
    sendOtp(otpDto: OtpDto, req: Request, res: Response): Promise<any>;
    changePassword(changePasswordDto: ChangePasswordDto, req: Request, res: Response): Promise<any>;
    deleteLocation(deleteLocationDto: DeleteLocationDto, req: Request, res: Response): Promise<any>;
    addPetDetails(file: any, PetProfileDto: PetProfileDto, req: Request, res: Response): Promise<any>;
}
