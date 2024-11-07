import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateSaleDto } from './dto/create-sale.dto';

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  async create(createSaleDto: CreateSaleDto) {
    const totalAmount = createSaleDto.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const createdItems = await Promise.all(
      createSaleDto.items.map(async (item) => {
        const product = await this.prisma.product.create({
          data: {
            name: item.name, // Supondo que o nome do produto esteja em item.productName
            price: item.price,
          },
        });

        return {
          quantity: item.quantity,
          price: item.price,
          product: {
            connect: { id: product.id },
          },
        };
      }),
    );

    return this.prisma.sale.create({
      data: {
        totalAmount,
        items: {
          create: createdItems,
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.sale.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
        purchases: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.sale.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        purchases: {
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });
  }
}
