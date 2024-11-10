import { ProductEntity } from 'src/products/entities/product.entity';
import { SaleEntity } from 'src/sales/entities/sale.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('purchases')
export class PurchaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @ManyToOne(() => SaleEntity, (sale) => sale.purchases)
  sale: number;

  @OneToMany(() => ProductEntity, (product) => product.purchase)
  products: ProductEntity[];
}
