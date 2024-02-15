export declare class LogInDto {
    email: string;
    password: string;
    device_token: string;
}
export declare class OtpDto {
    email: string;
}
export declare class PhoneNumberDto {
    phone_number: BigInteger;
}
export declare class ApproveOtpDto {
    otp: BigInt;
}
export declare class GuestDto {
    device_token: string;
}
export declare class ProfileInformationDto {
    user_id: String;
    name: String;
    image: String;
    profile_image: String;
    type: String;
    height: String;
    weight: String;
    about: String;
    breed: String;
    trait: String;
    gender: String;
    breeder: boolean;
    address: String;
    latitude: String;
    longitude: String;
    price: String;
}
