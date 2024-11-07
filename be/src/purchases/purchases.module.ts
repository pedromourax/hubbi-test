import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { PrismaService } from '../prisma.service';
import { SalesModule } from '../sales/sales.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [SalesModule, ProductsModule],
  controllers: [PurchasesController],
  providers: [PurchasesService, PrismaService],
})
export class PurchasesModule {}
