import { IsNotEmpty } from "class-validator";

export class CreateCartDto {

    @IsNotEmpty()
    product_id: string

    @IsNotEmpty()
    user_id: string

    @IsNotEmpty()
    count: string
}

export class IncreaseDecreaseCount {
    @IsNotEmpty()
    count: string

    @IsNotEmpty()
    element_id: string
}
export class GetCart {
    @IsNotEmpty()
    user_id: string
}
export class DeleteCartItem {
    @IsNotEmpty()
    cart_id: string
}