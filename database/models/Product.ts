import { Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { SaleProduct } from "./SaleProduct";

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'float' })
  price: number;

  @Column()
  url_image: string;

  @OneToMany(() => SaleProduct, (saleProduct: SaleProduct) => saleProduct.product)
  saleProduct: SaleProduct[];

}
