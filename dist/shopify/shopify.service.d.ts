import '@shopify/shopify-api/adapters/node';
import { ConfigService } from '@nestjs/config';
import { CollectionsDto } from './dto/create-shopify.dto';
export declare class ShopifyService {
    private readonly configService;
    private shopify;
    private readonly shopifyApiUrl;
    private readonly axiosInstance;
    constructor(configService: ConfigService);
    private initializeShopifyApi;
    getShopify(): any;
    getCollections(): Promise<any>;
    getCollectionsProducts(dto: CollectionsDto): Promise<any>;
    authenticateCustomer(credentials: any): Promise<any>;
    registerCustomer(customerData: any): Promise<any>;
    addToCart(customerId: string, product: any): Promise<any>;
    deleteFromCart(customerId: string, productId: string): Promise<any>;
    editCart(customerId: string, cartData: any): Promise<any>;
}
