import { Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { SaleProduct } from './SaleProduct';

@Entity()
export class Sale {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user: User) => user.id)
  @JoinColumn({ name: "user", referencedColumnName: "id" })
  user: User;

  @ManyToOne(() => User, (seller: User) => seller.id)
  @JoinColumn({ name: "seller", referencedColumnName: "id" })
  seller: User;
  
  @Column({ type: 'float' })
  total_price: number;

  @Column()
  delivery_address: string;

  @Column()
  delivery_number: number;

  @Column()
  sale_date: string;

  @Column()
  status: string;

  @OneToMany(() => SaleProduct, (saleProduct: SaleProduct) => saleProduct.sale)
  saleProduct: SaleProduct[];

}
