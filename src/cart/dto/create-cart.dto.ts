import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateCartDto {

    @IsNotEmpty()
    product_id: string

    @IsOptional()
    user_id: string

    @IsNotEmpty()
    count: number

    @IsOptional()
    device_token: string

    @IsNotEmpty()
    price: number

}

export class IncreaseDecreaseCount {
    @IsNotEmpty()
    count: number

    @IsNotEmpty()
    element_id: string
}
export class GetCart {
    @IsOptional()
    user_id: string

    @IsOptional()
    device_token: string
}
export class DeleteCartItem {
    @IsNotEmpty()
    cart_id: string
}