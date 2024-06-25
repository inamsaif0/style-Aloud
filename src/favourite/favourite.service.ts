import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFavouriteDto, DeleteFavouriteDto, GetFavouriteDto } from './dto/create-favourite.dto';
import { UpdateFavouriteDto } from './dto/update-favourite.dto';
import { Favourite } from 'src/libs/database/entities/favourite.entity';
import { deepEqual } from 'assert';
@Injectable()
export class FavouriteService {

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

  async getFavourite(getFavouriteDto: GetFavouriteDto) {
    let data:any;
    if(getFavouriteDto.user_id){
      data= await Favourite.query().where({
        user_id: getFavouriteDto.user_id
      })
    }
    //this is data
        else{
    data = await Favourite.query().where({
      device_token: getFavouriteDto.device_token
    })
  }
    return data;
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
