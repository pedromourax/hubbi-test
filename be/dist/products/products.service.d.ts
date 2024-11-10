import { CreateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
export declare class ProductsService {
    private readonly productRepository;
    constructor(productRepository: Repository<ProductEntity>);
    private logger;
    findAll(): Promise<ProductEntity[]>;
    findOne(id: number): Promise<ProductEntity>;
    create(createProduct: CreateProductDto): Promise<CreateProductDto & ProductEntity>;
    createMany(products: CreateProductDto[]): Promise<(CreateProductDto & ProductEntity)[]>;
    delete(id: number): Promise<{
        message: string;
    }>;
    deleteMany(ids: number[]): Promise<{
        message: string;
    }>;
    update(id: number, updateProduct: Partial<ProductEntity>): Promise<{
        id?: number;
        name: string;
        price: number;
        quantity: number;
        sale: import("../sales/entities/sale.entity").SaleEntity;
        purchase: import("../purchases/entities/purchase.entity").PurchaseEntity;
    } & ProductEntity>;
}
