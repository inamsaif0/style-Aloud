
// // shopify.service.ts
import '@shopify/shopify-api/adapters/node';
import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';
import { ConfigService } from '@nestjs/config';
import { CollectionsDto, ProductDto, VariantDto } from './dto/create-shopify.dto';
import { Favourite } from 'src/libs/database/entities/favourite.entity';
import { ConcurrencyLimiter } from 'src/utils/helper/limiter';
@Injectable()
export class ShopifyService {
  private shopify: any;
  private readonly shopifyApiUrl = 'https://e102b127e425a798ff2782d6314f18b7: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@fabricforu.myshopify.com/admin/api/2022-10';
  private readonly axiosInstance: AxiosInstance;
  private concurrencyLimiter: ConcurrencyLimiter;

  constructor(private readonly configService: ConfigService) {
    this.axiosInstance = axios.create({
      baseURL: this.shopifyApiUrl,
      timeout: 10000,
    });
    this.concurrencyLimiter = new ConcurrencyLimiter(5); // Set the concurrency limit here

  }

  getShopify() {
    return this.shopify;
  }
  async filterCollectionsByKeywords(collections: any, keywords: string[]) {
    console.log(collections.length)
    return collections.smart_collections.filter(collection => {
      console.log(collection)
      const title = collection.title.toLowerCase();
      console.log(title)
      return keywords.some(keyword => title.includes(keyword.toLowerCase()));
    });
  }

  async filterCollectionsByKeyword(collections: any, keywords: string[]) {
    console.log(collections)
    return collections.smart_collections.filter(collection => {
      console.log(collection)
      const title = collection.title.toLowerCase();
      console.log(title)
      return keywords.some(keyword => title.includes(keyword.toLowerCase()));
    });
  }
  async getCollections() {
    const response: any = await this.axiosInstance.get(`/smart_collections.json`);
    // return response.data;
    const filteredCollections = await this.filterCollectionsByKeyword(response.data, ["girl", "kids", 'bedding', 'Alak', 'jiny', 'Asale']);
    return filteredCollections;
  }

  async getHomeAccessoriess() {
    const response: any = await this.axiosInstance.get(`/smart_collections.json`);
    const keywords = [
      "kitchen-accessories", "bedding",
      "Bedding", "Bedspread", "Duvet Cover Set", "Filled Pillows",
      "Fitted Sheet", "Flat Sheet", "Pillowcase", "Throw",
      "Bath linen", "Towels", "Home Accessories", "Curtains",
      "Cushion Cover", "Filled Cushion", "Kitchen Accessories", 
      "Alapeno"
    ];

    const filteredCollections = await this.filterCollectionsByKeywords(response.data, keywords);
    return filteredCollections;
  }

  async getBeddingAccessories() {
    const response: any = await this.axiosInstance.get(`/smart_collections.json`);
    const keywords = [
     "Bedspread", "Duvet Cover Set", "Filled Pillows",
      "Fitted Sheet", "Flat Sheet", "Pillowcase",  "Throw",
    ];

    const filteredCollections = await this.filterCollectionsByKeywords(response.data, keywords);
    return filteredCollections;
  }

  async getBathLineAccessories() {
    const response: any = await this.axiosInstance.get(`/smart_collections.json`);
    const keywords = [
       "Bath linen"
    ];

    const filteredCollections = await this.filterCollectionsByKeywords(response.data, keywords);
    return filteredCollections;
  }
  async getHomeAccessories() {
    const response: any = await this.axiosInstance.get(`/smart_collections.json`);
    const keywords = [
      "Curtains",
      "Cushion Cover", 
      "Filled Cushion"
    ];

    const filteredCollections = await this.filterCollectionsByKeywords(response.data, keywords);
    return filteredCollections;
  }
  async getKitchenAccessories() {
    const response: any = await this.axiosInstance.get(`/smart_collections.json`);
    const keywords = [
      "Kitchen Accessories"
    ];

    const filteredCollections = await this.filterCollectionsByKeywords(response.data, keywords);
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


  private async retryRequest(url: string, retries: number = 3, delay: number = 1000): Promise<AxiosResponse> {
    for (let i = 0; i < retries; i++) {
      try {
        return await this.axiosInstance.get(url);
      } catch (error) {
        if (i === retries - 1 || error.response?.status !== 429) {
          throw error;
        }
        const retryAfter = error.response.headers['retry-after'] ? parseInt(error.response.headers['retry-after'], 10) * 1000 : delay;
        await new Promise(resolve => setTimeout(resolve, retryAfter));
        delay *= 2; // Exponential backoff
      }
    }
    throw new Error('Exceeded maximum retries');
  }

  async getCollectionsProducts(dto: CollectionsDto) {
    try {
      const { collectionId } = dto;
      const productsResponse: AxiosResponse = await this.axiosInstance.get(`/collections/${collectionId}/products.json`);
      const products = productsResponse.data.products;

      const productDetailsPromises = products.map((product: any) =>
        this.concurrencyLimiter.run(() =>
          this.retryRequest(`/products/${product.id}.json`).then(response => ({
            ...product,
            price: response.data.product.variants[0].price
          }))
        )
      );

      const updatedProducts = await Promise.all(productDetailsPromises);

      return updatedProducts;
    } catch (error) {
      console.error('Error fetching collection products:', error);
      throw error;
    }
  }

  async getProductbyId(dto: ProductDto) {
    try {
      const response: AxiosResponse = await this.axiosInstance.get(`/products/${dto.productId}.json`);
      const productData = response.data;
  
      const data = await Favourite.query().where({
        product_id: dto.productId,
        device_token: dto.device_token
      });
  
      productData.product.isFavourite = data.length > 0;
  
      return productData;
    } catch (error) {
      console.error('Error fetching product by ID:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      } else if (error.request) {
        console.error('No response received:', error.request);
      }
      throw new Error('Error fetching product by ID');
    }
  }
  async getProductByVariantId(dto: VariantDto) {
    try {
      // Fetch the product using the variant ID
      const response: AxiosResponse = await this.axiosInstance.get(`/variants/${dto.variantId}.json`);
      const productData = response.data;
  
      // Query to check if the product variant is marked as a favorite
      // const data = await Favourite.query().where({
      //   product_id: productData.id,
      //   device_token: dto.device_token
      // });
  
      // Mark the variant as a favorite if it is present in the query result
      // productData.variant.isFavourite = data.length > 0;
  
      return productData;
    } catch (error) {
      console.error('Error fetching product by variant ID:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      } else if (error.request) {
        console.error('No response received:', error.request);
      }
      throw new Error('Error fetching product by variant ID');
    }
  }
  


}



