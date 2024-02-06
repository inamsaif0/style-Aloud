import { ShopifyService } from './shopify.service';
export declare class ShopifyController {
    private readonly shopifyService;
    constructor(shopifyService: ShopifyService);
    registerCustomer(customerData: any): Promise<any>;
    authenticateCustomer(credentials: any): Promise<any>;
    addToCart(customerId: string, product: any): Promise<any>;
    deleteFromCart(customerId: string, productId: string): Promise<any>;
    editCart(customerId: string, cartData: any): Promise<any>;
}
