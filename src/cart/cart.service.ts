// import { Injectable } from '@nestjs/common';
// import { CreateCartDto, GetCart, IncreaseDecreaseCount } from './dto/create-cart.dto';
// import { UpdateCartDto } from './dto/update-cart.dto';
// import { Cart } from 'src/libs/database/entities/cart.entity';
// import { count } from 'console';
// import { Helper } from "src/utils/helper/helper.global";
// import axios, { AxiosInstance, AxiosResponse } from 'axios';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class CartService {
//   private shopify: any;
//   private readonly shopifyApiUrl = 'https://e102b127e425a798ff2782d6314f18b7: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@fabricforu.myshopify.com/admin/api/2022-10';
//   private readonly axiosInstance: AxiosInstance;

//   constructor(private readonly configService: ConfigService) {
//     this.axiosInstance = axios.create({
//       baseURL: this.shopifyApiUrl,
//       timeout: 5000,
//     });
//   }
//   async getProductbyId(productId: any) {
//     const response: AxiosResponse = await this.axiosInstance.get(`/products/${productId}.json`);
//     return response.data;
//   }
//   async addToCart(dto: CreateCartDto){
//     let data = await Cart.query().insertAndFetch({
//       user_id: dto.user_id,
//       product_id: dto.product_id,
//       count: dto.count
//     })
//     return data
//   }

//   async getCartbyUserId(dto: GetCart) {
//     let obj:any = {
//       user_id: dto.user_id,
//       products: []
//     };
    
//     let data:any = await Cart.query().where({user_id: dto.user_id});
    
//     for (const val of data) {
//       let product:any = await this.getProductbyId(val.product_id); // Await the asynchronous call
//       obj.products.push(product); // Push the product into the products array
//     }
    
//     console.log(obj);
//     return obj;
//   }
  
//   async IncrementDecrementCount(dto: IncreaseDecreaseCount){
//     let data = await Cart.query().updateAndFetchById(dto.element_id, {
//       count: dto.count
//     });

//   }
// }
import { Injectable } from '@nestjs/common';
import { CreateCartDto, GetCart, IncreaseDecreaseCount } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from 'src/libs/database/entities/cart.entity';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CartService {
  private readonly shopifyApiUrl = 'https://e102b127e425a798ff2782d6314f18b7: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@fabricforu.myshopify.com/admin/api/2022-10';
  private readonly axiosInstance: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    this.axiosInstance = axios.create({
      baseURL: this.shopifyApiUrl,
      timeout: 5000,
    });
  }

  async getProductbyId(productId: any) {
    const response: AxiosResponse = await this.axiosInstance.get(`/products/${productId}.json`);
    return response.data.product; // Ensure only the product data is returned
  }

  async addToCart(dto: CreateCartDto) {
    let data = await Cart.query().insertAndFetch({
      user_id: dto.user_id,
      product_id: dto.product_id,
      count: dto.count
    });
    return data;
  }

  async getCartbyUserId(dto: GetCart) {
    const obj = {
      user_id: dto.user_id,
      products: []
    };
  
    const data = await Cart.query().where({ user_id: dto.user_id });
  
    // Fetch all product details in parallel
    const productPromises = data.map(async (val: any) => {
      const product = await this.getProductbyId(val.product_id);
      return {
        id: product.id,
        title: product.title,
        price: product.variants[0]?.price, // Assuming you want the price of the first variant
        image: product.images[0]?.src, // Adding the first image URL
        quantity: val.count // Including the quantity from the cart
      };
    });
  
    // Wait for all product details to be fetched
    obj.products = await Promise.all(productPromises);
  
    console.log(obj);
    return obj;
  }
  

  async IncrementDecrementCount(dto: IncreaseDecreaseCount) {
    let data = await Cart.query().updateAndFetchById(dto.element_id, {
      count: dto.count
    });
    return data;
  }
}
