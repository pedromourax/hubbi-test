import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
export declare class SalesController {
    private readonly salesService;
    constructor(salesService: SalesService);
    create(createSaleDto: CreateSaleDto): Promise<{
        items: ({
            product: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                price: number;
                name: string;
            };
        } & {
            id: number;
            quantity: number;
            price: number;
            productId: number;
            saleId: number;
        })[];
    } & {
        id: number;
        totalAmount: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<({
        items: ({
            product: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                price: number;
                name: string;
            };
        } & {
            id: number;
            quantity: number;
            price: number;
            productId: number;
            saleId: number;
        })[];
        purchases: {
            id: number;
            totalAmount: number;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            saleId: number;
        }[];
    } & {
        id: number;
        totalAmount: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        items: ({
            product: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                price: number;
                name: string;
            };
        } & {
            id: number;
            quantity: number;
            price: number;
            productId: number;
            saleId: number;
        })[];
        purchases: ({
            items: ({
                product: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    price: number;
                    name: string;
                };
            } & {
                id: number;
                quantity: number;
                price: number;
                productId: number;
                purchaseId: number;
            })[];
        } & {
            id: number;
            totalAmount: number;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            saleId: number;
        })[];
    } & {
        id: number;
        totalAmount: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
