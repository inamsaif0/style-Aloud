import { Injectable } from '@nestjs/common';
import { AcceptReviewDto, CreateReviewDto, GetAllProductReviews } from './dto/create-review.dto';
import { Review } from 'src/libs/database/entities/review.entity';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
import { stat } from 'fs';

@Injectable()
export class ReviewService {
  private shopify: any;
  private readonly shopifyApiUrl = 'https://e102b127e425a798ff2782d6314f18b7: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@fabricforu.myshopify.com/admin/api/2022-10';
  private readonly axiosInstance: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    this.axiosInstance = axios.create({
      baseURL: this.shopifyApiUrl,
      timeout: 10000,
    });
  }

  getShopify() {
    return this.shopify;
  }
  async addReview(createReviewDto: CreateReviewDto) {
    let data: any;
    if (createReviewDto.user_id) {
      data = await Review.query().insertAndFetch({
        user_id: createReviewDto.user_id,
        text: createReviewDto.review,
        product_id: createReviewDto.product_id,
        count: createReviewDto.count
      })
      return data;

    }
    data = await Review.query().insertAndFetch({
      device_token: createReviewDto.device_token,
      text: createReviewDto.review,
      product_id: createReviewDto.product_id,
      count: createReviewDto.count
    })

    return data;
  }


  async getALlReviews(req, res) {
    let data:any = await Review.query();

    for (const review of data) {
      console.log('this is product id',review)

      console.log('this is product id',review.product_id)
      const response: AxiosResponse = await this.axiosInstance.get(`/products/${review.product_id}.json`);
      review.product_id = response.data
      console.log(review)

    }
    return data;
  }
  async getALlProductReviews(getALlProductReviews: GetAllProductReviews, req, res) {
    let data:any = await Review.query().where({
      product_id: getALlProductReviews.product_id,
      status: true
    });

  }

  async acceptReview(acceptReviewDto: AcceptReviewDto, req, res) {
    let data = await Review.query().updateAndFetchById(acceptReviewDto.review_id, {
      status: acceptReviewDto.status
    })
    return data
  }

}
