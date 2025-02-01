
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class KlarnaService {
  private klarnaApiUrl: string;
  private authHeader: string;

  constructor() {
    this.klarnaApiUrl = 'https://api.playground.klarna.com'; // Use the production URL when going live
    const auth = Buffer.from(`${process.env.KLARNA_MERCHANT_ID}:${process.env.KLARNA_SHARED_SECRET}`).toString('base64');
    this.authHeader = `Basic ${auth}`;
  }

  private async makeRequest(method: string, endpoint: string, data?: any) {
    try {
      const response = await axios({
        method,
        url: `${this.klarnaApiUrl}${endpoint}`,
        headers: {
          'Authorization': this.authHeader,
          'Content-Type': 'application/json',
        },
        data,
      });
      return response.data;
    } catch (error) {
      throw new HttpException(error.response?.data || 'Klarna API error', error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createOrder(orderData: any) {
    return this.makeRequest('post', '/checkout/v3/orders', orderData);
  }

  async captureOrder(orderId: string, captureData: any) {
    return this.makeRequest('post', `/ordermanagement/v1/orders/${orderId}/captures`, captureData);
  }

  async acknowledgeOrder(orderId: string) {
    return this.makeRequest('post', `/ordermanagement/v1/orders/${orderId}/acknowledge`);
  }

  async handleCallback(orderId: string, callbackData: any) {
    // Process the callback data
    // Example: update order status in your database
  }
}
