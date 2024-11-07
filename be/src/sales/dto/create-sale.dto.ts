import {
  IsArray,
  IsNotEmpty,
  ValidateNested,
  IsNumber,
  Min,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSaleItemDto {
  // @IsNotEmpty()
  // @IsNumber()
  // @ApiProperty()
  // productId: number;
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Min(0)
  price: number;
}

export class CreateSaleDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSaleItemDto)
  @ApiProperty({
    example: [
      {
        name: 'Molas Eibach',
        quantity: 10,
        price: 299,
      },
    ],
  })
  items: CreateSaleItemDto[];
}
