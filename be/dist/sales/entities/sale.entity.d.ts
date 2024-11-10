import { ProductEntity } from 'src/products/entities/product.entity';
import { PurchaseEntity } from 'src/purchases/entities/purchase.entity';
export declare class SaleEntity {
    id: number;
    customerName: string;
    totalAmount: number;
    date: Date;
    status: SaleStatus;
    products: ProductEntity[];
    purchases: PurchaseEntity[];
}
export declare enum SaleStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}
