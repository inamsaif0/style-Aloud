// // // shopify.service.ts
// // import { Injectable } from '@nestjs/common';

// // import { AddToCartDto, CheckoutDto, CollectionsDto } from './dto/create-shopify.dto';

// // @Injectable()
// // export class ShopifyService {
//   // private readonly shopifyApiUrl = '';
// //   private readonly axiosInstance: AxiosInstance;

// //   constructor() {
// //     this.axiosInstance = axios.create({
// //       baseURL: this.shopifyApiUrl,
// //       timeout: 5000,
// //     });
// //   }
// // //get all products
// //   async getAllProducts() {
// //     const response: AxiosResponse = await this.axiosInstance.get(`/products.json`);
// //     return response.data.products;
// //   }

// //   // get all the collections
// //   async getCollections() {
// //     const response: AxiosResponse = await this.axiosInstance.get(`/smart_collections.json`);
// //     return response.data;
// //   }

// //   // get all the products of single collection by id 
// //   async getCollectionsProducts(dto:CollectionsDto) {
// //     const response: AxiosResponse = await this.axiosInstance.get(`/collections/${dto.collectionId}/products.json`);
// //     return response.data;
// //   }

// //   // get all carts
// //   async getCart(){
// //     const response: AxiosResponse = await this.axiosInstance.get(`/cart.json`);
// //     return response.data;
// //   }

// //   async getRecommendations(){
// //     // const response: AxiosResponse = await this.axiosInstance.get(`/${locale}/recommendations/products.json?product_id=${product-id}&intent=${intent}`);
// //     // return response.data;
// //   }

// //   // checkout 
// //   async checkout(checkoutDto: CheckoutDto): Promise<any> {
// //     const response: AxiosResponse = await this.axiosInstance.post('/checkouts.json', { checkout: checkoutDto });
// //     return response.data;
// //   }

// // }
// // shopify.service.ts
import '@shopify/shopify-api/adapters/node';
import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {shopifyApi, LATEST_API_VERSION} from '@shopify/shopify-api';
import { ConfigService } from '@nestjs/config';
import { CollectionsDto, ProductDto } from './dto/create-shopify.dto';


@Injectable()
export class ShopifyService {
  private shopify:any;
  private readonly shopifyApiUrl = 'https://e102b127e425a798ff2782d6314f18b7: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@fabricforu.myshopify.com/admin/api/2022-10';
  private readonly axiosInstance: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    this.axiosInstance = axios.create({
            baseURL: this.shopifyApiUrl,
            timeout: 10000,
          });
  }

  getShopify() {
    return this.shopify;
  }
  async filterCollectionsByKeywords(collections: any, keywords: string[]){
    return collections.smart_collections.filter(collection => {
      console.log(collection)
        const title = collection.title.toLowerCase();
        console.log(title)
        return keywords.some(keyword => title.includes(keyword.toLowerCase()));
    });
}
      async getCollections() {
      const response: any = await this.axiosInstance.get(`/smart_collections.json`);
      const filteredCollections = await this.filterCollectionsByKeywords(response.data, [ "GIRL", "WOMENS", "KIDS", "MENS"]);
      return filteredCollections;
    }

    async getCollectionsByBrand() {
      const collections = [
        "Afrozeh",
        "Al-Zohaib Textile",
        "Alizeh Fashion",
        "Amna Khadija",
        "Anaya",
        "Asim Jofa",
        "Baroque",
        "Beechtree",
        "Bin Ilyas",
        "Bonanza",
        "Charizma",
        "Elaf Premium",
        "Eshaisha",
        "Farasha",
        "Firdous Concept",
        "Gul Ahmed",
        "Iznik",
        "J.",
        "Jazmin",
        "Kafh Premium",
        "Khaadi",
        "LALA",
        "LIMELIGHT",
        "Lakhani",
        "Maria.B",
        "Mausummary",
        "Moti's Fashion",
        "Munira Designer",
        "Ochre Clothing",
        "RajBari",
        "Ramsha",
        "Rang Rasiya",
        "Rangz",
        "Riaz Arts",
        "Sana Safinaz",
        "Sapphire",
        "Soghat Creation",
        "Tawakkal Fabrics",
        "The Ocean",
        "Vantona",
        "Varun",
        "Xenia Formals",
        "Z. S Textiles"
      ];
      const response: any = await this.axiosInstance.get(`/smart_collections.json`);
      const filteredCollections = this.filterCollectionsByKeywords(response.data, collections);
      return filteredCollections;
    }
    async getCollectionsProducts(dto:CollectionsDto) {
    const response: AxiosResponse = await this.axiosInstance.get(`/collections/${dto.collectionId}/products.json`);
    return response.data;
  }
  async getProductbyId(dto: ProductDto) {
    const response: AxiosResponse = await this.axiosInstance.get(`/products/${dto.productId}.json`);
    return response.data;
  }

  async authenticateCustomer(credentials: any): Promise<any> {
    // Implement authentication logic using Shopify SDK
    // You can use OAuth flow for authentication
    // This typically involves redirecting users to Shopify's authentication endpoint
    // After successful authentication, Shopify will redirect users back to your app
    // Your app will receive an access token which you can use for further API requests
    // You'll need to handle the OAuth flow in your NestJS application
    // For more details, refer to Shopify's OAuth documentation: https://shopify.dev/tutorials/authenticate-with-oauth
  }
  async registerCustomer(customerData: any): Promise<any> {
    try {
      const query = `mutation {
        customerCreate(input: {firstName: "${customerData.firstName}", lastName: "${customerData.lastName}", email: "${customerData.email}"}) {
          customer {
            id
            email
            firstName
            lastName
          }
          userErrors {
            field
            message
          }
        }
      }`;

      const response = await this.shopify.send(query);
      return response;
    } catch (error) {
      throw new Error(error.response.errors);
    }
  }

  async addToCart(customerId: string, product: any): Promise<any> {
    try {
      const query = `mutation {
        checkoutLineItemsAdd(checkoutId: "${customerId}", lineItems: {quantity: ${product.quantity}, variantId: "${product.variantId}"}) {
          checkout {
            id
            webUrl
          }
          checkoutUserErrors {
            code
            field
            message
          }
        }
      }`;

      const response = await this.shopify.send(query);
      return response;
    } catch (error) {
      throw new Error(error.response.errors);
    }
  }

  async deleteFromCart(customerId: string, productId: string): Promise<any> {
    try {
      const query = `mutation {
        checkoutLineItemsRemove(checkoutId: "${customerId}", lineItemIds: ["${productId}"]) {
          checkout {
            id
          }
          checkoutUserErrors {
            code
            field
            message
          }
        }
      }`;

      const response = await this.shopify.send(query);
      return response;
    } catch (error) {
      throw new Error(error.response.errors);
    }
  }

  async editCart(customerId: string, cartData: any): Promise<any> {
    try {
      const lineItems = cartData.lineItems.map((item: any) => `{quantity: ${item.quantity}, variantId: "${item.variantId}"}`).join(', ');

      const query = `mutation {
        checkoutLineItemsReplace(checkoutId: "${customerId}", lineItems: [${lineItems}]) {
          checkout {
            id
          }
          checkoutUserErrors {
            code
            field
            message
          }
        }
      }`;

      const response = await this.shopify.send(query);
      return response;
    } catch (error) {
      throw new Error(error.response.errors);
    }
  }
}
// shopify.service.ts


