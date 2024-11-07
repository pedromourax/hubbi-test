import { PrismaService } from '../prisma.service';
import { Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
    create(createProduct: CreateProductDto): Promise<{
        id: number;
        name: string;
        price: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
