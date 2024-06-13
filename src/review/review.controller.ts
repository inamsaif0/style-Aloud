import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseInterceptors } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto, GetAllProductReviews, AcceptReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ResponseHelper } from 'src/utils/helper/response.helper';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/api/review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseInterceptors(FileInterceptor(''))
  @Post('/create-review')
  async create(@Body() createReviewDto: CreateReviewDto,  @Req() req: Request, @Res() res: Response) {
    try{
      let data = await this.reviewService.addReview(createReviewDto);
      return ResponseHelper.success({ res, data })

    }catch(error){
      return ResponseHelper.error({ res, req, error })
    }
  }

  @Get('/get-all-reviews')
  async findAll( @Req() req: Request, @Res() res: Response) {
   try{
    let data:any = this.reviewService.getALlReviews(req, res);
    return ResponseHelper.success({ res, data })

   }catch(error){
    return ResponseHelper.error({ res, req, error })
    
   }
  }

  @Get('/get-all-reviews-by-product')
  async findProductReviews(@Body() GetAllProductReviews: GetAllProductReviews,  @Req() req: Request, @Res() res: Response) {
   try{
    let data:any = this.reviewService.getALlProductReviews(GetAllProductReviews, req, res);
    return ResponseHelper.success({ res, data })

   }catch(error){
    return ResponseHelper.error({ res, req, error })
    
   }
  }
  
  @Post('/accept-reject-review')
  async acceptRejectReview(@Body() acceptReviewDto: AcceptReviewDto,  @Req() req: Request, @Res() res: Response) {
    try{
      let data = await this.reviewService.acceptReview(acceptReviewDto, req, res);
      return ResponseHelper.success({ res, data })

    }catch(error){
      return ResponseHelper.error({ res, req, error })
    }
  }

 
}
