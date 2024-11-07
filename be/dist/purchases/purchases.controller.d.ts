import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
export declare class PurchasesController {
    private readonly purchasesService;
    constructor(purchasesService: PurchasesService);
    create(createPurchaseDto: CreatePurchaseDto): Promise<{
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
        sale: {
            id: number;
            totalAmount: number;
            status: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        totalAmount: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        saleId: number;
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
            purchaseId: number;
        })[];
        sale: {
            id: number;
            totalAmount: number;
            status: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        totalAmount: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        saleId: number;
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
            purchaseId: number;
        })[];
        sale: {
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
        };
    } & {
        id: number;
        totalAmount: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        saleId: number;
    }>;
}
