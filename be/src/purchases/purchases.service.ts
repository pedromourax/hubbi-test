import {
  Injectable,
  BadRequestException,
  NotFoundException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseEntity } from './entities/purchase.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';
import { SalesService } from 'src/sales/sales.service';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(PurchaseEntity)
    private readonly purchaseRepository: Repository<PurchaseEntity>,
    @Inject(forwardRef(() => SalesService))
    private salesService: SalesService,
    private productsService: ProductsService,
  ) {}
  async create(createPurchase: CreatePurchaseDto) {
    try {
      const sale = await this.salesService.findOne(createPurchase.sale);

      if (!sale) {
        throw new BadRequestException('Sale not found');
      }

      const selectedProducts = sale.products.filter((product) =>
        createPurchase.products.some((p: any) => p.id === product.id),
      );

      if (selectedProducts.length === 0) {
        throw new BadRequestException('No valid products selected');
      }

      const totalAmount = selectedProducts.reduce(
        (acc, product) => acc + Number(product.price) * product.quantity,
        0,
      );

      const purchase = this.purchaseRepository.create({
        sale: sale.id,
        products: selectedProducts,
        totalAmount,
      });

      const savedPurchase = await this.purchaseRepository.save(purchase);

      await Promise.all(
        selectedProducts.map(async (product) => {
          product.purchase = savedPurchase;
          return this.productsService.update(product.id, product);
        }),
      );

      return savedPurchase;
    } catch (error) {
      throw new BadRequestException(error.message || 'Error creating purchase');
    }
  }

  async findAll() {
    try {
      const purchase = await this.purchaseRepository.find({
        relations: {
          products: true,
        },
      });

      if (!purchase) {
        throw new NotFoundException('Purchase not found');
      }

      return purchase;
    } catch (error) {
      throw new BadRequestException(error.message || 'Error fetching purchase');
    }
  }

  async findOne(id: number) {
    try {
      const purchase = await this.purchaseRepository.findOne({
        where: { id },
        relations: {
          products: true,
        },
      });

      if (!purchase) {
        throw new NotFoundException('Purchase not found');
      }

      return purchase;
    } catch (error) {
      throw new BadRequestException(error.message || 'Error fetching purchase');
    }
  }

  async delete(id: number) {
    try {
      const purchase = await this.findOne(id);

      await Promise.all(
        purchase.products.map(async (product) => {
          product.purchase = null;
          return this.productsService.update(product.id, product);
        }),
      );

      await this.purchaseRepository.remove(purchase);

      return { message: 'Purchase removed successfully' };
    } catch (error) {
      throw new BadRequestException(error.message || 'Error removing purchase');
    }
  }

  async deleteMany(ids: number[]) {
    try {
      const purchases = await Promise.all(ids.map((id) => this.findOne(id)));

      await Promise.all(
        purchases.flatMap((purchase) =>
          purchase.products.map(async (product) => {
            product.purchase = null;
            return this.productsService.update(product.id, product);
          }),
        ),
      );

      await this.purchaseRepository.remove(purchases);

      return { message: 'Purchases removed successfully' };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error removing purchases',
      );
    }
  }

  async getTotalAmountSum() {
    try {
      const purchases = await this.purchaseRepository.find();

      const totalSum = purchases.reduce(
        (acc, purchase) => acc + Number(purchase.totalAmount),
        0,
      );

      return totalSum;
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error calculating total purchases',
      );
    }
  }
}
