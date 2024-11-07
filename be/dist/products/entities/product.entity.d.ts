import { Purchase } from 'src/purchases/entities/purchase.entity';
import { Sale } from 'src/sales/entities/sale.entity';
export declare class Product {
    id: number;
    name: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    sales?: Sale[];
    purchases?: Purchase[];
}
