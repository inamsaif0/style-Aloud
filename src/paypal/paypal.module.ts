import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { PaypalService } from './paypal.service';
import { PaypalController } from './paypal.controller';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [PaypalService],
  controllers: [PaypalController]
})
export class PaypalModule {}
