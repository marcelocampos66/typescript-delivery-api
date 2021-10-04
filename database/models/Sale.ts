import { Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

@Entity()
export class Sale {

  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // user_id: string;
  @ManyToOne(() => User)
  @JoinColumn({ name: "user", referencedColumnName: "id" })
  user: User;

  // @Column()
  // seller_id: string;
  @ManyToOne(() => User)
  @JoinColumn({ name: "seller", referencedColumnName: "id" })
  seller: User;

  @Column()
  total_price: number;

  @Column()
  sale_date: string;

  @Column()
  status: string;

  @ManyToMany(() => Product, (products: Product) => products.id)
  @JoinTable()
  products: Array<Product>;

}
