import { PurchaseEntity } from 'src/purchases/entities/purchase.entity';
import { SaleEntity } from 'src/sales/entities/sale.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column()
  quantity: number;

  @ManyToOne(() => SaleEntity, (sale) => sale.products)
  sale: SaleEntity;

  @ManyToOne(() => PurchaseEntity, (purchase) => purchase.products)
  purchase: PurchaseEntity;
}
