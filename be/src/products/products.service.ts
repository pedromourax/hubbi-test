import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findOne(id: number): Promise<Product> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async create(createProduct: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        name: createProduct.name,
        price: createProduct.price,
      },
    });
  }
}
