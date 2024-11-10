import { PurchaseEntity } from 'src/purchases/entities/purchase.entity';
import { SaleEntity } from 'src/sales/entities/sale.entity';
export declare class ProductEntity {
    id?: number;
    name: string;
    price: number;
    quantity: number;
    sale: SaleEntity;
    purchase: PurchaseEntity;
}
