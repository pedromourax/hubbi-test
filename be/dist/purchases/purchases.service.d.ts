import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PurchaseEntity } from './entities/purchase.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';
import { SalesService } from 'src/sales/sales.service';
export declare class PurchasesService {
    private readonly purchaseRepository;
    private salesService;
    private productsService;
    constructor(purchaseRepository: Repository<PurchaseEntity>, salesService: SalesService, productsService: ProductsService);
    create(createPurchase: CreatePurchaseDto): Promise<PurchaseEntity>;
    findAll(): Promise<PurchaseEntity[]>;
    findOne(id: number): Promise<PurchaseEntity>;
    delete(id: number): Promise<{
        message: string;
    }>;
    deleteMany(ids: number[]): Promise<{
        message: string;
    }>;
    getTotalAmountSum(): Promise<number>;
}
