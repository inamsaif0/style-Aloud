// // shopify.controller.ts
// import { Controller, Get, Post, Body, Query, UseInterceptors } from '@nestjs/common';
// import { ShopifyService } from './shopify.service';
// import { ProductDto, AddToCartDto, CheckoutDto, CollectionsDto } from './dto/create-shopify.dto';
// import { FileInterceptor } from '@nestjs/platform-express';

// @Controller('api/shopify')
// export class ShopifyController {

//   constructor(private readonly shopifyService: ShopifyService) {}

//   @Get('/products')
//   getAllProducts(){
//     return this.shopifyService.getAllProducts();
//   }

//   @Get('/cart')
//   getCart(): any {
//     return this.shopifyService.getCart();
//   }

//   @Post('/checkout')
//   @UseInterceptors(FileInterceptor(''))
//   checkout(@Body() checkoutDto: CheckoutDto): any {
//     return this.shopifyService.checkout(checkoutDto);
//   }

  // @Get('/get-collections')
  // @UseInterceptors(FileInterceptor(''))
  // getAllCollections(): any {
  //   return this.shopifyService.getCollections();
  // }

  // @Post('/get-collection-products')
  // @UseInterceptors(FileInterceptor(''))
  // getCollectionProducts(
  //   @Body() dto: CollectionsDto
  // ): any {
  //   return this.shopifyService.getCollectionsProducts(dto);
  // }

  
// }

// shopify.controller.ts
import { Controller, Post, Delete, Patch, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ShopifyService } from './shopify.service';
import { CollectionsDto } from './dto/create-shopify.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('shopify')
export class ShopifyController {
  constructor(private readonly shopifyService: ShopifyService) {}


  @Get('/get-collections')
  @FileInterceptor(FileInterceptor(''))
  getAllCollections(): any {
    return this.shopifyService.getCollections();
  }

  @Post('/get-collection-products')
  @FileInterceptor(FileInterceptor(''))
  getCollectionProducts(
    @Body() dto: CollectionsDto
  ): any {
    return this.shopifyService.getCollectionsProducts(dto);
  }
  
  @Post('register')
  async registerCustomer(@Body() customerData: any) {
    try {
      return await this.shopifyService.registerCustomer(customerData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('authenticate')
  async authenticateCustomer(@Body() credentials: any) {
    try {
      return await this.shopifyService.authenticateCustomer(credentials);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('cart/:customerId/add')
  async addToCart(@Param('customerId') customerId: string, @Body() product: any) {
    try {
      return await this.shopifyService.addToCart(customerId, product);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('cart/:customerId/delete/:productId')
  async deleteFromCart(@Param('customerId') customerId: string, @Param('productId') productId: string) {
    try {
      return await this.shopifyService.deleteFromCart(customerId, productId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('cart/:customerId/edit')
  async editCart(@Param('customerId') customerId: string, @Body() cartData: any) {
    try {
      return await this.shopifyService.editCart(customerId, cartData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
function Get(arg0: string): (target: ShopifyController, propertyKey: "getAllCollections", descriptor: TypedPropertyDescriptor<() => any>) => void | TypedPropertyDescriptor<() => any> {
  throw new Error('Function not implemented.');
}

