import { IsNotEmpty } from "class-validator";

export class CreateReviewDto {

    @IsNotEmpty()
    user_id: string

    @IsNotEmpty()
    review: string

    @IsNotEmpty()
    count: string

    @IsNotEmpty()
    product_id: string    
    
    @IsNotEmpty()
    device_token: string  
}
