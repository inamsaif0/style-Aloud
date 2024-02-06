import { IsEmail, IsNotEmpty, IsOptional, Matches } from "class-validator";
import { Users } from "../../libs/database/entities/user.entity";
// import { UniqueOnDatabase } from "../../libs/helper/validators/unique.validation";
import { UniqueOnDatabase } from "src/utils/helper/validators/unique.validation";
import { IsMatch } from "src/utils/helper/validators/match.decorator";
export class SignUpDto {

    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsEmail()
    @IsNotEmpty()
    @UniqueOnDatabase(Users)
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    confirm_password: string;

    @IsOptional()
    profile_picture: string;  

    @IsNotEmpty()
    device_token: string;

    @IsNotEmpty()
    role: string;

    @IsNotEmpty()
    active_role: string;

    @IsNotEmpty()
    dob: string;

    @IsNotEmpty()
    phone_number: string;


}

export class OtpDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

 
}
export class ChangePasswordDto {
    @IsNotEmpty()
    email: string;
  
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message:
        'Password must be greater or equal to 8 characters, must have at least one uppercase and lowercase alphabets, must be alphanumeric & should must contain a special character',
    })
    @IsNotEmpty()
    password: string;
  
    @IsNotEmpty()
    @IsMatch('password')
    confirm_password: string;
  
    @IsNotEmpty()
    otp: string;
  }


export class CreateProfileDto {

    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    country: string;

    @IsOptional()
    city: string;

    @IsOptional()
    state: string;

    @IsNotEmpty()
    latitude: string;

    @IsNotEmpty()
    longitude: string;

    @IsOptional()
    gender: string;

    @IsOptional()
    date_of_birth: string;

    @IsOptional()
    phone_number: string;



}
export class UpdateProfileDto {

    @IsNotEmpty()
    id: string

    @IsOptional()
    first_name: string;

    @IsOptional()
    last_name: string;

    @IsOptional()
    country: string;

    @IsOptional()
    city: string;

    @IsOptional()
    state: string;

    @IsOptional()
    latitude: string;

    @IsOptional()
    longitude: string;

    @IsOptional()
    gender: string;

    @IsOptional()
    date_of_birth: string;

    @IsOptional()
    phone_number: string;

    @IsOptional()
    image: string;


}

export class savedLocationDto {
    @IsNotEmpty()
    longitude: string;

    @IsNotEmpty()
    latitude: string;

    @IsNotEmpty()
    address: string;


    @IsNotEmpty()
    title: string;

    @IsOptional()
    default_address: string;

}

export class GetUserByIdDto {
    @IsNotEmpty()
    id: number;
}

export class DeleteLocationDto {

    @IsNotEmpty()
    id: number;
}

export class PetProfileDto{
    
    @IsNotEmpty()
    user_id: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    height: string;

    @IsNotEmpty()
    weight: string;

    @IsNotEmpty()
    about: string;

    @IsNotEmpty()
    breed: string;

    @IsNotEmpty()
    trait: string

    @IsNotEmpty()
    gender: string

    @IsNotEmpty()
    address: string

    @IsNotEmpty()
    latitude: string;

    @IsNotEmpty()
    longitude: string;

    @IsNotEmpty()
    price: string;


}