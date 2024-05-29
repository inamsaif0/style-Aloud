import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';
import { CreateOrderDto } from './dto/create-paypal.dto';
var dotenv = require('dotenv');
dotenv.config();

@Injectable()
export class PaypalService {
  private clientId = process.env.PAYPAL_CLIENT_ID;
  private clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  async getAccessToken(): Promise<string> {
    const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');

    try {
      const response = await axios({
        method: 'post',
        url: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${auth}`,
        },
        data: 'grant_type=client_credentials',
      });

      return response.data.access_token;
    } catch (error) {
      console.error('Error getting access token from PayPal:', error.response?.data || error.message);
      throw new HttpException('Unable to get access token from PayPal', 500);
    }
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<any> {
    const accessToken = await this.getAccessToken();
    
    const orderData = {
      intent: createOrderDto.intent,
      purchase_units: createOrderDto.purchase_units,
      application_context: createOrderDto.application_context,
    };

    try {
      const response = await axios.post('https://api-m.sandbox.paypal.com/v2/checkout/orders', orderData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating order with PayPal:', error.response?.data || error.message);
      throw new HttpException('Unable to create order with PayPal', 500);
    }
  }

  async capturePayment(orderId: string): Promise<any> {
    const accessToken = await this.getAccessToken();

    try {
      const response = await axios.post(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error capturing payment with PayPal:', error.response?.data || error.message);
      throw new HttpException('Unable to capture payment with PayPal', 500);
    }
  }
}
