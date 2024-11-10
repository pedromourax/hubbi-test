import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
export declare class PurchasesController {
    private readonly purchasesService;
    constructor(purchasesService: PurchasesService);
    private logger;
    create(createPurchaseDto: CreatePurchaseDto): Promise<import("./entities/purchase.entity").PurchaseEntity>;
    findAll(): Promise<import("./entities/purchase.entity").PurchaseEntity[]>;
    findOne(id: string): Promise<import("./entities/purchase.entity").PurchaseEntity>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
