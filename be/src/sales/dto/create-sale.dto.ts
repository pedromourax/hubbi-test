import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SaleStatus } from '../entities/sale.entity';
import { CreateProductDto } from 'src/products/dto/create-product.dto';

export class CreateSaleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  customerName: string;

  @IsEnum(SaleStatus)
  @ApiProperty()
  status?: SaleStatus;

  @IsArray()
  @ApiProperty()
  products: CreateProductDto[];

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2024-10-21',
  })
  date: string;
}
