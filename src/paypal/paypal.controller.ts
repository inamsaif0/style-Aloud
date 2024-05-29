import { Controller, Post, Body, Param, Res, Req } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { ResponseHelper } from 'src/utils/helper/response.helper';

@Controller('/api/paypal')
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}

  @Post('/create-order')
  async createOrder(@Body() createOrderDto: any,  @Req() req: Request, @Res() res: Response) {
    try{
        let data :any =await this.paypalService.createOrder(createOrderDto);
        return ResponseHelper.success({ res, data })

    } catch(error){
        return ResponseHelper.error({ res, req, error })

    }
  }

  @Post('capture-payment/:orderId')
  async capturePayment(@Param('orderId') orderId: string, @Req() req: Request, @Res() res: Response) {
    try{
        let data:any= await this.paypalService.capturePayment(orderId);
        return ResponseHelper.success({ res, data })

    } catch(error){
        return ResponseHelper.error({ res, req, error })

    }
  }
}
