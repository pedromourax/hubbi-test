import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { SaleEntity } from './entities/sale.entity';
export declare class SalesController {
    private readonly salesService;
    constructor(salesService: SalesService);
    private logger;
    create(createSaleDto: CreateSaleDto): Promise<{
        customerName: string;
        status: import("./entities/sale.entity").SaleStatus;
        date: string;
        totalAmount: number;
    } & SaleEntity>;
    findAll(): Promise<SaleEntity[]>;
    findLastThree(): Promise<{
        lastThree: SaleEntity[];
        sales: number;
        purchases: number;
    }>;
    findOne(id: string): Promise<SaleEntity>;
    updateStatus(id: string, payload: {
        status: SaleEntity['status'];
    }): Promise<SaleEntity>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
