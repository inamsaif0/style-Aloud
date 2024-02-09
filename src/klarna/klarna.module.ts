// klarna.module.ts

import { Module } from '@nestjs/common';
import { KlarnaController } from './klarna.controller';
import { KlarnaService } from './klarna.service';

@Module({
  controllers: [KlarnaController],
  providers: [KlarnaService],
})
export class KlarnaModule {}
