export declare class ProductDto {
    readonly title: string;
    readonly description: string;
    readonly price: number;
    readonly category: string;
}
export declare class CollectionsDto {
    collectionId: string;
}
export declare class AddToCartDto {
    readonly productId: number;
    readonly quantity: number;
    readonly category: string;
}
export declare class CartDto {
    readonly items: CartItemDto[];
}
export declare class CartItemDto {
    readonly productId: number;
    readonly quantity: number;
    readonly category: string;
}
export declare class CheckoutDto {
    readonly customerName: string;
    readonly shippingAddress: string;
    readonly paymentMethod: string;
    readonly cart: CartDto;
}
