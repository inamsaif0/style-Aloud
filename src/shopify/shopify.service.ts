
// // shopify.service.ts
import '@shopify/shopify-api/adapters/node';
import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';
import { ConfigService } from '@nestjs/config';
import { CollectionsDto, ProductDto, searchDto, VariantDto } from './dto/create-shopify.dto';
import { Favourite } from 'src/libs/database/entities/favourite.entity';
import { ConcurrencyLimiter } from 'src/utils/helper/limiter';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class ShopifyService {
  private shopify: any;
  private readonly shopifyApiUrl = `https://${process.env.SHOPIFY_API_KEY}:${process.env.SHOPIFY_API_PASSWORD}@${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/${process.env.SHOPIFY_API_VERSION}`;
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
    // console.log(collections)
    return collections.filter(collection => {
      // console.log(collection)
      const title = collection.title.toLowerCase();
      console.log(title)
      return keywords.some(keyword => title.includes(keyword.toLowerCase()));
    });
  }

  async filterCollectionsByKeyword(collections: any, keywords: string[]): Promise<any[]> {
    if (!collections || !keywords || !Array.isArray(keywords)) {
      throw new Error("Invalid input: collections or keywords are missing");
    }
  
    // Combine both smart_collections and custom_collections if they exist
    const allCollections = [
      ...(collections.smart_collections || []),
      ...(collections.custom_collections || [])
    ];
  
    return allCollections.filter(collection => {
      if (!collection || !collection.title) return false; // Ensure collection has a title
  
      const title = collection.title.trim().toLowerCase(); // Trim spaces for better accuracy
      return keywords.some(keyword => {
        return title.includes(keyword.trim().toLowerCase()); // Match case-insensitive keyword
      });
    });
  }

  async fetchCollectionsWithPagination(endpoint: string) {
    let allCollections: any[] = [];
    let nextPageInfo = null;
  
    do {
      const response: any = await this.axiosInstance.get(endpoint, {
        params: {
          limit: 250, // Maximum Shopify allows per page
          page_info: nextPageInfo, // Cursor-based pagination
        },
      });
  
      allCollections = allCollections.concat(response.data.smart_collections || response.data.custom_collections || []);
  
      // Extract next page info
      const linkHeader = response.headers['link'];
      const nextPageMatch = linkHeader?.match(/<([^>]+)>;\s*rel="next"/);
      nextPageInfo = nextPageMatch ? new URL(nextPageMatch[1]).searchParams.get("page_info") : null;
  
    } while (nextPageInfo); // Continue fetching until all pages are retrieved
  
    return allCollections;
  }

  async getCollections() {
    const allowedCollectionIds = [
      "266097459263", // Sale
      "263516979263", // Women
      "263517012031", // Men
      "263788822591", // Bedding
      "163319349311", // Kids

    ];
  
    try {
      // Fetch both smart and custom collections
      const smartCollections = await this.fetchCollectionsWithPagination("/smart_collections.json");
      const customCollections = await this.fetchCollectionsWithPagination("/custom_collections.json");
  
      // Merge collections
      const allCollections = [...smartCollections, ...customCollections];
  
      // Filter collections based on ID
      const filteredCollections = allCollections.filter(collection =>
        allowedCollectionIds.includes(collection.id.toString()) // Ensure ID is compared as a string
      );
  
      return filteredCollections;
    } catch (error) {
      console.error("Error fetching collections:", error);
      return [];
    }
  }
  

  async getHomeAccessoriess() {
    const allowedCollectionIds = [
      "271908077631", // kitchen-accessories
      "271907487807", // Bedspread
      "157179248703", // Duvet Cover Set
      "271907586111", // Filled Pillows
      "271907618879", // Fitted Sheet
      "271907651647", // Flat Sheet
      "271907749951", // Pillow Case
      "271907815487", // Throw
      "271907848255", // Bath linen
      "157180198975", // Towels
      "271907946559", // Curtains
      "271907979327", // Cushion Cover
      "271908012095", //Filled Cushion

    ];
    const keywords = [
      "kitchen-accessories", "bedding",
      "Bedding", "Bedspread", "Duvet Cover Set", "Filled Pillows",
      "Fitted Sheet", "Flat Sheet", "Pillowcase", "Throw",
      "Bath linen", "Towels", "Home Accessories", "Curtains",
      "Cushion Cover", "Filled Cushion", "Kitchen Accessories", 
      "Alapeno"
    ];

    try {
      // Fetch both smart and custom collections
      const smartCollections = await this.fetchCollectionsWithPagination("/smart_collections.json");
      const customCollections = await this.fetchCollectionsWithPagination("/custom_collections.json");
  
      // Merge collections
      const allCollections = [...smartCollections, ...customCollections];
  
      // Filter collections based on ID
      const filteredCollections = allCollections.filter(collection =>
        allowedCollectionIds.includes(collection.id.toString()) // Ensure ID is compared as a string
      );
  
      return filteredCollections;
    } catch (error) {
      console.error("Error fetching collections:", error);
      return [];
    }
  }

  async getBeddingAccessories() {
    const response: any = await this.axiosInstance.get(`/smart_collections.json`);
    const keywords = [
     "Bedspread", "Duvet Cover Set", "Filled Pillows",
      "Fitted Sheet", "Flat Sheet", "Pillowcase",  "Throw",
    ];

    const allowedCollectionIds = [
      "271907487807", // Bedspread
      "157179248703", // Duvet Cover Set
      "271907586111", // Filled Pillows
      "271907618879", // Fitted Sheet
      "271907651647", // Flat Sheet
      "271907749951", // Pillow Case
      "271907815487", // Throw
    ];


    try {
      // Fetch both smart and custom collections
      const smartCollections = await this.fetchCollectionsWithPagination("/smart_collections.json");
      const customCollections = await this.fetchCollectionsWithPagination("/custom_collections.json");
  
      // Merge collections
      const allCollections = [...smartCollections, ...customCollections];
  
      // Filter collections based on ID
      const filteredCollections = allCollections.filter(collection =>
        allowedCollectionIds.includes(collection.id.toString()) // Ensure ID is compared as a string
      );
  
      return filteredCollections;
    } catch (error) {
      console.error("Error fetching collections:", error);
      return [];
    }
  }

  async getBathLineAccessories() {
    const allowedCollectionIds = [
       "271907848255" // bath linen
    ];

    try {
      // Fetch both smart and custom collections
      const smartCollections = await this.fetchCollectionsWithPagination("/smart_collections.json");
      const customCollections = await this.fetchCollectionsWithPagination("/custom_collections.json");
  
      // Merge collections
      const allCollections = [...smartCollections, ...customCollections];
  
      // Filter collections based on ID
      const filteredCollections = allCollections.filter(collection =>
        allowedCollectionIds.includes(collection.id.toString()) // Ensure ID is compared as a string
      );
  
      return filteredCollections;
    } catch (error) {
      console.error("Error fetching collections:", error);
      return [];
    }
  }
  async getHomeAccessories() {
    const response: any = await this.axiosInstance.get(`/smart_collections.json`);
    const keywords = [
      "Curtains",
      "Cushion Cover", 
      "Filled Cushion"
    ];

    const allowedCollectionIds = [
      "271907946559", // Curtains
      "271907979327", // Cushion Cover
      "271908012095", //Filled Cushion

    ];
    try {
      // Fetch both smart and custom collections
      const smartCollections = await this.fetchCollectionsWithPagination("/smart_collections.json");
      const customCollections = await this.fetchCollectionsWithPagination("/custom_collections.json");
  
      // Merge collections
      const allCollections = [...smartCollections, ...customCollections];
  
      // Filter collections based on ID
      const filteredCollections = allCollections.filter(collection =>
        allowedCollectionIds.includes(collection.id.toString()) // Ensure ID is compared as a string
      );
  
      return filteredCollections;
    } catch (error) {
      console.error("Error fetching collections:", error);
      return [];
    }
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

    const collectionIds = [
      "263529037887",
      "267045634111",
      "267045601343",
      "264272511039",
      "165479153727",
      "156964782143",
      "266630299711",
      "263072022591",
      "267130568767",
      "263037255743",
      "157120692287",
      "267045699647",
      "158004314175",
      "267045732415",
      "166017433663",
      "263072055359",
      "261003706431",
      "165479252031",
      "271908339775",
      "263072088127",
      "266387324991",
      "267045765183",
      "166762545215",
      "156964585535",
      "166762577983",
      "167835172927",
      "156964716607",
      "263085457471",
      "263071957055",
      "260857331775",
      "266022518847",
      "157082910783",
      "267632214079",
      "264108671039",
      "264256847935",
      "158004510783",
      "267045797951",
      "167153270847",
      "165642305599",
      "261003313215",
      "266387488831",
      "263071924287",
      "166859440191"

    ]
      const smartCollections = await this.fetchCollectionsWithPagination("/smart_collections.json");
      const customCollections = await this.fetchCollectionsWithPagination("/custom_collections.json");
  
      // Merge collections
      const allCollections : any = [...smartCollections, ...customCollections];
      const filteredCollections = allCollections.filter(collection =>
        collectionIds.includes(collection.id.toString()) // Ensure ID is compared as a string
      );
  
      return filteredCollections;
      // return allCollections;
      // const filteredCollections : any = this.filterCollectionsByKeywords(allCollections, collections);
      // console.log("this is the length of the list",filteredCollections);

    // return allCollections;
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
  
  async searchProductsByTitle(dto: { search: string }) {
    try {
      const response: AxiosResponse = await this.axiosInstance.get(`/products.json`);
      const products = response.data.products || [];
  
      const regex = new RegExp(dto.search, 'i'); // Case-insensitive search
      const filteredProducts = products.filter((product: any) => 
        regex.test(product.title) || regex.test(product.vendor)
      );  
      return filteredProducts;
    } catch (error) {
      console.error('Error searching products by title:', error);
      throw new Error('Failed to search products');
    }
  }
}



