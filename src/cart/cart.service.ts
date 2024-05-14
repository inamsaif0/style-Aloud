import { Injectable } from '@nestjs/common';
import { CreateCartDto, GetCart, IncreaseDecreaseCount } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from 'src/libs/database/entities/cart.entity';
import { count } from 'console';

@Injectable()
export class CartService {
  async addToCart(dto: CreateCartDto){
    let data = await Cart.query().insertAndFetch({
      user_id: dto.user_id,
      product_id: dto.product_id,
      count: dto.count
    })
    return data
  }

  async getCartbyUserId(dto: GetCart){
    let data = await Cart.query().where({user_id:dto.user_id});
    return data
  }

  async IncrementDecrementCount(dto: IncreaseDecreaseCount){
    let data = await Cart.query().updateAndFetchById(dto.element_id, {
      count: dto.count
    });

  }
}
