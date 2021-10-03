import { Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity()
export class Sale {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string;

  @Column()
  seller_id: string;

  @Column()
  total_price: number;

  @Column()
  sale_date: string;

  @Column()
  status: string;

}
