import { IProduct } from 'src/products/entities/product.interface';
import { SaleStatus } from './sale.entity';
export interface ISale {
    id: number;
    customerName: string;
    totalAmount: number;
    status: SaleStatus;
    products: IProduct[];
    purchases?: IProduct[];
}
