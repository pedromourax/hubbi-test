import { ProductEntity } from 'src/products/entities/product.entity';
import { PurchaseEntity } from 'src/purchases/entities/purchase.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sales')
export class SaleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @Column()
  date: Date;

  @Column({ default: 'PENDING' })
  status: SaleStatus;

  @OneToMany(() => ProductEntity, (products) => products.sale)
  products: ProductEntity[];

  @OneToMany(() => PurchaseEntity, (purchase) => purchase.sale)
  purchases: PurchaseEntity[];
}

export enum SaleStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}
