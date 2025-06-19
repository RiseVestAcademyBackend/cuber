import { Entity, Column, ManyToMany, OneToMany, RelationId } from 'typeorm';
import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

@ObjectType()
@Entity()
export class Order {
  @Column()
  @Field(() => String)
  customer: string;

  @RelationId((order: Order) => String)
  customerId: number;

  driver: string;

  driverId: number;
  restaurant: Restaurant;

  @Column()
  @Field(() => String)
  total_price: number;

  status: string;
}
