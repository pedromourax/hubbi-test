import { IProduct } from 'src/products/entities/product.interface';
export interface IPurchase {
    id: number;
    totalAmount: number;
    sale?: number;
    products: IProduct[];
}
