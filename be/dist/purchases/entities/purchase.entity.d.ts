import { ProductEntity } from 'src/products/entities/product.entity';
export declare class PurchaseEntity {
    id: number;
    totalAmount: number;
    sale: number;
    products: ProductEntity[];
}
