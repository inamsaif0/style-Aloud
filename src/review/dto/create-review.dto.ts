import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateReviewDto {

    @IsOptional()
    user_id: string

    @IsNotEmpty()
    review: string

    @IsNotEmpty()
    count: string

    @IsNotEmpty()
    product_id: string    
    
    @IsOptional()
    device_token: string  
}

export class GetAllProductReviews {
    @IsNotEmpty()
    product_id: string
}

export class AcceptReviewDto{

    @IsNotEmpty()
    review_id: string

    @IsNotEmpty()
    status: boolean
}