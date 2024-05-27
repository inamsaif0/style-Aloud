import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello () {
    return "Thank You For Shopping :)"
  }
}
