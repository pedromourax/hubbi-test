import {
  IsArray,
  IsNotEmpty,
  ValidateNested,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePurchaseItemDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Min(1)
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Min(0)
  price: number;
}

export class CreatePurchaseDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  saleId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePurchaseItemDto)
  @ApiProperty({
    example: [
      {
        productId: 1001,
        quantity: 10,
        price: 299,
      },
    ],
  })
  items: CreatePurchaseItemDto[];
}
