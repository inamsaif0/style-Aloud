import { Injectable, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class ShopifyService {
  private readonly shopifyApiKey = 'YOUR_SHOPIFY_API_KEY';
  private readonly shopifyPassword = 'YOUR_SHOPIFY_PASSWORD';
  private readonly shopifyStoreUrl = 'YOUR_SHOPIFY_STORE_URL';
  private readonly shopifyApiVersion = '2021-10';

  constructor(private readonly httpService: HttpService) {}

  // Add a credit card for a customer
  addCreditCard(customerId: string, creditCardData: any): Observable<AxiosResponse<any>> {
    const authHeader = {
      auth: {
        username: this.shopifyApiKey,
        password: this.shopifyPassword,
      },
    };
    return this.httpService.post(
      `https://${this.shopifyStoreUrl}/admin/api/${this.shopifyApiVersion}/customers/${customerId}/payment_methods.json`,
      creditCardData,
      authHeader,
    );
  }

  // Retrieve all credit cards of a customer
  getAllCreditCards(customerId: string): Observable<AxiosResponse<any>> {
    const authHeader = {
      auth: {
        username: this.shopifyApiKey,
        password: this.shopifyPassword,
      },
    };
    return this.httpService.get(
      `https://${this.shopifyStoreUrl}/admin/api/${this.shopifyApiVersion}/customers/${customerId}/payment_methods.json`,
      authHeader,
    );
  }

  // Retrieve a single credit card by its ID
  getCreditCardById(customerId: string, cardId: string): Observable<AxiosResponse<any>> {
    const authHeader = {
      auth: {
        username: this.shopifyApiKey,
        password: this.shopifyPassword,
      },
    };
    return this.httpService.get(
      `https://${this.shopifyStoreUrl}/admin/api/${this.shopifyApiVersion}/customers/${customerId}/payment_methods/${cardId}.json`,
      authHeader,
    );
  }
}
