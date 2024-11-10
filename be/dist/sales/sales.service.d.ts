import { CreateSaleDto } from './dto/create-sale.dto';
import { SaleEntity } from './entities/sale.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';
import { PurchasesService } from 'src/purchases/purchases.service';
export declare class SalesService {
    private readonly saleRepository;
    private productsService;
    private purchasesService;
    constructor(saleRepository: Repository<SaleEntity>, productsService: ProductsService, purchasesService: PurchasesService);
    private logger;
    create(createSale: CreateSaleDto): Promise<{
        customerName: string;
        status: import("./entities/sale.entity").SaleStatus;
        date: string;
        totalAmount: number;
    } & SaleEntity>;
    findAll(): Promise<SaleEntity[]>;
    findOne(id: number): Promise<SaleEntity>;
    updateStatus(id: number, status: SaleEntity['status']): Promise<SaleEntity>;
    delete(id: number): Promise<{
        message: string;
    }>;
    findLastThree(): Promise<SaleEntity[]>;
    getTotalAmount(): Promise<{
        sales: number;
        purchases: number;
    }>;
}
