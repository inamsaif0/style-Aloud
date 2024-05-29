import { IsNotEmpty, IsString, IsNumber, ValidateNested, IsArray, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class ItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  quantity: string;

  @IsNotEmpty()
  @IsNumber()
  unit_amount: {
    currency_code: string;
    value: string;
  };
}

class AmountDto {
  @IsNotEmpty()
  @IsString()
  currency_code: string;

  @IsNotEmpty()
  @IsString()
  value: string;

  @IsOptional()
  breakdown: {
    item_total: {
      currency_code: string;
      value: string;
    };
  };
}

class PurchaseUnitDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AmountDto)
  amount: AmountDto;
}

class ApplicationContextDto {
  @IsNotEmpty()
  @IsString()
  return_url: string;

  @IsNotEmpty()
  @IsString()
  cancel_url: string;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  intent: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchaseUnitDto)
  purchase_units: PurchaseUnitDto[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ApplicationContextDto)
  application_context: ApplicationContextDto;
}
