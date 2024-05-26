// import { Controller, Post, Body, Param } from '@nestjs/common';
// import { PayPalService } from '../paypal/paypal.service';
// import { CreateOrderDto } from '../paypal/dto/create-paypal.dto';

// @Controller('paypal')
// export class PayPalController {
//   constructor(private readonly paypalService: PayPalService) {}

//   @Post('create')
//   createOrder(@Body() createOrderDto: CreateOrderDto) {
//     return this.paypalService.createOrder(createOrderDto);
//   }

//   @Post('capture/:orderId')
//   captureOrder(@Param('orderId') orderId: string) {
//     return this.paypalService.captureOrder(orderId);
//   }
// }
