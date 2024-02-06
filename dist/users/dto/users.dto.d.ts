export declare class SignUpDto {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
    profile_picture: string;
    device_token: string;
    role: string;
    active_role: string;
    dob: string;
    phone_number: string;
}
export declare class OtpDto {
    email: string;
}
export declare class ChangePasswordDto {
    email: string;
    password: string;
    confirm_password: string;
    otp: string;
}
export declare class CreateProfileDto {
    first_name: string;
    last_name: string;
    country: string;
    city: string;
    state: string;
    latitude: string;
    longitude: string;
    gender: string;
    date_of_birth: string;
    phone_number: string;
}
export declare class UpdateProfileDto {
    id: string;
    first_name: string;
    last_name: string;
    country: string;
    city: string;
    state: string;
    latitude: string;
    longitude: string;
    gender: string;
    date_of_birth: string;
    phone_number: string;
    image: string;
}
export declare class savedLocationDto {
    longitude: string;
    latitude: string;
    address: string;
    title: string;
    default_address: string;
}
export declare class GetUserByIdDto {
    id: number;
}
export declare class DeleteLocationDto {
    id: number;
}
export declare class PetProfileDto {
    user_id: string;
    name: string;
    type: string;
    height: string;
    weight: string;
    about: string;
    breed: string;
    trait: string;
    gender: string;
    address: string;
    latitude: string;
    longitude: string;
    price: string;
}
