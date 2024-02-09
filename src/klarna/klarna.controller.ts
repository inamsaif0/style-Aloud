// klarna.controller.ts

import { Controller, Post } from '@nestjs/common';
import { KlarnaService } from './klarna.service';

@Controller('klarna')
export class KlarnaController {
  constructor(private readonly klarnaService: KlarnaService) {}

  @Post('create-session')
  async createSession(): Promise<any> {
    return await this.klarnaService.createSession();
  }
}
