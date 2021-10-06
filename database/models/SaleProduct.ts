import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Sale } from "./Sale";
import { Product } from "./Product";

@Entity()
export class SaleProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Sale, (sale: Sale) => sale.saleProduct)
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
