import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Driver } from 'src/drivers/entities/driver.entity';
import { orderStatus } from '../enums/order-status.enum';
import { Food } from 'src/food/entities/food.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'number',
    nullable: false,
  })
  total_price: number;

  @Column({
    type: 'enum',
    enum: orderStatus,
    nullable: false,
    default: orderStatus.PENDING,
  })
  status: orderStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Customer)
  @JoinColumn()
  customer: Customer;

  @OneToOne(() => Driver)
  @JoinColumn()
  driver: Driver;

  @OneToOne(() => Restaurant)
  @JoinColumn()
  restaurant: Restaurant;

  // Uncomment when food entity is done
  // 1 Order can have many food items
  // 1 food item can be on many orders
  // @ManyToMany(() => Food, (food) => food.orders)
  // @JoinTable()
  food?: Food[];
}
