import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateFavouriteDto {
    @IsNotEmpty()
    device_token: string

    @IsOptional()
    user_id: string

    @IsNotEmpty()
    product_id: string

}

export class GetFavouriteDto {
    @IsNotEmpty()
    device_token: string

    @IsOptional()
    user_id: string
}

export class DeleteFavouriteDto {

    @IsNotEmpty()
    product_id: string


    @IsNotEmpty()
    device_token: string

}