import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  line_items_title: string;

  @IsNotEmpty()
  line_items_price: number;

  @IsNotEmpty()
  line_items_grams: number;

  @IsNotEmpty()
  line_items_quantity: number;

  @IsNotEmpty()
  transactions_kind: string;

  @IsNotEmpty()
  transactions_status: string;

  @IsNotEmpty()
  transactions_amount: number;

  @IsNotEmpty()
  currency: string;

  @IsNotEmpty()
  billing_address_first_name: string;

  @IsNotEmpty()
  billing_address_last_name: string;

  @IsNotEmpty()
  billing_address_address1: string;

  @IsNotEmpty()
  billing_address_address2: string;

  @IsNotEmpty()
  billing_address_city: string;

  @IsNotEmpty()
  billing_address_province: string;

  @IsNotEmpty()
  billing_address_country: string;

  @IsNotEmpty()
  billing_address_zip: string;

  @IsNotEmpty()
  shipping_address_first_name: string;

  @IsNotEmpty()
  shipping_address_last_name: string;

  @IsNotEmpty()
  shipping_address_address1: string;

  @IsNotEmpty()
  shipping_address_address2: string;

  @IsNotEmpty()
  shipping_address_city: string;

  @IsNotEmpty()
  shipping_address_province: string;

  @IsNotEmpty()
  shipping_address_country: string;

  @IsNotEmpty()
  shipping_address_zip: string;

  @IsNotEmpty()
  customer_first_name: string;

  @IsNotEmpty()
  customer_last_name: string;

  @IsNotEmpty()
  customer_email: string;

  @IsNotEmpty()
  customer_phone: string;
}
