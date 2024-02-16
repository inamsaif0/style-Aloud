import { IsEmail, IsNotEmpty, IsOptional, isNotEmpty } from "class-validator";

export class LogInDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    device_token: string;
}

export class OtpDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;


}
export class GuestDto {
    @IsNotEmpty()
    device_token: string;
}
export class PhoneNumberDto {
    @IsNotEmpty()
    phone_number: BigInteger;
}

export class ApproveOtpDto {
    @IsNotEmpty()
    otp: BigInt;
}

export class ProfileInformationDto{


    @IsNotEmpty()
    user_id: String;

    @IsNotEmpty()
    name: String;

    @IsNotEmpty()
    image: String;

    @IsNotEmpty()
    profile_image: String;

    @IsNotEmpty()
    type: String;

    @IsNotEmpty()
    height: String;

    @IsNotEmpty()
    weight: String;

    @IsNotEmpty()
    about: String;

    @IsNotEmpty()
    breed: String;

    @IsNotEmpty()
    trait: String;

    @IsNotEmpty()
    gender: String;

    @IsNotEmpty()
    breeder: boolean;

    @IsNotEmpty()
    address: String;

    @IsNotEmpty()
    latitude: String;

    @IsNotEmpty()
    longitude: String;

    @IsNotEmpty()
    price: String;


}