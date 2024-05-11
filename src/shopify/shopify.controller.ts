// customer.controller.ts

import { Controller, Post, Body, Param, Get, Req, Res, Query, UseInterceptors } from '@nestjs/common';
import { ShopifyService } from './shopify.service';
import { CollectionsDto, CustomerDto } from './dto/create-shopify.dto';
import { ResponseHelper } from 'src/utils/helper/response.helper';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('api/shopify')
export class ShopifyController {
  
  constructor(private readonly customerService: ShopifyService) {}

  @Get('/get-home-screen-collections')
  async homeScreenCollections ( @Req() req: Request, @Res() res: Response) {
    try {
      const data = await this.customerService.getCollections();
      return ResponseHelper.success({ res, data })
    } catch (error) {
      return ResponseHelper.error({ res, req, error })
    }
  }
  @Get('/get-brand-collections')
  async brandCollections ( @Req() req: Request, @Res() res: Response) {
    try {
      const data = await this.customerService.getCollectionsByBrand();
      return ResponseHelper.success({ res, data })
    } catch (error) {
      return ResponseHelper.error({ res, req, error })
    }
  }
  @UseInterceptors(FileInterceptor(''))
  @Post('/get-collection-products-by-id')
  async myFriends (@Body() dto: CollectionsDto, @Req() req: Request, @Res() res: Response) {
    try {
      const data = await this.customerService.getCollectionsProducts(dto);
      return ResponseHelper.success({ res, data })
    } catch (error) {
      return ResponseHelper.error({ res, req, error })
    }
  }
}
