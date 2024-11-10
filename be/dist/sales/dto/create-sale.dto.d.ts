import { SaleStatus } from '../entities/sale.entity';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
export declare class CreateSaleDto {
    customerName: string;
    status?: SaleStatus;
    products: CreateProductDto[];
    date: string;
}
