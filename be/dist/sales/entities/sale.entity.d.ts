import { Purchase } from 'src/purchases/entities/purchase.entity';
import { Product } from '../../products/entities/product.entity';
export declare class SaleItem {
    id: number;
    quantity: number;
    price: number;
    saleId: number;
    sale?: Sale;
    productId: number;
    product?: Product;
}
export declare class Sale {
    id: number;
    totalAmount: number;
    status: SaleStatus;
    createdAt: Date;
    updatedAt: Date;
    items?: SaleItem[];
    purchases?: Purchase[];
}
export declare enum SaleStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}
