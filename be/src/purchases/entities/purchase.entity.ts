import { Product } from '../../products/entities/product.entity';
import { Sale } from '../../sales/entities/sale.entity';

export class PurchaseItem {
  id: number;
  quantity: number;
  price: number;
  purchaseId: number;
  purchase?: Purchase;
  productId: number;
  product?: Product;
}

export class Purchase {
  id: number;
  totalAmount: number;
  status: PurchaseStatus;
  createdAt: Date;
  updatedAt: Date;
  saleId: number;
  sale?: Sale;
  items?: PurchaseItem[];
}

export enum PurchaseStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}
