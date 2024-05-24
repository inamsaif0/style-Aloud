import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
import { Order } from 'src/libs/database/entities/order.entity';
@Injectable()
export class OrderService {
  private readonly shopifyApiUrl = 'https://e102b127e425a798ff2782d6314f18b7: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@fabricforu.myshopify.com/admin/api/2022-10';
  private readonly axiosInstance: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    this.axiosInstance = axios.create({
      baseURL: this.shopifyApiUrl,
      timeout: 5000,
    });
  }
  async createOrder(createOrderDto: CreateOrderDto, req, res) {
    const newOrder = {
      order: {
        line_items: createOrderDto.line_items.map(item => ({
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        transactions: createOrderDto.transactions.map(transaction => ({
          kind: transaction.kind,
          status: transaction.status,
          amount: transaction.amount,
        })),
        currency: createOrderDto.currency,
        billing_address: {
          first_name: createOrderDto.billing_address_first_name,
          last_name: createOrderDto.billing_address_last_name,
          address1: createOrderDto.billing_address_address1,
          address2: createOrderDto.billing_address_address2,
          city: createOrderDto.billing_address_city,
          province: createOrderDto.billing_address_province,
          country: createOrderDto.billing_address_country,
          zip: createOrderDto.billing_address_zip,
        },
        shipping_address: {
          first_name: createOrderDto.shipping_address_first_name,
          last_name: createOrderDto.shipping_address_last_name,
          address1: createOrderDto.shipping_address_address1,
          address2: createOrderDto.shipping_address_address2,
          city: createOrderDto.shipping_address_city,
          province: createOrderDto.shipping_address_province,
          country: createOrderDto.shipping_address_country,
          zip: createOrderDto.shipping_address_zip,
        },
        customer: {
          first_name: createOrderDto.customer_first_name,
          last_name: createOrderDto.customer_last_name,
          email: createOrderDto.customer_email,
          phone: createOrderDto.customer_phone,
        },
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.post('/orders.json', newOrder);
      let value: any;
      let result:any
      if (createOrderDto.device_token) {
        value = await Order.query().insertAndFetch({
          order_id: response.data.order.id,
          device_token: createOrderDto.device_token,
          amount: response.data.current_subtotal_price
        })
      }
      else {
        value = await Order.query().insertAndFetch({
          order_id: response.data.order.id,
          user_id: createOrderDto.user_id,
          amount: response.data.order.current_subtotal_price
        })
      }
      console.log(response.data.order.current_subtotal_price)
      result = response.data
      return {value,result};
    } catch (error) {
      console.error('Error creating order:', error.response?.data || error.message);
      throw new Error('Could not create order');
    }
  }

}
