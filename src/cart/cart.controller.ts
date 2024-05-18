import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Req, Res } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto, GetCart, IncreaseDecreaseCount } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ResponseHelper } from 'src/utils/helper/response.helper';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';

@Controller('/api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseInterceptors(FileInterceptor(''))
  @Post('/add-to-cart')
  async addToCart(@Body() createCartDto: CreateCartDto, @Req() req: Request, @Res() res: Response) {
    try{
      let data = await this.cartService.addToCart(createCartDto);
      return ResponseHelper.success({ res, data })

    }
    catch(error){
      return ResponseHelper.error({ res, req, error })

    }
  }

  @UseInterceptors(FileInterceptor(''))
  @Post('/get-cart')
  async getCart(@Body() GetCart: GetCart, @Req() req: Request, @Res() res: Response ){
    try{
      let data = await this.cartService.getCartbyUserId(GetCart);
      console.log('from controler?', data)
      return ResponseHelper.success({ res, data })

    }
    catch(error){
      return ResponseHelper.error({ res, req, error })

    }
  }
   
  @UseInterceptors(FileInterceptor(''))
  @Post('/increment-decrement-cart')
  async incrementDecrementCart(@Body() dto: IncreaseDecreaseCount,  @Req() req: Request, @Res() res: Response ) {
    try{
      let data = await this.cartService.IncrementDecrementCount(dto);
      return ResponseHelper.success({ res, data })

    }
    catch(error){
      return ResponseHelper.error({ res, req, error })

    }
  }
}
