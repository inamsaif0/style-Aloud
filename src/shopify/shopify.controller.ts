// customer.controller.ts

import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ShopifyService } from './shopify.service';
@Controller('shopify')
export class ShopifyController {
  
  constructor(private readonly customerService: ShopifyService) {}

  // this is to register customer in shopify
  @Post('register')
  async registerCustomer(@Body() customerData: any): Promise<any> {
    // Assuming customerData includes fields like name, email, address, etc.
    // You need to implement validation and error handling here
    try {
      const customer = await this.customerService.createCustomer(customerData);
      return { success: true, customer };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // this is the api to use after the checkout
  @Post('checkout')
  async createCheckout(@Body('customerId') customerId: string): Promise<any> {
    const checkout = await this.customerService.createCheckout(customerId);
    return checkout;
  }
  

  // this is the api for line items
  @Post(':id/add-item')
  async addLineItem(
    @Param('id') checkoutId: string,
    @Body('lineItems') lineItems: any[]
  ): Promise<any> {
    const updatedCheckout = await this.customerService.addLineItem(checkoutId, lineItems);
    return updatedCheckout;
  }
  

  // this is to get check out

  @Get(':id')
  async getCheckout(@Param('id') checkoutId: string): Promise<any> {
    const checkout = await this.customerService.getCheckout(checkoutId);
    return checkout;
  }

  @Post(':id/add-card-details')
  async addCardDetails(
    @Param('id') checkoutId: string,
    @Body('cardDetails') cardDetails: any
  ): Promise<any> {
    const updatedCheckout = await this.customerService.addCardDetails(checkoutId, cardDetails);
    return updatedCheckout;
  }

  @Post(':id/confirm-order')
  async confirmOrder(@Param('id') checkoutId: string): Promise<any> {
    const completedCheckout = await this.customerService.completeCheckout(checkoutId);
    return completedCheckout;
  }


}
