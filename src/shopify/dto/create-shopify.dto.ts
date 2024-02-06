// product.dto.ts

import { IsNotEmpty } from "class-validator";

// product.dto.ts
export class ProductDto {
    readonly title: string;
    readonly description: string;
    readonly price: number;
    readonly category: string; // Added category field
  }
export class CollectionsDto {
  @IsNotEmpty()
  collectionId: string
}
// add-to-cart.dto.ts
export class AddToCartDto {
    readonly productId: number;
    readonly quantity: number;
    readonly category: string; // Added category field
  }
// cart.dto.ts
export class CartDto {
    readonly items: CartItemDto[];
  }

export class CartItemDto {
  readonly productId: number;
  readonly quantity: number;
  readonly category: string; // Added category field
}
// checkout.dto.ts
export class CheckoutDto {
    readonly customerName: string;
    readonly shippingAddress: string;
    readonly paymentMethod: string;
    readonly cart: CartDto;
  }
      