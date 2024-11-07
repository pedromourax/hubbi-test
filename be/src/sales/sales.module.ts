import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { PrismaService } from '../prisma.service';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [SalesController],
  providers: [SalesService, PrismaService],
  exports: [SalesService],
})
export class SalesModule {}
