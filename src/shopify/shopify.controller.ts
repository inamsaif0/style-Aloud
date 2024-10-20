// customer.controller.ts

import { Controller, Post, Body, Param, Get, Req, Res, Query, UseInterceptors } from '@nestjs/common';
import { ShopifyService } from './shopify.service';
import { CollectionsDto, CustomerDto, ProductDto, VariantDto } from './dto/create-shopify.dto';
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

  @Get('/get-home-accessories-collections')
  async homeCollections ( @Req() req: Request, @Res() res: Response) {
    try {
      const data = await this.customerService.getHomeAccessoriess();
      return ResponseHelper.success({ res, data })
    } catch (error) {
      return ResponseHelper.error({ res, req, error })
    }
  }

  @Get('/get-bedding-collections')
  async beddingCollections ( @Req() req: Request, @Res() res: Response) {
    try {
      const data = await this.customerService.getBeddingAccessories();
      return ResponseHelper.success({ res, data })
    } catch (error) {
      return ResponseHelper.error({ res, req, error })
    }
  }

  @Get('/get-bath-line-collections')
  async bathLineCollections ( @Req() req: Request, @Res() res: Response) {
    try {
      const data = await this.customerService.getBathLineAccessories();
      return ResponseHelper.success({ res, data })
    } catch (error) {
      return ResponseHelper.error({ res, req, error })
    }
  }
  
  @Get('/get-kitchen-accessories-collections')
  async kitchenCollections ( @Req() req: Request, @Res() res: Response) {
    try {
      const data = await this.customerService.getKitchenAccessories();
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

  @UseInterceptors(FileInterceptor(''))
  @Post('/get-products-by-id')
  async getProduct (@Body() dto: ProductDto, @Req() req: Request, @Res() res: Response) {
    try {
      const data = await this.customerService.getProductbyId(dto);
      console.log('from controller', data)
      return ResponseHelper.success({ res, data })
    } catch (error) {
      return ResponseHelper.error({ res, req, error })
    }
  }

  @UseInterceptors(FileInterceptor(''))
  @Post('/get-products-by-variant-id')
  async getProducts (@Body() dto: VariantDto, @Req() req: Request, @Res() res: Response) {
    try {
      const data = await this.customerService.getProductByVariantId(dto);
      return ResponseHelper.success({ res, data })
    } catch (error) {
      return ResponseHelper.error({ res, req, error })
    }
  }
}
