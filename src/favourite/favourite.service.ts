import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFavouriteDto, DeleteFavouriteDto, GetFavouriteDto } from './dto/create-favourite.dto';
import { UpdateFavouriteDto } from './dto/update-favourite.dto';
import { Favourite } from 'src/libs/database/entities/favourite.entity';
import { deepEqual } from 'assert';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class FavouriteService {
  private shopify: any;
  private readonly shopifyApiUrl = 'https://e102b127e425a798ff2782d6314f18b7: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@fabricforu.myshopify.com/admin/api/2022-10';
  private readonly axiosInstance: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    this.axiosInstance = axios.create({
      baseURL: this.shopifyApiUrl,
      timeout: 10000,
    });
  }
  

  async createFavourite(createFavouriteDto: CreateFavouriteDto) {
    let data: any;
    let check:any = await Favourite.query().where({
      device_token: createFavouriteDto.device_token,
      product_id: createFavouriteDto.product_id,

    })
    console.log(check)
    if (createFavouriteDto.user_id) {
      let check:any = await Favourite.query().where({
        user_id: createFavouriteDto.user_id,
        product_id: createFavouriteDto.product_id,
        
      })
      if(check.length > 0){
        throw new HttpException('Already Exists', HttpStatus.BAD_REQUEST);
      }
      data = await Favourite.query().insertAndFetch({
        user_id: createFavouriteDto.user_id,
        product_id: createFavouriteDto.product_id,
        device_token: createFavouriteDto.device_token
      })
      return data;

    }
    if(check.length > 0){
      throw new HttpException('already Exists', HttpStatus.BAD_REQUEST);
    }
    data = await Favourite.query().insertAndFetch({
      product_id: createFavouriteDto.product_id,
      device_token: createFavouriteDto.device_token
    })

    return data;
  }

  private async retryRequest(url: string, retries: number = 3, delay: number = 1000): Promise<AxiosResponse> {
    for (let i = 0; i < retries; i++) {
      try {
        return await this.axiosInstance.get(url);
      } catch (error) {
        if (i === retries - 1 || error.response?.status !== 429) {
          throw error;
        }
        const retryAfter = error.response.headers['retry-after'] ? parseInt(error.response.headers['retry-after'], 10) * 1000 : delay;
        await new Promise(resolve => setTimeout(resolve, retryAfter));
        delay *= 2; // Exponential backoff
      }
    }
    throw new Error('Exceeded maximum retries');
  }

  private async fetchProductDetails(favourites: any[]): Promise<any[]> {
    const productDetailsPromises = favourites.map((favourite: any) =>
      this.retryRequest(`/products/${favourite.product_id}.json`).then(response => ({
        ...favourite,
        product: response.data.product,
      }))
    );

    return Promise.all(productDetailsPromises);
  }

  async getFavourite(getFavouriteDto: GetFavouriteDto): Promise<any> {
    try {
      let data: any;

      if (getFavouriteDto.user_id) {
        data = await Favourite.query().where({
          user_id: getFavouriteDto.user_id,
        });
      } else {
        data = await Favourite.query().where({
          device_token: getFavouriteDto.device_token,
        });
      }

      return await this.fetchProductDetails(data);
    } catch (error) {
      console.error('Error fetching favourites:', error);
      throw error;
    }
  }


  async deleteFavourite(deleteFavouriteDto: DeleteFavouriteDto){
    let data:any;
    if(deleteFavouriteDto.user_id){
       data = await Favourite.query().delete().where({
        product_id: deleteFavouriteDto.product_id,
        user_id: deleteFavouriteDto.user_id
      })
    }
    data= await Favourite.query().delete().where({
      product_id: deleteFavouriteDto.product_id,
      device_token: deleteFavouriteDto.device_token
    })

    return data;
  
  }
}
