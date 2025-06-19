import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { User } from '../../users/entities/user.entity';

export enum DeliveryStatus {
  ACCEPTED = 'ACCEPTED', // Available to assign
  ASSIGNED = 'ASSIGNED', // Assigned to a driver
  PICKED_UP = 'PICKED_UP', // Picked up by the driver
  DELIVERED = 'DELIVERED', // Completed
  FAILED = 'FAILED', // Failed to deliver
}

@Entity()
@Unique(['order'])
export class Delivery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Order)
  @JoinColumn()
  order: Order;

  @ManyToOne(() => User, (user) => user.deliveries, { nullable: true })
  deliveryPerson: User;

  @Column({
    type: 'enum',
    enum: DeliveryStatus,
    default: DeliveryStatus.ACCEPTED,
  })
  status: DeliveryStatus;

  @Column({ nullable: true })
  pickupTimestamp: Date;

  @Column({ nullable: true })
  deliveryTimestamp: Date;

  @Column({ nullable: true })
  deliveryConfirmationCode: string;

  @Column({ nullable: true })
  enteredConfirmationCode: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
