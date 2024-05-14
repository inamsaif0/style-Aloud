import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto, GetCart, IncreaseDecreaseCount } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ResponseHelper } from 'src/utils/helper/response.helper';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/add-to-cart')
  async addToCart(@Body() createCartDto: CreateCartDto, req: Request, res: Response) {
    try{
      let data = this.cartService.addToCart(createCartDto);
      return ResponseHelper.success({ res, data })

    }
    catch(error){
      return ResponseHelper.error({ res, req, error })

    }
  }

  @Post('/get-cart')
  async getCart(@Body() GetCart: GetCart, req: Request, res: Response) {
    try{
      let data = this.cartService.getCartbyUserId(GetCart);
      return ResponseHelper.success({ res, data })

    }
    catch(error){
      return ResponseHelper.error({ res, req, error })

    }
  }
   
  @Post('/increment-decrement-cart')
  async incrementDecrementCart(@Body() IncreaseDecreaseCount: IncreaseDecreaseCount, req: Request, res: Response) {
    try{
      let data = this.cartService.IncrementDecrementCount(IncreaseDecreaseCount);
      return ResponseHelper.success({ res, data })

    }
    catch(error){
      return ResponseHelper.error({ res, req, error })

    }
  }
}
