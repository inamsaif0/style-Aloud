import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from 'src/libs/database/entities/review.entity';
import { text } from 'stream/consumers';

@Injectable()
export class ReviewService {
  async addReview(createReviewDto: CreateReviewDto) {
    let data:any;
    if(createReviewDto.user_id){
      data = await Review.query().insertAndFetch({
      user_id: createReviewDto.user_id,
      text: createReviewDto.review,
      product_id: createReviewDto.product_id,
      count: createReviewDto.count
    })
  }
  data = await Review.query().insertAndFetch({
    device_token: createReviewDto.device_token,
    text: createReviewDto.review,
    product_id: createReviewDto.product_id,
    count: createReviewDto.count
  })

  return data;
}


  findAll() {
    return `This action returns all review`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
