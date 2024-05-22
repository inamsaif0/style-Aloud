import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, Res } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/utils/guard/local-auth.guard';
import { CollectionsDto } from 'src/shopify/dto/create-shopify.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResponseHelper } from 'src/utils/helper/response.helper';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  
  @Post()
  @UseGuards(LocalAuthGuard)
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @UseInterceptors(FileInterceptor(''))
  @Post('/get-collection-products-by-id')
  async myFriends (@Body() createOrderDto: CreateOrderDto, @Req() req: Request, @Res() res: Response) {
    try {
      const data = await this.orderService.createOrder(createOrderDto);
      console.log('from controller', data)
      return ResponseHelper.success({ res, data })
    } catch (error) {
      return ResponseHelper.error({ res, req, error })
    }
  }

}
