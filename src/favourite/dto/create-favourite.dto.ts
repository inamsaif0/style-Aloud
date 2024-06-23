import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateFavouriteDto {
    @IsOptional()
    device_token: string

    @IsOptional()
    user_id: string

    @IsNotEmpty()
    product_id: string

}

export class GetFavouriteDto {
    @IsOptional()
    device_token: string

    @IsOptional()
    user_id: string
}

export class DeleteFavouriteDto {

    @IsNotEmpty()
    product_id: string

    @IsOptional()
    device_token: string

    @IsOptional()
    user_id: string

}