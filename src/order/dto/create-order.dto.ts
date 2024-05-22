import { IsNotEmpty, IsArray, ValidateNested, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class LineItemDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;


  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

class TransactionDto {
  @IsNotEmpty()
  @IsString()
  kind: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LineItemDto)
  line_items: LineItemDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TransactionDto)
  transactions: TransactionDto[];

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsString()
  billing_address_first_name: string;

  @IsNotEmpty()
  @IsString()
  billing_address_last_name: string;

  @IsNotEmpty()
  @IsString()
  billing_address_address1: string;

  @IsString()
  billing_address_address2: string;

  @IsNotEmpty()
  @IsString()
  billing_address_city: string;

  @IsNotEmpty()
  @IsString()
  billing_address_province: string;

  @IsNotEmpty()
  @IsString()
  billing_address_country: string;

  @IsNotEmpty()
  @IsString()
  billing_address_zip: string;

  @IsNotEmpty()
  @IsString()
  shipping_address_first_name: string;

  @IsNotEmpty()
  @IsString()
  shipping_address_last_name: string;

  @IsNotEmpty()
  @IsString()
  shipping_address_address1: string;

  @IsString()
  shipping_address_address2: string;

  @IsNotEmpty()
  @IsString()
  shipping_address_city: string;

  @IsNotEmpty()
  @IsString()
  shipping_address_province: string;

  @IsNotEmpty()
  @IsString()
  shipping_address_country: string;

  @IsNotEmpty()
  @IsString()
  shipping_address_zip: string;

  @IsNotEmpty()
  @IsString()
  customer_first_name: string;

  @IsNotEmpty()
  @IsString()
  customer_last_name: string;

  @IsNotEmpty()
  @IsString()
  customer_email: string;

  @IsNotEmpty()
  @IsString()
  customer_phone: string;
}
