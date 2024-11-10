import { ISale } from 'src/sales/entities/sale.interface';
export interface IProduct {
    id?: number;
    name: string;
    price: number;
    quantity: string;
    sale?: ISale;
    purchase?: IProduct;
}
