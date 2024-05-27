import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/thanks')
  getHello () {
    return this.appService.getHello();
  }

  @Get('/cancel')
  getCancle () {
    return this.appService.getCancel();
  }
}
