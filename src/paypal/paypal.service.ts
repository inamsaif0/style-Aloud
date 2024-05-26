// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { CreateOrderDto } from '../paypal/dto/';
// import  * paypal from 'paypal-rest-sdk';

// @Injectable()
// export class PayPalService {
//   constructor(private readonly configService: ConfigService) {
//     paypal.configure({
//       mode: this.configService.get<string>('PAYPAL_MODE'), // 'sandbox' or 'live'
//       client_id: this.configService.get<string>('PAYPAL_CLIENT_ID'),
//       client_secret: this.configService.get<string>('PAYPAL_CLIENT_SECRET'),
//     });
//   }

//   createOrder(createOrderDto: CreateOrderDto) {
//     const createPaymentJson = {
//       intent: 'sale',
//       payer: {
//         payment_method: 'paypal',
//       },
//       redirect_urls: {
//         return_url: 'http://return.url',
//         cancel_url: 'http://cancel.url',
//       },
//       transactions: [
//         {
//           item_list: {
//             items: createOrderDto.line_items.map((item) => ({
//               name: item.title,
//               price: item.price.toFixed(2),
//               currency: createOrderDto.currency,
//               quantity: item.quantity,
//             })),
//           },
//           amount: {
//             currency: createOrderDto.currency,
//             total: createOrderDto.line_items
//               .reduce((sum, item) => sum + item.price * item.quantity, 0)
//               .toFixed(2),
//           },
//           description: 'This is the payment description.',
//         },
//       ],
//     };

//     return new Promise((resolve, reject) => {
//       paypal.payment.create(createPaymentJson, function (error, payment) {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(payment);
//         }
//       });
//     });
//   }

//   captureOrder(orderId: string) {
//     return new Promise((resolve, reject) => {
//       paypal.payment.execute(orderId, {}, function (error, payment) {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(payment);
//         }
//       });
//     });
//   }
// }
