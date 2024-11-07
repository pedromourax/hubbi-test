import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { SalesService } from '../sales/sales.service';

@Injectable()
export class PurchasesService {
  constructor(
    private prisma: PrismaService,
    private salesService: SalesService,
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto) {
    const sale = await this.salesService.findOne(createPurchaseDto.saleId);
    if (!sale) {
      throw new BadRequestException('Sale not found');
    }

    const totalAmount = createPurchaseDto.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return this.prisma.purchase.create({
      data: {
        totalAmount,
        sale: { connect: { id: createPurchaseDto.saleId } },
        items: {
          create: createPurchaseDto.items.map((item) => ({
            quantity: item.quantity,
            price: item.price,
            product: { connect: { id: item.productId } },
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        sale: true,
      },
    });
  }

  async findAll() {
    return this.prisma.purchase.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
        sale: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.purchase.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        sale: {
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
