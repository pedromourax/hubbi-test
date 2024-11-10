import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleEntity } from './entities/sale.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';
import { PurchasesService } from 'src/purchases/purchases.service';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(SaleEntity)
    private readonly saleRepository: Repository<SaleEntity>,
    @Inject(forwardRef(() => ProductsService))
    private productsService: ProductsService,
    private purchasesService: PurchasesService,
  ) {}

  private logger = new Logger(SalesService.name);

  async create(createSale: CreateSaleDto) {
    const totalAmount = createSale.products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0,
    );
    const sale = await this.saleRepository.save({
      customerName: createSale.customerName,
      status: createSale?.status,
      date: createSale.date,
      totalAmount,
    });
    const products = createSale.products.map((product) => ({
      ...product,
      sale: { id: sale.id },
    }));

    await this.productsService.createMany(products);

    return sale;
  }

  async findAll() {
    return await this.saleRepository.find({
      relations: {
        products: true,
        purchases: {
          products: true,
        },
      },
      select: {
        id: true,
        customerName: true,
        totalAmount: true,
        date: true,
        status: true,
        products: true,
        purchases: {
          id: true,
          totalAmount: true,
          products: true,
        },
      },
      order: {
        date: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    try {
      const sale = await this.saleRepository.findOne({
        where: { id },
        relations: {
          products: true,
          purchases: {
            products: true,
          },
        },
        select: {
          id: true,
          customerName: true,
          totalAmount: true,
          status: true,
          date: true,
          products: true,
          purchases: {
            id: true,
            totalAmount: true,
            products: true,
          },
        },
      });

      if (!sale) throw new NotFoundException('Sale not found');
      return sale;
    } catch (error) {
      this.logger.log(error.message);
      throw error;
    }
  }
  async updateStatus(id: number, status: SaleEntity['status']) {
    try {
      let sale = await this.saleRepository.findOne({ where: { id } });
      console.log(sale, id);
      if (!sale) {
        throw new NotFoundException('Sale not found');
      }
      sale.status = status;

      return await this.saleRepository.save(sale);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const sale = await this.findOne(id);

      if (sale.products.length > 0) {
        await this.productsService.deleteMany(
          sale?.products.map((product) => product.id),
        );
      }
      if (sale.purchases.length > 0) {
        await this.purchasesService.deleteMany(
          sale?.purchases.map((purchase) => purchase.id),
        );
      }

      await this.saleRepository.remove(sale);
      return { message: 'Sale deleted successfully' };
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async findLastThree() {
    return await this.saleRepository.find({
      relations: {
        products: true,
        purchases: {
          products: true,
        },
      },
      select: {
        id: true,
        customerName: true,
        totalAmount: true,
        date: true,
        status: true,
        products: true,
        purchases: {
          id: true,
          totalAmount: true,
          products: true,
        },
      },
      order: {
        date: 'DESC',
      },
      take: 3,
    });
  }

  async getTotalAmount() {
    try {
      const sales = await this.saleRepository.find({
        select: {
          totalAmount: true,
        },
      });

      const totalSales = sales.reduce(
        (acc, sale) => acc + +sale.totalAmount,
        0,
      );
      const totalPurchases = await this.purchasesService.getTotalAmountSum();

      return {
        sales: parseFloat(totalSales.toFixed(3)),
        purchases: parseFloat(totalPurchases.toFixed(3)),
      };
    } catch (error) {
      this.logger.error('Error calculating total sales:', error.message);
      throw error;
    }
  }
}
