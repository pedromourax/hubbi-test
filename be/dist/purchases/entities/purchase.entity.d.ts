import { Product } from '../../products/entities/product.entity';
import { Sale } from '../../sales/entities/sale.entity';
export declare class PurchaseItem {
    id: number;
    quantity: number;
    price: number;
    purchaseId: number;
    purchase?: Purchase;
    productId: number;
    product?: Product;
}
export declare class Purchase {
    id: number;
    totalAmount: number;
    status: PurchaseStatus;
    createdAt: Date;
    updatedAt: Date;
    saleId: number;
    sale?: Sale;
    items?: PurchaseItem[];
}
export declare enum PurchaseStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}
