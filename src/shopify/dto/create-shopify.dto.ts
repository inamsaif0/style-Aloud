// product.dto.ts

import { IsNotEmpty, isNotEmpty } from "class-validator";
import { IsEmail, IsString, IsPhoneNumber, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
// product.dto.ts
// export class ProductDto {
//     readonly title: string;
//     readonly description: string;
//     readonly price: number;
//     readonly category: string; // Added category field
//   }

export class CollectionsDto {
  @IsNotEmpty()
  collectionId: string
}
export class ProductDto {
  @IsNotEmpty()
  productId: string

  @IsNotEmpty()
  device_token: string
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
      
  // customer.dto.ts


class AddressDto {
  @IsString()
  address1: string;

  @IsString()
  city: string;

  @IsString()
  province: string;

  @IsPhoneNumber()
  phone: string;

  @IsString()
  zip: string;

  @IsString()
  last_name: string;

  @IsString()
  first_name: string;

  @IsString()
  country: string;
}

export class CustomerDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: string;

  @IsBoolean()
  verified_email: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  addresses: [];

  @IsString()
  password: string;

  @IsString()
  password_confirmation: string;

  @IsBoolean()
  send_email_welcome: boolean;
}
