import { IsArray, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateProductDto } from 'src/products/dto/create-product.dto';

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
  sale: number;

  @IsArray()
  @IsNotEmpty()
  products: {
    id: number;
  }[];
}
