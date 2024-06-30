import { Controller, Post, Body, Param, Req, Res } from '@nestjs/common';
import { KlarnaService } from './klarna.service';
import { Response, Request } from 'express';
import { ResponseHelper } from 'src/utils/helper/response.helper';

@Controller('api/klarna')
export class KlarnaController {
  constructor(private readonly klarnaService: KlarnaService) {}

  @Post('order')
  async createOrder(@Body() orderData: any, @Req() req: Request, @Res() res: Response) {
    try {
      const order = await this.klarnaService.createOrder(orderData);
      return ResponseHelper.success({ res, data: order });
    } catch (error) {
      return ResponseHelper.error({ res, req, error });
    }
  }

  @Post('capture/:orderId')
  async captureOrder(@Param('orderId') orderId: string, @Body() captureData: any, @Req() req: Request, @Res() res: Response) {
    try {
      const result = await this.klarnaService.captureOrder(orderId, captureData);
      return ResponseHelper.success({ res, data: result });
    } catch (error) {
      return ResponseHelper.error({ res, req, error });
    }
  }

  @Post('acknowledge/:orderId')
  async acknowledgeOrder(@Param('orderId') orderId: string, @Req() req: Request, @Res() res: Response) {
    try {
      const result = await this.klarnaService.acknowledgeOrder(orderId);
      console.log('Acknowledgement result:', result);
      return ResponseHelper.success({ res, data: result });
    } catch (error) {
      return ResponseHelper.error({ res, req, error });
    }
  }

  @Post('callback/:orderId')
  async handleCallback(@Param('orderId') orderId: string, @Body() callbackData: any, @Req() req: Request, @Res() res: Response) {
    try {
      await this.klarnaService.handleCallback(orderId, callbackData);
      return ResponseHelper.success({ res, data: { message: 'Callback handled' } });
    } catch (error) {
      return ResponseHelper.error({ res, req, error });
    }
  }
}
